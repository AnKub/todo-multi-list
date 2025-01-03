import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import "../../styles/layoutStyle/header.scss";

const Header = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const navigate = useNavigate();

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken"); 
    navigate("/"); 
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <header className="header">
      <h2>Multi-Todo</h2>
      <div className="header-actions">
        <button
          className={`theme-toggle ${theme === "light" ? "animate-light" : "animate-dark"}`}
          onClick={toggleTheme}
        >
          <span className="icon-wrapper">
            {theme === "light" ? (
              <img src="/img/sun.svg" alt="Moon Icon" className="moon-icon" />
            ) : (
              <img src="/img/moon.svg" alt="Sun Icon" className="sun-icon" />
            )}
          </span>
        </button>
        <button className="logout-button" onClick={handleLogout}>
        Out
        </button>
      </div>
    </header>
  );
};

export default Header;
