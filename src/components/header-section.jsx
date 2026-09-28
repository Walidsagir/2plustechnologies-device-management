import React from "react";
import Menu from "./menu";

function HeaderSection({ name, metadata }) {
  return (
    <header className="header-section">
      <span className="header-icon icon-btn">
        <button className="icon-btn" onClick={() => handleMenuToggle()}>
          <i className="fas fa-bars"></i>
        </button>
      </span>
      <div className="header-info">
        <h1 className="header-title page-title">{name}</h1>
        <p className="header-subtitle page-subtitle">{metadata}</p>
      </div>
      {/*Notification icon*/}
      <span className="header-icon icon-btn">
        <i className="fas fa-bell"></i>
      </span>
    </header>
  );
}

export default HeaderSection;
