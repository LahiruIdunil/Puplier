import React from "react";
import classes from "./DiffComponentTitle.module.css";

function DiffComponentTitle({ title }) {
  return <h5 className={classes.diffComponentTitle}>{title}</h5>;
}

export default DiffComponentTitle;
