import React, { useState } from "react";
import SideBarTitle from "../SideBarTitle";
import SideBarCategoryItem from "./SideBarCategoryItem";
import classes from "./SideBarCategoryList.module.css";

const SideBarCategoryList = () => {
  const [categoriesList, setCategoriesList] = useState([
    "education",
    "data",
    "tech",
    "pets",
    "religion",
    "fashion",
    "fiction",
    "health & well-being",
  ]);

  return (
    <div style={{ marginBottom: "63px" }}>
      <SideBarTitle title="Categories you may interest" />
      <div className={`row ${classes.listContainer}`}>
        {categoriesList.map((item, key) => (
          <SideBarCategoryItem category={item} key={key} />
        ))}
      </div>
    </div>
  );
};

export default SideBarCategoryList;
