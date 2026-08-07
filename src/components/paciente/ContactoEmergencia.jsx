import { FiAlertCircle } from "react-icons/fi";

function ContactoEmergencia({ form, handleChange }) {
  return (
    <section className="patient-section patient-section--emergency">
      <header className="patient-section__header">
        <span className="patient-section__icon"><FiAlertCircle /></span>
        <div>
          <h3>Contacto de emergencia</h3>
          <p>Persona responsable a contactar ante una situación médica.</p>
        </div>
      </header>

      <div className="patient-section__body">
        <div className="row g-3 g-lg-4">
          <div className="col-lg-6 patient-field">
            <label className="form-label" htmlFor="contactoEmergencia">Nombre del contacto <span className="required-mark">*</span></label>
            <input id="contactoEmergencia" type="text" className="form-control" name="contactoEmergencia" value={form.contactoEmergencia} onChange={handleChange} placeholder="Ej. María Rodríguez" required />
          </div>

          <div className="col-md-6 col-lg-3 patient-field">
            <label className="form-label" htmlFor="parentesco">Parentesco</label>
            <input id="parentesco" type="text" className="form-control" name="parentesco" value={form.parentesco} onChange={handleChange} placeholder="Madre, padre, tutor..." />
          </div>

          <div className="col-md-6 col-lg-3 patient-field">
            <label className="form-label" htmlFor="telefonoEmergencia">Teléfono <span className="required-mark">*</span></label>
            <input id="telefonoEmergencia" type="tel" className="form-control" name="telefonoEmergencia" value={form.telefonoEmergencia} onChange={handleChange} placeholder="809-555-1234" autoComplete="tel" required />
          </div>

          <div className="col-lg-5 patient-field">
            <label className="form-label" htmlFor="correoEmergencia">Correo electrónico</label>
            <input id="correoEmergencia" type="email" className="form-control" name="correoEmergencia" value={form.correoEmergencia} onChange={handleChange} placeholder="contacto@email.com" />
          </div>

          <div className="col-lg-7 patient-field">
            <label className="form-label" htmlFor="observacionesEmergencia">Observaciones</label>
            <textarea id="observacionesEmergencia" className="form-control" name="observacionesEmergencia" value={form.observacionesEmergencia} onChange={handleChange} rows="3" placeholder="Disponibilidad, instrucciones o información adicional" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactoEmergencia;
