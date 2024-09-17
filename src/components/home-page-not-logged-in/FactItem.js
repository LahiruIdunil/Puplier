import React from "react";
import classes from "./FactItem.module.css";
import factItemImage from "../images/fact-item-image.png";

const FactItem = (props) => {
  return (
    <div className="col-lg-4 col-md-6 col-12">
      <div className={`d-flex ${classes.factItemContainer}`}>
        <div style={{ marginRight: "11px" }}>
          <img src={factItemImage} alt="icon" />
        </div>
        <div className="text">
          <h4 className={`${classes.factTitle}`}>{props.topic}</h4>
          <p className={`${classes.factContent}`}>{props.content}</p>
        </div>
      </div>
    </div>
  );
};

export default FactItem;
