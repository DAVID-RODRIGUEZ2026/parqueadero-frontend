/**
 * Página de gestión de usuarios (HU02 Listar y HU05 Eliminar).
 * Consulta la lista en la API, la muestra en una tabla y permite
 * eliminar un usuario previa confirmación.
 *
 * @author Manuel David Rodriguez Garcia - SENA ficha 3336117
 * @author Xiomara Andrea Guillen Ortiz - SENA ficha 3336117
 */
import { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import usuarioService from "../services/usuarioService";
import { procesarError } from "../services/api";
import TablaUsuarios from "../components/TablaUsuarios";
import ModalConfirmacion from "../components/ModalConfirmacion";
import Alerta from "../components/Alerta";
import Cargando from "../components/Cargando";

function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({ tipo: "info", mensaje: "" });
  const [usuarioAEliminar, setUsuarioAEliminar] = useState(null);
  const [eliminando, setEliminando] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  /** Consulta la lista de usuarios en la API (GET /usuarios). */
  const cargarUsuarios = useCallback(async () => {
    setCargando(true);
    try {
      setUsuarios(await usuarioService.listar());
    } catch (e) {
      setAlerta({ tipo: "danger", mensaje: procesarError(e).mensaje });
    } finally {
      setCargando(false);
    }
  }, []);

  // Al abrir la página se cargan los usuarios
  useEffect(() => {
    cargarUsuarios();
  }, [cargarUsuarios]);

  // Si se llega desde el formulario con un mensaje de éxito, se muestra una vez
  useEffect(() => {
    if (location.state?.mensaje) {
      setAlerta({ tipo: "success", mensaje: location.state.mensaje });
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location, navigate]);

  /** Confirma la eliminación (DELETE /usuarios/{id}). */
  const confirmarEliminacion = async () => {
    setEliminando(true);
    try {
      await usuarioService.eliminar(usuarioAEliminar.id);
      setAlerta({
        tipo: "success",
        mensaje: `El usuario "${usuarioAEliminar.usuario}" se eliminó correctamente.`,
      });
      await cargarUsuarios();
    } catch (e) {
      setAlerta({ tipo: "danger", mensaje: procesarError(e).mensaje });
    } finally {
      setEliminando(false);
      setUsuarioAEliminar(null);
    }
  };

  return (
    <>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <div>
          <h1 className="h3 mb-0">Gestión de usuarios</h1>
          <p className="text-secondary mb-0">
            Usuarios con acceso al sistema del parqueadero.
          </p>
        </div>
        <Link to="/usuarios/nuevo" className="btn btn-primary">
          + Nuevo usuario
        </Link>
      </div>

      <Alerta
        tipo={alerta.tipo}
        mensaje={alerta.mensaje}
        onCerrar={() => setAlerta({ tipo: "info", mensaje: "" })}
      />

      <div className="card shadow-sm">
        <div className="card-body">
          {cargando ? (
            <Cargando texto="Consultando usuarios..." />
          ) : (
            <TablaUsuarios
              usuarios={usuarios}
              onEliminar={setUsuarioAEliminar}
            />
          )}
        </div>
      </div>

      <ModalConfirmacion
        visible={Boolean(usuarioAEliminar)}
        titulo="Eliminar usuario"
        mensaje={
          usuarioAEliminar
            ? `¿Está seguro de eliminar al usuario "${usuarioAEliminar.usuario}" (${usuarioAEliminar.nombre} ${usuarioAEliminar.apellido})? Esta acción no se puede deshacer.`
            : ""
        }
        onConfirmar={confirmarEliminacion}
        onCancelar={() => setUsuarioAEliminar(null)}
        procesando={eliminando}
      />
    </>
  );
}

export default UsuariosPage;
