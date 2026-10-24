/**
 * Estructura común de todas las páginas: barra de navegación arriba,
 * contenido en el centro y pie de página abajo.
 * <Outlet /> es el lugar donde React Router dibuja la página actual.
 *
 * @author Manuel David Rodriguez Garcia - SENA ficha 3336117
 * @author Xiomara Andrea Guillen Ortiz - SENA ficha 3336117
 */
import { Outlet } from "react-router-dom";
import BarraNavegacion from "./BarraNavegacion";
import PiePagina from "./PiePagina";

function Layout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <BarraNavegacion />
      <main className="container py-4 flex-grow-1">
        <Outlet />
      </main>
      <PiePagina />
    </div>
  );
}

export default Layout;
