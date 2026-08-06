import {
  FiUsers,
  FiClock,
  FiAlertTriangle,
  FiFileText,
} from "react-icons/fi";


function StatsCards({ stats, loading }) {
  const data = [
    {
      titulo: "Pacientes Registrados",
      valor: loading ? "..." : stats?.totalPacientes || 0,
      icono: <FiUsers />,
      color: "primary",
    },
    {
      titulo: "En espera",
      valor: loading ? "..." : stats?.urgencias || 0,
      icono: <FiClock />,
      color: "warning",
    },
    {
      titulo: "Urgencias",
      valor: 0, 
      icono: <FiAlertTriangle />,
      color: "danger",
    },
    {
      titulo: "Recetas Emitidas",
      valor: 0, 
      icono: <FiFileText />,
      color: "success",
    },
  ];

  return (
    <div className="row">
      {data.map((item) => (
        <div className="col-md-6 col-xl-3 mb-4" key={item.titulo}>
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <small className="text-muted">{item.titulo}</small>
                <h3 className="fw-bold mt-2">{item.valor}</h3>
              </div>
              <div
                className={`bg-${item.color} text-white rounded-circle d-flex justify-content-center align-items-center`}
                style={{
                  width: "55px",
                  height: "55px",
                  fontSize: "24px",
                }}
              >
                {item.icono}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;