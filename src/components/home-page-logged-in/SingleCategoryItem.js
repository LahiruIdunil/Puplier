import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./SingleCategoryItem.module.css";

const SingleCategoryItem = (props) => {
  return (
    <div className="col-lg-2 col-sm-4 col-6">
      <NavLink
        to={`/category/${props.title}`}
        style={{ textDecoration: "none" }}
      >
        <div className={`${classes.itemContainer}`}>
          <div className={`${classes.iconContainer}`}>
            <img className={`${classes.icon}`} src={props.icon} alt="icon" />
          </div>
          <p className={`${classes.title}`}>{props.title}</p>
        </div>
      </NavLink>
    </div>
  );
};

export default SingleCategoryItem;
