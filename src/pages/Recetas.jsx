import { useState, useEffect, useRef } from "react";
import { supabase } from "../supabase/supabaseClient";
import { buscarPacientes } from "../services/BuscarPacientesService";
import { guardarReceta } from "../services/RecetasService";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const MEDICAMENTOS_MOCK = [
  { codigo: "0100932", nombre: "Acetaminofen" },
  { codigo: "0100110", nombre: "Atgrio" },
  { codigo: "0100451", nombre: "Ibuprofeno" },
  { codigo: "0100774", nombre: "Amoxicilina" },
];

function Recetas() {
  const [user, setUser] = useState(null);

  const [busquedaPaciente, setBusquedaPaciente]     = useState("");
  const [mostrarResultados, setMostrarResultados]   = useState(false);
  const [resultadosPacientes, setResultadosPacientes] = useState([]); 
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
  const buscadorRef = useRef(null);

  const [medicamentoBuscado, setMedicamentoBuscado] = useState("");
  const [dosis, setDosis]                           = useState("");
  const [recomendaciones, setRecomendaciones]       = useState("");
  const [guardando, setGuardando]                   = useState(false);

  const [medicamentosReceta, setMedicamentosReceta] = useState([]);

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
    function handleClickFuera(e) {
      if (buscadorRef.current && !buscadorRef.current.contains(e.target)) {
        setMostrarResultados(false);
      }
    }

    document.addEventListener("mousedown", handleClickFuera);
    return () => document.removeEventListener("mousedown", handleClickFuera);
  }, []);

  async function handleBusquedaPaciente(e) {
    const val = e.target.value;
    setBusquedaPaciente(val);
    setMostrarResultados(true);

    if (val.trim().length < 2) {
      setResultadosPacientes([]);
      return;
    }

    const data = await buscarPacientes(val.trim());
    setResultadosPacientes(data);
  }

  function seleccionarPaciente(paciente) {
    setPacienteSeleccionado(paciente);
    setBusquedaPaciente("");
    setMostrarResultados(false);
    setResultadosPacientes([]);
  }

  function agregarMedicamento() {
    if (!medicamentoBuscado || !dosis) {
      alert("Indique el medicamento y la dosis.");
      return;
    }

    const coincidencia = MEDICAMENTOS_MOCK.find((m) =>
      m.nombre.toLowerCase().includes(medicamentoBuscado.toLowerCase())
    );

    setMedicamentosReceta((prev) => [
      ...prev,
      {
        codigo: coincidencia ? coincidencia.codigo : "0000000",
        nombre: coincidencia ? coincidencia.nombre : medicamentoBuscado,
        dosis,
      },
    ]);

    setMedicamentoBuscado("");
    setDosis("");
  }

  function eliminarMedicamento(index) {
    setMedicamentosReceta((prev) => prev.filter((_, i) => i !== index));
  }

  function cancelarReceta() {
    setMedicamentosReceta([]);
    setMedicamentoBuscado("");
    setDosis("");
    setRecomendaciones("");
    setPacienteSeleccionado(null);
  }

  // Guarda en Supabase y luego imprime
  async function imprimirReceta() {
    if (!pacienteSeleccionado) {
      alert("Seleccione un paciente.");
      return;
    }

    if (medicamentosReceta.length === 0) {
      alert("Agregue al menos un medicamento a la receta.");
      return;
    }

    try {
      setGuardando(true);

      await guardarReceta({
        paciente_id:        pacienteSeleccionado.id,
        paciente_nombre:    pacienteSeleccionado.nombre,
        paciente_matricula: pacienteSeleccionado.matricula,
        paciente_seguro:    pacienteSeleccionado.seguro,
        medicamentos:       medicamentosReceta,
        recomendaciones,
      });

      window.print();
    } catch (err) {
      console.error(err);
      alert("No se pudo guardar la receta.");
    } finally {
      setGuardando(false);
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
      <div className="d-print-none">
        <Sidebar />
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Añadimos d-print-none para ocultar la barra superior */}
        <div className="d-print-none">
          <Topbar user={user} />
        </div>

        {/* Añadimos d-print-none a todo el formulario interactivo original */}
        <main className="container-fluid py-4 px-4 d-print-none">
          <div className="mb-4">
            <h2 className="fw-bold">Generar receta médica</h2>
            <p className="text-muted">
              Busque al paciente, agregue los medicamentos y genere la receta.
            </p>
          </div>

          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body p-4">
              <div className="row g-3">
                {/* Medicamento */}
                <div className="col-md-4">
                  <label className="form-label fw-semibold">Medicamento</label>
                  <div className="input-group">
                    <span className="input-group-text bg-white">🔍</span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Buscar..."
                      value={medicamentoBuscado}
                      onChange={(e) => setMedicamentoBuscado(e.target.value)}
                    />
                  </div>
                </div>

                {/* Dosis */}
                <div className="col-md-2">
                  <label className="form-label fw-semibold">Dosis</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="0"
                    value={dosis}
                    onChange={(e) => setDosis(e.target.value)}
                  />
                </div>

                {/* Recomendaciones */}
                <div className="col-md-4">
                  <label className="form-label fw-semibold">Recomendaciones</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ej. horario o medicamento, observaciones..."
                    value={recomendaciones}
                    onChange={(e) => setRecomendaciones(e.target.value)}
                  />
                </div>

                {/* Tarjeta de paciente */}
                <div className="col-md-2">
                  <div
                    className="card border-0 bg-light h-100"
                    ref={buscadorRef}
                    style={{ position: "relative" }}
                  >
                    <div className="card-body p-3">
                      <h6 className="fw-bold mb-2">Paciente</h6>
                      <div className="input-group input-group-sm mb-2">
                        <span className="input-group-text bg-white">🔍</span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Buscar paciente..."
                          value={busquedaPaciente}
                          onChange={handleBusquedaPaciente}
                          onFocus={() => setMostrarResultados(true)}
                        />
                      </div>

                      {mostrarResultados && busquedaPaciente && (
                        <div
                          className="list-group shadow-sm"
                          style={{
                            position: "absolute",
                            zIndex: 10,
                            left: "1rem",
                            right: "1rem",
                            maxHeight: "180px",
                            overflowY: "auto",
                          }}
                        >
                          {resultadosPacientes.length === 0 ? (
                            <span className="list-group-item small text-muted">
                              Sin resultados
                            </span>
                          ) : (
                            resultadosPacientes.map((p) => (
                              <button
                                type="button"
                                key={p.id}
                                className="list-group-item list-group-item-action small"
                                onClick={() => seleccionarPaciente(p)}
                              >
                                {p.nombre}
                              </button>
                            ))
                          )}
                        </div>
                      )}

                      <p className="mb-1 small">
                        <span className="text-muted">Nombre: </span>
                        <span className="fw-semibold">
                          {pacienteSeleccionado?.nombre || "—"}
                        </span>
                      </p>
                      <p className="mb-1 small">
                        <span className="text-muted">Matrícula: </span>
                        <span className="fw-semibold">
                          {pacienteSeleccionado?.matricula || "—"}
                        </span>
                      </p>
                      <p className="mb-0 small">
                        <span className="text-muted">Seguro: </span>
                        <span className="fw-semibold">
                          {pacienteSeleccionado?.seguro || "—"}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3">
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={agregarMedicamento}
                >
                  + Agregar medicamento a la receta
                </button>
              </div>
            </div>
          </div>

          {/* Medicamentos en receta */}
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h4 className="fw-bold mb-3">Medicamentos en receta</h4>
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th className="py-3 px-4 border-bottom-0">Código</th>
                      <th className="py-3 px-4 border-bottom-0">Nombre medicamento</th>
                      <th className="py-3 px-4 border-bottom-0">Dosis</th>
                      <th className="py-3 px-4 border-bottom-0">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {medicamentosReceta.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="text-center text-muted py-4">
                          No hay medicamentos agregados a la receta.
                        </td>
                      </tr>
                    ) : (
                      medicamentosReceta.map((m, index) => (
                        <tr key={`${m.codigo}-${index}`}>
                          <td className="py-3 px-4">{m.codigo}</td>
                          <td className="py-3 px-4 fw-medium">{m.nombre}</td>
                          <td className="py-3 px-4">{m.dosis}</td>
                          <td className="py-3 px-4">
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => eliminarMedicamento(index)}
                            >
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="d-flex flex-wrap justify-content-end gap-3 mt-4">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={cancelarReceta}
                  disabled={guardando}
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  className="btn btn-primary px-4"
                  onClick={imprimirReceta}
                  disabled={guardando}
                >
                  {guardando ? "Guardando..." : "Imprimir receta"}
                </button>
              </div>
            </div>
          </div>
        </main>

        {/*CONTENEDOR PARA IMPRESIÓN*/}
        {/* d-none lo oculta en la pantalla normal, d-print-block lo activa en la impresión */}
        <div className="d-none d-print-block p-5 m-2 bg-white text-dark" style={{ width: "100%" }}>
          <div className="text-center mb-4">
            <h2 className="fw-bold m-0" style={{ letterSpacing: "1px" }}>UCNE</h2>
            <p className="text-uppercase small fw-semibold text-secondary m-0">Recetario Médico Oficial</p>
            <div className="border-bottom border-2 my-3"></div>
          </div>

          <div className="row mb-4 bg-light p-3 rounded" style={{ border: "1px solid #dee2e6" }}>
            <div className="col-6 mb-2">
              <span className="text-muted small d-block">PACIENTE</span>
              <strong className="fs-5">{pacienteSeleccionado?.nombre || "—"}</strong>
            </div>
            <div className="col-6 mb-2 text-end">
              <span className="text-muted small d-block">FECHA EMISIÓN</span>
              <strong>{new Date().toLocaleDateString()}</strong>
            </div>
            <div className="col-6">
              <span className="text-muted small d-block">MATRÍCULA / ID</span>
              <strong>{pacienteSeleccionado?.matricula || "—"}</strong>
            </div>
            <div className="col-6 text-end">
              <span className="text-muted small d-block">ARS / SEGURO</span>
              <strong>{pacienteSeleccionado?.seguro || "Particular"}</strong>
            </div>
          </div>

          <div className="mb-3">
            <h5 className="fw-bold text-primary border-bottom pb-2">Rx Indicaciones</h5>
          </div>

          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th style={{ width: "20%" }}>Código</th>
                <th style={{ width: "50%" }}>Descripción del Medicamento</th>
                <th style={{ width: "30%" }}>Dosis / Posología</th>
              </tr>
            </thead>
            <tbody>
              {medicamentosReceta.map((m, index) => (
                <tr key={index}>
                  <td><code>{m.codigo}</code></td>
                  <td className="fw-bold">{m.nombre}</td>
                  <td>{m.dosis}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {recomendaciones && (
            <div className="mt-4 p-3 bg-light rounded" style={{ borderLeft: "4px solid #0d6efd" }}>
              <span className="fw-bold d-block text-secondary small">RECOMENDACIONES ADICIONALES:</span>
              <p className="mb-0 mt-1 italic" style={{ fontSize: "11pt" }}>{recomendaciones}</p>
            </div>
          )}
          <div className="text-center" style={{ marginTop: "120px" }}>
            <div style={{ borderTop: "1px solid #000", width: "280px", margin: "0 auto" }}></div>
            <p className="mt-2 small fw-semibold text-uppercase text-muted">Firma y Sello Médico autorizado</p>
          </div>
        </div>
        {/* ======================================================================= */}

      </div>
    </div>
  );
}

export default Recetas;