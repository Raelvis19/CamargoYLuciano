import { useState, useEffect } from "react";
import { supabase } from "../supabase/supabaseClient";
import { registrarPaciente } from "../services/RegistrarPacienteService"; //Importacion del servicio de la Base de datos

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import DatosPersonales from "../components/paciente/DatosPersonales";
import InformacionContacto from "../components/paciente/InformacionContacto";
import InformacionMedica from "../components/paciente/InformacionMedica";
import ContactoEmergencia from "../components/paciente/ContactoEmergencia";

function RegistrarPaciente() {
  const [user, setUser] = useState(null);

  const [form, setForm] = useState({
    // Datos personales
    nombre: "",
    matricula: "",
    cedula: "",
    fechaNacimiento: "",
    sexo: "",
    tipoSangre: "",

    // Información de contacto
    telefono: "",
    correo: "",
    direccion: "",
    carrera: "",

    // Información médica
    motivoConsulta: "",
    alergias: "",
    enfermedades: "",
    medicamentos: "",
    prioridad: "Normal",
    observaciones: "",

    // Contacto de emergencia
    contactoEmergencia: "",
    parentesco: "",
    telefonoEmergencia: "",
    correoEmergencia: "",
    observacionesEmergencia: "",
  });

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function limpiarFormulario() {
    setForm({
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
    });
  }

  //Se agrego  cada campo para que al guardar y llame a handleSubmit registre el paciente
  async function handleSubmit(e) {
    e.preventDefault();

   try {
     await registrarPaciente({
       nombre: form.nombre,
       matricula: form.matricula,
       cedula: form.cedula,
       fecha_nacimiento: form.fechaNacimiento,
       sexo: form.sexo,
       tipo_sangre: form.tipoSangre,

       telefono: form.telefono,
       correo: form.correo,
       carrera: form.carrera,
       direccion: form.direccion,

       motivo_consulta: form.motivoConsulta,
       alergias: form.alergias,
       enfermedades_preexistentes: form.enfermedades,
       medicamentos_actuales: form.medicamentos,
       prioridad: form.prioridad,
       observaciones_medicas: form.observaciones,

       contacto_nombre: form.contactoEmergencia,
       contacto_parentesco: form.parentesco,
       contacto_telefono: form.telefonoEmergencia,
       contacto_correo: form.correoEmergencia,
       contacto_observaciones: form.observacionesEmergencia,
     });

     alert("Paciente registrado correctamente.");

     limpiarFormulario();
   } catch (error) {
     console.error(error);

     alert("Error al registrar el paciente.");
   }
  }

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f5f7fb",
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Topbar user={user} />

        <main className="container-fluid py-4 px-4">
          <div className="mb-4">
            <h2 className="fw-bold">
              Registrar nuevo paciente
            </h2>

            <p className="text-muted">
              Complete la información solicitada para registrar un paciente en el sistema.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <DatosPersonales
              form={form}
              handleChange={handleChange}
            />

            <InformacionContacto
              form={form}
              handleChange={handleChange}
            />

            <InformacionMedica
              form={form}
              handleChange={handleChange}
            />

            <ContactoEmergencia
              form={form}
              handleChange={handleChange}
            />

            <div className="card border-0 shadow-sm">
              <div className="card-body d-flex flex-wrap justify-content-end gap-3">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={limpiarFormulario}
                >
                  Limpiar formulario
                </button>

                <button
                  type="submit"
                  className="btn btn-primary px-4"
                >
                  Guardar paciente
                </button>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}

export default RegistrarPaciente;