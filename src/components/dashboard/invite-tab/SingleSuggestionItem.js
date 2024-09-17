import React from "react";
import classes from "./SingleSuggestionItem.module.css";

const SingleSuggestionItem = (props) => {
  const handleSelectSuggestions = (e) => {
    let isSelected = e.currentTarget.classList.contains(
      classes.selectedSuggestionItem
    );
    if (isSelected) {
      e.currentTarget.classList.remove(classes.selectedSuggestionItem);
    } else {
      e.currentTarget.classList.add(classes.selectedSuggestionItem);
    }
  };

  return (
    <div className="col-xl-4 col-lg-6 col-md-4 col-sm-6 col-12">
      <div
        className={`${classes.itemContainer}`}
        onClick={handleSelectSuggestions}
      >
        <div className="row">
          <div className="col-auto">
            <div
              className={`${classes.imageContainer}`}
              style={{ backgroundImage: `url(${props.profile_picture})` }}
            ></div>
          </div>
          <div className="col p-0 d-flex flex-column justify-content-center overflow-hidden">
            <p className={classes.userName}>{props.name}</p>
          </div>
          <div className="col-auto d-flex flex-column justify-content-center">
            <span
              className={`material-icons ${classes.acctionButtonIcon} ${classes.addIcon}`}
            >
              add
            </span>
            <span
              className={`material-icons ${classes.acctionButtonIcon} ${classes.cancelIcon}`}
            >
              close
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleSuggestionItem;
