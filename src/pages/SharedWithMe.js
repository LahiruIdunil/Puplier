import React, { useEffect, useState } from "react";
import DashboardTabTitle from "../components/dashboard/DashboardTabTitle";
import PendingEditRequestsList from "../components/dashboard/edit-requests-tab/PendingEditRequestsList";
import titleIcon from "./images/shared-with-me-title-icon.png";
import { Await, defer, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import SubTitle from "../components/dashboard/edit-requests-tab/SubTitle";
import classes from "./SharedWithMe.module.css";
import editRequestsTitleIcon from "../components/images/pending-edit-requests-title-icon.png";
import reviewsInProgessTitleIcon from "../components/images/reviews-in-progress-title-icon.png";
import SharedWithMeArticlesList from "../components/SharedWithMeArticlesList";
import RequestProgressBar from "../components/RequestProgressBar";
import DashboardMessageContainer from "../components/DashboardMessageContainer";
import useDocumentTitle from "../custom-hooks/useDocumentTitle";

export default function SharedWithMe() {
  const data = useLoaderData();
  const [startProgressBar, setStartProgressBar] = useState(true);
  const [completeProgressBar, setCompleteProgressBar] = useState(false);
  const [isLoadingSharedArticles, setIsLoadingSharedArticles] = useState(true);
  const [isLoadingPendingEditRequests, setIsLoadingPendingEditRequests] =
    useState(true);

  // set Docuement title
  useDocumentTitle("Puplier | Shared With Me");

  useEffect(() => {
    data.articlesLoader
      .catch(({ error }) => {
        if (error) {
          toast.error(
            error?.response?.data.message || error || "Error loading articles!"
          );
        }
      })
      .finally(() => {
        setIsLoadingSharedArticles(false);
      });

    data.editRequestLoader
      .catch(({ error }) => {
        if (error) {
          toast.error(
            error?.response?.data.message ||
              error ||
              "Error loading edit requests!"
          );
        }
      })
      .finally(() => {
        setIsLoadingPendingEditRequests(false);
      });

    return () => {
      // Need to cancle this API request on cleanup.
      // But with strictMode,this API request is being aborted in very first render
      // So during the second render, the request is already aborted and it throws an error.
      // It can be fixed by removing the strictMode from index.js
      // But as it's not a good practice to remove strictMode and also it's not a heavy API request,
      // for now, I'm not aborting this request.
    };
  }, [data]);

  useEffect(() => {
    if (!isLoadingSharedArticles && !isLoadingPendingEditRequests) {
      setCompleteProgressBar(true);
    }
  }, [isLoadingSharedArticles, isLoadingPendingEditRequests]);

  return (
    <>
      <RequestProgressBar
        continuousStart={startProgressBar}
        complete={completeProgressBar}
      />
      <DashboardTabTitle icon={titleIcon} tabName="review requests" />
      {/* Pending edit requests section starts here */}
      <SubTitle
        icon={editRequestsTitleIcon}
        title="pending review requests"
        overrideStyle={classes.subTitle}
      />
      <React.Suspense>
        <Await
          resolve={data.editRequestLoader}
          errorElement={<DashboardMessageContainer status="error" />}
        >
          {({
            response: {
              data: { body: editRequestsList },
            },
          }) => <PendingEditRequestsList editRequestsList={editRequestsList} />}
        </Await>
      </React.Suspense>
      {/* Reveiws in progress section starts here */}
      <SubTitle
        icon={reviewsInProgessTitleIcon}
        title="reviews in progress"
        overrideStyle={classes.subTitle}
      />
      <React.Suspense>
        <Await
          resolve={data.articlesLoader}
          errorElement={<DashboardMessageContainer status="error" />}
        >
          {({
            response: {
              data: { body: articlesList },
            },
          }) => <SharedWithMeArticlesList articlesList={articlesList} />}
        </Await>
      </React.Suspense>
    </>
  );
}

const sharedWithMeArticlesLoader = (userId, sendRequest) => {
  const reqMethod = "post";
  const url = "/article/findSharedArticlesByUser";
  const data = {
    body: {
      userId,
    },
  };
  const articlesLoader = sendRequest(reqMethod, url, data).then((resp) => {
    if (resp.status === "error") {
      throw resp;
    } else {
      resp.response.data.body = resp.response.data.body.filter(
        (article) =>
          article.reviewRequestStatus == "REVIEW_ACCEPTED" ||
          article.reviewRequestStatus == "REVIEW_OPEN" ||
          article.reviewRequestStatus == "REVIEW_IN_PROGRESS"
      );
      return resp;
    }
  });

  return articlesLoader;
};

const pendingEditRequestsLoader = (userId, sendRequest) => {
  const method = "post";
  const url = "/article/findReviewRequestsByUser";
  const data = {
    body: {
      userId,
      articleUserRole: "REVIEWER",
    },
  };

  const resolved = (response) => {
    const editRequests = response.data.body.filter(
      (editRequest) => editRequest.reviewRequestStatus === "PENDING_TO_APPROVE"
    );

    response.data.body = editRequests;

    return {
      status: "ok",
      response,
    };
  };

  const editRequestLoader = sendRequest(method, url, data, resolved).then(
    (resp) => {
      if (resp.status === "error") {
        throw resp;
      } else {
        return resp;
      }
    }
  );

  return editRequestLoader;
};

export const sharedWithMePageLoader = (sendRequest) => () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const editRequestLoader = pendingEditRequestsLoader(
    user?.userId || null,
    sendRequest
  );
  const articlesLoader = sharedWithMeArticlesLoader(
    user?.userId || null,
    sendRequest
  );

  return defer({ editRequestLoader, articlesLoader });
};
