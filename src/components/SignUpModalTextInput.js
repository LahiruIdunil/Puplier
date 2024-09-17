import React from "react";
import classes from "./SignUpModalTextInput.module.css";
import { Field, ErrorMessage } from "formik";
import RequiredSign from "./RequiredSign";

const SignUpModalTextInput = ({ type, name, label }) => {
  return (
    <>
      <label htmlFor={name} className={classes.signUpModalInputLabel}>
        {label}
      </label>
      <RequiredSign />
      <div className={classes.signUpModalTextInputContainer}>
        <Field
          type={type}
          className={`${classes.signUpModalTextInput}`}
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

export default SignUpModalTextInput;
