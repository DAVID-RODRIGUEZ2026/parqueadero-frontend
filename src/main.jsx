/**
 * Punto de entrada de la aplicación React.
 * Carga los estilos de Bootstrap y los estilos propios, activa el
 * enrutador (BrowserRouter) y dibuja el componente App en el div#root.
 *
 * @author Manuel David Rodriguez Garcia - SENA ficha 3336117
 * @author Xiomara Andrea Guillen Ortiz - SENA ficha 3336117
 */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
