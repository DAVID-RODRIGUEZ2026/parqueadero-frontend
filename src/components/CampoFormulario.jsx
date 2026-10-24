/**
 * Campo de formulario reutilizable: etiqueta + input + mensaje de error.
 * Usa las clases de validación de Bootstrap (is-invalid / invalid-feedback).
 *
 * @author Manuel David Rodriguez Garcia - SENA ficha 3336117
 * @author Xiomara Andrea Guillen Ortiz - SENA ficha 3336117
 */

/**
 * @param {Object} props
 * @param {string} props.etiqueta texto de la etiqueta
 * @param {string} props.nombre atributo name e id del input
 * @param {string} [props.tipo="text"] tipo de input (text, date, password...)
 * @param {string} props.valor valor actual
 * @param {Function} props.onChange evento al cambiar el valor
 * @param {Function} props.onBlur evento al salir del campo
 * @param {string} [props.error] mensaje de error a mostrar
 * @param {string} [props.ayuda] texto de ayuda bajo el campo
 * @param {Object} [props.extra] atributos adicionales del input (maxLength, max...)
 */
function CampoFormulario({
  etiqueta,
  nombre,
  tipo = "text",
  valor,
  onChange,
  onBlur,
  error,
  ayuda,
  extra = {},
}) {
  return (
    <div className="mb-3">
      <label htmlFor={nombre} className="form-label fw-semibold">
        {etiqueta}
      </label>
      <input
        id={nombre}
        name={nombre}
        type={tipo}
        value={valor}
        onChange={onChange}
        onBlur={onBlur}
        className={`form-control ${error ? "is-invalid" : ""}`}
        aria-invalid={Boolean(error)}
        aria-describedby={`${nombre}-ayuda`}
        {...extra}
      />
      {error ? (
        <div className="invalid-feedback">{error}</div>
      ) : (
        ayuda && (
          <div id={`${nombre}-ayuda`} className="form-text">
            {ayuda}
          </div>
        )
      )}
    </div>
  );
}

export default CampoFormulario;
