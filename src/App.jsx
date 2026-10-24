/**
 * Componente raíz de la aplicación. Define las rutas del módulo de usuarios:
 *   /                     -> Inicio
 *   /usuarios             -> Lista de usuarios (HU02, HU05)
 *   /usuarios/nuevo       -> Registrar usuario (HU01)
 *   /usuarios/editar/:id  -> Consultar y actualizar usuario (HU03, HU04)
 *
 * @author Manuel David Rodriguez Garcia - SENA ficha 3336117
 * @author Xiomara Andrea Guillen Ortiz - SENA ficha 3336117
 */
import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import InicioPage from "./pages/InicioPage";
import UsuariosPage from "./pages/UsuariosPage";
import UsuarioFormPage from "./pages/UsuarioFormPage";
import NoEncontradoPage from "./pages/NoEncontradoPage";

function App() {
  return (
    <Routes>
      {/* Todas las páginas comparten el Layout (barra de navegación y pie) */}
      <Route element={<Layout />}>
        <Route path="/" element={<InicioPage />} />
        <Route path="/usuarios" element={<UsuariosPage />} />
        <Route path="/usuarios/nuevo" element={<UsuarioFormPage />} />
        <Route path="/usuarios/editar/:id" element={<UsuarioFormPage />} />
        <Route path="*" element={<NoEncontradoPage />} />
      </Route>
    </Routes>
  );
}

export default App;
