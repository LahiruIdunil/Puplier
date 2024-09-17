import React from "react";
import classes from "./PublishFlowItem.module.css";

const PublishFlowItem = (props) => {
  return (
    <div className="col-12">
      <div className={`row ${classes.flowItemContainer}`}>
        <div className="col-auto">
          <div className={`${classes.numberContainer}`}>
            <div className="m-auto">{props.number}</div>
          </div>
        </div>
        <div className={`col ${classes.contentContainer}`}>
          <p className="m-0">{props.content}</p>
        </div>
      </div>
    </div>
  );
};

export default PublishFlowItem;
