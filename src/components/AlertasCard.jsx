import { FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import "./AlertasCard.css";

function AlertasCard({ alertas, loading }) {
  return (
    <section className="alerts-card">
      <div className="alerts-card__header">
        <span className="alerts-card__eyebrow">
          Estado del sistema
        </span>

        <h3 className="alerts-card__title">
          Alertas del sistema
        </h3>

        <p className="alerts-card__subtitle">
          Revisión automática del inventario.
        </p>
      </div>

      <div className="alerts-card__body">
        {loading ? (
          <div className="alerts-card__empty">
            Revisando inventario...
          </div>
        ) : alertas?.length > 0 ? (
          <div>
            <div className="alerts-card__warning-title">
              <FiAlertCircle />
              Inventario bajo
            </div>

            <div className="alerts-list">
              {alertas.map((med) => (
                <div
                  key={med.id ?? med.codigo ?? med.nombre}
                  className="alerts-item"
                >
                  <div className="alerts-item__icon">
                    <FiAlertCircle />
                  </div>

                  <div className="alerts-item__content">
                    <span className="alerts-item__name">
                      {med.nombre}
                    </span>

                    <span className="alerts-item__description">
                      Solo quedan {med.cantidad} unidades disponibles.
                    </span>
                  </div>

                  <span className="alerts-item__stock">
                    {med.cantidad}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="alerts-card__success">
            <div className="alerts-card__success-icon">
              <FiCheckCircle />
            </div>

            <h4>Todo está en orden</h4>

            <p>
              El inventario tiene stock suficiente.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default AlertasCard;