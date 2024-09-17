import React from "react";
import classes from "./LoginModalInput.module.css";

import { Field, ErrorMessage } from "formik";

const LoginModalInput = ({ label, fieldName, inputType }) => {
  return (
    <div className={classes.componentDiv}>
      <label htmlFor={fieldName} className={classes.label}>
        {label}
        <span className={classes.errorMessage}>
          <ErrorMessage name={fieldName} />
        </span>
      </label>
      <Field
        type={inputType}
        id={fieldName}
        name={fieldName}
        className={classes.inputBox}
      />
    </div>
  );
};

export default LoginModalInput;
