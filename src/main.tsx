import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { PersonDataProvider } from "./context/PeopleDataContext.tsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PersonDataProvider>
      <Toaster />
      <App />
    </PersonDataProvider>
  </StrictMode>
);
