import { FiAlertCircle } from "react-icons/fi";

function AlertasCard() {
  const alertas = [
    "Paciente en prioridad alta.",
    "Inventario bajo de medicamentos.",
    "Dos citas pendientes de confirmación.",
  ];

  return (
    <div className="card border-0 shadow-sm mt-4">
      <div className="card-header bg-white fw-bold">
        Alertas del sistema
      </div>

      <div className="card-body">
        {alertas.map((alerta, index) => (
          <div
            key={index}
            className="d-flex align-items-center mb-3"
          >
            <FiAlertCircle className="text-danger me-2" />
            <span>{alerta}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AlertasCard;