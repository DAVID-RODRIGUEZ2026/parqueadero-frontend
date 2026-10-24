/**
 * Tabla que muestra la lista de usuarios con las acciones de editar
 * y eliminar. Incluye un buscador por nombre, apellido, documento o usuario.
 * La contraseña no se muestra por seguridad.
 *
 * @author Manuel David Rodriguez Garcia - SENA ficha 3336117
 * @author Xiomara Andrea Guillen Ortiz - SENA ficha 3336117
 */
import { useState } from "react";
import { Link } from "react-router-dom";

/**
 * Convierte una fecha AAAA-MM-DD al formato DD/MM/AAAA.
 * @param {string} fecha fecha en formato ISO
 * @returns {string} fecha formateada
 */
function formatearFecha(fecha) {
  if (!fecha) return "";
  const [anio, mes, dia] = fecha.split("-");
  return `${dia}/${mes}/${anio}`;
}

/**
 * @param {Object} props
 * @param {Array} props.usuarios lista de usuarios
 * @param {Function} props.onEliminar evento al pulsar Eliminar (recibe el usuario)
 */
function TablaUsuarios({ usuarios, onEliminar }) {
  const [busqueda, setBusqueda] = useState("");

  // Filtra la lista según el texto escrito en el buscador
  const texto = busqueda.trim().toLowerCase();
  const filtrados = usuarios.filter((u) =>
    [u.nombre, u.apellido, u.documento, u.usuario]
      .filter(Boolean)
      .some((dato) => dato.toLowerCase().includes(texto)),
  );

  return (
    <>
      <div className="mb-3">
        <input
          type="search"
          className="form-control"
          placeholder="Buscar por nombre, apellido, documento o usuario..."
          aria-label="Buscar usuario"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-primary">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nombre</th>
              <th scope="col">Apellido</th>
              <th scope="col">Documento</th>
              <th scope="col">Fecha de nacimiento</th>
              <th scope="col">Usuario</th>
              <th scope="col" className="text-end">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {filtrados.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center text-secondary py-4">
                  No hay usuarios para mostrar.
                </td>
              </tr>
            ) : (
              filtrados.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.nombre}</td>
                  <td>{u.apellido}</td>
                  <td>{u.documento}</td>
                  <td>{formatearFecha(u.fechaNacimiento)}</td>
                  <td>
                    <span className="badge text-bg-light border">
                      {u.usuario}
                    </span>
                  </td>
                  <td className="text-end text-nowrap">
                    <Link
                      to={`/usuarios/editar/${u.id}`}
                      className="btn btn-sm btn-outline-primary me-2"
                    >
                      Editar
                    </Link>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => onEliminar(u)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <p className="text-secondary small mb-0">
        Mostrando {filtrados.length} de {usuarios.length} usuario(s).
      </p>
    </>
  );
}

export default TablaUsuarios;
