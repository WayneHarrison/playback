import React, { useEffect, useState } from "react";
import { MdSearch, MdClose } from "react-icons/md";
import "../styles/Header.css";

function Header() {
  const [search, setSearch] = useState<string>("");

  function RenderSearchIcon() {
    if (search == null || search.length <= 0) {
      return null;
    }

    return <MdClose onClick={() => setSearch("")} />;
  }

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
          <h3 className="nav-text">Feed</h3>
        </div>
      </div>
      <div className="nav-middle">
        <div className="search-container">
          <input
            className="search"
            type="text"
            id="search"
            name="search"
            placeholder="Search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <button className="input-icon">{RenderSearchIcon()}</button>
        </div>
      </div>
      <div className="nav-right">
        <div className="nav-item nav-profile"></div>
      </div>
    </div>
  );
}

export default Header;
