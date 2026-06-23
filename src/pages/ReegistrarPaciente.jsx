import { useState, useEffect } from "react";
import { supabase } from "../supabase/supabaseClient";

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

  async function handleSubmit(e) {
    e.preventDefault();

    // Más adelante aquí insertaremos en Supabase
    console.log(form);

    alert("Paciente registrado correctamente.");
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