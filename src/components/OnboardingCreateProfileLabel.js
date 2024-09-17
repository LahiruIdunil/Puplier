import React from "react";
import classes from "./OnboardingCreateProfileLabel.module.css";
import RequiredSign from "./RequiredSign";

const OnboardingCreateProfileLabel = ({ label, name, required }) => {
  return (
    <>
      <label htmlFor={name} className={`${classes.label}`}>
        {label}
      </label>
      {required && <RequiredSign />}
    </>
  );
};

export default OnboardingCreateProfileLabel;
