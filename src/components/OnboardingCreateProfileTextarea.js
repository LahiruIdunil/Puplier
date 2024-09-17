import React from "react";
import { Field, ErrorMessage } from "formik";
import OnboardingCreateProfileLabel from "./OnboardingCreateProfileLabel";
import classes from "./OnboardingCreateProfileTextarea.module.css";

function OnboardingCreateProfileTextarea({ name, label, required }) {
  return (
    <>
      <OnboardingCreateProfileLabel
        label={label}
        name={name}
        required={required}
      />
      <div>
        <Field
          as="textarea"
          className={`${classes.inputSelectTextArea}`}
          name={name}
          id={name}
          rows="5"
        ></Field>
        <span className={classes.errorMessage}>
          <ErrorMessage name={name} />
        </span>
      </div>
    </>
  );
}

export default OnboardingCreateProfileTextarea;
