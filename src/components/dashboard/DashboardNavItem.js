import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import classes from "./DashboardNavItem.module.css";
import ComingSoonTag from "../ComingSoonTag";

const DashboardNavItem = ({ comingSoon = false, ...props }) => {
  return (
    <NavLink
      style={{ textDecoration: "none" }}
      to={props.path}
      className={({ isActive }) => (isActive ? `${classes.activeTab}` : "")}
    >
      <div className={`col-12 ${classes.navItemContainer}`}>
        <div className="d-flex">
          <div className={`${classes.iconContainer}`}>
            <img
              src={props.activeIcon}
              alt="icon"
              className={`${classes.activeIcon}`}
            />
            <img
              src={props.nonActiveIcon}
              alt="icon"
              className={`${classes.nonActiveIcon}`}
            />
          </div>
          <p className={`${classes.navName}`}>{props.name}</p>
        </div>
        {comingSoon && (
          <div className={classes.tagContainer}>
            <ComingSoonTag />
          </div>
        )}
      </div>
    </NavLink>
  );
};

export default DashboardNavItem;
