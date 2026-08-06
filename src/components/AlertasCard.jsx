import { FiAlertCircle, FiCheckCircle } from "react-icons/fi";


function AlertasCard({ alertas, loading }) {
  
  return (
    <div className="card border-0 shadow-sm mt-4 h-100">
      <div className="card-header bg-white fw-bold py-3">
        Alertas del sistema
      </div>

      <div className="card-body">
        {loading ? (
          <p className="text-muted text-center my-3">Revisando inventario...</p>
        ) : alertas && alertas.length > 0 ? (
          <div>
            <h6 className="text-danger fw-bold mb-3 small">¡Inventario Bajo!</h6>
            {alertas.map((med, index) => (
              <div
                key={index}
                className="d-flex align-items-center mb-3 bg-light p-2 rounded"
              >
                <FiAlertCircle className="text-danger me-2" size={20} />
                <div className="d-flex flex-column">
                  <span className="fw-medium text-dark" style={{ fontSize: "0.9rem" }}>
                    {med.nombre}
                  </span>
                  <span className="text-muted" style={{ fontSize: "0.8rem" }}>
                    Solo quedan {med.cantidad} unidades.
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center my-4 text-muted">
             <FiCheckCircle className="text-success mb-2" size={32} />
             <p className="mb-0">Todo está en orden.</p>
             <small>El inventario tiene stock suficiente.</small>
          </div>
        )}
      </div>
    </div>
  );
}

export default AlertasCard;