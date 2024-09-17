import React from "react";
import classes from "./ArticleDetailsSuggestChangesButton.module.css";
import alertIcon from "./images/alert-icon.png";
import useSuggestReview from "../custom-hooks/useSuggestReview";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { BeatLoader } from "react-spinners";

export default function ArticleDetailsSuggestChangesButton({
  // TODO: check if the reviewRequestId is available
  reviewRequestDetails: { reviewRequestStatus, reviewRequestId },
  articleId,
  userId,
}) {
  const { isAuthorized, isLoading, startReviewArticle } = useSuggestReview(
    reviewRequestStatus,
    reviewRequestId,
    userId,
    articleId
  );

  return (
    <div className="row">
      <div className="col-12">
        <div className={`row ${classes.alertContainer}`}>
          <div className="col-auto d-flex">
            <div className="m-auto">
              <img src={alertIcon} alt="icon" />
            </div>
          </div>
          <div className="col d-md-flex d-block p-0">
            <p className={`${classes.alertContent}`}>
              You have been granted edit access to this article. Please submit
              your changes
            </p>
          </div>
          <div className="col-md-auto col-12">
            {isAuthorized ? (
              <button
                onClick={() => (isLoading ? "" : startReviewArticle())}
                className={classes.alertButton}
              >
                {isLoading ? (
                  <BeatLoader loading size={8} />
                ) : (
                  "suggest changes"
                )}
              </button>
            ) : (
              <OverlayTrigger placement="bottom" overlay={tooltip}>
                <button
                  className={`${classes.alertButton} ${classes.disabledAlertButton}`}
                >
                  suggest changes
                </button>
              </OverlayTrigger>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
const tooltip = (
  <Tooltip id="tooltip">
    Suggesting changes is temporarily unavailable as some other reviewer is
    currently editing this article.
  </Tooltip>
);
