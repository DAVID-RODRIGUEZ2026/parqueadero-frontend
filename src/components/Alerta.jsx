/**
 * Mensaje de alerta reutilizable (éxito, error, advertencia o información).
 *
 * @author Manuel David Rodriguez Garcia - SENA ficha 3336117
 * @author Xiomara Andrea Guillen Ortiz - SENA ficha 3336117
 */

/**
 * @param {Object} props
 * @param {"success"|"danger"|"warning"|"info"} [props.tipo="info"] color de la alerta
 * @param {string} props.mensaje texto a mostrar
 * @param {Function} [props.onCerrar] evento al cerrar; si no se envía, no se muestra la X
 */
function Alerta({ tipo = "info", mensaje, onCerrar }) {
  if (!mensaje) return null;
  return (
    <div
      className={`alert alert-${tipo} d-flex justify-content-between align-items-start`}
      role="alert"
    >
      <span>{mensaje}</span>
      {onCerrar && (
        <button
          type="button"
          className="btn-close ms-3"
          aria-label="Cerrar"
          onClick={onCerrar}
        />
      )}
    </div>
  );
}

export default Alerta;
