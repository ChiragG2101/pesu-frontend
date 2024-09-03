import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { usePersonData } from "../context/PeopleDataContext";
import { useLocation } from "react-router-dom";

const NavbarItem = ({
  text,
  value,
  to,
}: {
  text: string;
  value?: number;
  to: string;
}) => {
  return (
    <li>
      <NavLink to={to} className="navbar-link">
        <span>{text}</span>
        {value !== undefined && value >= 0 && (
          <span className="navbar-item-value">{value}</span>
        )}
      </NavLink>
    </li>
  );
};

const Navbar = () => {
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsDrawerOpen(false);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setIsDrawerOpen(false);
  }, [location]);

  useEffect(() => {
    setIsDrawerOpen(false);
  }, []);

  const { personData } = usePersonData();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navbarItems = [
    { text: "Company", to: "/" },
    { text: "People", value: personData.totalCount, to: "/people" },
    { text: "Violations", value: 42, to: "/" },
    { text: "Statistics", to: "/" },
    { text: "Settings", to: "/settings" },
  ];

  const additionalItems = [
    { text: "Profile", to: "/" },
    { text: "Log Out", to: "/" },
  ];

  return (
    <nav className="navbar">
      <button
        className="menu-button"
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
      >
        <svg viewBox="0 0 100 80" width="15" height="15">
          <rect width="75" height="15" fill="white"></rect>
          <rect y="30" width="75" height="15" fill="white"></rect>
          <rect y="60" width="75" height="15" fill="white"></rect>
        </svg>
      </button>
      <ul className={`navbar-list ${isDrawerOpen ? "open" : ""}`}>
        {navbarItems.map((item, index) => (
          <NavbarItem
            key={index}
            text={item.text}
            value={item.value}
            to={item.to}
          />
        ))}
        {isDrawerOpen &&
          additionalItems.map((item, index) => (
            <NavbarItem
              key={navbarItems.length + index}
              text={item.text}
              to={item.to}
            />
          ))}
      </ul>
      {!isDrawerOpen && (
        <ul className="navbar-list">
          {additionalItems.map((item, index) => (
            <NavbarItem
              key={navbarItems.length + index}
              text={item.text}
              to={item.to}
            />
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
