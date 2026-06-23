import { useState, useEffect } from "react";
import { supabase } from "../supabase/supabaseClient";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import SearchBar from "../components/paciente/buscar/SearchBar";
import ResultsTable from "../components/paciente/buscar/ResultsTable";
import PatientDetail from "../components/paciente/buscar/PatientDetail";
import PatientEmptyState from "../components/paciente/buscar/PatientEmptyState";

export default function BuscarPaciente() {
  const [user, setUser] = useState(null);
  const [query, setQuery] = useState("");
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSearch = async () => {
    setLoading(true);

    setTimeout(() => {
      const mockData = [
        { id: 1, nombre: "Juan Perez", cedula: "001-1234567-8", edad: 30, estado: "En espera", prioridad: "Alta" },
        { id: 2, nombre: "Ana Lopez", cedula: "002-9876543-2", edad: 25, estado: "Consulta", prioridad: "Media" },
        { id: 3, nombre: "Carlos Gómez", cedula: "003-5555555-5", edad: 40, estado: "Atendido", prioridad: "Baja" },
      ];

      const filtered = mockData.filter(p =>
        p.nombre.toLowerCase().includes(query.toLowerCase()) ||
        p.cedula.includes(query)
      );

      setPatients(filtered);
      setLoading(false);
    }, 800);
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f5f7fb",
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Topbar user={user} />

        <main className="container-fluid py-4 px-4">
          
          {/* Encabezado */}
          <div className="mb-4">
            <h2 className="fw-bold">Buscar paciente</h2>
            <p className="text-muted">
              Encuentre y gestione la información de los pacientes registrados.
            </p>
          </div>

          {/* Buscador envuelto en una tarjeta limpia de Bootstrap */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              <SearchBar
                query={query}
                setQuery={setQuery}
                onSearch={handleSearch}
                loading={loading}
              />
            </div>
          </div>

          {/* Tabla envuelta en otra tarjeta limpia */}
          <div className="card border-0 shadow-sm">
            <div className="card-body p-0"> {/* p-0 para que la tabla toque los bordes si lo prefieres */}
              <ResultsTable
                patients={patients}
                onSelectPatient={setSelectedPatient}
              />
              
              {patients.length === 0 && !loading && (
                <div className="p-4 text-center">
                  <PatientEmptyState />
                </div>
              )}
            </div>
          </div>

          {selectedPatient && (
            <div className="mt-4">
              <PatientDetail patient={selectedPatient} />
            </div>
          )}

        </main>
      </div>
    </div>
  );
}