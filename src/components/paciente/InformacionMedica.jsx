import { FiActivity } from "react-icons/fi";

function InformacionMedica({ form, handleChange }) {
  return (
    <section className="patient-section patient-section--medical">
      <header className="patient-section__header">
        <span className="patient-section__icon"><FiActivity /></span>
        <div>
          <h3>Información médica</h3>
          <p>Antecedentes y datos clínicos relevantes para la atención.</p>
        </div>
      </header>

      <div className="patient-section__body">
        <div className="row g-3 g-lg-4">
          <div className="col-12 patient-field">
            <label className="form-label" htmlFor="motivoConsulta">Motivo de consulta <span className="required-mark">*</span></label>
            <textarea id="motivoConsulta" className="form-control" name="motivoConsulta" value={form.motivoConsulta} onChange={handleChange} rows="3" placeholder="Describa brevemente el motivo principal de la consulta" required />
          </div>

          <div className="col-lg-6 patient-field">
            <label className="form-label" htmlFor="alergias">Alergias</label>
            <textarea id="alergias" className="form-control" name="alergias" value={form.alergias} onChange={handleChange} rows="3" placeholder="Ej. Penicilina, mariscos, polvo..." />
          </div>

          <div className="col-lg-6 patient-field">
            <label className="form-label" htmlFor="enfermedades">Enfermedades preexistentes</label>
            <textarea id="enfermedades" className="form-control" name="enfermedades" value={form.enfermedades} onChange={handleChange} rows="3" placeholder="Ej. Diabetes, hipertensión, asma..." />
          </div>

          <div className="col-lg-8 patient-field">
            <label className="form-label" htmlFor="medicamentos">Medicamentos actuales</label>
            <textarea id="medicamentos" className="form-control" name="medicamentos" value={form.medicamentos} onChange={handleChange} rows="2" placeholder="Nombre, dosis y frecuencia si están disponibles" />
          </div>

          <div className="col-lg-4 patient-field">
            <label className="form-label" htmlFor="prioridad">Prioridad de atención</label>
            <select id="prioridad" className="form-select" name="prioridad" value={form.prioridad} onChange={handleChange}>
              <option value="Normal">Normal</option>
              <option value="Media">Media</option>
              <option value="Alta">Alta</option>
              <option value="Crítica">Crítica</option>
            </select>
            <span className="patient-field__hint">Puede actualizarse durante la evaluación.</span>
          </div>

          <div className="col-12 patient-field">
            <label className="form-label" htmlFor="observaciones">Observaciones médicas</label>
            <textarea id="observaciones" className="form-control" name="observaciones" value={form.observaciones} onChange={handleChange} rows="4" placeholder="Información adicional relevante para el personal médico" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default InformacionMedica;
