import React, { useEffect } from "react";
import { NavLink, useFetcher } from "react-router-dom";
import classes from "./PendingEditRequestItem.module.css";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";

export default function PendingEditRequestItem({
  editRequestId,
  reviewerId,
  article,
  openDeclineModal,
}) {
  const fetcher = useFetcher();

  const acceptEditRequest = () => {
    const values = {
      editRequestId,
      reviewerId,
      action: "REVIEW_ACCEPTED",
    };

    fetcher.submit(values, {
      method: "post",
      action: "/dashboard/shared-with-me",
    });
  };

  // triggers once a response is received for the ACCEPT request
  useEffect(() => {
    if (fetcher.data) {
      if (fetcher.data.status === "ok") {
        toast.success(fetcher.data.response.data.message);
      } else {
        toast.error(
          fetcher.data?.error?.response?.data.message ||
            fetcher.data?.error ||
            "Failed to accept edit request!"
        );
      }
    }
  }, [fetcher.data]);

  return (
    <div className={`row`}>
      <div className="col-12">
        <div className={`${classes.itemContainer}`}>
          <div className={`d-md-block d-none ${classes.dateContainer}`}>
            {/* TODO: change this */}
            <p className={`${classes.articleAuthor}`}>
              by {article.authorName}
            </p>
          </div>
          <div className="row">
            <div className={`col-auto ${classes.articleImageContainerParent}`}>
              <NavLink
                to={`/article/${article.articleId}/${article.title
                  .split(" ")
                  .join("_")}`}
              >
                <div
                  className={`${classes.articleImageContainer}`}
                  style={{
                    backgroundImage: `url(https://picsum.photos/200?random=${article.articleId})`,
                  }}
                ></div>
              </NavLink>
            </div>
            <div className="col d-md-block d-flex flex-column justify-content-between">
              <div className="row justify-content-between">
                <div
                  className={`col ${classes.articletitleContainer}`}
                  style={{ margin: "auto 0" }}
                >
                  <div className="d-flex">
                    <NavLink
                      to={`/article/${article.articleId}/${article.title
                        .split(" ")
                        .join("_")}`}
                      className="text-decoration-none"
                    >
                      <p className={`${classes.articleTitle}`}>
                        {article.title}
                      </p>
                    </NavLink>
                  </div>
                </div>
                <div className="col-auto d-flex flex-column justify-content-center">
                  {/* shows only in screens greater thean 575px */}
                  <div className={`${classes.primaryButtonSet}`}>
                    <div>
                      <button
                        onClick={acceptEditRequest}
                        className={`${classes.acceptButton}`}
                      >
                        {fetcher.state === "submitting" ? (
                          <BeatLoader loading size={8} color="white" />
                        ) : (
                          "accept"
                        )}
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() =>
                          openDeclineModal(editRequestId, reviewerId)
                        }
                        className={`${classes.declineButton}`}
                      >
                        decline
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`d-md-block d-none ${classes.articlContentContainer}`}
              >
                <p className={`${classes.articleContent}`}>{article.summary}</p>
              </div>
              {/* shows only in mobile versions */}
              <div className={`d-md-none d-block ${classes.dateContainer}`}>
                <p className={`${classes.articleAuthor}`}>
                  by {article.authorName}
                </p>
              </div>
              <div>
                {/* shows only in screens smaller then 575px */}
                <div className={`mt-md-3 ${classes.secondaryButtonSet}`}>
                  <div>
                    <button
                      type="button"
                      onClick={acceptEditRequest}
                      className={`${classes.acceptButton}`}
                    >
                      {fetcher.state === "submitting" ? (
                        <BeatLoader loading size={8} color="white" />
                      ) : (
                        "accept"
                      )}
                    </button>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() =>
                        openDeclineModal(editRequestId, reviewerId)
                      }
                      className={`${classes.declineButton}`}
                    >
                      decline
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const replyForReviewRequestAction =
  (sendRequest) =>
  async ({ request }) => {
    const formData = await request.formData();
    const {
      editRequestId,
      reviewerId,
      action,
      declineReason = null,
    } = Object.fromEntries(formData);

    const data = {
      body: {
        editRequestId,
        reviewerId,
        action,
      },
    };

    if (action === "REVIEW_DECLINE") {
      data.body.declineReason = declineReason;
    }

    return sendRequest("put", "/article/replyForReviewRequest", data);
  };
