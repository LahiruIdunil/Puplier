import React from "react";
import classes from "./OnboardingCreateProfileInput.module.css";
import { Field, ErrorMessage } from "formik";
import OnboardingCreateProfileLabel from "./OnboardingCreateProfileLabel";

const OnboardingCreateProfileInput = ({ type, name, label, required }) => {
  return (
    <>
      <OnboardingCreateProfileLabel
        label={label}
        name={name}
        required={required}
      />
      <div className={`${classes.inputSelectTextAreaContainer}`}>
        <Field
          type={type}
          className={`${classes.inputSelectTextArea}`}
          id={name}
          name={name}
        />
        <span className={classes.errorMessage}>
          <ErrorMessage name={name} />
        </span>
      </div>
    </>
  );
};

export default OnboardingCreateProfileInput;
