function InformacionMedica({ form, handleChange }) {
  return (
    <div className="card shadow-sm border-0 mb-4">
      <div className="card-body p-4">
        <h4 className="fw-bold mb-1">🩺 Información médica</h4>

        <p className="text-muted mb-4">
          Datos clínicos relevantes para la atención del paciente.
        </p>

        <div className="row g-3">
          {/* Motivo de consulta */}
          <div className="col-12">
            <label className="form-label fw-semibold">
              Motivo de consulta *
            </label>

            <textarea
              className="form-control"
              name="motivoConsulta"
              value={form.motivoConsulta}
              onChange={handleChange}
              rows="3"
              placeholder="Describa el motivo principal de la consulta"
              required
            />
          </div>

          {/* Alergias */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">
              Alergias
            </label>

            <textarea
              className="form-control"
              name="alergias"
              value={form.alergias}
              onChange={handleChange}
              rows="3"
              placeholder="Ej. Penicilina, mariscos, polvo..."
            />
          </div>

          {/* Enfermedades preexistentes */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">
              Enfermedades preexistentes
            </label>

            <textarea
              className="form-control"
              name="enfermedades"
              value={form.enfermedades}
              onChange={handleChange}
              rows="3"
              placeholder="Ej. Diabetes, hipertensión, asma..."
            />
          </div>

          {/* Medicamentos */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">
              Medicamentos actuales
            </label>

            <textarea
              className="form-control"
              name="medicamentos"
              value={form.medicamentos}
              onChange={handleChange}
              rows="2"
              placeholder="Indique los medicamentos que utiliza actualmente"
            />
          </div>

          {/* Prioridad */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">
              Prioridad de atención
            </label>

            <select
              className="form-select"
              name="prioridad"
              value={form.prioridad}
              onChange={handleChange}
            >
              <option value="Normal">🟢 Normal</option>
              <option value="Media">🟡 Media</option>
              <option value="Alta">🟠 Alta</option>
              <option value="Crítica">🔴 Crítica</option>
            </select>
          </div>

          {/* Observaciones */}
          <div className="col-12">
            <label className="form-label fw-semibold">
              Observaciones médicas
            </label>

            <textarea
              className="form-control"
              name="observaciones"
              value={form.observaciones}
              onChange={handleChange}
              rows="4"
              placeholder="Información adicional relevante para el personal médico"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default InformacionMedica;