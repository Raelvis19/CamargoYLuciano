import { useState, useEffect, useRef } from "react";
import { supabase } from "../supabase/supabaseClient";
import { obtenerPrioridades, guardarPrioridad, actualizarPrioridad, eliminarPrioridad } from "../services/PrioridadesService";
import { buscarPacientes } from "../services/BuscarPacientesService";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";


function calcularTiempoEspera(created_at) {
  const mins = Math.floor((Date.now() - new Date(created_at).getTime()) / 60000);
  if (mins < 1) return "< 1 min";
  if (mins < 60) return `${mins} min`;
  return `${Math.floor(mins / 60)} h ${mins % 60} min`;
}

function getBadgeClass(prioridad) {
  switch (prioridad?.toLowerCase()) {
    case "grave":    return "badge bg-danger rounded-pill px-3 py-2";
    case "moderado": return "badge bg-warning text-dark rounded-pill px-3 py-2";
    case "leve":     return "badge bg-success rounded-pill px-3 py-2";
    default:         return "badge bg-light text-dark border rounded-pill px-3 py-2";
  }
}

function Prioridades() {
  const [user, setUser] = useState(null);

  // Tabla
  const [prioridades, setPrioridades]   = useState([]);
  const [loadingTabla, setLoadingTabla] = useState(true);

  // Formulario (top card)
  const [registroId, setRegistroId]             = useState(null);
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
  const [motivoVisita, setMotivoVisita]         = useState("");
  const [prioridadElegida, setPrioridadElegida] = useState("");
  const [guardando, setGuardando]               = useState(false);

  const [mostrarBuscador, setMostrarBuscador]       = useState(false);
  const [queryPaciente, setQueryPaciente]           = useState("");
  const [resultadosPaciente, setResultadosPaciente] = useState([]);
  const buscadorRef = useRef(null);

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

  useEffect(() => {
    cargarPrioridades();
  }, []);

  useEffect(() => {
    function handleClickFuera(e) {
      if (buscadorRef.current && !buscadorRef.current.contains(e.target)) {
        setMostrarBuscador(false);
      }
    }
    document.addEventListener("mousedown", handleClickFuera);
    return () => document.removeEventListener("mousedown", handleClickFuera);
  }, []);

  async function cargarPrioridades() {
    try {
      setLoadingTabla(true);
      setPrioridades(await obtenerPrioridades());
    } catch (err) {
      console.error(err);
      alert("No se pudieron cargar las prioridades.");
    } finally {
      setLoadingTabla(false);
    }
  }

  async function handleBuscarPaciente(e) {
    const val = e.target.value;
    setQueryPaciente(val);
    if (val.trim().length < 2) { setResultadosPaciente([]); return; }
    const data = await buscarPacientes(val.trim());
    setResultadosPaciente(data);
  }

  function seleccionarPaciente(p) {
    setPacienteSeleccionado(p);
    setMostrarBuscador(false);
    setQueryPaciente("");
    setResultadosPaciente([]);
  }

  // Llena el formulario con los datos de la fila seleccionada en la tabla
  function handleReasignar(row) {
    setRegistroId(row.id);
    setPacienteSeleccionado({
      id:        row.paciente_id,
      nombre:    row.paciente_nombre,
      matricula: row.paciente_matricula,
      seguro:    row.paciente_seguro,
    });
    setMotivoVisita(row.motivo_visita || "");
    setPrioridadElegida(row.prioridad || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function limpiarFormulario() {
    setRegistroId(null);
    setPacienteSeleccionado(null);
    setMotivoVisita("");
    setPrioridadElegida("");
    setMostrarBuscador(false);
  }

  async function handleGuardar() {
    if (!pacienteSeleccionado) { alert("Seleccione un paciente."); return; }
    if (!prioridadElegida)     { alert("Seleccione una prioridad."); return; }

    try {
      setGuardando(true);

      if (registroId) {
        await actualizarPrioridad(registroId, {
          motivo_visita: motivoVisita,
          prioridad:     prioridadElegida,
        });
      } else {
        await guardarPrioridad({
          paciente_id:        pacienteSeleccionado.id,
          paciente_nombre:    pacienteSeleccionado.nombre,
          paciente_matricula: pacienteSeleccionado.matricula,
          paciente_seguro:    pacienteSeleccionado.seguro,
          motivo_visita:      motivoVisita,
          prioridad:          prioridadElegida,
        });
      }

      await cargarPrioridades();
      limpiarFormulario();
    } catch (err) {
      console.error(err);
      alert("No se pudo guardar la prioridad.");
    } finally {
      setGuardando(false);
    }
  }

  async function handleEliminar(id) {
    if (!window.confirm("¿Desea eliminar este registro?")) return;
    try {
      await eliminarPrioridad(id);
      await cargarPrioridades();
    } catch (err) {
      console.error(err);
      alert("No se pudo eliminar el registro.");
    }
  }

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f5f7fb",
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
          <div className="mb-4">
            <h2 className="fw-bold">Prioridad de atención</h2>

            <p className="text-muted">
              Asigne y consulte la prioridad de atención de los pacientes en espera.
            </p>
          </div>

          {/* Tarjeta de asignación de prioridad */}
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body p-4">
              <h4 className="fw-bold mb-1">🩺 Asignar prioridad paciente</h4>

              <p className="text-muted mb-4">
                Revise el motivo de la visita y asigne el nivel de prioridad correspondiente.
              </p>

              <div className="row g-3">
                <div className="col-md-8">
                  <label className="form-label fw-semibold">
                    Motivo visita médica
                  </label>

                  <textarea
                    className="form-control"
                    rows="3"
                    value={motivoVisita}
                    onChange={(e) => setMotivoVisita(e.target.value)}
                    placeholder="Describa el motivo de la visita..."
                  />
                </div>

                <div className="col-md-4">
                  <div className="card border-0 bg-light h-100">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="fw-bold m-0">Paciente</h6>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary py-0 px-2"
                          style={{ fontSize: "0.75rem" }}
                          onClick={() => setMostrarBuscador(!mostrarBuscador)}
                        >
                          🔍 Buscar
                        </button>
                      </div>

                      {/* Input de búsqueda (se muestra al hacer click en "Buscar") */}
                      {mostrarBuscador && (
                        <div className="mb-3 position-relative" ref={buscadorRef}>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            placeholder="Nombre o matrícula..."
                            value={queryPaciente}
                            onChange={handleBuscarPaciente}
                            autoFocus
                          />
                          {resultadosPaciente.length > 0 && (
                            <div
                              className="list-group shadow-sm"
                              style={{
                                position: "absolute",
                                zIndex: 10,
                                left: 0,
                                right: 0,
                                maxHeight: "160px",
                                overflowY: "auto",
                              }}
                            >
                              {resultadosPaciente.map((p) => (
                                <button
                                  key={p.id}
                                  type="button"
                                  className="list-group-item list-group-item-action small"
                                  onClick={() => seleccionarPaciente(p)}
                                >
                                  <span className="fw-semibold">{p.nombre}</span>
                                  <span className="text-muted ms-2">— {p.matricula}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      <p className="mb-1">
                        <span className="text-muted">Nombre: </span>
                        <span className="fw-semibold">
                          {pacienteSeleccionado?.nombre || "—"}
                        </span>
                      </p>

                      <p className="mb-1">
                        <span className="text-muted">Matrícula: </span>
                        <span className="fw-semibold">
                          {pacienteSeleccionado?.matricula || "—"}
                        </span>
                      </p>

                      <p className="mb-0">
                        <span className="text-muted">Seguro: </span>
                        <span className="fw-semibold">
                          {pacienteSeleccionado?.seguro || "—"}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="my-4" />

              <h6 className="fw-bold mb-3">Asignar prioridad</h6>

              <div className="d-flex flex-wrap gap-4 mb-4">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="prioridad"
                    id="prioridadLeve"
                    value="Leve"
                    checked={prioridadElegida === "Leve"}
                    onChange={(e) => setPrioridadElegida(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="prioridadLeve">
                    🟢 Leve
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="prioridad"
                    id="prioridadModerado"
                    value="Moderado"
                    checked={prioridadElegida === "Moderado"}
                    onChange={(e) => setPrioridadElegida(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="prioridadModerado">
                    🟡 Moderado
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="prioridad"
                    id="prioridadGrave"
                    value="Grave"
                    checked={prioridadElegida === "Grave"}
                    onChange={(e) => setPrioridadElegida(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="prioridadGrave">
                    🔴 Grave
                  </label>
                </div>
              </div>

              <div className="d-flex flex-wrap justify-content-end gap-3">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={limpiarFormulario}
                  disabled={guardando}
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  className="btn btn-primary px-4"
                  onClick={handleGuardar}
                  disabled={guardando}
                >
                  {guardando ? "Guardando..." : "Guardar prioridad"}
                </button>
              </div>
            </div>
          </div>

          {/* Tabla de prioridades */}
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <h4 className="fw-bold mb-0">📋 Pacientes</h4>
              </div>

              <p className="text-muted mb-4">
                Listado de pacientes en espera y su prioridad de atención.
              </p>

              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th className="py-3 px-4 border-bottom-0">Nombre paciente</th>
                      <th className="py-3 px-4 border-bottom-0">Matrícula</th>
                      <th className="py-3 px-4 border-bottom-0">Tiempo de espera</th>
                      <th className="py-3 px-4 border-bottom-0">Prioridad asignada</th>
                      <th className="py-3 px-4 border-bottom-0">Acciones</th>
                    </tr>
                  </thead>

                  <tbody>
                    {loadingTabla ? (
                      <tr>
                        <td colSpan={5} className="text-center text-muted py-4">
                          Cargando...
                        </td>
                      </tr>
                    ) : prioridades.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center text-muted py-4">
                          No hay pacientes con prioridad asignada.
                        </td>
                      </tr>
                    ) : (
                      prioridades.map((row) => (
                        <tr key={row.id}>
                          <td className="py-3 px-4 fw-medium">{row.paciente_nombre}</td>
                          <td className="py-3 px-4">{row.paciente_matricula}</td>
                          <td className="py-3 px-4">{calcularTiempoEspera(row.created_at)}</td>
                          <td className="py-3 px-4">
                            <span className={getBadgeClass(row.prioridad)}>
                              {row.prioridad || "Por asignar"}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => handleReasignar(row)}
                              >
                                Reasignar
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleEliminar(row.id)}
                              >
                                Eliminar
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Prioridades;