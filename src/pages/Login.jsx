import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";
import { supabase } from "../supabase/supabaseClient";
import { emailRegex } from "../utils/validators";
import { notify } from "../utils/notify";
import logo from "../assets/Logo.png";
import "../Login.css";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  async function handleLogin(event) {
    event.preventDefault();
    const nextErrors = {};
    const cleanEmail = email.trim().toLowerCase();

    if (!emailRegex.test(cleanEmail)) nextErrors.email = "Escribe un correo electrónico válido.";
    if (!password) nextErrors.password = "Escribe tu contraseña.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email: cleanEmail, password });
      if (error) throw error;
      notify.success("Sesión iniciada correctamente.");
      navigate("/home", { replace: true });
    } catch (error) {
      const message = error?.message?.includes("Invalid login credentials")
        ? "El correo o la contraseña no son correctos."
        : error?.message || "No fue posible iniciar sesión.";
      setErrors({ general: message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-bg">
      <div className="auth-shell">
        <section className="auth-brand-panel">
          <img src={logo} alt="Universidad Católica Nordestana" className="login-logo" />
          <div>
            <span className="auth-eyebrow">Plataforma clínica académica</span>
            <h1>Sistema de Gestión de Enfermería</h1>
            <p>Pacientes, consultas, inventario y seguimiento clínico desde un solo lugar.</p>
          </div>
          <small>Desarrollado por Raelvis, Lewis, Hamlet y Alexis</small>
        </section>

        <section className="auth-form-panel">
          <div className="auth-form-container">
            <span className="auth-eyebrow text-primary">Acceso seguro</span>
            <h2>Bienvenido de nuevo</h2>
            <p className="auth-subtitle">Ingresa tus credenciales para continuar.</p>

            {location.state?.message && <div className="inline-message success">{location.state.message}</div>}
            {errors.general && <div className="inline-message error">{errors.general}</div>}

            <form onSubmit={handleLogin} noValidate>
              <div className="form-field">
                <label htmlFor="email">Correo electrónico</label>
                <div className={`input-with-icon ${errors.email ? "is-invalid" : ""}`}>
                  <FiMail />
                  <input id="email" type="email" placeholder="correo@ejemplo.com" value={email}
                    onChange={(e) => { setEmail(e.target.value); setErrors((v) => ({ ...v, email: "", general: "" })); }} autoComplete="email" />
                </div>
                {errors.email && <small className="field-error">{errors.email}</small>}
              </div>

              <div className="form-field">
                <div className="label-row"><label htmlFor="password">Contraseña</label><Link to="/recuperar-password">¿La olvidaste?</Link></div>
                <div className={`input-with-icon ${errors.password ? "is-invalid" : ""}`}>
                  <FiLock />
                  <input id="password" type={showPassword ? "text" : "password"} placeholder="Tu contraseña" value={password}
                    onChange={(e) => { setPassword(e.target.value); setErrors((v) => ({ ...v, password: "", general: "" })); }} autoComplete="current-password" />
                  <button type="button" className="password-toggle" onClick={() => setShowPassword((v) => !v)} aria-label="Mostrar u ocultar contraseña">
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                {errors.password && <small className="field-error">{errors.password}</small>}
              </div>

              <button type="submit" className="auth-primary-btn" disabled={loading}>
                {loading ? <><span className="button-spinner" /> Verificando...</> : "Iniciar sesión"}
              </button>
            </form>

            <p className="auth-switch">¿No tienes una cuenta? <Link to="/registro">Crear cuenta</Link></p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Login;
