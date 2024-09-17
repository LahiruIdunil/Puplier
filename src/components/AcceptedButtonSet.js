import React, { useEffect, useState } from "react";
import classes from "../pages/EditArticle.module.css";
import buttonIcon from "./images/mark-as-under-review-button.png";
import ArticlePublishModal from "./ArticlePublishModal";
import useHttp from "../custom-hooks/useHttp";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AcceptedButtonSet({ articleDetails }) {
  const [publishArticleModalShow, setPublishArticleModalShow] = useState(false);
  const { sendRequestAndTrackProgress, isLoading, actionData } = useHttp();
  const navigate = useNavigate();

  const markAsUnderReview = () => {
    const data = {
      body: {
        articleId: articleDetails.articleId,
        authorId: articleDetails.authorId,
      },
    };

    sendRequestAndTrackProgress(
      "post",
      "/article/continueReviewFromAccepted",
      data
    );
  };

  // triggers once a response is received from the server
  useEffect(() => {
    if (actionData) {
      if (actionData.status === "ok") {
        toast.success(actionData.response.data.message);
        navigate(`/article/${articleDetails.articleId}/edit`);
      } else {
        toast.error(
          actionData?.error?.response?.data.message ||
            actionData?.error ||
            "Faild to mark the article as under review!"
        );
      }
    }
  }, [actionData]);

  return (
    <>
      <div className={`row justify-content-center`}>
        <div
          className={`col-sm-auto col-12 d-sm-flex d-block ${classes.buttonsContainer}`}
        >
          <div className="row">
            <div className="col-sm-auto col-12">
              <button
                type="button"
                onClick={markAsUnderReview}
                className={`${classes.acceptButtonSetSecondaryButton} ${classes.saveDraftButton}`}
              >
                {isLoading ? (
                  <BeatLoader loading size={8} />
                ) : (
                  "Mark as Under Review"
                )}
              </button>
            </div>
            <div className="col-sm-auto col-12">
              <button
                type="button"
                onClick={() => setPublishArticleModalShow(true)}
                className={classes.markAsUnderReview}
              >
                <img
                  className={classes.markAsUnderReviewButtonIcon}
                  src={buttonIcon}
                  alt=""
                />
                Publish
              </button>
            </div>
          </div>
        </div>
      </div>
      <ArticlePublishModal
        onHide={() => setPublishArticleModalShow(false)}
        show={publishArticleModalShow}
        articleDetails={articleDetails}
      />
    </>
  );
}

export default AcceptedButtonSet;
