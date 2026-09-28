import React from "react";
import Menu from "./menu";

function HeaderSection({ name, metadata, role = "aggregators" }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const roleTitle = role.endsWith("s") ? role.slice(0, -1) : role;
  const formattedRole = roleTitle.charAt(0).toUpperCase() + roleTitle.slice(1);

  return (
    <header className="header-section">
      <button
        className="header-icon icon-btn menu-toggle"
        type="button"
        aria-label={
          isMenuOpen ? "Close navigation menu" : "Open navigation menu"
        }
        aria-expanded={isMenuOpen}
        aria-controls="main-menu"
        onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
      >
        <i className="fas fa-bars" aria-hidden="true"></i>
      </button>
      <div className="header-info">
        <h1 className="header-title page-title">{name}</h1>
        <div className="header-meta">
          <p className="header-subtitle page-subtitle">{metadata}</p>
          <span className="header-role">{formattedRole}</span>
        </div>
      </div>
      {/*Notification icon*/}
      <span className="header-icon icon-btn">
        <i className="fas fa-bell"></i>
      </span>
      <Menu
        id="main-menu"
        role={role}
        roleTitle={formattedRole}
        className={isMenuOpen ? "menu menu-open" : "menu"}
        onNavigate={() => setIsMenuOpen(false)}
      />
    </header>
  );
}

export default HeaderSection;
