import { useState } from "react";
import { actualizarMedicamento } from "../services/InventarioService";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/Topbar";
import AgregarMedicamentoModal from "../components/AgregarmedicamentoModal";
import { buscarPacientes } from "../services/BuscarPacientesService";
import { registrarAtencion } from "../services/AtencionService";
import { registrarDetalleAtencion } from "../services/detalle_atencion";


export default function AtencionMedica() {
  const [busqueda, setBusqueda] = useState("");

  // Control del modal
  const [showModal, setShowModal] = useState(false);

  // Lista de medicamentos agregados
  const [medicamentos, setMedicamentos] = useState([]);

  const [paciente, setPaciente] = useState(null);
  const [presionArterial, setPresionArterial] = useState("");
  const [temperatura, setTemperatura] = useState("");
  const [peso, setPeso] = useState("");
  const [estatura, setEstatura] = useState("");
  const [frecuenciaCardiaca, setFrecuenciaCardiaca] = useState("");
  const [motivoConsulta, setMotivoConsulta] = useState("");
  const [diagnostico, setDiagnostico] = useState("");
  const [indicacionesGenerales, setIndicacionesGenerales] = useState("");
  const [observaciones, setObservaciones] = useState("");

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


  const handleBuscarPaciente = async () => {
    if (!busqueda.trim()) {
      alert("Ingrese un nombre, matrícula o cédula.");
      return;
    }

    try {
      const pacientes = await buscarPacientes(busqueda);

      if (pacientes.length === 0) {
        alert("No se encontró ningún paciente.");
        setPaciente(null);
        return;
      }

      // Por ahora seleccionamos el primer resultado
      setPaciente(pacientes[0]);
    } catch (error) {
      console.error(error);
      alert("Error al buscar el paciente.");
    }
  };

const handleGuardarAtencion = async () => {
  if (!paciente) {
    alert("Debe buscar y seleccionar un paciente antes de registrar la atención.");
    return;
  }
  if (medicamentos.length === 0) {
    alert("Debe agregar al menos un medicamento.");
    return;
  }

  const datosAtencion = {
    paciente_id: paciente.id,
    presion_arterial: presionArterial,
    temperatura: parseFloat(temperatura),
    peso: parseFloat(peso),
    estatura: parseFloat(estatura),
    frecuencia_cardiaca: parseInt(frecuenciaCardiaca),
    motivo_consulta: motivoConsulta,
    diagnostico: diagnostico,
    indicaciones_generales: indicacionesGenerales,
    observaciones: observaciones,
  };

  try {
    // Guardar la atención médica antes de actualizar el inventario
    const atencionGuardada = await registrarAtencion(datosAtencion);
    const atencionId = atencionGuardada[0].id;

    for (const med of medicamentos) {
      await registrarDetalleAtencion({
        atencion_id: atencionId,
        medicamento_id: med.medicamentoId,
        cantidad: med.cantidad,
        dosis: med.dosis,
        frecuencia: med.frecuencia,
        duracion: med.duracion,
        indicaciones: med.indicaciones,
      });
      await actualizarMedicamento(med.medicamentoId, {
        cantidad: med.stockDisponible - med.cantidad,
      });
    }

    alert("Atención médica registrada correctamente.");
    setPaciente(null);
    setBusqueda("");
    setPresionArterial("");
    setTemperatura("");
    setPeso("");
    setEstatura("");
    setFrecuenciaCardiaca("");
    setMotivoConsulta("");
    setDiagnostico("");
    setIndicacionesGenerales("");
    setObservaciones("");
    setMedicamentos([]);
    setShowModal(false);
  } catch (error) {
    console.error(error);
    alert("Ocurrió un error al actualizar el inventario.");
  }
};

  const handleCancelar = () => {
    setMedicamentos([]);
    setBusqueda("");
    setPaciente(null);
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
            <h3 className="mb-0">Registrar Atención Médica</h3>
          </div>

          <div className="card-body">
            {/* Buscar paciente */}

            <div className="mb-4">
              <label className="form-label fw-bold">Buscar paciente</label>

              <div className="input-group">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Buscar por nombre, matricula o cédula"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />

                <button
                  className="btn btn-primary"
                  onClick={handleBuscarPaciente}
                >
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
                      <strong>Nombre:</strong> {paciente.nombre}
                    </div>

                    <div className="col-md-2">
                      <strong>Edad:</strong> {paciente.edad}
                    </div>

                    <div className="col-md-3">
                      <strong>Cédula:</strong> {paciente.cedula}
                    </div>

                    <div className="col-md-3">
                      <strong>Seguro:</strong> {paciente.seguro}
                    </div>

                    <div className="col-md-3 mt-2">
                      <strong>Sexo:</strong> {paciente.sexo}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Signos vitales */}

            <h5 className="mb-3">Signos Vitales</h5>

            <div className="row mb-4">
              <div className="col-md-3">
                <label className="form-label">Presión arterial</label>
                <input
                  className="form-control"
                  placeholder="120/80"
                  value={presionArterial}
                  onChange={(e) => setPresionArterial(e.target.value)}
                />
              </div>

              <div className="col-md-2">
                <label className="form-label">Temperatura</label>
                <input
                  className="form-control"
                  placeholder="36.8 °C"
                  value={temperatura}
                  onChange={(e) => setTemperatura(e.target.value)}
                />
              </div>

              <div className="col-md-2">
                <label className="form-label">Peso</label>
                <input
                  className="form-control"
                  placeholder="72 kg"
                  value={peso}
                  onChange={(e) => setPeso(e.target.value)}
                />
              </div>

              <div className="col-md-2">
                <label className="form-label">Estatura</label>
                <input
                  className="form-control"
                  placeholder="1.75 m"
                  value={estatura}
                  onChange={(e) => setEstatura(e.target.value)}
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">Frecuencia cardíaca</label>
                <input
                  className="form-control"
                  placeholder="75 lpm"
                  value={frecuenciaCardiaca}
                  onChange={(e) => setFrecuenciaCardiaca(e.target.value)}
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
                value={motivoConsulta}
                onChange={(e) => setMotivoConsulta(e.target.value)}
              />
            </div>

            {/* Diagnóstico */}

            <div className="mb-3">
              <label className="form-label fw-bold">Diagnóstico</label>
              <textarea
                className="form-control"
                rows="4"
                value={diagnostico}
                onChange={(e) => setDiagnostico(e.target.value)}
              />
            </div>

            {/* Tratamiento */}

            <div className="card shadow-sm mb-4">
              <div className="card-header">
                <h5 className="mb-0">💊 Tratamiento</h5>
              </div>

              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label fw-bold">
                    Indicaciones generales
                  </label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={indicacionesGenerales}
                    onChange={(e) => setIndicacionesGenerales(e.target.value)}
                  />
                </div>

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="mb-0">Medicamentos prescritos</h6>

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
                          <td colSpan={6} className="text-center text-muted">
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
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
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
              <button
                className="btn btn-outline-secondary"
                onClick={handleCancelar}
              >
                Cancelar
              </button>

              <button
                className="btn btn-success"
                onClick={handleGuardarAtencion}
              >
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
