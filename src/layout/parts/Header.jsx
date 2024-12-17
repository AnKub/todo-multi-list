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

  // Ініціалізація теми
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <header className="header">
      <h2>Multi-Todo</h2>
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "light" ? (
          <img
            src="/img/moon.svg"
            alt="Moon Icon"
            width="24"
            height="24"
          />
        ) : (
          <img
            src="/img/sun.svg"
            alt="Sun Icon"
            width="24"
            height="24"
          />
        )}
      </button>
    </header>
  );
};

export default Header;
