
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/Topbar";
import AgregarMedicamentoModal from "../components/AgregarmedicamentoModal";


export default function AtencionMedica() {
  const [busqueda, setBusqueda] = useState("");

  // Control del modal
  const [showModal, setShowModal] = useState(false);

  // Lista de medicamentos agregados
  const [medicamentos, setMedicamentos] = useState([]);

  // Datos simulados del paciente (luego vendrán de Supabase)
  const [paciente] = useState({
    nombre: "Juan Pérez",
    edad: 30,
    cedula: "001-1234567-8",
    seguro: "SENASA",
    sexo: "Masculino",
  });

  const abrirModal = () => setShowModal(true);

  const cerrarModal = () => setShowModal(false);

  const agregarMedicamento = (nuevoMedicamento) => {
    setMedicamentos((prev) => [...prev, nuevoMedicamento]);
  };

  const eliminarMedicamento = (index) => {
    setMedicamentos((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const fechaActual = new Date().toLocaleDateString();

  const horaActual = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

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
        <TopBar />

        <div className="container py-4">

          <div className="card shadow-sm">

            <div className="card-header">
              <h3 className="mb-0">
                Registrar Atención Médica
              </h3>
            </div>

            <div className="card-body">

              {/* Buscar paciente */}

              <div className="mb-4">
                <label className="form-label fw-bold">
                  Buscar paciente
                </label>

                <div className="input-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Buscar por nombre o cédula"
                    value={busqueda}
                    onChange={(e) =>
                      setBusqueda(e.target.value)
                    }
                  />

                  <button className="btn btn-primary">
                    Buscar
                  </button>
                </div>
              </div>

              {/* Datos paciente */}

              {paciente && (
                <div className="card border-primary mb-4">

                  <div className="card-header bg-primary text-white">
                    Paciente seleccionado
                  </div>

                  <div className="card-body">

                    <div className="row">

                      <div className="col-md-4">
                        <strong>Nombre:</strong>{" "}
                        {paciente.nombre}
                      </div>

                      <div className="col-md-2">
                        <strong>Edad:</strong>{" "}
                        {paciente.edad}
                      </div>

                      <div className="col-md-3">
                        <strong>Cédula:</strong>{" "}
                        {paciente.cedula}
                      </div>

                      <div className="col-md-3">
                        <strong>Seguro:</strong>{" "}
                        {paciente.seguro}
                      </div>

                      <div className="col-md-3 mt-2">
                        <strong>Sexo:</strong>{" "}
                        {paciente.sexo}
                      </div>

                    </div>

                  </div>

                </div>
              )}

              {/* Signos vitales */}

              <h5 className="mb-3">
                Signos Vitales
              </h5>

              <div className="row mb-4">

                <div className="col-md-3">
                  <label className="form-label">
                    Presión arterial
                  </label>

                  <input
                    className="form-control"
                    placeholder="120/80"
                  />
                </div>

                <div className="col-md-2">
                  <label className="form-label">
                    Temperatura
                  </label>

                  <input
                    className="form-control"
                    placeholder="36.8 °C"
                  />
                </div>

                <div className="col-md-2">
                  <label className="form-label">
                    Peso
                  </label>

                  <input
                    className="form-control"
                    placeholder="72 kg"
                  />
                </div>

                <div className="col-md-2">
                  <label className="form-label">
                    Estatura
                  </label>

                  <input
                    className="form-control"
                    placeholder="1.75 m"
                  />
                </div>

                <div className="col-md-3">
                  <label className="form-label">
                    Frecuencia cardíaca
                  </label>

                  <input
                    className="form-control"
                    placeholder="75 lpm"
                  />
                </div>

              </div>

              {/* Síntomas */}

              <div className="mb-3">

                <label className="form-label fw-bold">
                  Motivo de consulta / Síntomas
                </label>

                <textarea
                  className="form-control"
                  rows="4"
                />

              </div>

              {/* Diagnóstico */}

              <div className="mb-3">

                <label className="form-label fw-bold">
                  Diagnóstico
                </label>

                <textarea
                  className="form-control"
                  rows="4"
                />

              </div>

              {/* Tratamiento */}

              <div className="card shadow-sm mb-4">

                <div className="card-header">
                  <h5 className="mb-0">
                    💊 Tratamiento
                  </h5>
                </div>

                <div className="card-body">

                  <div className="mb-3">

                    <label className="form-label fw-bold">
                      Indicaciones generales
                    </label>

                    <textarea
                      className="form-control"
                      rows="3"
                    />

                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-3">

                    <h6 className="mb-0">
                      Medicamentos prescritos
                    </h6>

                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={abrirModal}
                    >
                      + Agregar medicamento
                    </button>

                  </div>

                  <div className="table-responsive">

                    <table className="table table-bordered table-hover align-middle">

                      <thead className="table-light">
                        <tr>
                          <th>Medicamento</th>
                          <th>Dosis</th>
                          <th>Frecuencia</th>
                          <th>Duración</th>
                          <th>Cantidad</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>

                      <tbody>

                        {medicamentos.length === 0 ? (

                          <tr>
                            <td
                              colSpan={6}
                              className="text-center text-muted"
                            >
                              No hay medicamentos agregados.
                            </td>
                          </tr>

                        ) : (

                          medicamentos.map((med, index) => (

                            <tr key={index}>

                              <td>{med.medicamento}</td>
                              <td>{med.dosis}</td>
                              <td>{med.frecuencia}</td>
                              <td>{med.duracion}</td>
                              <td>{med.cantidad}</td>

                              <td>

                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() =>
                                    eliminarMedicamento(index)
                                  }
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

                </div>

              </div>

              {/* Observaciones */}

              <div className="mb-4">

                <label className="form-label fw-bold">
                  Observaciones adicionales
                </label>

                <textarea
                  className="form-control"
                  rows="3"
                />

              </div>

              {/* Fecha */}

              <div className="alert alert-light border">

                <strong>Fecha:</strong> {fechaActual}

                <br />

                <strong>Hora:</strong> {horaActual}

              </div>

              {/* Botones */}

              <div className="d-flex justify-content-end gap-2">

                <button className="btn btn-outline-secondary">
                  Cancelar
                </button>

                <button className="btn btn-success">
                  Guardar Atención
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

      <AgregarMedicamentoModal
        show={showModal}
        handleClose={cerrarModal}
        onAgregar={agregarMedicamento}
      />
    </div>
  );
}

