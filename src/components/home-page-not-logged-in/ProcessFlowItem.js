import React from "react";
import classes from "./ProcessFlowItem.module.css";

const ProcessFlowItem = (props) => {
  return (
    <div className="col-xxl-3 col-lg-6 col-12">
      <div className={`${classes.processFlowItemContainer}`}>
        <div className={`${classes.itemNumberContainer}`}>
          <p className={`${classes.itemNumber}`}>{props.number}</p>
        </div>
        <div className="d-flex justify-content-center">
          <div className={`${classes.itemImageContainer}`}>
            <img
              className={`${classes.itemImage}`}
              src={props.image}
              alt="icon"
            />
          </div>
        </div>
        <p className={`${classes.itemTitle}`}>{props.title}</p>
        <p className={`${classes.itemContent}`}>{props.content}</p>
      </div>
    </div>
  );
};

export default ProcessFlowItem;
