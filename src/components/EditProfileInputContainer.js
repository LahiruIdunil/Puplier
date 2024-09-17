import React from "react";
import classes from "./EditProfileInputContainer.module.css";
import { ErrorMessage, Field } from "formik";

const EditProfileInputContainer = ({ name, label, disabled = false }) => {
  return (
    <>
      <p className={classes.label}>{label}</p>
      <div className={classes.inputContainer}>
        <Field
          type="text"
          className={`${classes.input}`}
          id={name}
          name={name}
          autoComplete="off"
          disabled={disabled}
        />
        <span className={classes.errorMessage}>
          <ErrorMessage name={name} />
        </span>
      </div>
    </>
  );
};

export default EditProfileInputContainer;
