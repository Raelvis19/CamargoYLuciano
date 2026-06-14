import { useEffect, useState } from "react";
import {
  FiSearch,
  FiBell,
  FiSun,
  FiMoon,
  FiUser,
  FiMenu,
} from "react-icons/fi";

import "./Topbar.css";

function Topbar({ user, onMenuClick }) {
  const [darkMode, setDarkMode] = useState(false);
  const [fechaHora, setFechaHora] = useState("");

  useEffect(() => {
    const actualizarHora = () => {
      const ahora = new Date();

      setFechaHora(
        ahora.toLocaleString("es-DO", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };

    actualizarHora();

    const intervalo = setInterval(actualizarHora, 1000 * 60);

    return () => clearInterval(intervalo);
  }, []);

  function toggleDarkMode() {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  }

  return (
    <header className="topbar">
        <button
        className="menu-toggle"
        onClick={onMenuClick}
        >
            <FiMenu />
        </button>

      <div className="search-box">
        <FiSearch />
        <input
          type="text"
          placeholder="Buscar pacientes, recetas, inventario..."
        />
      </div>

      <div className="topbar-right">

        <span className="fecha">
          {fechaHora}
        </span>

        <button
          className="icon-btn"
          onClick={toggleDarkMode}
        >
          {darkMode ? <FiSun /> : <FiMoon />}
        </button>

        <button className="icon-btn">
          <FiBell />
        </button>

        <div className="user-info">
          <div className="avatar">
            <FiUser />
          </div>

          <div>
            <strong>
              {user?.user_metadata?.nombre || "Administrador"}
            </strong>

            <br />

            <small>
              {user?.email || "Sin sesión"}
            </small>
          </div>
        </div>

      </div>
    </header>
  );
}

export default Topbar;