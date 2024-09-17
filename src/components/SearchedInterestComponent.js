import React from "react";
import classes from "./SearchedInterestComponent.module.css";

const SearchedInterestComponent = ({ interest, index, setInterests }) => {
  const deleteComponent = () => {
    setInterests((prevInterests) => {
      const updatedInterests = [...prevInterests];
      updatedInterests.splice(index, 1);
      return updatedInterests;
    });
  };

  return (
    <button className={classes.ComponentBox}>
      <p className={classes.componentBoxText}>{interest}</p>
      <span
        className={`material-icons ${classes.icon}`}
        onClick={deleteComponent}
      >
        close
      </span>
    </button>
  );
};

export default SearchedInterestComponent;
