import React from "react";
import classes from "./AdvantageListItem.module.css";
import checkIcon from "../images/check-icon.png";

const AdvantageListItem = (props) => {
  return (
    <div className={`d-flex ${classes.listItemContainer}`}>
      <div>
        <img className={`${classes.checkIcon}`} src={checkIcon} alt="icon" />
      </div>
      <p className={`m-0 ${classes.listItem}`}>{props.content}</p>
    </div>
  );
};

export default AdvantageListItem;
