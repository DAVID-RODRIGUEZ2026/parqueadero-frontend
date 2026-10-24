/**
 * Pie de página con los datos del proyecto formativo y sus autores.
 *
 * @author Manuel David Rodriguez Garcia - SENA ficha 3336117
 * @author Xiomara Andrea Guillen Ortiz - SENA ficha 3336117
 */
function PiePagina() {
  const anio = new Date().getFullYear();
  return (
    <footer className="border-top py-3 mt-auto bg-white">
      <div className="container text-center text-secondary small">
        <div>
          Sistema de gestión de parqueadero · SENA – Análisis y Desarrollo de
          Software
        </div>
        <div>
          Desarrollado por Manuel David Rodríguez García y Xiomara Andrea
          Guillén Ortiz · Ficha 3336117 · {anio}
        </div>
      </div>
    </footer>
  );
}

export default PiePagina;
