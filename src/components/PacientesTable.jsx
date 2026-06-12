function PacientesTable() {
  const pacientes = [
    {
      nombre: "Juan Pérez",
      estado: "En espera",
      prioridad: "Alta",
    },
    {
      nombre: "María Rodríguez",
      estado: "Consulta",
      prioridad: "Media",
    },
    {
      nombre: "Carlos Gómez",
      estado: "Atendido",
      prioridad: "Baja",
    },
  ];

  function badgeColor(prioridad) {
    switch (prioridad) {
      case "Alta":
        return "danger";
      case "Media":
        return "warning";
      default:
        return "success";
    }
  }

  return (
    <div className="card border-0 shadow-sm mt-4">
      <div className="card-header bg-white fw-bold">
        Pacientes recientes
      </div>

      <div className="table-responsive">
        <table className="table table-hover mb-0">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Estado</th>
              <th>Prioridad</th>
            </tr>
          </thead>

          <tbody>
            {pacientes.map((paciente, index) => (
              <tr key={index}>
                <td>{paciente.nombre}</td>
                <td>{paciente.estado}</td>

                <td>
                  <span
                    className={`badge bg-${badgeColor(
                      paciente.prioridad
                    )}`}
                  >
                    {paciente.prioridad}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PacientesTable;