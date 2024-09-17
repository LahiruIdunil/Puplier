import React from "react";
import buttonIcon from "../../images/shared-with-me-button-icon.png";
import disabledButtonIcon from "../../images/shared-with-me-button-icon-disabled.png";
import classes from "./SuggestChangesButton.module.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { BeatLoader } from "react-spinners";

export default function SuggestChangesButton({
  isAuthorized,
  isLoading,
  startReviewArticle,
}) {
  return isAuthorized ? (
    // Authorized action button
    <div
      onClick={() => (isLoading ? "" : startReviewArticle())}
      className={`d-md-flex d-none ${classes.actionButton}`}
    >
      {isLoading ? (
        <div style={{ margin: "0px 38.7px", height: "20.72px" }}>
          <BeatLoader loading size={8} />
        </div>
      ) : (
        <>
          <div className={`${classes.buttonIconContainer}`}>
            <img src={buttonIcon} alt="" width="18px" />
          </div>
          <div className="d-flex">
            <p className={`${classes.buttonText}`}>start editing</p>
          </div>
        </>
      )}
    </div>
  ) : (
    // disabled action button
    <OverlayTrigger placement="bottom" overlay={tooltip}>
      <div
        className={`d-md-flex d-none ${classes.actionButton} ${classes.diabledActionButton}`}
      >
        <div className={`${classes.buttonIconContainer}`}>
          <img src={disabledButtonIcon} alt="" width="18px" />
        </div>
        <div className="d-flex">
          <p className={`${classes.buttonText}`}>start editing</p>
        </div>
      </div>
    </OverlayTrigger>
  );
}

const tooltip = (
  <Tooltip id="tooltip">
    Suggesting changes is temporarily unavailable as some other reviewer is
    currently editing this article.
  </Tooltip>
);
