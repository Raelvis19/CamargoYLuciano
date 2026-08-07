import { useState, useEffect } from "react";
import { supabase } from "../supabase/supabaseClient";
import DetalleAtencionModal from "../components/historial/DetalleAtencionModal";
import { obtenerDetalleAtencion } from "../services/HistorialService";
import { buscarPacientes } from "../services/BuscarPacientesService";
import { obtenerHistorialPaciente } from "../services/HistorialService";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useNavigate } from "react-router-dom";

export default function ConsultarHistorial() {
  const [user, setUser] = useState(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [detalleAtencion, setDetalleAtencion] = useState(null);
  const [detalleMedicamentos, setDetalleMedicamentos] = useState([]);
  
  // Estados para manejar lo que se muestra en pantalla: 'idle' (inicio), 'found' (éxito), 'not_found' (error)
  const [searchStatus, setSearchStatus] = useState("idle"); 
  const [patientInfo, setPatientInfo] = useState(null);
  const [medicalHistory, setMedicalHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setSearchStatus("idle");
    try {
      const pacientes = await buscarPacientes(query);
      if (!pacientes || pacientes.length === 0) {
        setSearchStatus("not_found");
        setPatientInfo(null);
        setMedicalHistory([]);
        setLoading(false);
        return;
      }
      const paciente = pacientes[0];
      setPatientInfo(paciente);
      const historial = await obtenerHistorialPaciente(paciente.id);
      setMedicalHistory(historial || []);
      setSearchStatus("found");
    } catch (error) {
      console.error(error);
      alert("Error al consultar el historial clínico.");
      setPatientInfo(null);
      setMedicalHistory([]);
      setSearchStatus("idle");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setQuery("");
    setSearchStatus("idle");
    setPatientInfo(null);
    setMedicalHistory([]);
  };


  async function abrirDetalle(atencion) {
    try {
      setDetalleAtencion(atencion);

      const medicamentos = await obtenerDetalleAtencion(atencion.id);

      setDetalleMedicamentos(medicamentos);

      setShowModal(true);
    } catch (error) {
      console.error(error);
      alert("No se pudo cargar el detalle de la atención.");
    }
  }

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "var(--bg-app)",
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Topbar user={user} />

        <main className="container-fluid py-4 px-4">
          {/* Encabezado */}
          <div className="mb-4">
            <h2 className="fw-bold">Consulta de historial clínico</h2>
            <p className="text-muted">
              Busque el expediente de un paciente para ver su información médica
              y visitas anteriores.
            </p>
          </div>

          {/* Tarjeta de Búsqueda */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              <label className="form-label fw-semibold text-secondary mb-2">
                Ingresar matrícula, nombre o cédula
              </label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control py-2"
                  placeholder="Ej. 1000-4325 o Carlos Perez"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <button
                  className="btn btn-primary px-4 fw-semibold"
                  onClick={handleSearch}
                  disabled={loading}
                  style={{
                    backgroundColor: "#A2B2C9",
                    borderColor: "#A2B2C9",
                    color: "#1a1a1a",
                  }} // Colores similares al botón gris/azulado de tu prototipo
                >
                  {loading ? "Buscando..." : "Buscar historial"}
                </button>
              </div>
            </div>
          </div>

          {/* ESTADO 1: ERROR (No encontrado) */}
          {searchStatus === "not_found" && (
            <div
              className="card border-0 shadow-sm mb-4"
              style={{ backgroundColor: "#f8d7da" }}
            >
              <div className="card-body text-center py-5">
                <h5 className="text-danger fw-bold mb-3">
                  Paciente no encontrado
                </h5>
                <p className="text-danger mb-4">
                  El paciente no se encuentra registrado en el sistema.
                  Verifique los datos e intente nuevamente.
                </p>
                <div className="d-flex justify-content-center gap-3">
                  <button
                    className="btn btn-outline-secondary px-4"
                    onClick={handleClear}
                  >
                    Limpiar buscador
                  </button>
                  <button
                    className="btn btn-danger px-4"
                    style={{
                      backgroundColor: "#ff0000",
                      borderColor: "#e57373",
                    }}
                    onClick={() => navigate("/registrar-paciente")}
                  >
                    
                  
                    Registrar nuevo paciente
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ESTADO 2: ÉXITO (Paciente encontrado) */}
          {searchStatus === "found" && patientInfo && (
            <>
              {/* Tarjeta de Resumen del Paciente */}
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-md-4 border-end">
                      <h5 className="fw-bold mb-1">{patientInfo.nombre}</h5>
                      <span className="text-muted">
                        Matrícula: {patientInfo.matricula}
                      </span>
                    </div>
                    <div className="col-md-8 px-4 d-flex justify-content-between">
                      <div>
                        <small className="text-muted d-block">
                          Edad / Sexo
                        </small>
                        <span className="fw-medium">
                          {patientInfo.edad} años, {patientInfo.sexo}
                        </span>
                      </div>
                      <div>
                        <small className="text-muted d-block">
                          Tipo de Sangre
                        </small>
                        <span className="fw-medium">
                          {patientInfo.tipo_sangre || "No registrado"}
                        </span>
                      </div>
                      <div>
                        <small className="text-muted d-block">Alergias</small>
                        {patientInfo.alergias ? (
                          <span className="badge bg-danger rounded-pill px-2 py-1">
                            {patientInfo.alergias}
                          </span>
                        ) : (
                          <span className="text-success fw-medium">
                            No registra
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tarjeta de la Tabla de Historial */}
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white border-bottom-0 pt-4 pb-0 px-4 d-flex justify-content-between align-items-center">
                  <h5 className="fw-bold mb-0">Resultados del historial</h5>

                  {/* Pequeño filtro/selector de fechas simulado */}
                  <select className="form-select form-select-sm w-auto">
                    <option value="all">Todas las fechas</option>
                    <option value="2026">Año 2026</option>
                    <option value="2025">Año 2025</option>
                  </select>
                </div>

                <div className="card-body p-0 mt-3">
                  <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                      <thead className="table-light">
                        <tr>
                          <th className="py-3 px-4 border-bottom-0">
                            Fecha de consulta
                          </th>
                          <th className="py-3 px-4 border-bottom-0">
                            Diagnóstico
                          </th>
                          <th className="py-3 px-4 border-bottom-0">Hora</th>
                          <th className="py-3 px-4 border-bottom-0">Acción</th>
                        </tr>
                      </thead>
                      <tbody>
                        {medicalHistory.length === 0 ? (
                          <tr>
                            <td
                              colSpan={4}
                              className="text-center py-4 text-muted"
                            >
                              Este paciente aún no tiene atenciones registradas.
                            </td>
                          </tr>
                        ) : (
                          medicalHistory.map((registro) => (
                            <tr key={registro.id}>
                              <td className="py-3 px-4 fw-medium text-secondary">
                                {registro.fecha}
                              </td>
                              <td className="py-3 px-4">
                                {registro.diagnostico}
                              </td>
                              <td className="py-3 px-4">
                                <span>{registro.hora}</span>
                              </td>
                              <td className="py-3 px-4">
                                <button
                                  className="btn btn-sm btn-outline-primary rounded-pill px-3"
                                  onClick={() => abrirDetalle(registro)}
                                >
                                  Ver detalles
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
      <DetalleAtencionModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        atencion={detalleAtencion}
        medicamentos={detalleMedicamentos}
      />
    </div>
  );
}
