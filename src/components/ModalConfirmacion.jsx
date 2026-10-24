/**
 * Ventana modal para confirmar acciones importantes (por ejemplo, eliminar).
 * Se controla con la prop "visible" desde el componente padre.
 *
 * @author Manuel David Rodriguez Garcia - SENA ficha 3336117
 * @author Xiomara Andrea Guillen Ortiz - SENA ficha 3336117
 */

/**
 * @param {Object} props
 * @param {boolean} props.visible indica si el modal se muestra
 * @param {string} props.titulo título del modal
 * @param {string} props.mensaje pregunta de confirmación
 * @param {Function} props.onConfirmar evento al aceptar
 * @param {Function} props.onCancelar evento al cancelar
 * @param {boolean} [props.procesando=false] deshabilita los botones mientras se procesa
 */
function ModalConfirmacion({
  visible,
  titulo,
  mensaje,
  onConfirmar,
  onCancelar,
  procesando = false,
}) {
  if (!visible) return null;
  return (
    <>
      <div
        className="modal d-block"
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{titulo}</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Cerrar"
                onClick={onCancelar}
              />
            </div>
            <div className="modal-body">
              <p className="mb-0">{mensaje}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onCancelar}
                disabled={procesando}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={onConfirmar}
                disabled={procesando}
              >
                {procesando ? "Eliminando..." : "Eliminar"}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Fondo oscuro detrás del modal */}
      <div className="modal-backdrop show" />
    </>
  );
}

export default ModalConfirmacion;
