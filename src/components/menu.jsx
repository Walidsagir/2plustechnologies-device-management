import { NavLink, useLocation } from "react-router-dom";

function Menu({ id, role, roleTitle, onNavigate, className }) {
  const { pathname } = useLocation();
  const NAV_ITEMS = [
    {
      name: "Home",
      href: "/",
      role: ["agents", "aggregators", "admins", "technicians"],
    },
    { name: "Agents", href: "/agents-list", role: ["admins", "aggregators"] },
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
      <h2 className="menu-title">{roleTitle}</h2>
      {allowedItems.map((item) => (
        <NavLink
          key={item.href}
          to={item.href}
          className={({ isActive }) => {
            const isAgentRoute =
              item.name === "Agents" && pathname.startsWith("/agent-");
            const classes = ["menu-item"];

            if (item.name === "Logout") classes.push("menu-item-danger");
            if (isActive || isAgentRoute) classes.push("active");

            return classes.join(" ");
          }}
          onClick={onNavigate}
        >
          {item.name}
        </NavLink>
      ))}
    </aside>
  );
}

export default Menu;
