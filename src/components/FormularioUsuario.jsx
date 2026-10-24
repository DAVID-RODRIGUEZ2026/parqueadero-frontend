/**
 * Formulario reutilizable para registrar o editar un usuario.
 * Valida los datos en el navegador (onBlur y al enviar) y muestra
 * también los errores que devuelve la API (400 y 409).
 *
 * @author Manuel David Rodriguez Garcia - SENA ficha 3336117
 * @author Xiomara Andrea Guillen Ortiz - SENA ficha 3336117
 */
import { useEffect, useState } from "react";
import CampoFormulario from "./CampoFormulario";
import useFormulario from "../hooks/useFormulario";
import { reglasUsuario } from "../utils/validaciones";

/** Valores vacíos del formulario. */
const USUARIO_VACIO = {
  nombre: "",
  apellido: "",
  documento: "",
  fechaNacimiento: "",
  usuario: "",
  password: "",
};

/** Fecha de hoy en formato AAAA-MM-DD (límite del input de fecha). */
const HOY = new Date().toISOString().split("T")[0];

/**
 * @param {Object} props
 * @param {Object} [props.usuarioInicial] datos para editar; si no llega, es un registro nuevo
 * @param {Function} props.onGuardar función async que recibe los datos y los envía a la API
 * @param {Function} props.onCancelar evento del botón Cancelar
 * @param {Object} [props.erroresServidor] errores por campo devueltos por la API
 */
function FormularioUsuario({
  usuarioInicial,
  onGuardar,
  onCancelar,
  erroresServidor,
}) {
  const {
    valores,
    errores,
    setValores,
    setErrores,
    manejarCambio,
    manejarSalida,
    validarTodo,
  } = useFormulario(USUARIO_VACIO, reglasUsuario);
  const [enviando, setEnviando] = useState(false);
  const [verPassword, setVerPassword] = useState(false);
  const esEdicion = Boolean(usuarioInicial);

  // Cuando llegan los datos del usuario a editar, se cargan en el formulario
  useEffect(() => {
    if (usuarioInicial) {
      setValores({ ...USUARIO_VACIO, ...usuarioInicial });
    }
  }, [usuarioInicial, setValores]);

  // Si la API devuelve errores por campo, se muestran debajo de cada campo
  useEffect(() => {
    if (erroresServidor && Object.keys(erroresServidor).length > 0) {
      setErrores((anteriores) => ({ ...anteriores, ...erroresServidor }));
    }
  }, [erroresServidor, setErrores]);

  /** Evento onSubmit: valida todo y, si está bien, envía los datos. */
  const manejarEnvio = async (evento) => {
    evento.preventDefault(); // evita que la página se recargue
    if (!validarTodo()) return;
    setEnviando(true);
    try {
      // Se envían los textos sin espacios sobrantes al inicio o al final
      await onGuardar({
        nombre: valores.nombre.trim(),
        apellido: valores.apellido.trim(),
        documento: valores.documento.trim(),
        fechaNacimiento: valores.fechaNacimiento,
        usuario: valores.usuario.trim(),
        password: valores.password,
      });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form onSubmit={manejarEnvio} noValidate>
      <div className="row">
        <div className="col-md-6">
          <CampoFormulario
            etiqueta="Nombre *"
            nombre="nombre"
            valor={valores.nombre}
            onChange={manejarCambio}
            onBlur={manejarSalida}
            error={errores.nombre}
            extra={{ maxLength: 50, autoComplete: "given-name" }}
          />
        </div>
        <div className="col-md-6">
          <CampoFormulario
            etiqueta="Apellido *"
            nombre="apellido"
            valor={valores.apellido}
            onChange={manejarCambio}
            onBlur={manejarSalida}
            error={errores.apellido}
            extra={{ maxLength: 50, autoComplete: "family-name" }}
          />
        </div>
        <div className="col-md-6">
          <CampoFormulario
            etiqueta="Documento *"
            nombre="documento"
            valor={valores.documento}
            onChange={manejarCambio}
            onBlur={manejarSalida}
            error={errores.documento}
            ayuda="Solo números, entre 6 y 10 dígitos."
            extra={{ maxLength: 10, inputMode: "numeric" }}
          />
        </div>
        <div className="col-md-6">
          <CampoFormulario
            etiqueta="Fecha de nacimiento *"
            nombre="fechaNacimiento"
            tipo="date"
            valor={valores.fechaNacimiento}
            onChange={manejarCambio}
            onBlur={manejarSalida}
            error={errores.fechaNacimiento}
            extra={{ max: HOY }}
          />
        </div>
        <div className="col-md-6">
          <CampoFormulario
            etiqueta="Usuario *"
            nombre="usuario"
            valor={valores.usuario}
            onChange={manejarCambio}
            onBlur={manejarSalida}
            error={errores.usuario}
            ayuda="De 4 a 20 caracteres: letras, números y guion bajo."
            extra={{ maxLength: 20, autoComplete: "username" }}
          />
        </div>
        <div className="col-md-6">
          <CampoFormulario
            etiqueta="Contraseña *"
            nombre="password"
            tipo={verPassword ? "text" : "password"}
            valor={valores.password}
            onChange={manejarCambio}
            onBlur={manejarSalida}
            error={errores.password}
            ayuda="De 8 a 30 caracteres, con al menos una letra y un número."
            extra={{ maxLength: 30, autoComplete: "new-password" }}
          />
          <div className="form-check mb-3">
            <input
              id="verPassword"
              type="checkbox"
              className="form-check-input"
              checked={verPassword}
              onChange={(e) => setVerPassword(e.target.checked)}
            />
            <label htmlFor="verPassword" className="form-check-label">
              Mostrar contraseña
            </label>
          </div>
        </div>
      </div>

      <p className="text-secondary small">
        Los campos marcados con * son obligatorios.
      </p>

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary" disabled={enviando}>
          {enviando
            ? "Guardando..."
            : esEdicion
              ? "Actualizar usuario"
              : "Registrar usuario"}
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={onCancelar}
          disabled={enviando}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default FormularioUsuario;
