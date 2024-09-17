import React from "react";
import classes from "./SideBarTitle.module.css";

const SideBarTitle = (props) => {
  return <h4 className={`${classes.title}`}>{props.title}</h4>;
};

export default SideBarTitle;
