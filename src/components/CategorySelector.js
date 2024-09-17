import React, { useEffect, useState } from "react";
import ReactDom from "react-dom";

import classes from "./CategorySelector.module.css";
import CategorySelectorItem from "./CategorySelectorItem";

function CategorySelector({ show, onHide, categories }) {
  useEffect(() => {
    const rootDiv = document.getElementById("root");
    if (show) {
      rootDiv.classList.add(classes.stopRootScrolling);
    } else {
      rootDiv.classList.remove(classes.stopRootScrolling);
    }
    return () => {
      rootDiv.classList.remove(classes.stopRootScrolling);
    };
  }, [show]);

  return ReactDom.createPortal(
    <div
      className={`${classes.categorySelectorContainer} ${
        show ? `${classes.show}` : `${classes.hide}`
      } `}
    >
      <div style={{ padding: "0 12px" }}>
        <div className={`row justify-content-end`}>
          <div className="col-auto">
            <span
              onClick={() => onHide()}
              className={`material-icons ${classes.closeButton}`}
            >
              close
            </span>
          </div>
        </div>
      </div>
      <div className={`container customContainer overflow-hidden`}>
        <div className="row justify-content-center">
          <div
            className={`col-xxl-auto col-xl-10 col-12 ${classes.categoryListContainer}`}
          >
            <div className={classes.categorySelectorTitleContainer}>
              <p className={classes.castegorySelectorTitle}>all categories</p>
            </div>
            <div className={`row ${classes.categorySelectorItemsContainer}`}>
              {categories.map((categories, key) => (
                <div
                  key={key}
                  className={`col-xxl-2 col-lg-3 col-md-4 col-sm-6 col-12 ${classes.categorySelectorItemContainer}`}
                >
                  <CategorySelectorItem {...categories} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("portal-root")
  );
}
export default CategorySelector;
