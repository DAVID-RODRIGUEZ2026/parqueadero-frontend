/**
 * Servicio de usuarios: agrupa las peticiones HTTP al recurso /usuarios
 * de la API REST. Separa la comunicación con el servidor de los
 * componentes visuales.
 *
 * @author Manuel David Rodriguez Garcia - SENA ficha 3336117
 * @author Xiomara Andrea Guillen Ortiz - SENA ficha 3336117
 */
import api from "./api";

/** Ruta del recurso en la API. */
const RECURSO = "/usuarios";

const usuarioService = {
  /**
   * GET /usuarios : obtiene la lista de usuarios.
   * @returns {Promise<Array>} lista de usuarios
   */
  async listar() {
    const respuesta = await api.get(RECURSO);
    return respuesta.data;
  },

  /**
   * GET /usuarios/{id} : obtiene un usuario por su id.
   * @param {number} id identificador del usuario
   * @returns {Promise<Object>} usuario encontrado
   */
  async buscarPorId(id) {
    const respuesta = await api.get(`${RECURSO}/${id}`);
    return respuesta.data;
  },

  /**
   * POST /usuarios : registra un usuario nuevo.
   * @param {Object} usuario datos del usuario
   * @returns {Promise<Object>} usuario guardado (con id)
   */
  async guardar(usuario) {
    const respuesta = await api.post(RECURSO, usuario);
    return respuesta.data;
  },

  /**
   * PUT /usuarios/{id} : actualiza un usuario existente.
   * @param {number} id identificador del usuario
   * @param {Object} usuario nuevos datos
   * @returns {Promise<Object>} usuario actualizado
   */
  async actualizar(id, usuario) {
    const respuesta = await api.put(`${RECURSO}/${id}`, usuario);
    return respuesta.data;
  },

  /**
   * DELETE /usuarios/{id} : elimina un usuario.
   * @param {number} id identificador del usuario
   * @returns {Promise<void>}
   */
  async eliminar(id) {
    await api.delete(`${RECURSO}/${id}`);
  },
};

export default usuarioService;
