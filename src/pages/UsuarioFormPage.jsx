/**
 * Página para registrar (HU01) o actualizar (HU04) un usuario.
 * Si la URL trae un id (/usuarios/editar/:id) carga el usuario (HU03)
 * y actualiza; si no, registra uno nuevo.
 *
 * @author Manuel David Rodriguez Garcia - SENA ficha 3336117
 * @author Xiomara Andrea Guillen Ortiz - SENA ficha 3336117
 */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import usuarioService from "../services/usuarioService";
import { procesarError } from "../services/api";
import FormularioUsuario from "../components/FormularioUsuario";
import Alerta from "../components/Alerta";
import Cargando from "../components/Cargando";

function UsuarioFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const esEdicion = Boolean(id);

  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(esEdicion);
  const [mensajeError, setMensajeError] = useState("");
  const [erroresServidor, setErroresServidor] = useState({});

  // En modo edición se consulta el usuario por su id (GET /usuarios/{id})
  useEffect(() => {
    if (!esEdicion) return;
    usuarioService
      .buscarPorId(id)
      .then((datos) => setUsuario(datos))
      .catch((e) => {
        const error = procesarError(e);
        setMensajeError(
          error.estado === 404
            ? `No existe un usuario con el id ${id}.`
            : error.mensaje,
        );
      })
      .finally(() => setCargando(false));
  }, [id, esEdicion]);

  /**
   * Envía los datos a la API: POST para registrar o PUT para actualizar.
   * @param {Object} datos datos validados del formulario
   */
  const guardar = async (datos) => {
    setMensajeError("");
    setErroresServidor({});
    try {
      if (esEdicion) {
        await usuarioService.actualizar(id, datos);
        navigate("/usuarios", {
          state: {
            mensaje: `Usuario "${datos.usuario}" actualizado correctamente.`,
          },
        });
      } else {
        await usuarioService.guardar(datos);
        navigate("/usuarios", {
          state: {
            mensaje: `Usuario "${datos.usuario}" registrado correctamente.`,
          },
        });
      }
    } catch (e) {
      // 400: errores de validación por campo · 409: usuario repetido
      const error = procesarError(e);
      setMensajeError(error.mensaje);
      if (error.estado === 409) {
        setErroresServidor({ usuario: error.mensaje });
      } else {
        setErroresServidor(error.errores);
      }
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-lg-9">
        <h1 className="h3">
          {esEdicion ? `Editar usuario #${id}` : "Registrar usuario"}
        </h1>
        <p className="text-secondary">
          {esEdicion
            ? "Modifique los datos del usuario y pulse Actualizar."
            : "Complete los datos del nuevo usuario del sistema."}
        </p>

        <Alerta
          tipo="danger"
          mensaje={mensajeError}
          onCerrar={() => setMensajeError("")}
        />

        <div className="card shadow-sm">
          <div className="card-body p-4">
            {cargando ? (
              <Cargando texto="Cargando datos del usuario..." />
            ) : esEdicion && !usuario ? (
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => navigate("/usuarios")}
              >
                Volver a la lista
              </button>
            ) : (
              <FormularioUsuario
                usuarioInicial={usuario}
                onGuardar={guardar}
                onCancelar={() => navigate("/usuarios")}
                erroresServidor={erroresServidor}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsuarioFormPage;
