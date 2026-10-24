/**
 * Página que se muestra cuando la ruta no existe (error 404).
 *
 * @author Manuel David Rodriguez Garcia - SENA ficha 3336117
 * @author Xiomara Andrea Guillen Ortiz - SENA ficha 3336117
 */
import { Link } from "react-router-dom";

function NoEncontradoPage() {
  return (
    <div className="text-center py-5">
      <p className="display-1 fw-bold text-primary">404</p>
      <h1 className="h4">Página no encontrada</h1>
      <p className="text-secondary">
        La dirección que intenta abrir no existe en el sistema.
      </p>
      <Link to="/" className="btn btn-primary">
        Volver al inicio
      </Link>
    </div>
  );
}

export default NoEncontradoPage;
