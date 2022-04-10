import React, { Fragment, useState } from "react";
import Navbar from "../Components/NavBar";
import "./style.css";
import Sidebar from "../Components/sidebar/Sidebar";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openHandler = () => {
      setSidebarOpen(prev=>!prev);
  };

  const sidebarCloseHandler = () => {
    setSidebarOpen(false);
  };

  let sidebar;
  if (sidebarOpen) {
    sidebar = <Sidebar close={sidebarCloseHandler} sidebar={"sidebar"} />;
  }
  return (
    <Fragment>
      <Navbar click={openHandler} />
      {sidebar}
      <div>{children}</div>
    </Fragment>
  );
};

export default Layout;
