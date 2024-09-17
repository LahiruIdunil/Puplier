import React from "react";
import classes from "./BenifitItem.module.css";
import bikeIcon from "../images/bike.png";

const BenifitItem = (props) => {
  return (
    <div className="col-lg-6 col-12">
      <div className={`${classes.benifitItemContainer}`}>
        <div className={`${classes.benifitItemTitleContainer}`}>
          <div>
            <img src={bikeIcon} alt="bike-icon" />
          </div>
          <h4 className={`${classes.benifitItemTitle}`}>{props.title}</h4>
        </div>
        <div className={`${classes.benifitItemContent}`}>{props.content}</div>
      </div>
    </div>
  );
};

export default BenifitItem;
