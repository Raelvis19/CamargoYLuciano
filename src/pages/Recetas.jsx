import { useState, useEffect, useRef } from "react";
import { supabase } from "../supabase/supabaseClient";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const PACIENTES_MOCK = [
  { id: 1, nombre: "Carlos Perez", matricula: "10004325", seguro: "Senasa" },
  { id: 2, nombre: "Emely Sanchez", matricula: "10004982", seguro: "Senasa" },
  { id: 3, nombre: "Luis Martinez", matricula: "10003928", seguro: "Humano" },
  { id: 4, nombre: "Mario Julio", matricula: "10003229", seguro: "Senasa" },
];

const MEDICAMENTOS_MOCK = [
  { codigo: "0100932", nombre: "Acetaminofen" },
  { codigo: "0100110", nombre: "Atgrio" },
  { codigo: "0100451", nombre: "Ibuprofeno" },
  { codigo: "0100774", nombre: "Amoxicilina" },
];

function Recetas() {
  const [user, setUser] = useState(null);

  const [busquedaPaciente, setBusquedaPaciente] = useState("");
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(
    PACIENTES_MOCK[0]
  );
  const buscadorRef = useRef(null);

  const [medicamentoBuscado, setMedicamentoBuscado] = useState("");
  const [dosis, setDosis] = useState("");
  const [recomendaciones, setRecomendaciones] = useState("");

  const [medicamentosReceta, setMedicamentosReceta] = useState([
    { codigo: "0100932", nombre: "Acetaminofen", dosis: "30 mg" },
    { codigo: "0100110", nombre: "Atgrio", dosis: "15 mg" },
  ]);

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

  const resultadosPacientes = PACIENTES_MOCK.filter(
    (p) =>
      p.nombre.toLowerCase().includes(busquedaPaciente.toLowerCase()) ||
      p.matricula.includes(busquedaPaciente)
  );

  function seleccionarPaciente(paciente) {
    setPacienteSeleccionado(paciente);
    setBusquedaPaciente("");
    setMostrarResultados(false);
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
  }

  function imprimirReceta() {
    if (medicamentosReceta.length === 0) {
      alert("Agregue al menos un medicamento a la receta.");
      return;
    }

    window.print();
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
                  <label className="form-label fw-semibold">
                    Medicamento
                  </label>

                  <div className="input-group">
                    <span className="input-group-text bg-white">
                      <i className="bi bi-search" />
                      🔍
                    </span>

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
                  <label className="form-label fw-semibold">
                    Recomendaciones
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ej. horario o medicamento, observaciones..."
                    value={recomendaciones}
                    onChange={(e) => setRecomendaciones(e.target.value)}
                  />
                </div>

                {/* Tarjeta de paciente con búsqueda dinámica */}
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
                          onChange={(e) => {
                            setBusquedaPaciente(e.target.value);
                            setMostrarResultados(true);
                          }}
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
                          {pacienteSeleccionado.nombre}
                        </span>
                      </p>

                      <p className="mb-1 small">
                        <span className="text-muted">Matrícula: </span>
                        <span className="fw-semibold">
                          {pacienteSeleccionado.matricula}
                        </span>
                      </p>

                      <p className="mb-0 small">
                        <span className="text-muted">Seguro: </span>
                        <span className="fw-semibold">
                          {pacienteSeleccionado.seguro}
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
                      <th className="py-3 px-4 border-bottom-0">
                        Nombre medicamento
                      </th>
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
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  className="btn btn-primary px-4"
                  onClick={imprimirReceta}
                >
                  Imprimir receta
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Recetas;
