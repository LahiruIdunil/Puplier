import React, { useEffect, useState } from "react";
import classes from "./ArticleSuggestionsAcceptDeclineButtonSet.module.css";
import { BeatLoader } from "react-spinners";
import {
  useActionData,
  useNavigate,
  useNavigation,
  useParams,
  useSearchParams,
  useSubmit,
} from "react-router-dom";
import ComparisionPageChooseArticleStatusModal from "./ComparisionPageChooseArticleStatusModal";
import { toast } from "react-toastify";

function ArticleSuggestionsAcceptDeclineButtonSet() {
  const [show, setShow] = useState(false);
  const [triggeredButton, setTriggeredButton] = useState(null);
  const navigation = useNavigation();
  const navigate = useNavigate();
  const submit = useSubmit();
  const { review_request_id: articleReviewReqId } = useParams();
  const [searchParams] = useSearchParams();
  const actionData = useActionData();

  const handleApproveOrRejectAction = (
    articleStatus,
    authorAction,
    triggeredButton
  ) => {
    // helps to keep track of which button was clicked
    // this state is used to prevent beatloader inside
    // all the buttons appearing at the same time
    setTriggeredButton(triggeredButton);

    const values = {
      articleReviewReqId,
      status: authorAction,
      articleStatus,
    };

    submit(values, {
      method: "post",
      action: `/review-request/${articleReviewReqId}/view-suggestions?articleId=${searchParams.get(
        "articleId"
      )}`,
    });
  };

  // triggers once a response is recieved to the accept/reject request
  useEffect(() => {
    if (actionData) {
      if (actionData.status === "ok") {
        toast.success(actionData.response.data.message);
        navigate("/dashboard/edit-requests");
      } else {
        toast.error(
          actionData?.error?.response?.data.message ||
            actionData?.error?.message ||
            actionData.error
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
                onClick={() =>
                  handleApproveOrRejectAction(
                    "UNDER_REVIEW",
                    "AUTHOR_REJECTED",
                    "AUTHOR_REJECTED"
                  )
                }
                className={classes.declineButton}
              >
                {navigation.state === "idle" ? (
                  "Decline"
                ) : triggeredButton === "AUTHOR_REJECTED" ? (
                  <BeatLoader loading size={8} />
                ) : (
                  "Decline"
                )}
              </button>
            </div>
            <div className="col-sm-auto col-12">
              <button
                onClick={() => setShow(true)}
                type="button"
                className={classes.acceptButton}
              >
                <span
                  className={`material-icons-outlined ${classes.acceptButtonIcon}`}
                >
                  task_alt
                </span>
                <span className={classes.acceptButtonContent}>
                  Accept Suggestions
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <ComparisionPageChooseArticleStatusModal
        show={show}
        onHide={() => setShow(false)}
        handleApproveOrRejectAction={handleApproveOrRejectAction}
        triggeredButton={triggeredButton}
      />
    </>
  );
}

export default ArticleSuggestionsAcceptDeclineButtonSet;
