import { useEffect, useMemo, useState } from "react";
import {
  FiActivity,
  FiCheckCircle,
  FiClock,
  FiFileText,
  FiHeart,
  FiPlus,
  FiRefreshCw,
  FiSave,
  FiSearch,
  FiTrash2,
  FiUserCheck,
} from "react-icons/fi";
import { supabase } from "../supabase/supabaseClient";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import AgregarMedicamentoModal from "../components/AgregarmedicamentoModal";
import { buscarPacientes } from "../services/BuscarPacientesService";
import { registrarAtencion } from "../services/AtencionService";
import { registrarDetalleAtencion } from "../services/detalle_atencion";
import { actualizarMedicamento } from "../services/InventarioService";
import { notify } from "../utils/notify";
import "./AtencionMedica.css";

const INITIAL_FORM = {
  presionArterial: "",
  temperatura: "",
  peso: "",
  estatura: "",
  frecuenciaCardiaca: "",
  motivoConsulta: "",
  diagnostico: "",
  indicacionesGenerales: "",
  observaciones: "",
};

function calcularEdad(fechaNacimiento) {
  if (!fechaNacimiento) return null;
  const nacimiento = new Date(`${fechaNacimiento}T00:00:00`);
  if (Number.isNaN(nacimiento.getTime())) return null;

  const hoy = new Date();
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const diferenciaMes = hoy.getMonth() - nacimiento.getMonth();

  if (
    diferenciaMes < 0 ||
    (diferenciaMes === 0 && hoy.getDate() < nacimiento.getDate())
  ) {
    edad -= 1;
  }

  return edad >= 0 ? edad : null;
}

function convertirNumero(valor) {
  if (valor === "" || valor === null || valor === undefined) return null;
  const numero = Number(String(valor).replace(",", "."));
  return Number.isFinite(numero) ? numero : null;
}

