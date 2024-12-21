import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import "../styles/layoutStyle/Layout.scss";

import Header from "./parts/Header";
import Sidebar from "./parts/SideBar";
import Footer from "./parts/Footer";

const Layout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div className="layout">
      <Header />
      <div className={`main-content ${isCollapsed ? "collapsed" : ""}`}>
        <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
        <main className="content">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
