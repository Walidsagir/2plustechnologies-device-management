import { NavLink } from "react-router-dom";

function Menu({ id, role, onNavigate, className }) {
  const NAV_ITEMS = [
    {
      name: "Home",
      href: "/",
      role: ["agents", "aggregators", "admins", "technicians"],
    },
    { name: "Agents", href: "/agents", role: ["admins", "aggregators"] },
    {
      name: "Technicians",
      href: "/technicians",
      role: ["admins", "aggregators"],
    },
    {
      name: "Aggregators",
      href: "/aggregators",
      role: ["admins"],
    },
    { name: "Devices", href: "/devices", role: ["admins", "aggregators"] },
    {
      name: "Tickets",
      href: "/tickets",
      role: ["admins", "aggregators", "agents", "technicians"],
    },
    {
      name: "Profile",
      href: "/profile",
      role: ["agents", "aggregators", "admins", "technicians"],
    },
    {
      name: "Settings",
      href: "/settings",
      role: ["agents", "aggregators", "admins", "technicians"],
    },
    {
      name: "Logout",
      href: "/logout",
      role: ["agents", "aggregators", "admins", "technicians"],
    },
  ];

  const allowedItems = NAV_ITEMS.filter((item) => item.role.includes(role));

  return (
    <aside className={className} id={id} aria-label="Main navigation">
      {allowedItems.map((item) => (
        <NavLink
          key={item.href}
          to={item.href}
          className={
            item.name === "Logout" ? "menu-item menu-item-danger" : "menu-item"
          }
          onClick={onNavigate}
        >
          {item.name}
        </NavLink>
      ))}
    </aside>
  );
}

export default Menu;
