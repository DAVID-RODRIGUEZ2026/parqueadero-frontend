/**
 * Barra de navegación superior con el nombre del sistema y el menú.
 * NavLink resalta automáticamente la opción de la página actual.
 *
 * @author Manuel David Rodriguez Garcia - SENA ficha 3336117
 * @author Xiomara Andrea Guillen Ortiz - SENA ficha 3336117
 */
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function BarraNavegacion() {
  // Controla si el menú está abierto en pantallas pequeñas (celular)
  const [menuAbierto, setMenuAbierto] = useState(false);

  /** Clase de cada enlace: "active" cuando es la página actual. */
  const claseEnlace = ({ isActive }) =>
    `nav-link ${isActive ? "active fw-semibold" : ""}`;

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary-subtle-custom">
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
          <span className="logo-p" aria-hidden="true">
            P
          </span>
          Parqueadero Rodríguez
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="menuPrincipal"
          aria-expanded={menuAbierto}
          aria-label="Abrir menú"
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          id="menuPrincipal"
          className={`collapse navbar-collapse ${menuAbierto ? "show" : ""}`}
        >
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink
                to="/"
                end
                className={claseEnlace}
                onClick={() => setMenuAbierto(false)}
              >
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/usuarios"
                end
                className={claseEnlace}
                onClick={() => setMenuAbierto(false)}
              >
                Usuarios
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/usuarios/nuevo"
                className={claseEnlace}
                onClick={() => setMenuAbierto(false)}
              >
                Nuevo usuario
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default BarraNavegacion;
