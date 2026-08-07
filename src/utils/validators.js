export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const cedulaRegex = /^\d{3}-?\d{7}-?\d$/;
export const phoneRegex = /^(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

export function validatePassword(password) {
  if (password.length < 8) return "La contraseña debe tener al menos 8 caracteres.";
  if (!/[A-Z]/.test(password)) return "Incluye al menos una letra mayúscula.";
  if (!/[a-z]/.test(password)) return "Incluye al menos una letra minúscula.";
  if (!/\d/.test(password)) return "Incluye al menos un número.";
  return "";
}

export function normalizeText(value) {
  return String(value ?? "").trim();
}
