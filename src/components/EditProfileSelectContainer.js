import React from "react";
import classes from "./EditProfileSelectContainer.module.css";
import { Field, ErrorMessage } from "formik";

function EditProfileSelectContainer({ options, name, label }) {
  const optionElements =
    options &&
    options.map((option) => (
      <option
        key={option.value}
        value={option.value}
        className={classes.selectOptions}
      >
        {option.key}
      </option>
    ));

  return (
    <>
      <p className={classes.inputLabel}>{label}</p>
      <div className={classes.inputContainerParent}>
        <Field
          as="select"
          id={name}
          name={name}
          className={`${classes.inputContainer} ${classes.selectContainer}`}
        >
          {optionElements}
        </Field>
        <span className={`material-icons ${classes.dropDownArrow}`}>
          arrow_drop_down
        </span>
        <span className={classes.errorMessage}>
          <ErrorMessage name={name} />
        </span>
      </div>
    </>
  );
}

export default EditProfileSelectContainer;
