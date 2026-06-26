import { useState, useEffect } from "react"; 
import { supabase } from "../supabase/supabaseClient"; 
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function Prioridades() {
  const [user, setUser] = useState(null); 

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

          {/* Tarjeta de asignación de prioridad (solo visual) */}
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
                    readOnly
                    value="Paciente llego con fiebre, dolor de cabeza y neumonia"
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
                        >
                          🔍 Buscar
                        </button>
                      </div>

                      <p className="mb-1">
                        <span className="text-muted">Nombre: </span>
                        <span className="fw-semibold">Mario Julio</span>
                      </p>

                      <p className="mb-1">
                        <span className="text-muted">Matrícula: </span>
                        <span className="fw-semibold">10003229</span>
                      </p>

                      <p className="mb-0">
                        <span className="text-muted">Seguro: </span>
                        <span className="fw-semibold">Senasa</span>
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
                    name="prioridadDemo"
                    id="prioridadLeve"
                    disabled
                  />
                  <label className="form-check-label" htmlFor="prioridadLeve">
                    🟢 Leve
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="prioridadDemo"
                    id="prioridadModerado"
                    disabled
                  />
                  <label className="form-check-label" htmlFor="prioridadModerado">
                    🟡 Moderado
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="prioridadDemo"
                    id="prioridadGrave"
                    disabled
                  />
                  <label className="form-check-label" htmlFor="prioridadGrave">
                    🔴 Grave
                  </label>
                </div>
              </div>

              <div className="d-flex flex-wrap justify-content-end gap-3">
                <button type="button" className="btn btn-outline-secondary" disabled>
                  Cancelar
                </button>

                <button type="button" className="btn btn-primary px-4" disabled>
                  Guardar prioridad
                </button>
              </div>
            </div>
          </div>

          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h4 className="fw-bold mb-1">📋 Prioridad paciente</h4>

              <p className="text-muted mb-4">
                Listado de pacientes en espera y su prioridad de atención.
              </p>

              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th className="py-3 px-4 border-bottom-0">
                        Nombre paciente
                      </th>
                      <th className="py-3 px-4 border-bottom-0">Matrícula</th>
                      <th className="py-3 px-4 border-bottom-0">
                        Tiempo de espera
                      </th>
                      <th className="py-3 px-4 border-bottom-0">
                        Prioridad asignada
                      </th>
                      <th className="py-3 px-4 border-bottom-0">Acciones</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td className="py-3 px-4 fw-medium">Carlos Perez</td>
                      <td className="py-3 px-4">10004325</td>
                      <td className="py-3 px-4">15 min</td>
                      <td className="py-3 px-4">
                        <span className="badge bg-danger rounded-pill px-3 py-2">
                          Grave
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button className="btn btn-sm btn-outline-primary" disabled>
                          Reasignar
                        </button>
                      </td>
                    </tr>

                    <tr>
                      <td className="py-3 px-4 fw-medium">Emely Sanchez</td>
                      <td className="py-3 px-4">10004982</td>
                      <td className="py-3 px-4">25 min</td>
                      <td className="py-3 px-4">
                        <span className="badge bg-warning text-dark rounded-pill px-3 py-2">
                          Moderado
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button className="btn btn-sm btn-outline-primary" disabled>
                          Reasignar
                        </button>
                      </td>
                    </tr>

                    <tr>
                      <td className="py-3 px-4 fw-medium">Luis Martinez</td>
                      <td className="py-3 px-4">10003928</td>
                      <td className="py-3 px-4">14 min</td>
                      <td className="py-3 px-4">
                        <span className="badge bg-success rounded-pill px-3 py-2">
                          Leve
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button className="btn btn-sm btn-outline-primary" disabled>
                          Reasignar
                        </button>
                      </td>
                    </tr>

                    <tr>
                      <td className="py-3 px-4 fw-medium">Mario Julio</td>
                      <td className="py-3 px-4">10003229</td>
                      <td className="py-3 px-4">2 min</td>
                      <td className="py-3 px-4">
                        <span className="badge bg-light text-dark border rounded-pill px-3 py-2">
                          Por asignar
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button className="btn btn-sm btn-outline-primary" disabled>
                          Asignar
                        </button>
                      </td>
                    </tr>
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
