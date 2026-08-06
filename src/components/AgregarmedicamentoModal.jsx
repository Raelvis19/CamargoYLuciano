import { useState,useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { obtenerInventario } from "../services/InventarioService";
import { notify } from "../utils/notify";


export default function AgregarMedicamentoModal({
  show,
  handleClose,
  onAgregar,
}) {
  const [medicamento, setMedicamento] = useState("");
  const [dosis, setDosis] = useState("");
  const [frecuencia, setFrecuencia] = useState("");
  const [duracion, setDuracion] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [indicaciones, setIndicaciones] = useState("");
  const [inventario, setInventario] = useState([]);

  const medicamentoSeleccionado = inventario.find(
    (med) => med.nombre === medicamento
  );


  useEffect(() => { 
    async function  cargarInventario() {
      try {
        const data = await obtenerInventario();
        setInventario(data);
      } catch (error) {
        console.error("Error al obtener el inventario:", error);
      }
    }
    cargarInventario();
  }, []);
  

  const limpiarFormulario = () => {
    setMedicamento("");
    setDosis("");
    setFrecuencia("");
    setDuracion("");
    setCantidad("");
    setIndicaciones("");
  };

  const agregarMedicamento = () => {
    if (!medicamento) { notify.warning("Selecciona un medicamento."); return; }
    if (!dosis.trim() || !frecuencia.trim() || !duracion.trim()) { notify.warning("Completa la dosis, frecuencia y duración."); return; }

    if (!cantidad || parseInt(cantidad) <= 0) {
      notify.warning("Ingrese una cantidad válida.");
      return;
    }

    if (
      medicamentoSeleccionado &&
      parseInt(cantidad) > medicamentoSeleccionado.cantidad
    ) {
      notify.warning(`Solo hay ${medicamentoSeleccionado.cantidad} unidades disponibles en inventario.`);
      return;
    }

    onAgregar({
      medicamentoId: medicamentoSeleccionado.id,
      medicamento,
      dosis,
      frecuencia,
      duracion,
      cantidad: parseInt(cantidad),
      indicaciones,
      stockDisponible: medicamentoSeleccionado.cantidad,
    });

    limpiarFormulario();
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Agregar medicamento</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Medicamento</Form.Label>

            <Form.Select
              value={medicamento}
              onChange={(e) => setMedicamento(e.target.value)}
            >
              <option value="">Seleccione un medicamento</option>
              {inventario.map((med) => (
                <option key={med.id} value={med.nombre}>
                  {med.nombre} ({med.cantidad} disponibles)
                </option>
              ))}
            </Form.Select>
            {medicamentoSeleccionado && (
              <small className="text-muted d-block mt-2">
                Disponible: <strong>{medicamentoSeleccionado.cantidad}</strong> unidades.
              </small>
            )}
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Dosis</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej. 1 tableta"
                  value={dosis}
                  onChange={(e) => setDosis(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Frecuencia</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej. Cada 8 horas"
                  value={frecuencia}
                  onChange={(e) => setFrecuencia(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Duración</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej. 5 días"
                  value={duracion}
                  onChange={(e) => setDuracion(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Cantidad</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  placeholder="Cantidad"
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group>
            <Form.Label>Indicaciones específicas (opcional)</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Ej. Tomar después de las comidas."
              value={indicaciones}
              onChange={(e) => setIndicaciones(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>

        <Button variant="success" onClick={agregarMedicamento}>
          Agregar medicamento
        </Button>
      </Modal.Footer>
    </Modal>
  );
}