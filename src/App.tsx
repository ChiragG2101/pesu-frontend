import "./App.css";
import PeoplePage from "./components/people-page";
import Navbar from "./components/navbar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import SettingsPage from "./components/settings-page";
import toast from "react-hot-toast";
import HomePage from "./components/home-page";

function App() {
  const isAuthenticated = () => {
    return document.cookie
      .split(";")
      .some((item) => item.trim().startsWith("token="));
  };

  const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
    if (isAuthenticated()) {
      return element;
    } else {
      toast.error("Please login first");
      return <Navigate to="/" />;
    }
  };

  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/people"
          element={<ProtectedRoute element={<PeoplePage />} />}
        />
        <Route
          path="/settings"
          element={<ProtectedRoute element={<SettingsPage />} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
