export default function ResultsTable({ patients, onSelectPatient,onDelete}) {
  if (!patients || patients.length === 0) return null;

  const getBadgeClass = (prioridad) => {
    switch (prioridad?.toLowerCase()) {
      case "crítica":
        return "badge bg-danger rounded-pill px-3 py-2";

      case "alta":
        return "badge bg-danger rounded-pill px-3 py-2";

      case "media":
        return "badge bg-warning text-dark rounded-pill px-3 py-2";

      case "normal":
        return "badge bg-success rounded-pill px-3 py-2";

      default:
        return "badge bg-secondary rounded-pill px-3 py-2";
    }
  };

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light">
          <tr>
            <th className="py-3 px-4">Nombre</th>
            <th className="py-3 px-4">Matricula</th>
            <th className="py-3 px-4">Cedula</th>
            <th className="py-3 px-4">Telefono</th>
            <th className="py-3 px-4">Prioridad</th>
            <th className="py-3 px-4">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {patients.map((p) => (
            <tr key={p.id}>
              <td className="py-3 px-4 fw-medium">{p.nombre}</td>

              <td className="py-3 px-4">{p.matricula}</td>

              <td className="py-3 px-4">{p.cedula}</td>

              <td className="py-3 px-4">{p.telefono}</td>

              <td className="py-3 px-4">
                <span className={getBadgeClass(p.prioridad)}>
                  {p.prioridad}
                </span>
              </td>

              <td className="py-3 px-4">
                <button
                  className="btn btn-sm btn-outline-primary me-2"
                  onClick={() => onSelectPatient(p)}
                >
                  Ver detalles
                </button>

                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => onDelete(p)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
