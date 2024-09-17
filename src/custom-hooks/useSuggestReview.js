import { useEffect, useState } from "react";
import useHttp from "./useHttp";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function useSuggestReview(
  reviewReqStatus,
  reviewReqId,
  userId,
  articleId
) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const navigate = useNavigate();
  const { sendRequestAndTrackProgress, isLoading, actionData } = useHttp();

  // check if the reviewer is authorized to edit the article
  const checkIsAuthorized = () => {
    if (
      reviewReqStatus === "REVIEW_OPEN" ||
      reviewReqStatus === "REVIEW_IN_PROGRESS"
    ) {
      setIsAuthorized(true);
    }
  };

  const navigateToSuggestChangesPage = () => {
    navigate(
      `/article/${articleId}/suggest-changes?reviewRequestId=${reviewReqId}`
    );
  };

  // if the reviewer is authorized to edit article,navigate him to the suggest changes page
  const startReviewArticle = () => {
    // if the review request is already in the status of REVIEW_IN_PROGRESS,
    // then no need to send a request to the backend to authorize the reviewer
    if (reviewReqStatus === "REVIEW_IN_PROGRESS") {
      navigateToSuggestChangesPage();
      return;
    }

    const data = {
      body: {
        articleReviewReqId: reviewReqId,
        userId,
      },
    };
    sendRequestAndTrackProgress("put", "/article/startReviewArticle", data);
  };

  useEffect(() => {
    checkIsAuthorized();
  }, []);

  useEffect(() => {
    if (actionData) {
      if (actionData.status === "ok") {
        navigateToSuggestChangesPage();
      } else {
        toast.error(
          actionData?.error?.response?.data.message ||
            actionData?.error ||
            "Currently unable to edit the article!"
        );
      }
    }
  }, [actionData]);

  return { isAuthorized, isLoading, startReviewArticle };
}
