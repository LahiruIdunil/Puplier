import React from "react";
import { Link } from "react-router-dom";
import classes from "./TopCategoryItem.module.css";

const TopCategoryItem = ({ categoryName }) => {
  return (
    <div className={`d-flex ${classes.listItemContainerParent}`}>
      <Link to={`/category/${categoryName}`} style={{ textDecoration: "none" }}>
        <div className={`${classes.listItemContainer}`}>
          <p className={`${classes.listItem}`}>{categoryName}</p>
        </div>
      </Link>
    </div>
  );
};

export default TopCategoryItem;
