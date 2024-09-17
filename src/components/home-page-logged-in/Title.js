import React from "react";
import classes from "./Title.module.css";

const Title = (props) => {
  return (
    <div className="row">
      <div
        className={`col-12 d-flex ${classes.titleContainer} ${props.overrideStyles}`}
      >
        <div className={`${classes.titleIconContainer}`}>
          <img src={props.icon} alt="icon" />
        </div>
        <div className="d-flex">
          <h2 className={`${classes.title}`}>{props.title}</h2>
        </div>
      </div>
    </div>
  );
};

export default Title;
