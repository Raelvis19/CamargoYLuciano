
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";
import logo from "../assets/Logo.png";
import "../Login.css";

function Login() {
  const navigate = useNavigate();
    console.log("SUPABASE_URL:", import.meta.env.VITE_SUPABASE_URL);
    console.log("SUPABASE_KEY:", import.meta.env.VITE_SUPABASE_ANON_KEY);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert("Error: " + error.message);
      return;
    }

    alert("Inicio de sesión exitoso");
    navigate("/home");
  }

  return (
    <div className="login-bg d-flex justify-content-center align-items-center">
      <div className="container-fluid d-flex justify-content-center">
        <div className="row login-card shadow-lg overflow-hidden">

          {/* Panel izquierdo */}
          <div className="col-lg-6 d-none d-lg-flex login-left">
            <div className="text-center">
              <img
                src={logo}
                alt="Logo"
                className="login-logo mb-4"
              />

              <h1 className="fw-bold text-white">
                Bienvenidos
              </h1>

              <h4 className="text-light">
                Sistema de Gestión de Enfermeria
              </h4>
              <h4 className="text-light">
                
              </h4>
              <h4>
            
              </h4>
              <h4 className="text-light">
                <br />
                <br />
                <br />
                <br />
                <br />
                Proyecto En desarrollo por:
                Raelvis, Lewis, Hamlet y Alexis
              </h4>
            </div>
          </div>

          {/* Panel derecho */}
          <div className="col-lg-6 bg-light">
            <div className="login-form-container">

              <h3 className="fw-bold mb-4">
                Iniciar Sesión
              </h3>

              <form onSubmit={handleLogin}>

                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Correo electrónico
                  </label>

                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="correo@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Contraseña
                  </label>

                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 btn-lg login-btn"
                  disabled={loading}
                >
                  {loading ? "Conectando..." : "Conectar"}
                </button>

              </form>

              <div className="text-center mt-4">
                <small className="text-muted">
                  ¿Olvidaste tu contraseña?
                </small>
              </div>

              <div className="text-center mt-3">
                <Link to="/registro">
                  ¿No tienes cuenta? Regístrate aquí
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;
