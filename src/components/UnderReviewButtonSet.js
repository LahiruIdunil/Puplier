import React, { useContext, useEffect } from "react";
import classes from "../pages/EditArticle.module.css";
import buttonIcon from "./images/mark-as-under-review-button.png";
import { BeatLoader } from "react-spinners";
import { userContext } from "./LoggedInBaseLayout";
import { useNavigate, useNavigation } from "react-router-dom";
import useHttp from "../custom-hooks/useHttp";
import { toast } from "react-toastify";

function UnderReviewButtonSet({ articleDetails }) {
  const user = useContext(userContext);
  const navigation = useNavigation();
  const navigate = useNavigate();
  const { sendRequestAndTrackProgress, isLoading, actionData } = useHttp();

  const acceptArticle = () => {
    const data = {
      body: {
        articleId: articleDetails.articleId,
        authorId: user.userId,
      },
    };
    sendRequestAndTrackProgress("post", "/article/acceptArticle", data);
  };

  useEffect(() => {
    if (actionData) {
      if (actionData.status === "ok") {
        toast.success(actionData.response.data.message);
        navigate(`/article/${articleDetails.articleId}/edit`);
      } else {
        toast.error(
          actionData.error.response.data.message ||
            "Faild to mark the article as accepted!"
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
            <button type="sumbit" className={classes.saveDraftButton}>
              {navigation.state === "submitting" ? (
                <BeatLoader loading size={8} />
              ) : (
                "save"
              )}
            </button>
          </div>
          <div className="col-sm-auto col-12">
            <button
              type="button"
              onClick={acceptArticle}
              className={classes.markAsUnderReview}
            >
              {isLoading ? (
                <BeatLoader loading size={10} />
              ) : (
                <>
                  <img
                    className={classes.markAsUnderReviewButtonIcon}
                    src={buttonIcon}
                    alt=""
                  />
                  Mark as Accepted
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UnderReviewButtonSet;
