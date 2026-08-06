import { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiMail } from "react-icons/fi";
import { supabase } from "../supabase/supabaseClient";
import { emailRegex } from "../utils/validators";
import logo from "../assets/Logo.png";
import "../Login.css";

export default function RecuperarPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    if (!emailRegex.test(cleanEmail)) {
      setError("Escribe un correo electrónico válido.");
      return;
    }
    setLoading(true); setError(""); setMessage("");
    try {
      const redirectTo = import.meta.env.VITE_PASSWORD_RESET_URL || `${window.location.origin}/restablecer-password`;
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(cleanEmail, { redirectTo });
      if (resetError) throw resetError;
      setMessage("Te enviamos un enlace para restablecer tu contraseña. Revisa también la carpeta de correo no deseado.");
    } catch (err) {
      setError(err?.message || "No fue posible enviar el correo de recuperación.");
    } finally { setLoading(false); }
  }

  return <div className="login-bg"><div className="auth-shell auth-shell--single"><section className="auth-form-panel"><div className="auth-form-container">
    <img src={logo} alt="UCNE" className="auth-mini-logo" />
    <span className="auth-eyebrow text-primary">Recuperación de acceso</span><h2>¿Olvidaste tu contraseña?</h2><p className="auth-subtitle">Escribe el correo asociado a tu cuenta y te enviaremos un enlace seguro.</p>
    {message && <div className="inline-message success">{message}</div>}{error && <div className="inline-message error">{error}</div>}
    <form onSubmit={handleSubmit} noValidate><div className="form-field"><label htmlFor="reset-email">Correo electrónico</label><div className={`input-with-icon ${error ? "is-invalid" : ""}`}><FiMail /><input id="reset-email" type="email" value={email} onChange={(e)=>{setEmail(e.target.value);setError("")}} autoComplete="email" placeholder="correo@ejemplo.com" /></div></div>
    <button className="auth-primary-btn" disabled={loading}>{loading ? <><span className="button-spinner" /> Enviando...</> : "Enviar enlace de recuperación"}</button></form>
    <p className="auth-switch"><Link to="/"><FiArrowLeft /> Volver al inicio de sesión</Link></p>
  </div></section></div></div>;
}
