export default function PatientDetail({ patient }) {
  if (!patient) return null;

  return (
    <div>
      {/* Datos personales */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body p-4">
          <h4 className="fw-bold mb-1">👤 Datos personales</h4>

          <p className="text-muted mb-4">Información general del paciente.</p>

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
              <strong>Cedula:</strong>
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



      {/* Informacion de contacto */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body p-4">
          <h4 className="fw-bold mb-1">Informacion de contacto</h4>

          <p className="text-muted mb-4">
            Datos para comunicarse con el paciente.
          </p>

          <div className="row g-3">
            <div className="col-md-4">
              <strong>Telefono:</strong>
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



      {/* Información medica */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body p-4">
          <h4 className="fw-bold mb-1">🩺 Informacion medica</h4>

          <p className="text-muted mb-4">
            Datos clinicos relevantes del paciente.
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
              <strong>Observaciones medicas:</strong>
              <p>{patient.observaciones_medicas || "Sin observaciones"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
