import React from "react";
import CategorySelectorSingleCategory from "./CategorySelectorSingleCategory";
import classes from "./CategorySelectorItem.module.css";
import { Link } from "react-router-dom";

function CategorySelectorItem({ title, categories }) {
  return (
    <div className={classes.itemContainer}>
      <div className={classes.titleContainer}>
        <p className={classes.title}>{title}</p>
      </div>
      {categories.map((categoryName, key) => (
        <Link
          to={`/category/${categoryName}`}
          style={{ textDecoration: "none" }}
          key={key}
        >
          <CategorySelectorSingleCategory categoryName={categoryName} />
        </Link>
      ))}
    </div>
  );
}

export default CategorySelectorItem;
