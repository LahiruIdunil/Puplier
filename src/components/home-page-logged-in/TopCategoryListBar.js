import React, { useState } from "react";
import CategorySelector from "../CategorySelector";
import TopCategoryItem from "./TopCategoryItem";
import classes from "./TopCategoryListBar.module.css";

const TopCategoryListBar = ({ categories }) => {
  const [showCategorySelector, setShowCategorySelector] = useState(false);

  const [navItemsList, setNavItemsList] = useState([
    "Natural Sciences and Engineering",
    "Arts and Humanities",
    "Social Sciences",
    "Health Sciences",
    "Anatomy & Morphology",
    "Agriculture",
    "Other",
  ]);

  return (
    <div className="container customContainer">
      <div className="row justify-content-end">
        <div className="col-12">
          <div className="row">
            <div className="col d-flex align-items-center">
              <div
                className={`d-flex justify-content-between flex-wrap w-100 ${classes.listBarContainer}`}
              >
                {navItemsList.slice(0, 8).map((item, key) => (
                  <TopCategoryItem categoryName={item} key={key} />
                ))}
              </div>
            </div>
            <div className={`col-auto ${classes.moreIconContaier}`}>
              <div
                className={`${classes.moreIcon}`}
                onClick={() => setShowCategorySelector(true)}
              >
                <span className="material-icons m-auto">more_horiz</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CategorySelector
        categories={categories}
        show={showCategorySelector}
        onHide={setShowCategorySelector}
      />
    </div>
  );
};

export default TopCategoryListBar;
