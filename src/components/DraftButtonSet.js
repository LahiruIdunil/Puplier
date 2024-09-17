import React, { useEffect } from "react";
import classes from "../pages/EditArticle.module.css";
import buttonIcon from "./images/mark-as-under-review-button.png";
import { BeatLoader } from "react-spinners";
import { useNavigate, useNavigation } from "react-router";
import useHttp from "../custom-hooks/useHttp";
import { toast } from "react-toastify";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default function DraftButtonSet({ articleDetails }) {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const { sendRequestAndTrackProgress, isLoading, actionData } = useHttp();

  const markAsUnderReview = () => {
    const data = {
      body: {
        articleId: articleDetails.articleId,
        authorId: articleDetails.authorId,
      },
    };

    sendRequestAndTrackProgress("put", "/article/openArticleToReview", data);
  };

  // triggers once a response is recieved to the above request
  useEffect(() => {
    if (actionData) {
      if (actionData.status === "ok") {
        toast.success(actionData.response.data.message);
        navigate(`/article/${articleDetails.articleId}/edit`);
      } else {
        toast.error(
          actionData.error.response.data.message ||
            "Faild to change the article status!"
        );
      }
    }
  }, [actionData]);

  return (
    <div className={`row justify-content-center`}>
      <div
        className={`col-sm-auto col-12 d-sm-flex d-block ${classes.buttonsContainer}`}
      >
        <div className="row">
          <div className="col-sm-auto col-12">
            <button type="submit" className={classes.saveDraftButton}>
              {navigation.state === "submitting" ? (
                <BeatLoader loading size={8} />
              ) : (
                "Save draft"
              )}
            </button>
          </div>
          <div className="col-sm-auto col-12">
            <OverlayTrigger placement="right" overlay={tooltip}>
              <button
                type="button"
                onClick={markAsUnderReview}
                className={classes.markAsUnderReview}
              >
                {isLoading ? (
                  <BeatLoader loading size={8} />
                ) : (
                  <>
                    <img
                      className={classes.markAsUnderReviewButtonIcon}
                      src={buttonIcon}
                      alt=""
                    />
                    Mark as Under Review
                  </>
                )}
              </button>
            </OverlayTrigger>
          </div>
        </div>
      </div>
    </div>
  );
}

const tooltip = (
  <Tooltip id="tooltip">
    Once you've finished writing, click on this button to initiate the review
    process. Then, invite reviewers to provide you with feedback.
  </Tooltip>
);
