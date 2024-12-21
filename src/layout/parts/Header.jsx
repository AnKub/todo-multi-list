import React, { useState, useEffect } from "react";
import "../../styles/layoutStyle/header.scss";

const Header = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Зміна теми
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  //теми
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <header className="header">
      <h2>Multi-Todo</h2>
      <button className={`theme-toggle ${theme === "light" ? "animate-light" : "animate-dark"}`} onClick={toggleTheme}>
        <span className="icon-wrapper">
          {theme === "light" ? (
            <img src="/img/sun.svg" alt="Moon Icon" className="moon-icon" />
          ) : (
            <img src="/img/moon.svg" alt="Sun Icon" className="sun-icon" />
          )}
        </span>
      </button>
    </header>
  );
};

export default Header;
