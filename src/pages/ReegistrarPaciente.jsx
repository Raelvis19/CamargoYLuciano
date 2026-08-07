import { useEffect, useState } from "react";
import { FiCheckCircle, FiRefreshCw, FiSave, FiUserPlus } from "react-icons/fi";
import { supabase } from "../supabase/supabaseClient";
import { registrarPaciente } from "../services/RegistrarPacienteService";
import { emailRegex, phoneRegex, cedulaRegex } from "../utils/validators";
import { notify } from "../utils/notify";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import DatosPersonales from "../components/paciente/DatosPersonales";
import InformacionContacto from "../components/paciente/InformacionContacto";
import InformacionMedica from "../components/paciente/InformacionMedica";
import ContactoEmergencia from "../components/paciente/ContactoEmergencia";
import "./RegistrarPaciente.css";

const INITIAL_FORM = {
  nombre: "",
  matricula: "",
  cedula: "",
  fechaNacimiento: "",
  sexo: "",
  tipoSangre: "",
  telefono: "",
  correo: "",
  direccion: "",
  carrera: "",
  motivoConsulta: "",
  alergias: "",
  enfermedades: "",
  medicamentos: "",
  prioridad: "Normal",
  observaciones: "",
  contactoEmergencia: "",
  parentesco: "",
  telefonoEmergencia: "",
  correoEmergencia: "",
  observacionesEmergencia: "",
};

const STEPS = [
  ["Datos personales", "Identificación"],
  ["Contacto", "Comunicación"],
  ["Información médica", "Evaluación inicial"],
  ["Emergencia", "Contacto responsable"],
];

function RegistrarPaciente() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState(INITIAL_FORM);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function limpiarFormulario() {
    setForm(INITIAL_FORM);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const errores = [];
    if (form.nombre.trim().length < 3) errores.push("El nombre debe tener al menos 3 caracteres.");
    if (!form.matricula.trim()) errores.push("La matrícula es obligatoria.");
    if (form.cedula && !cedulaRegex.test(form.cedula.trim())) errores.push("La cédula no tiene un formato válido.");
    if (!form.fechaNacimiento) errores.push("La fecha de nacimiento es obligatoria.");
    if (form.fechaNacimiento && new Date(form.fechaNacimiento) > new Date()) errores.push("La fecha de nacimiento no puede estar en el futuro.");
    if (!form.sexo) errores.push("Selecciona el sexo del paciente.");
    if (!phoneRegex.test(form.telefono.trim())) errores.push("El teléfono del paciente no es válido.");
    if (form.correo && !emailRegex.test(form.correo.trim())) errores.push("El correo del paciente no es válido.");
    if (form.motivoConsulta.trim().length < 5) errores.push("Describe el motivo de consulta con más detalle.");
    if (form.contactoEmergencia.trim().length < 3) errores.push("Indica un contacto de emergencia.");
    if (!phoneRegex.test(form.telefonoEmergencia.trim())) errores.push("El teléfono de emergencia no es válido.");
    if (form.correoEmergencia && !emailRegex.test(form.correoEmergencia.trim())) errores.push("El correo de emergencia no es válido.");

    if (errores.length) {
      notify.warning(errores[0]);
      return;
    }

    try {
      setSaving(true);
      await registrarPaciente({
        nombre: form.nombre.trim(),
        matricula: form.matricula.trim(),
        cedula: form.cedula.trim(),
        fecha_nacimiento: form.fechaNacimiento,
        sexo: form.sexo,
        tipo_sangre: form.tipoSangre,
        telefono: form.telefono.trim(),
        correo: form.correo.trim(),
        carrera: form.carrera.trim(),
        direccion: form.direccion.trim(),
        motivo_consulta: form.motivoConsulta.trim(),
        alergias: form.alergias.trim(),
        enfermedades_preexistentes: form.enfermedades.trim(),
        medicamentos_actuales: form.medicamentos.trim(),
        prioridad: form.prioridad,
        observaciones_medicas: form.observaciones.trim(),
        contacto_nombre: form.contactoEmergencia.trim(),
        contacto_parentesco: form.parentesco.trim(),
        contacto_telefono: form.telefonoEmergencia.trim(),
        contacto_correo: form.correoEmergencia.trim(),
        contacto_observaciones: form.observacionesEmergencia.trim(),
      });

      notify.success("Paciente registrado correctamente.");
      limpiarFormulario();
    } catch (error) {
      console.error(error);
      notify.error(error?.message || "Error al registrar el paciente.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="app-container">
      <Sidebar />

      <div className="main-section">
        <Topbar user={user} />

        <main className="patient-page">
          <div className="patient-page__content">
            <header className="patient-page__header">
              <div>
                <span className="patient-page__eyebrow"><FiUserPlus /> Expediente nuevo</span>
                <h1 className="patient-page__title">Registrar nuevo paciente</h1>
                <p className="patient-page__subtitle">
                  Complete la información necesaria para crear el expediente clínico del paciente.
                </p>
              </div>
            </header>

            <div className="patient-progress" aria-label="Secciones del formulario">
              {STEPS.map(([title, description], index) => (
                <div className="patient-progress__item" key={title}>
                  <span className="patient-progress__number">{index + 1}</span>
                  <div><strong>{title}</strong><span>{description}</span></div>
                </div>
              ))}
            </div>

            <form className="patient-form" onSubmit={handleSubmit} noValidate>
              <DatosPersonales form={form} handleChange={handleChange} />
              <InformacionContacto form={form} handleChange={handleChange} />
              <InformacionMedica form={form} handleChange={handleChange} />
              <ContactoEmergencia form={form} handleChange={handleChange} />

              <div className="patient-form__actions">
                <div className="patient-form__actions-text">
                  <strong><FiCheckCircle className="me-1" /> Revisión final</strong>
                  <span>Compruebe los campos obligatorios antes de guardar.</span>
                </div>

                <div className="patient-form__buttons">
                  <button type="button" className="btn btn-outline-secondary" onClick={limpiarFormulario} disabled={saving}>
                    <FiRefreshCw className="me-1" /> Limpiar
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={saving}>
                    <FiSave /> {saving ? "Guardando..." : "Guardar paciente"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default RegistrarPaciente;
