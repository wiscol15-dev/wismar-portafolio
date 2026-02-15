import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import WismarShoppApp from "./WismarShoppApp";

import { ProjectsProvider } from "./context/ProjectsContext";
import { AuthProvider } from "./context/AuthContext";
import { LanguageProvider } from "./context/LanguageContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <LanguageProvider>
        <ProjectsProvider>
          <WismarShoppApp />
        </ProjectsProvider>
      </LanguageProvider>
    </AuthProvider>
  </StrictMode>,
);
