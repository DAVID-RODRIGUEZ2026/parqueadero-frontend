/**
 * Página de inicio: muestra el total de usuarios registrados y el
 * estado de conexión con la API, con accesos rápidos al módulo.
 *
 * @author Manuel David Rodriguez Garcia - SENA ficha 3336117
 * @author Xiomara Andrea Guillen Ortiz - SENA ficha 3336117
 */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import usuarioService from "../services/usuarioService";
import { API_URL, procesarError } from "../services/api";
import Cargando from "../components/Cargando";

function InicioPage() {
  const [totalUsuarios, setTotalUsuarios] = useState(null);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(true);

  // Al cargar la página se consulta la API para saber cuántos usuarios hay
  useEffect(() => {
    usuarioService
      .listar()
      .then((lista) => setTotalUsuarios(lista.length))
      .catch((e) => setError(procesarError(e).mensaje))
      .finally(() => setCargando(false));
  }, []);

  return (
    <>
      <div className="p-4 p-md-5 mb-4 rounded-3 hero">
        <h1 className="display-6 fw-bold">Sistema de gestión de parqueadero</h1>
        <p className="lead mb-4">
          Módulo de gestión de usuarios: registre, consulte, actualice y elimine
          los usuarios que acceden al sistema.
        </p>
        <div className="d-flex flex-wrap gap-2">
          <Link to="/usuarios" className="btn btn-light btn-lg">
            Ver usuarios
          </Link>
          <Link to="/usuarios/nuevo" className="btn btn-outline-light btn-lg">
            Registrar usuario
          </Link>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-md-6">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h2 className="h6 text-secondary">Usuarios registrados</h2>
              {cargando ? (
                <Cargando />
              ) : (
                <p className="display-5 fw-bold mb-0">
                  {error ? "–" : totalUsuarios}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h2 className="h6 text-secondary">Conexión con la API</h2>
              {cargando ? (
                <Cargando texto="Verificando..." />
              ) : error ? (
                <p className="text-danger mb-0">{error}</p>
              ) : (
                <p className="text-success fw-semibold mb-0">
                  Conectado a {API_URL}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default InicioPage;
