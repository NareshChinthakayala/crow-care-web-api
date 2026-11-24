import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// Styles — order matters: theme colours and fonts first, animations last.
import "./styles/themes.css"; //     colours (switch theme in index.html)
import "./styles/fonts.css"; //      the 2 font families
import "./styles/global.css"; //     layout + components
import "./styles/animations.css"; // all motion

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
