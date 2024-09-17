import React from "react";
import classes from "./EditProfileTextAreaContainer.module.css";
import { ErrorMessage, Field } from "formik";

function EditProfileTextAreaContainer({ name }) {
  return (
    <div className={classes.inputContainerParent}>
      <Field
        as="textarea"
        className={`${classes.aboutInputContainer} ${classes.inputContainer}`}
        name={name}
        id={name}
        rows="5"
      ></Field>
      <span className={classes.errorMessage}>
        <ErrorMessage name={name} />
      </span>
    </div>
  );
}

export default EditProfileTextAreaContainer;
