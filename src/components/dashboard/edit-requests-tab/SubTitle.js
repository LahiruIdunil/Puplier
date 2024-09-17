import React from "react";
import classes from "./SubTitle.module.css";

const SubTitle = (props) => {
  return (
    <div
      className={`col-12 d-flex ${classes.subTitleContainer} ${props.overrideStyle}`}
    >
      <div className={`d-flex ${classes.iconContainer}`}>
        <img className="m-auto" src={props.icon} alt="" />
      </div>
      <div className="d-flex">
        <h3 className={`${classes.title}`}>{props.title}</h3>
      </div>
    </div>
  );
};

export default SubTitle;
