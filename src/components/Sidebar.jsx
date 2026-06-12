import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiUserPlus,
  FiSearch,
  FiFileText,
  FiClipboard,
  FiPackage,
  FiAlertTriangle,
  FiActivity,
  FiLogOut,
} from "react-icons/fi";

import logo from "../assets/Logo.png";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";

function Sidebar() {
  const menuItems = [
    { to: "/home", icon: <FiHome />, text: "Dashboard" },
    { to: "/registrar-paciente", icon: <FiUserPlus />, text: "Registrar paciente" },
    { to: "/buscar-paciente", icon: <FiSearch />, text: "Buscar paciente" },
    { to: "/historial", icon: <FiFileText />, text: "Historial clínico" },
    { to: "/atencion", icon: <FiClipboard />, text: "Atención médica" },
    { to: "/inventario", icon: <FiPackage />, text: "Inventario" },
    { to: "/prioridades", icon: <FiAlertTriangle />, text: "Prioridades" },
    { to: "/recetas", icon: <FiActivity />, text: "Recetas" },
  ];



   const navigate = useNavigate();

    async function cerrarSesion() {
    await supabase.auth.signOut();
    navigate("/");
    }

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <img src={logo} alt="UCNE" className="sidebar-logo" />
        <h4>UCNE</h4>
      </div>

      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            <span className="menu-icon">{item.icon}</span>
            <span>{item.text}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer" >
        <button className="logout-btn" onClick={cerrarSesion}>
          <FiLogOut />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;