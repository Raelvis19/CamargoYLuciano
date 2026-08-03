import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatsCards from "../components/StatsCards";
import PacientesTable from "../components/PacientesTable";
import AlertasCard from "../components/AlertasCard";

function Home() {
    const [user, setUser] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    
    const [stats, setStats] = useState({ totalPacientes: 0, urgencias: 0 });
    const [pacientesRecientes, setPacientesRecientes] = useState([]);
    const [alertasInventario, setAlertasInventario] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            setUser(data.user);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        
        cargarDatosDashboard();

        return () => subscription.unsubscribe();
    }, []);

    const cargarDatosDashboard = async () => {
        setLoading(true);
        try {
            
            const { count: totalRegistrados, error: errorPacientes } = await supabase
                .from("registrar_paciente")
                .select("*", { count: "exact", head: true })
                .eq("activo", true);

            
            const { data: recientes } = await supabase
                .from("registrar_paciente")
                .select("*")
                .eq("activo", true)
                .order("id", { ascending: false }) 
                .limit(5);

            
            const { data: alertas } = await supabase
                .from("inventario")
                .select("*")
                .eq("activo", true)
                .lte("cantidad", 3);

            
            setStats({
                totalPacientes: totalRegistrados || 0,
                urgencias: 0 
            });
            setPacientesRecientes(recientes || []);
            setAlertasInventario(alertas || []);

        } catch (error) {
            console.error("Error al cargar los datos del panel principal:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                display: "flex",
                minHeight: "100vh",
                background: "#f5f7fb",
            }}
        >
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <div
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Topbar
                    user={user}
                    onMenuClick={() => setSidebarOpen(true)}
                />
                <main className="container-fluid py-4 px-4">

                    <div className="mb-4">
                        <h2 className="fw-bold">
                            ¡Bienvenido, {user?.user_metadata?.nombre || user?.email || "Usuario"}!
                        </h2>

                        <p className="text-muted mb-0">
                            Nos alegra verte de nuevo. Aquí tienes un resumen de la actividad del sistema.
                        </p>
                    </div>

                    
                    <StatsCards stats={stats} loading={loading} />

                    <div className="row">
                        <div className="col-lg-8">
                            <PacientesTable pacientes={pacientesRecientes} loading={loading} />
                        </div>

                        <div className="col-lg-4">
                            <AlertasCard alertas={alertasInventario} loading={loading} />
                        </div>
                    </div>

                </main>
            </div>
        </div>
    );
}

export default Home;