# Mejoras aplicadas

- Alertas nativas reemplazadas por notificaciones no bloqueantes.
- Tema claro/oscuro global y persistente mediante `localStorage`.
- Rediseño completo de inicio de sesión y registro.
- Validación de correo, contraseña, pacientes, inventario y medicamentos.
- Recuperación y restablecimiento de contraseña con Supabase Auth.
- Router compatible con navegador y Electron (`BrowserRouter` / `HashRouter`).
- Corrección de la ruta sensible a mayúsculas de `InventarioService.js`.

## Configuración requerida para recuperar contraseña

En Supabase, agrega las URL permitidas en **Authentication > URL Configuration**:

- `http://localhost:5173/restablecer-password`
- `https://TU-DOMINIO.vercel.app/restablecer-password`

Opcionalmente define en `.env.local`:

```env
VITE_PASSWORD_RESET_URL=https://TU-DOMINIO.vercel.app/restablecer-password
```
