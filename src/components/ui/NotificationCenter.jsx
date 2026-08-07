import { useEffect, useState } from "react";
import { FiAlertCircle, FiCheckCircle, FiInfo, FiX, FiXCircle } from "react-icons/fi";
import { NOTIFY_EVENT, notify } from "../../utils/notify";
import "./NotificationCenter.css";

const icons = {
  success: <FiCheckCircle />,
  error: <FiXCircle />,
  warning: <FiAlertCircle />,
  info: <FiInfo />,
};

export default function NotificationCenter() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const handler = (event) => {
      const item = event.detail;
      setItems((current) => [...current.slice(-3), item]);
      window.setTimeout(() => {
        setItems((current) => current.filter((entry) => entry.id !== item.id));
      }, item.duration);
    };

    window.addEventListener(NOTIFY_EVENT, handler);

    // Compatibilidad temporal: convierte los alert() existentes en avisos no bloqueantes.
    const nativeAlert = window.alert;
    window.alert = (message) => notify.info(message);

    return () => {
      window.removeEventListener(NOTIFY_EVENT, handler);
      window.alert = nativeAlert;
    };
  }, []);

  const remove = (id) => setItems((current) => current.filter((item) => item.id !== id));

  return (
    <div className="toast-stack" aria-live="polite" aria-atomic="true">
      {items.map((item) => (
        <div key={item.id} className={`app-toast app-toast--${item.type}`} role="status">
          <span className="app-toast__icon">{icons[item.type]}</span>
          <p>{item.message}</p>
          <button type="button" onClick={() => remove(item.id)} aria-label="Cerrar aviso">
            <FiX />
          </button>
        </div>
      ))}
    </div>
  );
}
