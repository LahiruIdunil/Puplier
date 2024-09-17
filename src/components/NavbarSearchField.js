import React, { useRef, useState } from "react";
import classes from "./NavbarSearchField.module.css";
import { useLocation, useNavigate, useParams } from "react-router";

function NavbarSearchField({ menuButtonRef }) {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const submitButtonRef = useRef();
  const { pathname } = useLocation();
  const { query: currentSearchQuery } = useParams();

  const searchArticles = (e) => {
    e.preventDefault();
    if (searchText !== "") {
      if (menuButtonRef) {
        menuButtonRef.current.click();
      }
      setSearchText("");

      //do not re-navigate if a user has already searched the same term last time
      if (
        pathname.split("/").filter((item) => item !== "")[0] === "search" &&
        currentSearchQuery === searchText
      ) {
        // do nothing
      } else {
        navigate(`/search/${searchText}/1`);
      }
    }
  };

  return (
    <div className={`position-relative ${classes.navbarSearchFieldContainer}`}>
      <form onSubmit={searchArticles}>
        <input
          id="searchInputField"
          className={classes.NavbarSearchField}
          type="text"
          placeholder="search puplier..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          autoComplete="off"
        />
        <button ref={submitButtonRef} type="submit" hidden></button>
        <div
          onClick={() => submitButtonRef.current.click()}
          className={classes.mobileNavbarSearchButton}
        >
          <span className={`material-icons ${classes.mobileNavbarSearchIcon}`}>
            arrow_forward
          </span>
        </div>
      </form>
    </div>
  );
}

export default NavbarSearchField;
