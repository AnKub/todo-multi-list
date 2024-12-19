import React from "react";
import "../../styles/layoutStyle/sidebar.scss";

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  return (
    <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <button
        className={`toggle-button ${isCollapsed ? "icon-collapsed" : "icon-expanded"}`}
        onClick={toggleSidebar}
      >
        <span className="icon-wrapper">
          {isCollapsed ? (
            <img src="/img/left.svg" alt="Open Sidebar" className="icon-left" />
          ) : (
            <img src="/img/herre.svg" alt="Close Sidebar" className="icon-right" />
          )}
        </span>
      </button>
      {!isCollapsed && (
        <ul>
          <li>
            <a href="/todos">Todos</a>
          </li>
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
