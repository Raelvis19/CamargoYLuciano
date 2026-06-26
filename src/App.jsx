import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Home from "./pages/home";
import RegistrarPaciente from "./pages/ReegistrarPaciente";
import BuscarPaciente from "./pages/BuscarPaciente";
import ConsultarHistorial from "./pages/ConsultarHistorial";
import AtencionMedica from "./pages/AtencionMedica";
import Prioridades from "./pages/Prioridades";  
import Recetas from "./pages/Recetas";          

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/registrar-paciente"
          element={<RegistrarPaciente />}
        />
        <Route
          path="/buscar-paciente"
          element={<BuscarPaciente />}
        />
        <Route
          path="/historial"
          element={<ConsultarHistorial />}
        />
        <Route
          path="/atencion"
          element={<AtencionMedica />}
        />
        
        <Route
          path="/prioridades"
          element={<Prioridades />}
        />
        <Route
          path="/recetas"
          element={<Recetas />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;