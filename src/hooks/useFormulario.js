/**
 * Hook personalizado para manejar formularios: guarda los valores,
 * los errores de cada campo y ejecuta las validaciones.
 *
 * @author Manuel David Rodriguez Garcia - SENA ficha 3336117
 * @author Xiomara Andrea Guillen Ortiz - SENA ficha 3336117
 */
import { useState } from "react";

/**
 * @param {Object} valoresIniciales valores iniciales de los campos
 * @param {Object} reglas objeto { campo: funcionValidadora }
 * @returns {Object} valores, errores y funciones para manejar el formulario
 */
export default function useFormulario(valoresIniciales, reglas) {
  const [valores, setValores] = useState(valoresIniciales);
  const [errores, setErrores] = useState({});

  /**
   * Valida un solo campo y actualiza su mensaje de error.
   * @param {string} campo nombre del campo
   * @param {string} valor valor a validar
   */
  const validarCampo = (campo, valor) => {
    const regla = reglas[campo];
    const mensaje = regla ? regla(valor) : "";
    setErrores((anteriores) => ({ ...anteriores, [campo]: mensaje }));
    return mensaje;
  };

  /** Evento onChange: actualiza el valor y, si ya tenía error, lo revalida. */
  const manejarCambio = (evento) => {
    const { name, value } = evento.target;
    setValores((anteriores) => ({ ...anteriores, [name]: value }));
    if (errores[name]) validarCampo(name, value);
  };

  /** Evento onBlur: valida el campo cuando el usuario sale de él. */
  const manejarSalida = (evento) => {
    const { name, value } = evento.target;
    validarCampo(name, value);
  };

  /**
   * Valida todos los campos antes de enviar.
   * @returns {boolean} true si no hay errores
   */
  const validarTodo = () => {
    const nuevosErrores = {};
    Object.keys(reglas).forEach((campo) => {
      nuevosErrores[campo] = reglas[campo](valores[campo]);
    });
    setErrores(nuevosErrores);
    return Object.values(nuevosErrores).every((mensaje) => !mensaje);
  };

  return {
    valores,
    errores,
    setValores,
    setErrores,
    manejarCambio,
    manejarSalida,
    validarTodo,
  };
}
