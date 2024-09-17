import React from "react";
import classes from "./DashboardTabTitle.module.css";

const DashboardTabTitle = (props) => {
  return (
    <div className={`row ${classes.titleContainer} ${props.overRideStyles}`}>
      <div className="col-auto d-md-flex d-none" style={{ paddingRight: "0" }}>
        <div className="m-auto">
          <img
            src={`${props.icon}`}
            alt="icon"
            width={props.iconWidth}
            height={props.iconHeight}
          />
        </div>
      </div>
      <div className="col d-flex" style={{ paddingLeft: "0" }}>
        <p className={`${classes.tabTitle}`}>{props.tabName}</p>
      </div>
    </div>
  );
};

export default DashboardTabTitle;
