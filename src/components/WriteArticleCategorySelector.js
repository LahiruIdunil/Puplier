import React, { useEffect, useState } from "react";
import classes from "./ManuallySearchInterests.module.css";
import InterestsDropdown from "../components/InterestsDropdown";
import OutSideClickDetector from "./OutSideClickDetector";
import useFetchAllCategories from "../custom-hooks/useFetchAllCategories";

function WriteArticleCategorySelector({
  searchText,
  setSearchText,
  setCategoryError,
  setIsSelectedFromDropdown,
  disabled,
}) {
  const [typedSomething, setTypedSomething] = useState(false);
  //   search query that the user has entered does not match with any interest
  const [noResultsFound, setNoResultsFound] = useState(false);
  const [isInterestsDropdownOpen, setIsInterestDropdownOpen] = useState(false);
  const [filteredDropdownInterests, setFilteredDropdownInterests] = useState(
    []
  );
  // get all categories to show in the select-interests-dropdown
  const { categories: allDropdownInterests, unSortedCategoriesArr } =
    useFetchAllCategories();

  // add interests to the dropdown according to the search query
  useEffect(() => {
    // hide category error message when user types on the category field
    setCategoryError(false);

    if (isInterestsDropdownOpen) {
      setIsSelectedFromDropdown(false);
    }
    setFilteredDropdownInterests([]);

    if (searchText == "") {
      setTypedSomething(false);
    } else {
      setTypedSomething(true);
      let searchQuery = searchText.toLowerCase();
      let firstLetter = searchQuery[0];

      for (let i = 0; i < allDropdownInterests.length; i++) {
        let categorySet = allDropdownInterests[i];

        if (categorySet.title == firstLetter) {
          let filteredArr = categorySet.categories.filter((interest) => {
            return interest.startsWith(searchQuery);
          });

          setFilteredDropdownInterests(filteredArr);

          break;
        }
      }
    }
  }, [searchText, allDropdownInterests]);

  useEffect(() => {
    if (filteredDropdownInterests.length == 0) {
      setNoResultsFound(true);
    } else {
      setNoResultsFound(false);
    }
  }, [filteredDropdownInterests]);

  return (
    <>
      <OutSideClickDetector onHide={() => setIsInterestDropdownOpen(false)}>
        <div className="position-relative">
          <input
            type="text"
            placeholder="Select Category"
            className={`${classes.searchBar} m-0`}
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            autoComplete="off"
            onClick={() => setIsInterestDropdownOpen(true)}
            style={{ height: "52px" }}
            disabled={disabled}
          />
          <span
            className={`material-icons ${classes.dropDownArrow}`}
            onClick={() => setIsInterestDropdownOpen((prevState) => !prevState)}
          >
            arrow_drop_down
          </span>
          <InterestsDropdown
            dropdownInterests={filteredDropdownInterests}
            setSearchText={setSearchText}
            typedSomething={typedSomething}
            isInterestsDropdownOpen={isInterestsDropdownOpen}
            setIsInterestDropdownOpen={setIsInterestDropdownOpen}
            setIsSelectedFromDropdown={setIsSelectedFromDropdown}
            noResultsFound={noResultsFound}
            unSortedCategoriesArr={unSortedCategoriesArr}
          />
        </div>
      </OutSideClickDetector>
    </>
  );
}

export default WriteArticleCategorySelector;
