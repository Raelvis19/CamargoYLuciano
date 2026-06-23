function InformacionContacto({ form, handleChange }) {
  return (
    <div className="card shadow-sm border-0 mb-4">
      <div className="card-body p-4">
        <h4 className="fw-bold mb-1">📞 Información de contacto</h4>

        <p className="text-muted mb-4">
          Datos para comunicarse con el paciente.
        </p>

        <div className="row g-3">
          {/* Teléfono */}
          <div className="col-md-4">
            <label className="form-label fw-semibold">
              Teléfono *
            </label>

            <input
              type="tel"
              className="form-control"
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              placeholder="809-555-1234"
              required
            />
          </div>

          {/* Correo */}
          <div className="col-md-4">
            <label className="form-label fw-semibold">
              Correo electrónico
            </label>

            <input
              type="email"
              className="form-control"
              name="correo"
              value={form.correo}
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
            />
          </div>

          {/* Carrera */}
          <div className="col-md-4">
            <label className="form-label fw-semibold">
              Carrera
            </label>

            <input
              type="text"
              className="form-control"
              name="carrera"
              value={form.carrera}
              onChange={handleChange}
              placeholder="Ej. Ingeniería en Sistemas"
            />
          </div>

          {/* Dirección */}
          <div className="col-12">
            <label className="form-label fw-semibold">
              Dirección
            </label>

            <textarea
              className="form-control"
              name="direccion"
              value={form.direccion}
              onChange={handleChange}
              rows="3"
              placeholder="Ingrese la dirección completa del paciente"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default InformacionContacto;