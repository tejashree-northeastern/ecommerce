import React, { useContext } from "react";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import Sidenav from "./Sidenav";
import { AuthContext } from "./Auth";

function Layout({ children }) {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <React.Fragment>
      <Sidenav />
      <main className={isLoggedIn ? "main-section" : ""}>{children}</main>
      <ToastContainer />
    </React.Fragment>
  );
}

export default Layout;
