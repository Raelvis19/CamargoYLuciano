import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiLock } from "react-icons/fi";
import { supabase } from "../supabase/supabaseClient";
import { validatePassword } from "../utils/validators";
import logo from "../assets/Logo.png";
import "../Login.css";

export default function RestablecerPassword() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setReady(Boolean(data.session)));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") setReady(true);
    });
    return () => subscription.unsubscribe();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const passwordError = validatePassword(password);
    if (passwordError) { setError(passwordError); return; }
    if (password !== confirm) { setError("Las contraseñas no coinciden."); return; }
    setLoading(true); setError("");
    try {
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) throw updateError;
      setMessage("Tu contraseña fue actualizada correctamente.");
      window.setTimeout(() => navigate("/", { replace: true, state: { message: "Contraseña actualizada. Ya puedes iniciar sesión." } }), 1500);
    } catch (err) { setError(err?.message || "No fue posible actualizar la contraseña."); }
    finally { setLoading(false); }
  }

  return <div className="login-bg"><div className="auth-shell auth-shell--single"><section className="auth-form-panel"><div className="auth-form-container">
    <img src={logo} alt="UCNE" className="auth-mini-logo" /><span className="auth-eyebrow text-primary">Nueva contraseña</span><h2>Restablecer acceso</h2>
    {!ready ? <div className="inline-message error">El enlace no es válido o expiró. Solicita uno nuevo desde la pantalla de inicio.</div> : <>
      <p className="auth-subtitle">Crea una contraseña segura para tu cuenta.</p>{message && <div className="inline-message success">{message}</div>}{error && <div className="inline-message error">{error}</div>}
      <form onSubmit={handleSubmit}><div className="form-field"><label>Nueva contraseña</label><div className="input-with-icon"><FiLock/><input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} autoComplete="new-password" /></div></div><div className="form-field"><label>Confirmar contraseña</label><div className="input-with-icon"><FiLock/><input type="password" value={confirm} onChange={(e)=>setConfirm(e.target.value)} autoComplete="new-password" /></div></div><button className="auth-primary-btn" disabled={loading}>{loading ? "Guardando..." : "Actualizar contraseña"}</button></form>
    </>}<p className="auth-switch"><Link to="/">Volver al inicio</Link></p>
  </div></section></div></div>;
}
