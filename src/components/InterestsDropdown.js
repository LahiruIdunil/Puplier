import React from "react";
import classes from "./InterestsDropdown.module.css";

function InterestsDropdown({
  dropdownInterests,
  setSearchText,
  typedSomething,
  isInterestsDropdownOpen,
  setIsInterestDropdownOpen,
  setIsSelectedFromDropdown,
  noResultsFound,
  unSortedCategoriesArr,
}) {
  const handleClick = (interest) => {
    setIsInterestDropdownOpen(false);
    setIsSelectedFromDropdown(true);
    setSearchText(interest);
  };

  return (
    <div
      className={`${classes.interestsDropdown} ${
        isInterestsDropdownOpen ? classes.show : ""
      }`}
    >
      {typedSomething ? (
        noResultsFound ? (
          <p className={classes.defaultMessage}>No resutls found...</p>
        ) : (
          <>
            {dropdownInterests.map((interest, key) => (
              <div
                onClick={() => handleClick(interest)}
                className={classes.dropdownItemContainer}
                key={key}
              >
                <p className={classes.dropdownItem}>{interest}</p>
              </div>
            ))}
          </>
        )
      ) : (
        <>
          {unSortedCategoriesArr.map((interest, key) => (
            <div
              onClick={() => handleClick(interest.name)}
              className={classes.dropdownItemContainer}
              key={key}
            >
              <p className={classes.dropdownItem}>{interest.name}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default InterestsDropdown;
