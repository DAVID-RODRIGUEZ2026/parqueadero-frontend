/**
 * Indicador de carga que se muestra mientras responde la API.
 *
 * @author Manuel David Rodriguez Garcia - SENA ficha 3336117
 * @author Xiomara Andrea Guillen Ortiz - SENA ficha 3336117
 */

/**
 * @param {Object} props
 * @param {string} [props.texto="Cargando..."] texto que acompaña al spinner
 */
function Cargando({ texto = "Cargando..." }) {
  return (
    <div
      className="d-flex align-items-center gap-2 text-secondary py-4"
      role="status"
    >
      <div className="spinner-border spinner-border-sm" aria-hidden="true" />
      <span>{texto}</span>
    </div>
  );
}

export default Cargando;
