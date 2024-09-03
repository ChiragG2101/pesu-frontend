import React from "react";
import { usePersonData } from "../context/PeopleDataContext";
import toast from "react-hot-toast";

const HomePage = () => {
  const { refreshData } = usePersonData();

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
        refreshData();
      } else {
        toast.error("Login failed");
      }
    } catch (error) {
      toast.error(`Error during login: ${error}`);
    }
  };
  return (
    <div className="base-flex">
      <button onClick={loginAndSetCookie}>Login</button>
    </div>
  );
};

export default HomePage;