export default function AtencionMedica() {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [buscando, setBuscando] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [medicamentos, setMedicamentos] = useState([]);
  const [paciente, setPaciente] = useState(null);
  const [form, setForm] = useState(INITIAL_FORM);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fechaHora = useMemo(
    () =>
      new Intl.DateTimeFormat("es-DO", {
        dateStyle: "long",
        timeStyle: "short",
      }).format(new Date()),
    []
  );

  const edadPaciente = useMemo(
    () => paciente?.edad ?? calcularEdad(paciente?.fecha_nacimiento),
    [paciente]
  );

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleBuscarPaciente(event) {
    event?.preventDefault();
    const criterio = busqueda.trim();

    if (!criterio) {
      notify.warning("Escribe un nombre, matrícula o cédula para buscar.");
      return;
    }

    try {
      setBuscando(true);
      const pacientes = await buscarPacientes(criterio);

      if (!pacientes?.length) {
        setPaciente(null);
        notify.info("No se encontró ningún paciente con ese criterio.");
        return;
      }

      setPaciente(pacientes[0]);
      notify.success(`Paciente seleccionado: ${pacientes[0].nombre}.`);
    } catch (error) {
      console.error("Error al buscar paciente:", error);
      notify.error(error?.message || "No fue posible buscar el paciente.");
    } finally {
      setBuscando(false);
    }
  }

  function agregarMedicamento(nuevoMedicamento) {
    setMedicamentos((current) => [...current, nuevoMedicamento]);
  }

  function eliminarMedicamento(index) {
    setMedicamentos((current) => current.filter((_, itemIndex) => itemIndex !== index));
  }

  function limpiarAtencion({ conservarPaciente = false } = {}) {
    setForm(INITIAL_FORM);
    setMedicamentos([]);
    setShowModal(false);

    if (!conservarPaciente) {
      setBusqueda("");
      setPaciente(null);
    }
  }

  function validarFormulario() {
    if (!paciente) return "Selecciona un paciente antes de registrar la atención.";
    if (!form.motivoConsulta.trim()) return "Describe el motivo de consulta.";
    if (form.motivoConsulta.trim().length < 5) return "El motivo de consulta necesita más detalle.";
    if (!form.diagnostico.trim()) return "Escribe el diagnóstico de la atención.";
    if (!medicamentos.length) return "Agrega al menos un medicamento al tratamiento.";

    if (form.presionArterial && !/^\d{2,3}\s*\/\s*\d{2,3}$/.test(form.presionArterial.trim())) {
      return "La presión arterial debe tener un formato como 120/80.";
    }

    const temperatura = convertirNumero(form.temperatura);
    if (form.temperatura && (temperatura === null || temperatura < 30 || temperatura > 45)) {
      return "La temperatura debe estar entre 30 y 45 °C.";
    }

    const peso = convertirNumero(form.peso);
    if (form.peso && (peso === null || peso <= 0 || peso > 500)) {
      return "Ingresa un peso válido en kilogramos.";
    }

    const estatura = convertirNumero(form.estatura);
    if (form.estatura && (estatura === null || estatura < 0.4 || estatura > 2.8)) {
      return "Ingresa una estatura válida en metros.";
    }

    const frecuencia = convertirNumero(form.frecuenciaCardiaca);
    if (form.frecuenciaCardiaca && (frecuencia === null || frecuencia < 20 || frecuencia > 250)) {
      return "Ingresa una frecuencia cardíaca válida.";
    }

    return null;
  }

  async function handleGuardarAtencion(event) {
    event.preventDefault();
    const mensajeValidacion = validarFormulario();

    if (mensajeValidacion) {
      notify.warning(mensajeValidacion);
      return;
    }

    const datosAtencion = {
      paciente_id: paciente.id,
      presion_arterial: form.presionArterial.trim() || null,
      temperatura: convertirNumero(form.temperatura),
      peso: convertirNumero(form.peso),
      estatura: convertirNumero(form.estatura),
      frecuencia_cardiaca: convertirNumero(form.frecuenciaCardiaca),
      motivo_consulta: form.motivoConsulta.trim(),
      diagnostico: form.diagnostico.trim(),
      indicaciones_generales: form.indicacionesGenerales.trim() || null,
      observaciones: form.observaciones.trim() || null,
    };

    try {
      setGuardando(true);
      const resultado = await registrarAtencion(datosAtencion);
      const atencionGuardada = Array.isArray(resultado) ? resultado[0] : resultado;
      const atencionId = atencionGuardada?.id;

      if (!atencionId) {
        throw new Error("La atención se guardó sin devolver un identificador.");
      }

      for (const medicamento of medicamentos) {
        await registrarDetalleAtencion({
          atencion_id: atencionId,
          medicamento_id: medicamento.medicamentoId,
          cantidad: medicamento.cantidad,
          dosis: medicamento.dosis,
          frecuencia: medicamento.frecuencia,
          duracion: medicamento.duracion,
          indicaciones: medicamento.indicaciones || null,
        });

        await actualizarMedicamento(medicamento.medicamentoId, {
          cantidad: medicamento.stockDisponible - medicamento.cantidad,
        });
      }

      notify.success("Atención médica registrada correctamente.");
      limpiarAtencion();
    } catch (error) {
      console.error("Error al registrar la atención:", error);
      notify.error(error?.message || "No fue posible registrar la atención médica.");
    } finally {
      setGuardando(false);
    }
  }

  return (
    <div className="app-container">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="main-section">
        <Topbar user={user} onMenuClick={() => setSidebarOpen(true)} />

        <main className="attention-page">
          <div className="attention-page__content">
            <header className="attention-page__header">
              <div>
                <span className="attention-page__eyebrow">
                  <FiActivity /> Consulta clínica
                </span>
                <h1 className="attention-page__title">Registrar atención médica</h1>
                <p className="attention-page__subtitle">
                  Selecciona un paciente y documenta su evaluación, diagnóstico y tratamiento.
                </p>
              </div>

              <div className="attention-page__date">
                <FiClock />
                <span>{fechaHora}</span>
              </div>
            </header>

            <form className="attention-form" onSubmit={handleGuardarAtencion} noValidate>
              <section className="attention-section attention-section--search">
                <div className="attention-section__header">
                  <span className="attention-section__icon"><FiSearch /></span>
                  <div>
                    <h2>Seleccionar paciente</h2>
                    <p>Busca por nombre, matrícula o número de cédula.</p>
                  </div>
                </div>

                <div className="attention-section__body">
                  <div className="attention-search">
                    <input
                      type="search"
                      className="form-control"
                      placeholder="Ej. Juan Pérez, 2023-1234 o 001-1234567-8"
                      value={busqueda}
                      onChange={(event) => setBusqueda(event.target.value)}
                      disabled={buscando || guardando}
                    />
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleBuscarPaciente}
                      disabled={buscando || guardando}
                    >
                      <FiSearch /> {buscando ? "Buscando..." : "Buscar paciente"}
                    </button>
                  </div>

                  {paciente ? (
                    <article className="selected-patient">
                      <div className="selected-patient__avatar"><FiUserCheck /></div>
                      <div className="selected-patient__main">
                        <span>Paciente seleccionado</span>
                        <strong>{paciente.nombre}</strong>
                        <small>{paciente.matricula || "Sin matrícula registrada"}</small>
                      </div>
                      <dl className="selected-patient__details">
                        <div><dt>Edad</dt><dd>{edadPaciente !== null ? `${edadPaciente} años` : "No disponible"}</dd></div>
                        <div><dt>Cédula</dt><dd>{paciente.cedula || "No registrada"}</dd></div>
                        <div><dt>Sexo</dt><dd>{paciente.sexo || "No registrado"}</dd></div>
                        <div><dt>Sangre</dt><dd>{paciente.tipo_sangre || "No registrada"}</dd></div>
                      </dl>
                    </article>
                  ) : (
                    <div className="attention-empty-state">
                      <FiUserCheck />
                      <div><strong>Ningún paciente seleccionado</strong><span>Realiza una búsqueda para comenzar la atención.</span></div>
                    </div>
                  )}
                </div>
              </section>

              <section className="attention-section attention-section--vitals">
                <div className="attention-section__header">
                  <span className="attention-section__icon"><FiHeart /></span>
                  <div>
                    <h2>Signos vitales</h2>
                    <p>Registra los valores obtenidos durante la evaluación.</p>
                  </div>
                </div>

                <div className="attention-section__body">
                  <div className="attention-grid attention-grid--vitals">
                    <label className="attention-field">
                      <span>Presión arterial</span>
                      <div className="attention-input-unit"><input name="presionArterial" className="form-control" placeholder="120/80" value={form.presionArterial} onChange={handleChange} /><small>mmHg</small></div>
                    </label>
                    <label className="attention-field">
                      <span>Temperatura</span>
                      <div className="attention-input-unit"><input name="temperatura" type="number" step="0.1" min="30" max="45" className="form-control" placeholder="36.8" value={form.temperatura} onChange={handleChange} /><small>°C</small></div>
                    </label>
                    <label className="attention-field">
                      <span>Peso</span>
                      <div className="attention-input-unit"><input name="peso" type="number" step="0.1" min="0" className="form-control" placeholder="72" value={form.peso} onChange={handleChange} /><small>kg</small></div>
                    </label>
                    <label className="attention-field">
                      <span>Estatura</span>
                      <div className="attention-input-unit"><input name="estatura" type="number" step="0.01" min="0" className="form-control" placeholder="1.75" value={form.estatura} onChange={handleChange} /><small>m</small></div>
                    </label>
                    <label className="attention-field">
                      <span>Frecuencia cardíaca</span>
                      <div className="attention-input-unit"><input name="frecuenciaCardiaca" type="number" min="20" max="250" className="form-control" placeholder="75" value={form.frecuenciaCardiaca} onChange={handleChange} /><small>lpm</small></div>
                    </label>
                  </div>
                </div>
              </section>

              <section className="attention-section attention-section--evaluation">
                <div className="attention-section__header">
                  <span className="attention-section__icon"><FiFileText /></span>
                  <div>
                    <h2>Evaluación clínica</h2>
                    <p>Documenta el motivo de consulta y la impresión diagnóstica.</p>
                  </div>
                </div>

                <div className="attention-section__body">
                  <div className="attention-grid attention-grid--two">
                    <label className="attention-field">
                      <span>Motivo de consulta / síntomas <b>*</b></span>
                      <textarea name="motivoConsulta" className="form-control" rows="5" placeholder="Describe los síntomas, cuándo iniciaron y su evolución..." value={form.motivoConsulta} onChange={handleChange} />
                    </label>
                    <label className="attention-field">
                      <span>Diagnóstico <b>*</b></span>
                      <textarea name="diagnostico" className="form-control" rows="5" placeholder="Escribe el diagnóstico o impresión clínica..." value={form.diagnostico} onChange={handleChange} />
                    </label>
                  </div>
                </div>
              </section>

              <section className="attention-section attention-section--treatment">
                <div className="attention-section__header attention-section__header--actions">
                  <div className="attention-section__heading">
                    <span className="attention-section__icon"><FiPlus /></span>
                    <div>
                      <h2>Tratamiento</h2>
                      <p>Agrega medicamentos e indicaciones para el paciente.</p>
                    </div>
                  </div>
                  <button type="button" className="btn btn-primary btn-sm" onClick={() => setShowModal(true)} disabled={guardando}>
                    <FiPlus /> Agregar medicamento
                  </button>
                </div>

                <div className="attention-section__body">
                  <label className="attention-field attention-field--full">
                    <span>Indicaciones generales</span>
                    <textarea name="indicacionesGenerales" className="form-control" rows="3" placeholder="Reposo, hidratación, alimentación u otras recomendaciones..." value={form.indicacionesGenerales} onChange={handleChange} />
                  </label>

                  <div className="attention-table-wrap">
                    <table className="attention-table">
                      <thead><tr><th>Medicamento</th><th>Dosis</th><th>Frecuencia</th><th>Duración</th><th>Cantidad</th><th aria-label="Acciones" /></tr></thead>
                      <tbody>
                        {medicamentos.length === 0 ? (
                          <tr><td colSpan="6"><div className="attention-table__empty"><FiPlus /><span>No hay medicamentos agregados.</span></div></td></tr>
                        ) : (
                          medicamentos.map((medicamento, index) => (
                            <tr key={`${medicamento.medicamentoId}-${index}`}>
                              <td><strong>{medicamento.medicamento}</strong>{medicamento.indicaciones && <small>{medicamento.indicaciones}</small>}</td>
                              <td>{medicamento.dosis}</td><td>{medicamento.frecuencia}</td><td>{medicamento.duracion}</td><td>{medicamento.cantidad}</td>
                              <td className="attention-table__actions"><button type="button" className="attention-delete-btn" onClick={() => eliminarMedicamento(index)} aria-label={`Eliminar ${medicamento.medicamento}`}><FiTrash2 /></button></td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              <section className="attention-section attention-section--notes">
                <div className="attention-section__header">
                  <span className="attention-section__icon"><FiFileText /></span>
                  <div><h2>Observaciones</h2><p>Registra cualquier información adicional relevante.</p></div>
                </div>
                <div className="attention-section__body">
                  <label className="attention-field attention-field--full">
                    <span>Observaciones adicionales</span>
                    <textarea name="observaciones" className="form-control" rows="4" placeholder="Notas complementarias de la atención..." value={form.observaciones} onChange={handleChange} />
                  </label>
                </div>
              </section>

              <div className="attention-form__actions">
                <div className="attention-form__actions-text">
                  <strong><FiCheckCircle /> Revisión final</strong>
                  <span>Verifica el paciente, diagnóstico y tratamiento antes de guardar.</span>
                </div>
                <div className="attention-form__buttons">
                  <button type="button" className="btn btn-outline-secondary" onClick={() => limpiarAtencion()} disabled={guardando}>
                    <FiRefreshCw /> Limpiar
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={guardando}>
                    <FiSave /> {guardando ? "Guardando..." : "Guardar atención"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>

      <AgregarMedicamentoModal show={showModal} handleClose={() => setShowModal(false)} onAgregar={agregarMedicamento} />
    </div>
  );
}
