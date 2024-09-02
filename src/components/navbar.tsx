import { NavLink } from "react-router-dom";
import { usePersonData } from "../context/PeopleDataContext";
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
  const { personData } = usePersonData();

  const navbarItems = [
    { text: "Company", to: "/" },
    { text: "People", value: personData.totalCount, to: "/people" },
    { text: "Violations", value: 42, to: "/" },
    { text: "Statistics", to: "/" },
    { text: "Settings", to: "/settings" },
  ];
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {navbarItems?.map((item, index) => (
          <NavbarItem
            key={index}
            text={item.text}
            value={item.value}
            to={item.to}
          />
        ))}
      </ul>
      <ul className="navbar-list">
        <NavbarItem text="Profile" to="/" />
        <NavbarItem text="Log Out" to="/" />
      </ul>
    </nav>
  );
};

export default Navbar;
