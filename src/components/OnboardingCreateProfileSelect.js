import React from "react";
import classes from "./OnboardingCreateProfileSelect.module.css";
import { Field, ErrorMessage } from "formik";
import OnboardingCreateProfileLabel from "./OnboardingCreateProfileLabel";

const OnboardingCreateProfileSelect = ({
  options,
  name,
  label,
  defaultValue,
  required,
}) => {
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
      <OnboardingCreateProfileLabel
        label={label}
        name={name}
        required={required}
      />
      <div
        className={`position-relative ${classes.inputSelectTextAreaContainer}`}
      >
        <Field
          as="select"
          id={name}
          name={name}
          className={`${classes.inputSelectTextArea}`}
        >
          <option
            style={{ display: "none" }}
            key="none"
            value="none"
            defaultChecked
          >
            {defaultValue}
          </option>
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
};

export default OnboardingCreateProfileSelect;
