import React from "react";
import classes from "./LineBetweenIndicatorItems.module.css";

function LineBetweenIndicatorItems({ isActive }) {
  return (
    <div className="col">
      <div className={`${classes.lineContainer}`}>
        <div
          className={`${classes.line} ${isActive ? classes.activeLine : null}`}
        ></div>
      </div>
    </div>
  );
}

export default LineBetweenIndicatorItems;
