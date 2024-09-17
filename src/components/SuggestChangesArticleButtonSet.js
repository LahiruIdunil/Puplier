import React from "react";
import classes from "./SuggestChangesArticleButtonSet.module.css";
import buttonIcon from "./images/mark-as-under-review-button.png";
import { BeatLoader } from "react-spinners";
import { useNavigation } from "react-router";

function SuggestChangesArticleButtonSet({
  onSubmit,
  actionType,
  setActionType,
}) {
  const navigation = useNavigation();

  const saveReview = () => {
    setActionType("save");
    onSubmit("save");
  };

  const submitReview = () => {
    setActionType("submit");
    onSubmit("save");
  };

  return (
    <div className={`row justify-content-center`}>
      <div
        className={`col-sm-auto col-12 d-sm-flex d-block ${classes.buttonsContainer}`}
      >
        <div className="row">
          <div className="col-sm-auto col-12">
            <button
              type="button"
              onClick={saveReview}
              className={classes.saveDraftButton}
            >
              {navigation.state === "idle" ? (
                "Save"
              ) : actionType === "save" ? (
                <BeatLoader loading size={8} />
              ) : (
                "Save"
              )}
            </button>
          </div>
          <div className="col-sm-auto col-12">
            <button
              type="button"
              onClick={submitReview}
              className={classes.submitChangesButton}
            >
              {navigation.state === "idle" ? (
                <>
                  <img
                    className={classes.submitChangesButtonIcon}
                    src={buttonIcon}
                    alt=""
                  />
                  Submit Changes & Revoke Access
                </>
              ) : actionType === "submit" ? (
                <BeatLoader loading size={8} />
              ) : (
                <>
                  <img
                    className={classes.submitChangesButtonIcon}
                    src={buttonIcon}
                    alt=""
                  />
                  Submit Changes & Revoke Access
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuggestChangesArticleButtonSet;
