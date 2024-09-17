import React, { useState } from "react";
import classes from "./DesktopNavbarSearchFieldContainer.module.css";
import NavbarSearchField from "./NavbarSearchField";
import OutSideClickDetector from "./OutSideClickDetector";

function DesktopNavbarSearchFieldContainer(props) {
  const [showSearchField, setShowSearchField] = useState(false);

  return (
    <div className="position-relative d-flex align-items-center">
      <span
        onClick={() => setShowSearchField(true)}
        className={`material-icons ${classes.searchIcon} ${props.className} ${
          showSearchField
            ? `${classes.hideSearchIcon}`
            : `${classes.showSearchIcon}`
        }`}
      >
        search
      </span>
      <OutSideClickDetector onHide={() => setShowSearchField(false)}>
        <div
          className={
            showSearchField
              ? `${classes.showSearchField}`
              : `${classes.hideSearchField}`
          }
        >
          <NavbarSearchField />
        </div>
      </OutSideClickDetector>
    </div>
  );
}

export default DesktopNavbarSearchFieldContainer;
