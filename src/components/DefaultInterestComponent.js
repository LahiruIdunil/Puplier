import React, { useEffect, useState } from "react";
import classes from "./DefaultInterestComponent.module.css";

const DefaultInterestComponent = ({
  interest,
  addInterests,
  removeInterests,
}) => {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    selected ? addInterests(interest) : removeInterests(interest);
  }, [selected]);

  return (
    <button
      className={`${classes.componentBox} ${
        selected ? classes.selectedComponent : ""
      }`}
      onClick={() => setSelected((selected) => !selected)}
    >
      <p
        className={`${classes.componentBoxText} ${
          selected ? classes.selectedText : ""
        }`}
      >
        {interest}
      </p>
      <span
        className={`material-icons ${classes.icon} ${
          selected ? classes.selectedIcon : ""
        }`}
      >
        {selected ? "done" : "add"}
      </span>
    </button>
  );
};

export default DefaultInterestComponent;
