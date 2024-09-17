import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./NavigationBarLinkComponent.module.css";

const NavigationBarLinkComponent = ({ menuButtonRef, ...props }) => {
  return (
    <NavLink
      end
      style={{ textDecoration: "none" }}
      to={props.path}
      className={({ isActive }) => (isActive ? `${classes.activeTab}` : "")}
      onClick={props.onClickHandle}
    >
      {/* This p tag is only visible in the screens greater than lg (992px) */}
      {/* Duplicating this p tag as we do need to trigger menubuttonRef.current.click() */}
      {/* once a user clicks on this p tag in screens larger than lg */}
      <p
        className={`d-lg-block d-none ${classes.navText} ${props.overrideNavTextStyle}`}
      >
        {props.tabName}
      </p>
      {/* This p tag is only visible in the screens smaller than lg (992px) */}
      <p
        className={`d-lg-none d-block ${classes.navText} ${props.overrideNavTextStyle}`}
        onClick={() => menuButtonRef.current.click()}
      >
        {props.tabName}
      </p>
    </NavLink>
  );
};

export default NavigationBarLinkComponent;
