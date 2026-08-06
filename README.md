# 🏥 UCNE Enfermería

<div align="center">

<img src="public/Logo.png" alt="UCNE Enfermería" width="180"/>

# Sistema de Gestión de Enfermería

### Proyecto Académico - Universidad Católica Nordestana (UCNE)

Sistema de escritorio desarrollado con **React + Electron + SQLite**, diseñado para la administración de pacientes, historial clínico, inventario de medicamentos y atención médica **sin necesidad de conexión a Internet**.

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Electron](https://img.shields.io/badge/Electron-Desktop-47848F?logo=electron)
![SQLite](https://img.shields.io/badge/SQLite-Offline-003B57?logo=sqlite)
![Vite](https://img.shields.io/badge/Vite-8-purple?logo=vite)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-7952B3?logo=bootstrap)

</div>

---

# 📖 Descripción

UCNE Enfermería es una aplicación de escritorio orientada a facilitar la gestión de información clínica en pequeños consultorios, clínicas y centros educativos.

El sistema permite registrar pacientes, administrar inventario de medicamentos, gestionar prioridades médicas y mantener un historial organizado de la atención brindada.

A diferencia de una aplicación web tradicional, esta versión funciona completamente **offline**, almacenando toda la información en una base de datos SQLite local.

---

# ✨ Características

- 🔐 Inicio de sesión local
- 👤 Registro de usuarios
- 🩺 Registro de pacientes
- 📋 Consulta de historial clínico
- 💊 Administración de inventario
- 📑 Gestión de recetas médicas
- 🚨 Sistema de prioridades
- 💾 Base de datos SQLite
- 🌐 Funciona sin Internet
- 🖥️ Aplicación de escritorio con Electron
- 🚀 Instalador para Windows

---

# 🛠️ Tecnologías utilizadas

| Tecnología | Uso |
|------------|-----|
| React 19 | Interfaz de usuario |
| Electron | Aplicación de escritorio |
| SQLite | Base de datos local |
| Vite | Bundler |
| Bootstrap 5 | Diseño responsive |
| React Router | Navegación |
| React Icons | Iconografía |

---

# 📂 Estructura del proyecto

```
UCNE-Enfermeria
│
├── electron/
│   ├── assets/
│   ├── database/
│   ├── ipc/
│   ├── main.js
│   └── preload.cjs
│
├── public/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── assets/
│   └── styles/
│
├── package.json
└── vite.config.js
```

---

# ⚙️ Instalación

## Clonar el proyecto

```bash
git clone https://github.com/TU-USUARIO/UCNE-Enfermeria.git
```

Entrar al proyecto

```bash
cd UCNE-Enfermeria
```

Instalar dependencias

```bash
npm install
```

---

# ▶️ Ejecutar en modo desarrollo

```bash
npm run electron-dev
```

---

# 📦 Generar instalador

```bash
npm run dist
```

El instalador será generado en la carpeta:

```
release/
```

---

# 💾 Base de datos

El sistema utiliza una base de datos SQLite.

La base se crea automáticamente durante la primera ejecución.

Ubicación:

```
C:\Users\<Usuario>\AppData\Roaming\UCNE Enfermería\
```

No requiere instalar:

- SQL Server
- PostgreSQL
- MySQL
- XAMPP

---

# 📋 Funcionalidades

## Gestión de Usuarios

- Registro
- Inicio de sesión
- Autenticación local

## Gestión de Pacientes

- Registrar pacientes
- Buscar pacientes
- Actualizar información
- Historial clínico

## Inventario

- Registrar medicamentos
- Control de existencias

## Recetas

- Registrar recetas médicas
- Consultar recetas

## Prioridades

- Clasificación de pacientes
- Control de atención

---

# 🖼️ Capturas

> Agrega aquí imágenes del sistema.

### Login

```
docs/login.png
```

### Dashboard

```
docs/dashboard.png
```

### Registro de Pacientes

```
docs/pacientes.png
```

### Inventario

```
docs/inventario.png
```

---

# 🎯 Objetivo del proyecto

Desarrollar una aplicación de escritorio para optimizar la gestión de información de enfermería mediante herramientas modernas de desarrollo, proporcionando una solución rápida, organizada y completamente funcional sin conexión a Internet.

---

# 🚀 Futuras mejoras

- Reportes PDF
- Copias de seguridad automáticas
- Restauración de base de datos
- Dashboard con estadísticas
- Roles de usuario
- Impresión de recetas
- Exportación a Excel
- Historial de auditoría

---

# 👨‍💻 Autor

**Raelvis Paulino**

Ingeniería en Sistemas

Universidad Católica Nordestana (UCNE)

---

# 📜 Licencia

Proyecto desarrollado con fines académicos.

© 2026 Raelvis Paulino.
