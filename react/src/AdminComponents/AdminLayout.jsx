import React from "react";
import { Link, Outlet } from "react-router-dom";
import styles from "./cssAdminComponents/adminLayout.module.css";
import axios from "axios";
function AdminLayout() {
  axios.get('')
  return (
    <>
      <div id={styles.spaceUp}></div>
      <div id={styles.dashboardContainer}>
        <div id={styles.navLayout}>
          <ul>
          <li>
              <Link to="/adminPannel/dashboard">
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/adminPannel/products">
                <span>Products list</span>
              </Link>
            </li>
            <li>
              <Link to="/adminPannel/category">
                <span>Category list</span>
              </Link>
            </li>
            <li>
              <Link to="/adminPannel/collection">
                <span>Collection list</span>
              </Link>
            </li>
            <li>
              <Link to="/adminPannel/size">
                <span>Size list</span>
              </Link>
            </li>
            <li>
              <Link to="/adminPannel/commands">
                <span>Comands</span>
              </Link>
            </li>
            <li>
              <Link to="/adminPannel/users">
                <span>Users</span>
              </Link>
            </li>
          </ul>
        </div>
        <div id={styles.outletContainer}>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default AdminLayout;
