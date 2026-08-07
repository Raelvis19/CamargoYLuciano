import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import NotificationCenter from "./components/ui/NotificationCenter.jsx";
import { ConfirmProvider } from "./components/ui/ConfirmDialog";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ConfirmProvider>
      <ThemeProvider>
        <App />
        <NotificationCenter />
      </ThemeProvider>
    </ConfirmProvider>
  </StrictMode>
);
