# Parqueadero – Front-end (módulo de usuarios)

Evidencia **GA7-220501096-AA4-EV03** – Componente front-end del proyecto formativo.  
SENA · Tecnólogo en Análisis y Desarrollo de Software · Ficha 3336117  
Aprendices: Manuel David Rodríguez García y Xiomara Andrea Guillén Ortiz  
Tutora: Doris Matilde Ordóñez Lasso

Interfaz web en **React** del módulo de gestión de usuarios del sistema de parqueadero.
Consume la API REST desarrollada con Spring Boot en la evidencia AA3
(repositorio [parqueadero-spring](https://github.com/DAVID-RODRIGUEZ2026/parqueadero-spring)).

## Funcionalidades (historias de usuario)

| HU   | Funcionalidad         | Pantalla / ruta          | Petición a la API         |
| ---- | --------------------- | ------------------------ | ------------------------- |
| HU01 | Registrar usuario     | `/usuarios/nuevo`        | `POST /usuarios`          |
| HU02 | Listar usuarios       | `/usuarios`              | `GET /usuarios`           |
| HU03 | Consultar usuario     | `/usuarios/editar/:id`   | `GET /usuarios/{id}`      |
| HU04 | Actualizar usuario    | `/usuarios/editar/:id`   | `PUT /usuarios/{id}`      |
| HU05 | Eliminar usuario      | `/usuarios` (botón)      | `DELETE /usuarios/{id}`   |

Validaciones en el navegador (las mismas del back-end): campos obligatorios, solo letras en
nombre y apellido, documento de 6 a 10 números, fecha de nacimiento pasada, usuario de 4 a 20
caracteres sin espacios, contraseña de 8 a 30 caracteres con letras y números. También se
muestran los errores que responde la API (400 y 409).

## Tecnologías

- React 19 + Vite
- React Router (navegación entre páginas)
- Axios (consumo de la API REST)
- Bootstrap 5 (estilos y diseño responsivo)
- ESLint y Prettier (estándares de codificación)

## Estructura

```
src/
├── main.jsx              # punto de entrada
├── App.jsx               # rutas de la aplicación
├── index.css             # estilos propios
├── layout/               # Layout, BarraNavegacion, PiePagina
├── pages/                # InicioPage, UsuariosPage, UsuarioFormPage, NoEncontradoPage
├── components/           # FormularioUsuario, CampoFormulario, TablaUsuarios,
│                         # ModalConfirmacion, Alerta, Cargando
├── hooks/                # useFormulario (manejo y validación de formularios)
├── services/             # api.js (Axios) y usuarioService.js
└── utils/                # validaciones.js
```

## Cómo ejecutar

Requisitos: Node.js 20 o superior y el back-end `parqueadero-spring` en ejecución
(MySQL encendido y la API en `http://localhost:8080`).

```bash
npm install      # instala las dependencias
npm run dev      # inicia el servidor de desarrollo en http://localhost:5173
npm run lint     # revisa el código con ESLint
npm run build    # genera la versión de producción en dist/
```

Para usar otra dirección de la API, cree un archivo `.env` con `VITE_API_URL=http://servidor:puerto`.

> El back-end debe permitir peticiones desde `http://localhost:5173` (CORS), con la anotación
> `@CrossOrigin(origins = "http://localhost:5173")` en `UsuarioController`.