import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { PersonDataProvider } from "./context/PeopleDataContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PersonDataProvider>
      <App />
    </PersonDataProvider>
  </StrictMode>
);
