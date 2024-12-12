import React from "react";
import "../../styles/layoutStyle/sidebar.scss";

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  return (
    <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <button className="toggle-button" onClick={toggleSidebar}>
        {isCollapsed ? "→" : "←"}
      </button>
      {!isCollapsed && (
        <ul>
        
          <li>
            <a href="/calendar">Calendar</a>
          </li>
          <li>
            <a href="/blog">Blog</a>
          </li>
          <li>
            <a href="/articles">Articles</a>
          </li>
        </ul>
      )}
    </aside>
  );
};

export default Sidebar;
