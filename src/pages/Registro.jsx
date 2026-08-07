import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiLock, FiMail, FiUser } from "react-icons/fi";
import { supabase } from "../supabase/supabaseClient";
import { emailRegex, validatePassword } from "../utils/validators";
import logo from "../assets/Logo.png";
import "../Login.css";

function Registro() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nombre: "", email: "", password: "", confirmarPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const update = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "", general: "" }));
  };

  async function handleRegistro(event) {
    event.preventDefault();
    const nextErrors = {};
    const nombre = form.nombre.trim();
    const email = form.email.trim().toLowerCase();
    if (nombre.length < 3) nextErrors.nombre = "Escribe tu nombre completo.";
    if (!emailRegex.test(email)) nextErrors.email = "Escribe un correo electrónico válido.";
    const passwordError = validatePassword(form.password);
    if (passwordError) nextErrors.password = passwordError;
    if (form.password !== form.confirmarPassword) nextErrors.confirmarPassword = "Las contraseñas no coinciden.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({ email, password: form.password, options: { data: { nombre } } });
      if (error) throw error;
      navigate("/", { replace: true, state: { message: "Cuenta creada. Revisa tu correo si la confirmación está habilitada." } });
    } catch (error) {
      setErrors({ general: error?.message || "No fue posible crear la cuenta." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-bg">
      <div className="auth-shell">
        <section className="auth-brand-panel compact">
          <img src={logo} alt="Universidad Católica Nordestana" className="login-logo" />
          <div><span className="auth-eyebrow">Únete al sistema</span><h1>Crea tu cuenta</h1><p>Accede a las herramientas de gestión clínica y académica.</p></div>
          <small>Universidad Católica Nordestana</small>
        </section>
        <section className="auth-form-panel">
          <div className="auth-form-container">
            <span className="auth-eyebrow text-primary">Nuevo usuario</span><h2>Registro</h2><p className="auth-subtitle">Completa tus datos para crear una cuenta.</p>
            {errors.general && <div className="inline-message error">{errors.general}</div>}
            <form onSubmit={handleRegistro} noValidate>
              <AuthField icon={<FiUser />} label="Nombre completo" value={form.nombre} onChange={(v) => update("nombre", v)} error={errors.nombre} autoComplete="name" />
              <AuthField icon={<FiMail />} label="Correo electrónico" type="email" value={form.email} onChange={(v) => update("email", v)} error={errors.email} autoComplete="email" />
              <AuthField icon={<FiLock />} label="Contraseña" type={showPassword ? "text" : "password"} value={form.password} onChange={(v) => update("password", v)} error={errors.password} autoComplete="new-password" action={<button type="button" className="password-toggle" onClick={() => setShowPassword((v) => !v)}>{showPassword ? <FiEyeOff /> : <FiEye />}</button>} />
              <AuthField icon={<FiLock />} label="Confirmar contraseña" type={showPassword ? "text" : "password"} value={form.confirmarPassword} onChange={(v) => update("confirmarPassword", v)} error={errors.confirmarPassword} autoComplete="new-password" />
              <div className="password-hint">Usa 8 caracteres o más, con mayúscula, minúscula y número.</div>
              <button type="submit" className="auth-primary-btn" disabled={loading}>{loading ? <><span className="button-spinner" /> Creando cuenta...</> : "Crear cuenta"}</button>
            </form>
            <p className="auth-switch">¿Ya tienes una cuenta? <Link to="/">Iniciar sesión</Link></p>
          </div>
        </section>
      </div>
    </div>
  );
}

function AuthField({ icon, label, type = "text", value, onChange, error, autoComplete, action }) {
  const id = label.toLowerCase().replaceAll(" ", "-");
  return <div className="form-field"><label htmlFor={id}>{label}</label><div className={`input-with-icon ${error ? "is-invalid" : ""}`}>{icon}<input id={id} type={type} value={value} onChange={(e) => onChange(e.target.value)} autoComplete={autoComplete} />{action}</div>{error && <small className="field-error">{error}</small>}</div>;
}

export default Registro;
