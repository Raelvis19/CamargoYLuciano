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
                            ¡Bienvenido, {user?.user_metadata?.nombre || user?.email}!
                        </h2>

                        <p className="text-muted mb-0">
                            Nos alegra verte de nuevo. Aquí tienes un resumen de la actividad del sistema.
                        </p>
                    </div>

                    <StatsCards />

                    <div className="row">
                        <div className="col-lg-8">
                            <PacientesTable />
                        </div>

                        <div className="col-lg-4">
                            <AlertasCard />
                        </div>
                    </div>

                </main>

              

            </div>
        </div>
    );
}

export default Home;
