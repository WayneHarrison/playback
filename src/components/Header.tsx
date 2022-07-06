import React from "react";
import "../styles/Header.css";

function Header() {
  return (
    <div className="nav">
      <div className="nav-left">
        <h2 className="nav-title">PlayBack</h2>
        <div className="nav-item">
          <h3 className="nav-text">Browse</h3>
        </div>
        <div className="nav-item">
          <h3 className="nav-text">Trending</h3>
        </div>
        <div className="nav-item">
          <h3 className="nav-text">Playlist</h3>
        </div>
      </div>
      <div className="nav-right">
        <div className="nav-item nav-profile"></div>
      </div>
    </div>
  );
}

export default Header;
