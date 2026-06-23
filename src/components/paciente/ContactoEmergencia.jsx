function ContactoEmergencia({ form, handleChange }) {
  return (
    <div className="card shadow-sm border-0 mb-4">
      <div className="card-body p-4">
        <h4 className="fw-bold mb-1">
          🚨 Contacto de emergencia
        </h4>

        <p className="text-muted mb-4">
          Persona a contactar en caso de una emergencia médica.
        </p>

        <div className="row g-3">

          {/* Nombre */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">
              Nombre del contacto *
            </label>

            <input
              type="text"
              className="form-control"
              name="contactoEmergencia"
              value={form.contactoEmergencia}
              onChange={handleChange}
              placeholder="Ej. María Rodríguez"
              required
            />
          </div>

          {/* Parentesco */}
          <div className="col-md-3">
            <label className="form-label fw-semibold">
              Parentesco
            </label>

            <input
              type="text"
              className="form-control"
              name="parentesco"
              value={form.parentesco}
              onChange={handleChange}
              placeholder="Madre, Padre, Hermano..."
            />
          </div>

          {/* Teléfono */}
          <div className="col-md-3">
            <label className="form-label fw-semibold">
              Teléfono *
            </label>

            <input
              type="tel"
              className="form-control"
              name="telefonoEmergencia"
              value={form.telefonoEmergencia}
              onChange={handleChange}
              placeholder="809-555-1234"
              required
            />
          </div>

          {/* Correo */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">
              Correo electrónico
            </label>

            <input
              type="email"
              className="form-control"
              name="correoEmergencia"
              value={form.correoEmergencia}
              onChange={handleChange}
              placeholder="contacto@email.com"
            />
          </div>

          {/* Observaciones */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">
              Observaciones
            </label>

            <textarea
              className="form-control"
              name="observacionesEmergencia"
              value={form.observacionesEmergencia}
              onChange={handleChange}
              rows="3"
              placeholder="Información adicional sobre el contacto"
            />
          </div>

        </div>
      </div>
    </div>
  );
}

export default ContactoEmergencia;