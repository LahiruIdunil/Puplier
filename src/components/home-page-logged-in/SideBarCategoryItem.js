import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./SideBarCategoryItem.module.css";

const SideBarCategoryItem = ({ category }) => {
  return (
    <div className={`col-auto ${classes.itemMainContainer}`}>
      <NavLink to={`/category/${category}`} className="text-decoration-none">
        <div className={`${classes.itemContainer}`}>
          <p className={`${classes.itemName}`}>{category}</p>
        </div>
      </NavLink>
    </div>
  );
};

export default SideBarCategoryItem;
