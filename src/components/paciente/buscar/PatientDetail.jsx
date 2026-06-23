export default function PatientDetail({ patient }) {
  return (
    <div className="patient-detail">
      <h3>Información del Paciente</h3>

      <div className="card">
        <p><strong>Nombre:</strong> {patient.nombre}</p>
        <p><strong>Edad:</strong> {patient.edad}</p>
        <p><strong>Cédula:</strong> {patient.cedula}</p>
        <p><strong>Seguro:</strong> {patient.seguro}</p>
        <p><strong>Motivo:</strong> {patient.motivo}</p>
      </div>
    </div>
  );
}