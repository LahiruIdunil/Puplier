import React from "react";
import businessLogo from "./images/business-logo.png";
import classes from "./NavBarBusinessLogo.module.css";

const NavBarBusinessLogo = () => {
  return (
    <img
      className={`${classes.businessLogo}`}
      src={businessLogo}
      alt="business-logo"
      width="70px"
    />
  );
};

export default NavBarBusinessLogo;
