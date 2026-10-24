/**
 * Reglas de validación del formulario de usuarios.
 * Son las mismas reglas que valida el back-end con Jakarta Validation
 * (clase Usuario.java), para avisar al usuario antes de enviar los datos.
 *
 * Cada función recibe el valor del campo y devuelve el mensaje de error,
 * o una cadena vacía si el valor es válido.
 *
 * @author Manuel David Rodriguez Garcia - SENA ficha 3336117
 * @author Xiomara Andrea Guillen Ortiz - SENA ficha 3336117
 */

/** Solo letras (con tildes y ñ) y espacios. */
const SOLO_LETRAS = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/;
/** Solo dígitos, entre 6 y 10. */
const DOCUMENTO = /^[0-9]{6,10}$/;
/** Letras, números y guion bajo, sin espacios. */
const NOMBRE_USUARIO = /^[A-Za-z0-9_]+$/;
/** Al menos una letra y al menos un número. */
const LETRA_Y_NUMERO = /^(?=.*[A-Za-z])(?=.*[0-9]).+$/;

/**
 * Valida un texto de solo letras (nombre o apellido).
 * @param {string} valor texto a validar
 * @param {string} campo nombre del campo para el mensaje
 * @returns {string} mensaje de error o "" si es válido
 */
export function validarTextoLetras(valor, campo) {
  const texto = (valor || "").trim();
  if (!texto) return `El ${campo} es obligatorio`;
  if (texto.length < 2 || texto.length > 50)
    return `El ${campo} debe tener entre 2 y 50 caracteres`;
  if (!SOLO_LETRAS.test(texto))
    return `El ${campo} solo puede contener letras y espacios`;
  return "";
}

/**
 * Valida el número de documento.
 * @param {string} valor documento
 * @returns {string} mensaje de error o ""
 */
export function validarDocumento(valor) {
  if (!valor) return "El documento es obligatorio";
  if (!DOCUMENTO.test(valor))
    return "El documento debe contener solo números, entre 6 y 10 dígitos";
  return "";
}

/**
 * Valida la fecha de nacimiento (formato AAAA-MM-DD y en el pasado).
 * @param {string} valor fecha del input tipo date
 * @returns {string} mensaje de error o ""
 */
export function validarFechaNacimiento(valor) {
  if (!valor) return "La fecha de nacimiento es obligatoria";
  const fecha = new Date(valor + "T00:00:00");
  if (Number.isNaN(fecha.getTime())) return "La fecha no es válida";
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  if (fecha >= hoy) return "La fecha de nacimiento debe ser una fecha pasada";
  return "";
}

/**
 * Valida el nombre de usuario para iniciar sesión.
 * @param {string} valor nombre de usuario
 * @returns {string} mensaje de error o ""
 */
export function validarNombreUsuario(valor) {
  if (!valor) return "El usuario es obligatorio";
  if (valor.length < 4 || valor.length > 20)
    return "El usuario debe tener entre 4 y 20 caracteres";
  if (!NOMBRE_USUARIO.test(valor)) {
    return "El usuario solo puede tener letras, números y guion bajo (_), sin espacios";
  }
  return "";
}

/**
 * Valida la contraseña.
 * @param {string} valor contraseña
 * @returns {string} mensaje de error o ""
 */
export function validarPassword(valor) {
  if (!valor) return "La contraseña es obligatoria";
  if (valor.length < 8 || valor.length > 30)
    return "La contraseña debe tener entre 8 y 30 caracteres";
  if (!LETRA_Y_NUMERO.test(valor))
    return "La contraseña debe tener al menos una letra y un número";
  return "";
}

/**
 * Reglas del formulario de usuario: asocia cada campo con su validación.
 * La usa el hook useFormulario.
 */
export const reglasUsuario = {
  nombre: (v) => validarTextoLetras(v, "nombre"),
  apellido: (v) => validarTextoLetras(v, "apellido"),
  documento: validarDocumento,
  fechaNacimiento: validarFechaNacimiento,
  usuario: validarNombreUsuario,
  password: validarPassword,
};
