import "./App.css";
import { useEffect } from "react";
import PeoplePage from "./components/people-page";
import Navbar from "./components/navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SettingsPage from "./components/settings-page";

function App() {
  const loginAndSetCookie = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );

      if (response.ok) {
        const data = await response.json();
        document.cookie = `token=${data.token}`;
      } else {
        alert("Login failed");
      }
    } catch (error) {
      alert(`Error during login: ${error}`);
    }
  };

  useEffect(() => {
    loginAndSetCookie();
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <button onClick={loginAndSetCookie}>Login</button>
            </div>
          }
        />
        <Route path="/people" element={<PeoplePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        {/* Define other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
