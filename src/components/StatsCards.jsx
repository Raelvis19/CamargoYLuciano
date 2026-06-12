import {
  FiUsers,
  FiClock,
  FiAlertTriangle,
  FiFileText,
} from "react-icons/fi";

function StatsCards() {
  const stats = [
    {
      titulo: "Pacientes",
      valor: 125,
      icono: <FiUsers />,
      color: "primary",
    },
    {
      titulo: "En espera",
      valor: 18,
      icono: <FiClock />,
      color: "warning",
    },
    {
      titulo: "Urgencias",
      valor: 4,
      icono: <FiAlertTriangle />,
      color: "danger",
    },
    {
      titulo: "Recetas",
      valor: 42,
      icono: <FiFileText />,
      color: "success",
    },
  ];

  return (
    <div className="row">
      {stats.map((item) => (
        <div className="col-md-6 col-xl-3 mb-4" key={item.titulo}>
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <small className="text-muted">{item.titulo}</small>

                <h3 className="fw-bold mt-2">
                  {item.valor}
                </h3>
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