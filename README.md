# ReserTech

**ReserTech** es una aplicación web moderna que permite a los usuarios reservar espacios físicos dentro de una comunidad: salas de estudio, salas de reuniones, canchas deportivas, cápsulas de descanso, entre otros. La plataforma busca optimizar el uso de estos espacios a través de una interfaz intuitiva, validaciones inteligentes y un sistema de autenticación seguro.

---
## 👨‍💻 Autores

- [**William Andrés Urrutia Torres**](https://github.com/UrrutiaTs17) – Desarrollador principal  
- [**Karen Dayana Mateus Gomez 2**](https://github.com/KarenMateus8) – Colaboradora frontend/backend  
- [**Daniel Alejandro Ayala Vallejo 3**](https://github.com/DanieL111039) – Diseño y pruebas

---
## 🌐 Descripción general

El proyecto fue construido con **Next.js 14** utilizando el nuevo enrutador de aplicaciones (App Router), estilizado con **Tailwind CSS**, y potenciado por **Supabase** como backend para la autenticación, base de datos y almacenamiento de imágenes. Está diseñado para ser **escalable, responsive** y amigable tanto para el administrador como para el usuario final.

---

## 🚀 Funcionalidades principales

### 👤 Autenticación
- Registro e inicio de sesión con **Supabase Auth**
- Acceso a rutas protegidas solo para usuarios autenticados
- Almacenamiento del correo electrónico del usuario como identificador en reservas

### 🗂 Espacios disponibles
- Listado completo de todos los espacios con:
  - Imagen
  - Capacidad máxima
  - Precio regular y con descuento
  - Normativa del espacio

### 📝 Creación de reservas
- Selección de fecha y hora
- Autocompletado de hora final (+2 horas)
- Validación:
  - No se puede reservar en fechas pasadas
  - La hora final debe ser mayor a la inicial
  - No puede haber **conflictos de horario** con otras reservas activas del mismo espacio

### 👥 Perfil de usuario
- Visualización de información del usuario (correo)
- Listado de todas las reservas activas hechas por el usuario
- Opciones para **eliminar o editar** una reserva
- Visualización clara del espacio reservado, incluyendo imagen y datos

### 🛠 Edición de reservas
- Acceso mediante `/edit-reservation/[id]`
- Formulario precargado con los datos actuales
- Posibilidad de modificar fecha, hora y número de personas
- Validación de conflictos al editar

### 📋 Panel general de reservas
- Vista completa de **todas las reservaciones activas** del sistema
- Accesible por administradores
- Se muestra nombre del espacio, fecha, hora, número de personas y valor

---

## 🧰 Tecnologías utilizadas

- **Next.js 14**
- **Tailwind CSS**
- **Supabase**:
  - Auth
  - PostgreSQL
  - Storage (para imágenes)
- **TypeScript**
- **Vercel** (para despliegue)

---

## 🛠 Instalación local

1. Clonar el repositorio:

```bash
git clone https://github.com/UrrutiaTs17/ReserTech_Project.git
cd ReserTech_Project

