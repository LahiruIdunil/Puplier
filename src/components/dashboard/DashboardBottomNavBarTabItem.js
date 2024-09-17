import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./DashboardBottomNavBarTabItem.module.css";

const DashboardBottomNavBarTabItem = (props) => {
  return (
    <div className={`col-3 ${classes.tabContainer}`}>
      <div className="d-flex justify-content-center">
        <NavLink
          style={{ textDecoration: "none" }}
          to={props.path}
          className={({ isActive }) => (isActive ? `${classes.activeTab}` : "")}
        >
          <div>
            <div className={`d-flex ${classes.navbarImageContainer}`}>
              <img
                className={`m-auto ${classes.activeIcon}`}
                src={props.activeIcon}
                alt="icon"
              />
              <img
                className={`m-auto ${classes.nonActiveIcon}`}
                src={props.nonActiveIcon}
                alt="icon"
              />
            </div>
            <p className={`${classes.tabName}`}>{props.tabName}</p>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default DashboardBottomNavBarTabItem;
