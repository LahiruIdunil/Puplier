import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import classes from "./ManuallySearchInterests.module.css";
import InterestsDropdown from "../components/InterestsDropdown";
import OutSideClickDetector from "./OutSideClickDetector";
import useFetchAllCategories from "../custom-hooks/useFetchAllCategories";

function ManuallySearchInterests({
  selectedInterests,
  searchedInterests,
  setSearchedInterests,
}) {
  const [typedSomething, setTypedSomething] = useState(false);
  //   search query that the user has entered does not match with any interest
  const [noResultsFound, setNoResultsFound] = useState(false);
  // value typed in the search box
  const [searchText, setSearchText] = useState("");
  const [isSelectedFromDropdown, setIsSelectedFromDropdown] = useState(false);
  const [isInterestsDropdownOpen, setIsInterestDropdownOpen] = useState(false);
  const [filteredDropdownInterests, setFilteredDropdownInterests] = useState(
    []
  );
  // get all categories to show in the select-interests-dropdown
  const { categories: allDropdownInterests, unSortedCategoriesArr } =
    useFetchAllCategories();

  // triggers when the "ADD" button is clicked
  const handleAddInterest = () => {
    toast.dismiss();
    setIsInterestDropdownOpen(false);

    if (!isSelectedFromDropdown) {
      toast.error("Please select from dropdown");
      return null;
    }

    let newInterest = searchText.trim();
    if (newInterest == "") {
      return null;
    }

    let allInterests = [...selectedInterests, ...searchedInterests];
    if (allInterests.includes(newInterest)) {
      toast.error(`You have selected the value "${newInterest}" before`);
      return null;
    }

    setSearchedInterests([...searchedInterests, newInterest]);
    setSearchText("");
  };

  // add interests to the dropdown according to the search query
  useEffect(() => {
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
        <form>
          <div className="row g-0">
            <div className="col-10 position-relative">
              <input
                type="text"
                placeholder="Search More Interests"
                className={classes.searchBar}
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                autoComplete="off"
                onClick={() => setIsInterestDropdownOpen(true)}
              />
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
            <div className={`col-2 ${classes.searchBarBtnBox}`}>
              <button
                type="button"
                className={classes.searchBarBtn}
                onClick={handleAddInterest}
              >
                <p className={classes.searchBarText}>add</p>
              </button>
            </div>
          </div>
        </form>
      </OutSideClickDetector>
    </>
  );
}

export default ManuallySearchInterests;
