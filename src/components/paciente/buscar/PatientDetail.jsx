import { useState } from "react";
import { actualizarPaciente } from "../../../services/RegistrarPacienteService";
import { eliminarPaciente } from "../../../services/EliminarPacienteService";
import DatosPersonales from "../DatosPersonales";
import InformacionContacto from "../InformacionContacto";
import InformacionMedica from "../InformacionMedica";
import ContactoEmergencia from "../ContactoEmergencia";

export default function PatientDetail({ patient,onUpdate }) {
  const [editando, setEditando] = useState(false);
const [form, setForm] = useState({
  nombre: patient.nombre,
  matricula: patient.matricula,
  cedula: patient.cedula,
  fecha_nacimiento: patient.fecha_nacimiento,
  sexo: patient.sexo,
  tipo_sangre: patient.tipo_sangre,
  telefono: patient.telefono,
  correo: patient.correo,
  carrera: patient.carrera,
  direccion: patient.direccion,
  motivo_consulta: patient.motivo_consulta,
  alergias: patient.alergias,
  enfermedades_preexistentes: patient.enfermedades_preexistentes,
  medicamentos_actuales: patient.medicamentos_actuales,
  prioridad: patient.prioridad,
  observaciones_medicas: patient.observaciones_medicas,
  contacto_nombre: patient.contacto_nombre,
  contacto_parentesco: patient.contacto_parentesco,
  contacto_telefono: patient.contacto_telefono,
  contacto_correo: patient.contacto_correo,
  contacto_observaciones: patient.contacto_observaciones,
});

  if (!patient) return null;

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleGuardar() {
    try {
      await actualizarPaciente(patient.id, form);

      alert("Paciente actualizado correctamente.");

      setEditando(false);
      onUpdate();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      {editando ? (
        <>
          <DatosPersonales form={form} handleChange={handleChange} />

          <InformacionContacto form={form} handleChange={handleChange} />

          <InformacionMedica form={form} handleChange={handleChange} />

          <ContactoEmergencia form={form} handleChange={handleChange} />

          {/* Botones */}

          <div className="card shadow-sm border-0">
            <div className="card-body d-flex justify-content-end gap-3">
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setEditando(false);
                  setForm(patient);
                }}
              >
                Cancelar
              </button>

              <button className="btn btn-success" onClick={handleGuardar}>
                Guardar cambios
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Aquí dejas TODAS las tarjetas que ya tienes */}

          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body p-4">
              <h4 className="fw-bold mb-1">👤 Datos personales</h4>

              <p className="text-muted mb-4">
                Información general del paciente.
              </p>

              <div className="row g-3">
                <div className="col-md-6">
                  <strong>Nombre:</strong>
                  <p>{patient.nombre}</p>
                </div>

                <div className="col-md-3">
                  <strong>Matrícula:</strong>
                  <p>{patient.matricula}</p>
                </div>

                <div className="col-md-3">
                  <strong>Cédula:</strong>
                  <p>{patient.cedula}</p>
                </div>

                <div className="col-md-4">
                  <strong>Fecha de nacimiento:</strong>
                  <p>{patient.fecha_nacimiento}</p>
                </div>

                <div className="col-md-4">
                  <strong>Sexo:</strong>
                  <p>{patient.sexo}</p>
                </div>

                <div className="col-md-4">
                  <strong>Tipo de sangre:</strong>
                  <p>{patient.tipo_sangre}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body p-4">
              <h4 className="fw-bold mb-1">📞 Información de contacto</h4>

              <p className="text-muted mb-4">
                Datos para comunicarse con el paciente.
              </p>

              <div className="row g-3">
                <div className="col-md-4">
                  <strong>Teléfono:</strong>
                  <p>{patient.telefono}</p>
                </div>

                <div className="col-md-4">
                  <strong>Correo:</strong>
                  <p>{patient.correo}</p>
                </div>

                <div className="col-md-4">
                  <strong>Carrera:</strong>
                  <p>{patient.carrera}</p>
                </div>

                <div className="col-12">
                  <strong>Dirección:</strong>
                  <p>{patient.direccion}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body p-4">
              <h4 className="fw-bold mb-1">🩺 Información médica</h4>

              <p className="text-muted mb-4">
                Datos clínicos relevantes del paciente.
              </p>

              <div className="row g-3">
                <div className="col-12">
                  <strong>Motivo de consulta:</strong>
                  <p>{patient.motivo_consulta}</p>
                </div>

                <div className="col-md-6">
                  <strong>Alergias:</strong>
                  <p>{patient.alergias || "No registra"}</p>
                </div>

                <div className="col-md-6">
                  <strong>Enfermedades preexistentes:</strong>
                  <p>{patient.enfermedades_preexistentes || "No registra"}</p>
                </div>

                <div className="col-md-6">
                  <strong>Medicamentos actuales:</strong>
                  <p>{patient.medicamentos_actuales || "No registra"}</p>
                </div>

                <div className="col-md-6">
                  <strong>Prioridad:</strong>

                  <div className="mt-2">
                    <span
                      className={
                        patient.prioridad === "Crítica"
                          ? "badge bg-danger"
                          : patient.prioridad === "Alta"
                            ? "badge bg-danger"
                            : patient.prioridad === "Media"
                              ? "badge bg-warning text-dark"
                              : "badge bg-success"
                      }
                    >
                      {patient.prioridad}
                    </span>
                  </div>
                </div>

                <div className="col-12">
                  <strong>Observaciones médicas:</strong>
                  <p>{patient.observaciones_medicas || "Sin observaciones"}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body p-4">
              <h4 className="fw-bold mb-1">🚨 Contacto de emergencia</h4>

              <p className="text-muted mb-4">
                Persona a contactar en caso de emergencia.
              </p>

              <div className="row g-3">
                <div className="col-md-4">
                  <strong>Nombre:</strong>
                  <p>{patient.contacto_nombre || "No registrado"}</p>
                </div>

                <div className="col-md-4">
                  <strong>Parentesco:</strong>
                  <p>{patient.contacto_parentesco || "No registrado"}</p>
                </div>

                <div className="col-md-4">
                  <strong>Teléfono:</strong>
                  <p>{patient.contacto_telefono || "No registrado"}</p>
                </div>

                <div className="col-md-6">
                  <strong>Correo:</strong>
                  <p>{patient.contacto_correo || "No registrado"}</p>
                </div>

                <div className="col-md-6">
                  <strong>Observaciones:</strong>
                  <p>{patient.contacto_observaciones || "Sin observaciones"}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card shadow-sm border-0">
            <div className="card-body d-flex justify-content-end">
              <button
                className="btn btn-warning"
                onClick={() => setEditando(true)}
              >
                Editar
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
