import { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

export default function AgregarInventarioModal({ show, handleClose, onGuardar, medicamentoEditar }) {
  const [codigo, setCodigo] = useState("");

  const [nombre, setNombre] = useState("");

  const [cantidad, setCantidad] = useState("");

  const [fechaVencimiento, setFechaVencimiento] = useState("");

  
  useEffect(() => {
    if (medicamentoEditar) {
      setCodigo(medicamentoEditar.codigo || "");

      setNombre(medicamentoEditar.nombre || "");

      setCantidad(medicamentoEditar.cantidad || "");

      setFechaVencimiento(medicamentoEditar.fecha_vencimiento || medicamentoEditar.fechaVencimiento || "");
    } else {
      
      setCodigo("");

      setNombre("");

      setCantidad("");

      setFechaVencimiento("");
    }
  }, [medicamentoEditar, show]);

  const handleSubmit = () => {
    if (!nombre || !codigo || !cantidad) {
      alert("Por favor complete los campos obligatorios (Codigo, Nombre y Cantidad).");
      return;
    }

    const datosMedicamento = {
      codigo,
      nombre,
      cantidad: parseInt(cantidad),
      fecha_vencimiento: fechaVencimiento || null,
      estado: parseInt(cantidad) <= 3 ? "A punto de agotarse" : "Stock normal"
    };

    
    if (medicamentoEditar) {
      datosMedicamento.id = medicamentoEditar.id;
    }

    onGuardar(datosMedicamento);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{medicamentoEditar ? "Modificar Medicamento" : "Agregar al Inventario"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Codigo *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej. 0100450"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre del medicamento *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej. Ibuprofeno"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Cantidad *</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="0"
                  min="0"
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Fecha de Vencimiento</Form.Label>
                <Form.Control
                  type="date"
                  value={fechaVencimiento}
                  onChange={(e) => setFechaVencimiento(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="success" onClick={handleSubmit}>
          {medicamentoEditar ? "Guardar Cambios" : "Agregar medicamento"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}