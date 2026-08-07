import { FiPhone } from "react-icons/fi";

function InformacionContacto({ form, handleChange }) {
  return (
    <section className="patient-section patient-section--contact">
      <header className="patient-section__header">
        <span className="patient-section__icon"><FiPhone /></span>
        <div>
          <h3>Información de contacto</h3>
          <p>Medios disponibles para comunicarse con el paciente.</p>
        </div>
      </header>

      <div className="patient-section__body">
        <div className="row g-3 g-lg-4">
          <div className="col-md-6 col-lg-4 patient-field">
            <label className="form-label" htmlFor="telefono">Teléfono <span className="required-mark">*</span></label>
            <input id="telefono" type="tel" className="form-control" name="telefono" value={form.telefono} onChange={handleChange} placeholder="809-555-1234" autoComplete="tel" required />
          </div>

          <div className="col-md-6 col-lg-4 patient-field">
            <label className="form-label" htmlFor="correo">Correo electrónico</label>
            <input id="correo" type="email" className="form-control" name="correo" value={form.correo} onChange={handleChange} placeholder="correo@ejemplo.com" autoComplete="email" />
          </div>

          <div className="col-lg-4 patient-field">
            <label className="form-label" htmlFor="carrera">Carrera</label>
            <input id="carrera" type="text" className="form-control" name="carrera" value={form.carrera} onChange={handleChange} placeholder="Ej. Ingeniería en Sistemas" />
          </div>

          <div className="col-12 patient-field">
            <label className="form-label" htmlFor="direccion">Dirección</label>
            <textarea id="direccion" className="form-control" name="direccion" value={form.direccion} onChange={handleChange} rows="3" placeholder="Calle, sector, ciudad y referencias relevantes" autoComplete="street-address" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default InformacionContacto;
