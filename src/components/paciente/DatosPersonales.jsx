import { FiUser } from "react-icons/fi";

function DatosPersonales({ form, handleChange }) {
  return (
    <section className="patient-section patient-section--personal">
      <header className="patient-section__header">
        <span className="patient-section__icon"><FiUser /></span>
        <div>
          <h3>Datos personales</h3>
          <p>Información básica para identificar al paciente.</p>
        </div>
      </header>

      <div className="patient-section__body">
        <div className="row g-3 g-lg-4">
          <div className="col-lg-6 patient-field">
            <label className="form-label" htmlFor="nombre">Nombre completo <span className="required-mark">*</span></label>
            <input id="nombre" type="text" className="form-control" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Ej. Juan Pérez" autoComplete="name" required />
          </div>

          <div className="col-md-6 col-lg-3 patient-field">
            <label className="form-label" htmlFor="matricula">Matrícula <span className="required-mark">*</span></label>
            <input id="matricula" type="text" className="form-control" name="matricula" value={form.matricula} onChange={handleChange} placeholder="2023-1234" required />
          </div>

          <div className="col-md-6 col-lg-3 patient-field">
            <label className="form-label" htmlFor="cedula">Cédula</label>
            <input id="cedula" type="text" className="form-control" name="cedula" value={form.cedula} onChange={handleChange} placeholder="001-1234567-8" inputMode="numeric" />
            <span className="patient-field__hint">Formato dominicano: 000-0000000-0</span>
          </div>

          <div className="col-md-4 patient-field">
            <label className="form-label" htmlFor="fechaNacimiento">Fecha de nacimiento <span className="required-mark">*</span></label>
            <input id="fechaNacimiento" type="date" className="form-control" name="fechaNacimiento" value={form.fechaNacimiento} onChange={handleChange} max={new Date().toISOString().split("T")[0]} required />
          </div>

          <div className="col-md-4 patient-field">
            <label className="form-label" htmlFor="sexo">Sexo <span className="required-mark">*</span></label>
            <select id="sexo" className="form-select" name="sexo" value={form.sexo} onChange={handleChange} required>
              <option value="">Seleccione una opción</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          <div className="col-md-4 patient-field">
            <label className="form-label" htmlFor="tipoSangre">Tipo de sangre</label>
            <select id="tipoSangre" className="form-select" name="tipoSangre" value={form.tipoSangre} onChange={handleChange}>
              <option value="">Seleccione una opción</option>
              {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map((tipo) => <option key={tipo} value={tipo}>{tipo}</option>)}
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DatosPersonales;
