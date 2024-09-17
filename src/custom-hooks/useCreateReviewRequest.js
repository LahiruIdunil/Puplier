import { useEffect, useState } from "react";
import useHttp from "./useHttp";
import { toast } from "react-toastify";

export default function useCreateReviewRequest({
  trackProgressOfRequest = false,
}) {
  const {
    sendRequest,
    sendRequestAndTrackProgress,
    isLoading: isLoadingData,
    actionData,
  } = useHttp();

  // we use a separeate state to check if the requests is still in progress
  // because there're two separate requests that are sent to the backend.
  // so we need to check if both requests are finished or still loading
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(isLoadingData);
  }, [isLoadingData]);

  // this method return a list of users along with their userIds
  const fetchUserList = async (reviewersList) => {
    const reviewers = await Promise.all(
      reviewersList
        .filter((reviewer) => reviewer !== "null" && reviewer !== "")
        .map((userAuth) =>
          sendRequest("get", "/user/findUserInfoByUserAuthData", {
            userAuth,
          })
        )
    );
    return reviewers;
  };

  const createReviewRequest = async (reviewers, articleId, authorId) => {
    setIsLoading(true);

    const reviewersList = reviewers
      ? fetchUserList(reviewers.split(","))
      : fetchUserList(reviewers);

    return reviewersList
      .then((reviewers) => {
        // prepare request body
        const data = {
          body: reviewers
            .filter(
              (reviewer) =>
                reviewer.status === "ok" &&
                reviewer.response.data.body.userId !== null
            )
            .map((reviewer) => {
              const { userId, loginName, email } = reviewer.response.data.body;

              return {
                articleId: articleId || null,
                title: "",
                reviewerId: userId,
                reviewerLoginName: loginName,
                reviewerEmail: email,
                description: "",
                articleOwnerId: authorId || null,
              };
            }),
        };

        // if there is no any valid reviewer within the entered list => throws an error
        if (!data.body.length) throw "No valid reviewers found!";

        if (trackProgressOfRequest) {
          return sendRequestAndTrackProgress(
            "post",
            "/article/articleReviewRequest",
            data
          );
        }

        return sendRequest("post", "/article/articleReviewRequest", data);
      })
      .catch((error) => {
        return toast.error(
          error?.response?.data.message ||
            error ||
            "Faild to create review request!"
        );
      });
  };

  return { createReviewRequest, isLoading, actionData };
}
