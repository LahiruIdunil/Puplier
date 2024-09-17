import React from "react";
import classes from "./CategorySelectorSingleCategory.module.css";

function CategorySelectorSingleCategory({ categoryName }) {
  return <p className={classes.categoryName}>{categoryName}</p>;
}

export default CategorySelectorSingleCategory;
