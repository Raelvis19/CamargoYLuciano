import { useState, useEffect } from "react";
import { supabase } from "../supabase/supabaseClient";
import { FiPlusCircle, FiEdit, FiTrash2 } from "react-icons/fi";

import Sidebar from "../components/Sidebar";

import Topbar from "../components/Topbar";

import AgregarInventarioModal from "../components/AgregarInventarioModal"; 

import { obtenerInventario, registrarMedicamento, actualizarMedicamento, eliminarMedicamentoLogico } from "../services/InventarioService";

function Inventario() {
  const [user, setUser] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const [medicamentos, setMedicamentos] = useState([]);

  const [loading, setLoading] = useState(true);
  
  
  const [selectedMedIndex, setSelectedMedIndex] = useState(null);
  
  const [medicamentoAEditar, setMedicamentoAEditar] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    fetchMedicamentos();

    return () => subscription.unsubscribe();
  }, []);

  
  const fetchMedicamentos = async () => {
    try {
      setLoading(true);
      const data = await obtenerInventario();
      setMedicamentos(data);
    } catch (error) {
      console.error("Error al traer el inventario:", error);
      alert("No se pudo cargar el inventario de la base de datos.");
    } finally {
      setLoading(false);
    }
  };

  
  const handleGuardarMedicamento = async (medicamentoDatos) => {
    try {
      if (medicamentoAEditar) {
        
        const idOriginal = medicamentoDatos.id;
        delete medicamentoDatos.id; 

        const data = await actualizarMedicamento(idOriginal, medicamentoDatos);
        if (data) {
          alert("Medicamento modificado correctamente.");
          fetchMedicamentos(); 
        }
      } else {
        
        const data = await registrarMedicamento(medicamentoDatos);
        if (data) {
          alert("Medicamento agregado al inventario.");
          setMedicamentos([...medicamentos, data[0]]);
        }
      }
    } catch (error) {
      console.error("Error en la operación:", error);
      alert("Hubo un problema al procesar la solicitud en la base de datos.");
    } finally {
      setMedicamentoAEditar(null);
      setSelectedMedIndex(null);
    }
  };

  const abrirModalAgregar = () => {

    setMedicamentoAEditar(null);

    setSelectedMedIndex(null);

    setShowModal(true);
  };

  const abrirModalModificar = () => {
    if (selectedMedIndex === null) {
      alert("Por favor, seleccione un medicamento de la tabla haciendo clic sobre él.");
      return;
    }
    setMedicamentoAEditar(medicamentos[selectedMedIndex]);
    setShowModal(true);
  };

  const handleEliminarMedicamento = async () => {
    if (selectedMedIndex === null) {
      alert("Por favor, seleccione un medicamento de la tabla haciendo clic sobre él.");
      return;
    }

    const medicamentoSeleccionado = medicamentos[selectedMedIndex];
    
    
    if (window.confirm(`¿Está seguro que desea eliminar ${medicamentoSeleccionado.nombre}?`)) {
      try {
        await eliminarMedicamentoLogico(medicamentoSeleccionado.id);
        alert("Medicamento eliminado correctamente.");
        setSelectedMedIndex(null);
        fetchMedicamentos(); 
      } catch (error) {
        console.error("Error al eliminar:", error);
        alert("Hubo un problema al eliminar el medicamento.");
      }
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f5f7fb" }}>
      <Sidebar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Topbar user={user} />

        <main className="container-fluid py-4 px-4">
          <div className="mb-4">
            <h2 className="fw-bold">Inventario</h2>
            <p className="text-muted">
              Gestione y controle el stock de medicamentos de la clínica.
            </p>
          </div>

          <div className="card shadow-sm border-0 mb-4" 
          style={{ borderRadius: "15px" }}>
            <div className="card-body p-5 text-center">
              <h4 className="fw-bold mb-4">Control de inventario de medicamentos</h4>
              
              <div className="d-flex justify-content-center flex-wrap gap-3">
                <button 
                  onClick={abrirModalAgregar}
                  className="btn d-flex align-items-center gap-2 px-4 py-2 shadow-sm"
                  style={{ backgroundColor: "#e8f5e9", color: "#2e7d32", borderRadius: "12px", border: "none", fontWeight: "600" }}
                >
                  <FiPlusCircle size={20} /> Agregar medicamento
                </button>

                <button 
                  onClick={abrirModalModificar}
                  className="btn d-flex align-items-center gap-2 px-4 py-2 shadow-sm"
                  style={{ 
                    backgroundColor: selectedMedIndex !== null ? "#e3f2fd" : "#f5f5f5", 
                    color: selectedMedIndex !== null ? "#0d47a1" : "#1976d2", 
                    borderRadius: "12px", border: "none", fontWeight: "600" 
                  }}
                >
                  <FiEdit size={20} /> Modificar {selectedMedIndex !== null && "(Seleccionado)"}
                </button>

                <button 
                  onClick={handleEliminarMedicamento}
                  className="btn d-flex align-items-center gap-2 px-4 py-2 shadow-sm"
                  style={{ 
                    backgroundColor: "#ffebee", 
                    color: "#c62828", 
                    borderRadius: "12px", border: "none", fontWeight: "600" 
                  }}
                >
                  <FiTrash2 size={20} /> Eliminar {selectedMedIndex !== null && "(Seleccionado)"}
                </button>
              </div>
            </div>
          </div>

          <div className="card shadow-sm border-0" style={{ borderRadius: "15px" }}>
            <div className="card-body p-4">
              <h4 className="fw-bold mb-4 text-center">Medicamentos en sistema</h4>

              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0" style={{ backgroundColor: "#eef2f7" }}>
                  <thead style={{ backgroundColor: "#dce3ec" }}>
                    <tr>
                      <th className="py-3 px-4 border-bottom-0 rounded-start">Codigo</th>

                      <th className="py-3 px-4 border-bottom-0">Nombre medicamento</th>

                      <th className="py-3 px-4 border-bottom-0 text-center">Cantidad</th>

                      <th className="py-3 px-4 border-bottom-0">Fecha vencimiento</th>

                      <th className="py-3 px-4 border-bottom-0 rounded-end">Estado</th>
                    </tr>
                  </thead>

                  <tbody>
                    {loading ? (
                      <tr><td colSpan="5" className="text-center py-4">Conectando con Supabase...</td></tr>
                    ) : medicamentos.length === 0 ? (
                      <tr><td colSpan="5" className="text-center py-4">No hay medicamentos en el inventario.</td></tr>
                    ) : (
                      medicamentos.map((med, index) => (
                        <tr 
                          key={med.id || index} 
                          className="bg-white"
                          onClick={() => setSelectedMedIndex(index)}
                          style={{ 
                            cursor: "pointer",
                            backgroundColor: selectedMedIndex === index ? "#e0f2fe" : "#ffffff",
                            borderLeft: selectedMedIndex === index ? "4px solid #0284c7" : "none"
                          }}
                        >
                          <td className="py-3 px-4 text-muted">
                            {med.codigo}</td>

                          <td className="py-3 px-4 fw-medium">
                            {med.nombre}</td>
                          <td className="py-3 px-4 text-center">
                            {med.cantidad}</td>
                          <td className="py-3 px-4">
                            {med.fecha_vencimiento || med.fechaVencimiento || "Sin fecha"}
                          </td>
                          <td className="py-3 px-4">
                            <div className="d-flex align-items-center gap-2">
                              <span 
                                style={{ 
                                  width: "10px", height: "10px", 
                                  backgroundColor: med.estado === "Stock normal" ? "#4caf50" : "#ffb74d", 
                                  borderRadius: "50%", display: "inline-block"
                                }}
                              ></span>
                              <span className="small text-muted">{med.estado}</span>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              <small className="text-muted d-block mt-3">* Haga clic sobre una fila de la tabla para seleccionarla antes de presionar "Modificar".</small>
            </div>
          </div>
        </main>
      </div>

      <AgregarInventarioModal 
        show={showModal} 

        handleClose={() => setShowModal(false)} 

        onGuardar={handleGuardarMedicamento}

        medicamentoEditar={medicamentoAEditar}
      />
    </div>
  );
}

export default Inventario;