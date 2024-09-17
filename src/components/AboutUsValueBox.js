import React from "react";
import classes from "./AboutUsValueBox.module.css";
import icon from "./images/about-us-values-icon.png";

const AboutUsValueBox = ({ title, content }) => {
  return (
    <div className={classes.valueBox}>
      <div className={classes.titleDiv}>
        <img src={icon} className={`material-icons ${classes.icon}`} />
        <h5 className={classes.title}>{title}</h5>
      </div>
      <p className={classes.content}>{content}</p>
    </div>
  );
};

export default AboutUsValueBox;
