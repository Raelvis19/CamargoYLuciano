function DatosPersonales({ form, handleChange }) {
  return (
    <div className="card shadow-sm border-0 mb-4">
      <div className="card-body p-4">
        <h4 className="fw-bold mb-1">👤 Datos personales</h4>

        <p className="text-muted mb-4">
          Información básica del paciente.
        </p>

        <div className="row g-3">
          {/* Nombre */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">
              Nombre completo *
            </label>

            <input
              type="text"
              className="form-control"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Ej. Juan Pérez"
              required
            />
          </div>

          {/* Matrícula */}
          <div className="col-md-3">
            <label className="form-label fw-semibold">
              Matrícula *
            </label>

            <input
              type="text"
              className="form-control"
              name="matricula"
              value={form.matricula}
              onChange={handleChange}
              placeholder="2023-1234"
              required
            />
          </div>

          {/* Cédula */}
          <div className="col-md-3">
            <label className="form-label fw-semibold">
              Cédula
            </label>

            <input
              type="text"
              className="form-control"
              name="cedula"
              value={form.cedula}
              onChange={handleChange}
              placeholder="001-1234567-8"
            />
          </div>

          {/* Fecha de nacimiento */}
          <div className="col-md-4">
            <label className="form-label fw-semibold">
              Fecha de nacimiento *
            </label>

            <input
              type="date"
              className="form-control"
              name="fechaNacimiento"
              value={form.fechaNacimiento}
              onChange={handleChange}
              required
            />
          </div>

          {/* Sexo */}
          <div className="col-md-4">
            <label className="form-label fw-semibold">
              Sexo *
            </label>

            <select
              className="form-select"
              name="sexo"
              value={form.sexo}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione...</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          {/* Tipo de sangre */}
          <div className="col-md-4">
            <label className="form-label fw-semibold">
              Tipo de sangre
            </label>

            <select
              className="form-select"
              name="tipoSangre"
              value={form.tipoSangre}
              onChange={handleChange}
            >
              <option value="">Seleccione...</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DatosPersonales;