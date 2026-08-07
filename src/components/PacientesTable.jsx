import "./PacientesTable.css";

function PacientesTable({ pacientes, loading }) {
  function badgeColor(prioridad) {
    switch (prioridad?.toLowerCase()) {
      case "grave":
      case "alta":
        return "danger";

      case "moderado":
      case "media":
        return "warning";

      default:
        return "success";
    }
  }

  return (
    <section className="patients-card">
      <div className="patients-card__header">
        <div>
          <span className="patients-card__eyebrow">
            Actividad reciente
          </span>

          <h3 className="patients-card__title">
            Últimos pacientes registrados
          </h3>

          <p className="patients-card__subtitle">
            Pacientes agregados recientemente al sistema.
          </p>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table patients-table mb-0">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Matrícula</th>
              <th>Prioridad inicial</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={3}
                  className="patients-table__empty"
                >
                  Cargando pacientes...
                </td>
              </tr>
            ) : pacientes?.length > 0 ? (
              pacientes.map((paciente) => (
                <tr key={paciente.id}>
                  <td className="patients-table__name">
                    {paciente.nombre}
                  </td>

                  <td className="patients-table__secondary">
                    {paciente.matricula}
                  </td>

                  <td>
                    <span
                      className={`patients-badge patients-badge--${badgeColor(
                        paciente.prioridad
                      )}`}
                    >
                      {paciente.prioridad || "Normal"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="patients-table__empty"
                >
                  No hay pacientes registrados aún.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default PacientesTable;