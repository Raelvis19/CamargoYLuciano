
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
    <div className="card border-0 shadow-sm mt-4 h-100">
      <div className="card-header bg-white fw-bold py-3">
        Últimos pacientes registrados
      </div>

      <div className="table-responsive">
        <table className="table table-hover mb-0">
          <thead className="table-light">
            <tr>
              <th>Nombre</th>
              <th>Matrícula</th>
              <th>Prioridad Inicial</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3" className="text-center py-4 text-muted">Cargando pacientes...</td>
              </tr>
            ) : pacientes && pacientes.length > 0 ? (
              pacientes.map((paciente) => (
                <tr key={paciente.id}>
                  <td className="fw-medium">{paciente.nombre}</td>
                  <td className="text-muted">{paciente.matricula}</td>
                  <td>
                    <span className={`badge bg-${badgeColor(paciente.prioridad)} px-2 py-1`}>
                      {paciente.prioridad || "Normal"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4 text-muted">No hay pacientes registrados aún.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PacientesTable;