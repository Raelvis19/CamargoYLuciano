import { createContext, useContext, useState } from "react";
import { FiAlertTriangle, FiX } from "react-icons/fi";
import "./ConfirmDialog.css";

const ConfirmContext = createContext(null);

export function ConfirmProvider({ children }) {
  const [dialog, setDialog] = useState(null);

  const confirm = ({
    title = "Confirmar acción",
    message = "¿Estás seguro de que deseas continuar?",
    confirmText = "Confirmar",
    cancelText = "Cancelar",
    variant = "danger",
  } = {}) => {
    return new Promise((resolve) => {
      setDialog({
        title,
        message,
        confirmText,
        cancelText,
        variant,
        resolve,
      });
    });
  };

  const handleConfirm = () => {
    dialog?.resolve(true);
    setDialog(null);
  };

  const handleCancel = () => {
    dialog?.resolve(false);
    setDialog(null);
  };

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}

      {dialog && (
        <div className="confirm-overlay" onMouseDown={handleCancel}>
          <div
            className="confirm-dialog"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="confirm-title"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="confirm-close"
              onClick={handleCancel}
              aria-label="Cerrar"
            >
              <FiX />
            </button>

            <div className={`confirm-icon confirm-icon--${dialog.variant}`}>
              <FiAlertTriangle />
            </div>

            <h3 id="confirm-title">{dialog.title}</h3>

            <p>{dialog.message}</p>

            <div className="confirm-actions">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={handleCancel}
              >
                {dialog.cancelText}
              </button>

              <button
                type="button"
                className={`btn ${
                  dialog.variant === "danger"
                    ? "btn-danger"
                    : "btn-primary"
                }`}
                onClick={handleConfirm}
              >
                {dialog.confirmText}
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  const context = useContext(ConfirmContext);

  if (!context) {
    throw new Error(
      "useConfirm debe utilizarse dentro de ConfirmProvider"
    );
  }

  return context;
}