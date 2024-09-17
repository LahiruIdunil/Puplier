import React, { useContext, useEffect, useState } from "react";
import DashboardTabTitle from "../components/dashboard/DashboardTabTitle";
import ReviewsInProgressList from "../components/dashboard/edit-requests-tab/ReviewsInProgressList";
import myArticlesIcon from "./images/my-articles.png";
import { defer, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import RequestProgressBar from "../components/RequestProgressBar";
import DashboardMessageContainer from "../components/DashboardMessageContainer";
import useDocumentTitle from "../custom-hooks/useDocumentTitle";

export default function EditRequests() {
  const reviewsLoader = useLoaderData();
  const [reviews, setReviews] = useState(null);
  const [faildedToLoadReviews, setFaildedToLoadReviews] = useState(false);
  const [startProgressBar, setStartProgressBar] = useState(true);
  const [completeProgressBar, setCompleteProgressBar] = useState(false);

  // set Docuement title
  useDocumentTitle("Puplier | Reviews In Progress");

  useEffect(() => {
    const { editRequestLoader } = reviewsLoader;

    editRequestLoader
      .then(({ response }) => {
        setReviews(response.data.body);
      })
      .catch(({ error }) => {
        if (error) {
          setFaildedToLoadReviews(true);
          toast.error(
            error?.response?.data.message || error || "Faild to load reviews!"
          );
        }
      })
      .finally(() => {
        setCompleteProgressBar(true);
      });

    return () => {
      // Need to cancle this API request on cleanup.
      // But with strictMode,this API request is being aborted in very first render
      // So during the second render, the request is already aborted and it throws an error.
      // It can be fixed by removing the strictMode from index.js
      // But as it's not a good practice to remove strictMode and also it's not a heavy API request,
      // for now, I'm not aborting this request.
      // abortController.abort();
    };
  }, [reviewsLoader]);

  return (
    <>
      <RequestProgressBar
        continuousStart={startProgressBar}
        complete={completeProgressBar}
      />
      <DashboardTabTitle
        icon={myArticlesIcon}
        iconWidth="38px"
        iconHeight="38px"
        tabName="Reviews In Progress"
      />
      {reviews &&
        (reviews.reviewsInProgress.length > 0 ||
          reviews.reviewsCompleted.length > 0) && (
          <ReviewsInProgressList reviews={reviews} />
        )}
      {/* show empty-listing message */}
      {reviews &&
        !reviews.reviewsInProgress.length &&
        !reviews.reviewsCompleted.length && (
          <DashboardMessageContainer
            status="empty"
            message="No ongoing reviews!"
          />
        )}
      {/* show erro message */}
      {faildedToLoadReviews && <DashboardMessageContainer status="error" />}
    </>
  );
}

export const editRequestsLoader = (sendRequest) => () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const data = {
    body: {
      userId: user?.userId || null,
      articleUserRole: "AUTHOR",
    },
  };

  const resolved = (response) => {
    const reviewsInProgress = {
      reviewsInProgress: [],
      reviewsCompleted: [],
    };

    // filters out only the reviews with the type of "REVIEW_IN_PROGRESS" or "REVIEW_COMPLETED"
    response.data.body.forEach((review) => {
      if (review.reviewRequestStatus === "REVIEW_IN_PROGRESS") {
        reviewsInProgress.reviewsInProgress.push(review);
      } else if (review.reviewRequestStatus === "REVIEW_COMPLETED") {
        reviewsInProgress.reviewsCompleted.push(review);
      }
    });

    // modify the response body
    response.data.body = reviewsInProgress;

    return {
      status: "ok",
      response,
    };
  };

  const editRequestLoader = sendRequest(
    "post",
    "/article/findReviewRequestsByUser",
    data,
    resolved
  ).then((resp) => {
    if (resp.status === "error") {
      throw resp;
    } else {
      return resp;
    }
  });

  return defer({ editRequestLoader });
};
