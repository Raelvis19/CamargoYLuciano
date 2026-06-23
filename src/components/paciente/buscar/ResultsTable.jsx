export default function ResultsTable({ patients, onSelectPatient }) {
  if (!patients || patients.length === 0) return null;

  // Función para asignar la clase de Bootstrap correcta según la prioridad
  const getBadgeClass = (prioridad) => {
    switch (prioridad?.toLowerCase()) {
      case 'alta': return 'badge bg-danger rounded-pill px-3 py-2';
      case 'media': return 'badge bg-warning text-dark rounded-pill px-3 py-2';
      case 'baja': return 'badge bg-success rounded-pill px-3 py-2';
      default: return 'badge bg-secondary rounded-pill px-3 py-2';
    }
  };

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light">
          <tr>
            <th className="py-3 px-4 border-bottom-0">Nombre</th>
            <th className="py-3 px-4 border-bottom-0">Estado</th>
            <th className="py-3 px-4 border-bottom-0">Prioridad</th>
            <th className="py-3 px-4 border-bottom-0">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr key={p.id}>
              <td className="py-3 px-4 fw-medium">{p.nombre}</td>
              <td className="py-3 px-4">{p.estado}</td>
              <td className="py-3 px-4">
                <span className={getBadgeClass(p.prioridad)}>
                  {p.prioridad}
                </span>
              </td>
              <td className="py-3 px-4">
                <button 
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => onSelectPatient(p)}
                >
                  Ver detalles
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}