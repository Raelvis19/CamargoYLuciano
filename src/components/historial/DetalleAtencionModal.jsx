import { Modal, Button, Table } from "react-bootstrap";

export default function DetalleAtencionModal({
  show,
  handleClose,
  atencion,
  medicamentos,
}) {
  if (!atencion) return null;

  return (
    <Modal show={show} onHide={handleClose} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title>Detalle de la Atención Médica</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Signos vitales */}

        <div className="card shadow-sm mb-4">
          <div className="card-header">
            <h5 className="mb-0">🩺 Signos Vitales</h5>
          </div>

          <div className="card-body">
            <div className="row">
              <div className="col-md-4">
                <strong>Presión:</strong>
                <p>{atencion.presion_arterial}</p>
              </div>

              <div className="col-md-4">
                <strong>Temperatura:</strong>
                <p>{atencion.temperatura} °C</p>
              </div>

              <div className="col-md-4">
                <strong>Peso:</strong>
                <p>{atencion.peso} kg</p>
              </div>

              <div className="col-md-4">
                <strong>Estatura:</strong>
                <p>{atencion.estatura} m</p>
              </div>

              <div className="col-md-4">
                <strong>Frecuencia cardíaca:</strong>
                <p>{atencion.frecuencia_cardiaca} lpm</p>
              </div>
            </div>
          </div>
        </div>

        {/* Diagnóstico */}

        <div className="card shadow-sm mb-4">
          <div className="card-header">
            <h5 className="mb-0">📋 Diagnóstico</h5>
          </div>

          <div className="card-body">
            <strong>Motivo de consulta</strong>

            <p>{atencion.motivo_consulta}</p>

            <strong>Diagnóstico</strong>

            <p>{atencion.diagnostico}</p>

            <strong>Indicaciones generales</strong>

            <p>{atencion.indicaciones_generales}</p>

            <strong>Observaciones</strong>

            <p>{atencion.observaciones}</p>
          </div>
        </div>

        {/* Medicamentos */}

        <div className="card shadow-sm">
          <div className="card-header">
            <h5 className="mb-0">💊 Medicamentos prescritos</h5>
          </div>

          <div className="card-body">
            <Table bordered hover>
              <thead>
                <tr>
                  <th>Medicamento</th>
                  <th>Dosis</th>
                  <th>Frecuencia</th>
                  <th>Duración</th>
                  <th>Cantidad</th>
                </tr>
              </thead>

              <tbody>
                {medicamentos.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center text-muted py-3">
                      No hay medicamentos registrados para esta atención.
                    </td>
                  </tr>
                ) : (
                  medicamentos.map((med) => (
                    <tr key={med.id}>
                      <td>{med.inventario?.nombre || "Medicamento"}</td>
                      <td>{med.dosis || "-"}</td>
                      <td>{med.frecuencia || "-"}</td>
                      <td>{med.duracion || "-"}</td>
                      <td>{med.cantidad}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
