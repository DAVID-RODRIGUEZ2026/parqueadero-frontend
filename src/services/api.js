/**
 * Configuración del cliente HTTP (Axios) para consumir la API REST
 * del back-end del parqueadero (Spring Boot).
 *
 * La URL base se toma de la variable de entorno VITE_API_URL; si no
 * existe, se usa http://localhost:8080 (puerto por defecto de Spring Boot).
 *
 * @author Manuel David Rodriguez Garcia - SENA ficha 3336117
 * @author Xiomara Andrea Guillen Ortiz - SENA ficha 3336117
 */
import axios from "axios";

/** URL base de la API REST. */
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

/** Instancia de Axios compartida por todos los servicios. */
const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

/**
 * Convierte un error de Axios en un objeto sencillo para la interfaz.
 * El back-end responde los errores con el formato:
 * { fecha, estado, mensaje, errores: { campo: "mensaje" } }
 *
 * @param {Error} error error lanzado por Axios
 * @returns {{ estado: number, mensaje: string, errores: Object }} error normalizado
 */
export function procesarError(error) {
  if (!error.response) {
    // No hubo respuesta: el servidor está apagado o hay un problema de red/CORS
    return {
      estado: 0,
      mensaje:
        "No fue posible conectar con el servidor. Verifique que la API de Spring Boot esté en ejecución.",
      errores: {},
    };
  }
  const { status, data } = error.response;
  return {
    estado: status,
    mensaje:
      data?.mensaje || "Ocurrió un error inesperado (código " + status + ").",
    errores: data?.errores || {},
  };
}

export default api;
