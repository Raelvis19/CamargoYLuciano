import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import Inventario from "./pages/Inventario";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import RecuperarPassword from "./pages/RecuperarPassword";
import RestablecerPassword from "./pages/RestablecerPassword";
import Home from "./pages/home";
import RegistrarPaciente from "./pages/ReegistrarPaciente";
import BuscarPaciente from "./pages/BuscarPaciente";
import ConsultarHistorial from "./pages/ConsultarHistorial";
import AtencionMedica from "./pages/AtencionMedica";
import Prioridades from "./pages/Prioridades";
import Recetas from "./pages/Recetas";

function App() {
  const Router = window.location.protocol === "file:" ? HashRouter : BrowserRouter;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/recuperar-password" element={<RecuperarPassword />} />
        <Route path="/restablecer-password" element={<RestablecerPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/registrar-paciente" element={<RegistrarPaciente />} />
        <Route path="/buscar-paciente" element={<BuscarPaciente />} />
        <Route path="/historial" element={<ConsultarHistorial />} />
        <Route path="/atencion" element={<AtencionMedica />} />
        <Route path="/prioridades" element={<Prioridades />} />
        <Route path="/recetas" element={<Recetas />} />
        <Route path="/inventario" element={<Inventario />} />
      </Routes>
    </Router>
  );
}

export default App;
