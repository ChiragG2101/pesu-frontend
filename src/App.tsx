import { useState } from "react";
import reactLogo from "./assets/react.svg";
import women from "/women-image.webp";
import "./App.css";
import DoughnutChart from "./components/doughnut-chart";
import { useEffect } from "react";
import { GET } from "./utils/api";

const DataCard = () => {
  return (
    <div className="data-card">
      <img
        src={women}
        style={{ width: "100px" }}
        className="logo"
        alt="Vite logo"
      />
      <span>246</span>
    </div>
  );
};

const NavbarItem = ({
  text,
  value,
  onClick,
}: {
  text: string;
  value: string;
  onClick: () => void;
}) => {
  return (
    <li className="navbar-item">
      <span>{text}</span>
      {value && <span className="navbar-item-value">{value}</span>}
    </li>
  );
};

function App() {
  const [chartValues, setChartValues] = useState<number[]>([
    500, 300, 110, 100,
  ]);
  const categories = ["Boy", "Girl", "Man", "Woman"];

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
        console.log("Login successful:", data);
        document.cookie = `token=${data.token}`;
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await GET<any>(`people`);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loginAndSetCookie();
    fetchData();
  }, []);

  const updateChart = () => {
    // Example of updating chart values
    setChartValues([
      Math.random() * 300,
      Math.random() * 300,
      Math.random() * 300,
      Math.random() * 300,
    ]);
  };

  const dataCards = [
    <DataCard key={1} />,
    <DataCard key={2} />,
    <DataCard key={3} />,
    <DataCard key={4} />,
  ];
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <nav
        style={{
          backgroundColor: "#242424",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <ul
          style={{
            display: "flex",
            listStyle: "none",
            margin: 0,
            padding: 0,
            gap: "1rem",
          }}
        >
          <NavbarItem text="Company" />
          <NavbarItem text="People" value="765" />
          <NavbarItem text="Violations" value="42" />
          <NavbarItem text="Statistics" />
          <NavbarItem text="Settings" />
        </ul>
        <ul
          style={{
            display: "flex",
            listStyle: "none",
            margin: 0,
            padding: 0,
            gap: "1rem",
          }}
        >
          <NavbarItem text="Profile" />
          <NavbarItem text="Log Out" />
        </ul>
      </nav>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
          gap: "2rem",
        }}
      >
        <div className="data-card-container">{dataCards}</div>
        <DoughnutChart values={chartValues} categories={categories} />
      </div>
    </div>
  );
}

export default App;
