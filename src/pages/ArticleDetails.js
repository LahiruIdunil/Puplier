import React, { useContext, useEffect, useState } from "react";
import classes from "./ArticleDetails.module.css";
import SingleCommentItem from "../components/SingleCommentItem";
import SingleReviewer from "../components/SingleReviewer";
import { NavLink, useLoaderData, useParams, defer } from "react-router-dom";
import { toast } from "react-toastify";
import PostArticleComment from "../components/PostArticleComment";
import ArticleDetailsSuggestChangesButton from "../components/ArticleDetailsSuggestChangesButton";
import { userContext } from "../components/LoggedInBaseLayout";
import defaultAvatar from "../components/images/avator.png";
import RequestProgressBar from "../components/RequestProgressBar";
import useDocumentTitle from "../custom-hooks/useDocumentTitle";
import ArticleScoreContainer from "../components/ArticleScoreContainer";
import useFetchAllSimilarProfiles from "../custom-hooks/useFetchAllSimilarProfiles";
import ArticleDetailsInviteReviewersSection from "../components/ArticleDetailsInviteReviewersSection";
import ArticleDetailsSideBarTitle from "../components/ArticleDetailsSideBarTitle";
import InviteModal from "../components/InviteModal";

export default function ArticleDetails() {
  const userDetails = useContext(userContext);
  const [isLoadingArticleDetails, setIsLoadingArticleDetails] = useState(true);
  const [isLoadingArticleScores, setIsLoadingArticleScores] = useState(true);
  const [inviteModalShow, setInviteModalShow] = useState(false);
  const [isLoadingArticleComments, setIsLoadingArticleComments] =
    useState(true);
  const [startProgressBar, setStartProgressBar] = useState(true);
  const [completeProgressBar, setCompleteProgressBar] = useState(false);
  const [articleDetails, setArticleDetails] = useState(null);
  const [comments, setComments] = useState([]);
  const { id: articleId } = useParams();
  const [isReviewer, setIsReviewer] = useState(false);
  const user = useContext(userContext);
  const [reviewRequestDetails, setReviewRequestDetails] = useState(null);
  const { setDoucmentTitle } = useDocumentTitle(`Puplier`);
  const [articleScores, setArticleScores] = useState({
    accuracyScore: 0,
    completenessScore: 0,
    originalityScore: 0,
    consistencyScore: 0,
    timelinessScore: 0,
    totalScore: 0,
    totalVoteCount: 0,
  });
  const [reviewers, setReviewers] = useState([]);
  const articleLoader = useLoaderData();

  const {
    similarProfiles,
    success: fetchedSimilarProfiles,
    error: errorLoadingSimilarProfiles,
  } = useFetchAllSimilarProfiles(userDetails?.userId || null);

  useEffect(() => {
    const {
      articleDetails,
      articleComments,
      articleScores,
      reviewRequestDetails,
    } = articleLoader;

    articleDetails
      .then(({ response }) => {
        setArticleDetails(response.data.body);
        setReviewers(response.data.body.reviewers);
      })
      .catch(({ error }) => {
        if (error) {
          toast.error(
            error?.response?.data.message ||
              error ||
              "Faild to load the article!"
          );
        }
      })
      .finally(() => {
        setIsLoadingArticleDetails(false);
      });

    articleComments
      .then(({ response }) => {
        setComments(response.data.body.articleComments);
      })
      .catch(({ error }) => {
        if (error) {
          toast.error(
            error?.response?.data.message ||
              error ||
              "Faild to load article comments!"
          );
        }
      })
      .finally(() => {
        setIsLoadingArticleComments(false);
      });

    articleScores
      .then(({ response }) => {
        setArticleScores(response.data.body);
      })
      .catch(({ error }) => {
        if (error) {
          // Currently, backend doesn't return an understandable error message
          // once this request is faild
          // And as this is not a major request in article details page,
          // we don't need to show an error message to the user
          // toast.error(
          //   error?.response?.data.message ||
          //     error ||
          //     "Faild to load article scores!"
          // );
        }
      })
      .finally(() => {
        setIsLoadingArticleScores(false);
      });

    reviewRequestDetails
      .then(({ response }) => {
        setIsReviewer(response.data.body.isReviewer);
        setReviewRequestDetails(response.data.body.reviewRequestByCurrentUser);
      })
      .catch(({ error }) => {
        // As this is not a major request in article details page,
        // we don't need to show an error message to the user
        // if thiis request is faild
      });

    return () => {
      // Need to cancle theses API request on cleanup.
      // But with strictMode,this API requests are being aborted in very first render
      // So during the second render, the requests are already aborted and it throws an error.
      // It can be fixed by removing the strictMode from index.js
      // But as it's not a good practice to remove strictMode,
      // for now, I'm not aborting these requests.
    };
  }, [articleLoader]);

  // use to finish the progress bar
  useEffect(() => {
    if (
      !isLoadingArticleComments &&
      !isLoadingArticleDetails &&
      !isLoadingArticleScores
    ) {
      setCompleteProgressBar(true);
    }
  }, [
    isLoadingArticleComments,
    isLoadingArticleDetails,
    isLoadingArticleScores,
  ]);

  useEffect(() => {
    // set Docuement title
    if (articleDetails) {
      setDoucmentTitle(`${articleDetails?.article.title}`);
    }
  }, [articleDetails]);

  return (
    <>
      <RequestProgressBar
        continuousStart={startProgressBar}
        complete={completeProgressBar}
        hideBackground={true}
      />
      <InviteModal
        show={inviteModalShow}
        onHide={() => setInviteModalShow(false)}
        articleDetails={articleDetails?.article}
        similarProfiles={similarProfiles}
        fetchedSimilarProfiles={fetchedSimilarProfiles}
      />
      {articleDetails && (
        <div
          className={`container customContainer ${classes.artilceDetailsContainer}`}
          style={{ marginTop: "50px" }}
        >
          <div className="row">
            <div className={`col-xl col-12 ${classes.leftContainer}`}>
              {isReviewer ? (
                <ArticleDetailsSuggestChangesButton
                  reviewRequestDetails={reviewRequestDetails}
                  articleId={articleDetails.article.articleId}
                  userId={user?.userId || null}
                />
              ) : (
                ""
              )}
              <div className="row">
                <div className="col-12">
                  {articleDetails.article.status.toLowerCase() ===
                    "published" && (
                    <p className={classes.publishedDate}>
                      {/* TODO: currently we show the article created data as the published date
                          as we don't have the article published date in the response.
                          We need to change this when the article published date is available in the response
                      */}
                      Published on {articleDetails.article.createdDate}
                    </p>
                  )}
                  {articleDetails.article.status.toLowerCase() !==
                  "published" ? (
                    articleDetails.article.isOwner ? (
                      <p className={classes.articleStatus}>
                        status -{" "}
                        {articleDetails.article.status.split("_").join(" ")}
                      </p>
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                  <h1 className={classes.articleTitle}>
                    {articleDetails.article.title}
                  </h1>
                  <div
                    className={`d-sm-flex d-block justify-content-between ${classes.authorDetailsContainer}`}
                  >
                    <div className="d-flex">
                      <div className={classes.authorImageContainer}>
                        <NavLink
                          to={`/user/${articleDetails.authorDetails?.loginName}?id=${articleDetails.authorDetails?.userId}`}
                          className="text-decoration-none"
                        >
                          <div
                            className={classes.authorImage}
                            style={{
                              backgroundImage: articleDetails.authorDetails
                                .profileImageUrl
                                ? `url(${articleDetails.authorDetails.profileImageUrl})`
                                : `url(${defaultAvatar})`,
                            }}
                          ></div>
                        </NavLink>
                      </div>
                      <div
                        className={`d-flex align-items-center ${classes.authorNameContainer}`}
                      >
                        <NavLink
                          to={`/user/${articleDetails.authorDetails?.loginName}?id=${articleDetails.authorDetails?.userId}`}
                          className="text-decoration-none"
                        >
                          <p className={`m-auto ${classes.authorName}`}>
                            by {articleDetails.authorDetails.name}
                          </p>
                        </NavLink>
                      </div>
                    </div>
                    {/* this div is only visible in screens smaller than 1199px */}
                    {articleDetails.article.isOwner ? (
                      <NavLink
                        to={`/article/${articleDetails.article.articleId}/edit`}
                        className="text-decoration-none"
                      >
                        <button
                          className={`d-xl-none d-block ${classes.editArticleButton}`}
                        >
                          edit article
                        </button>
                      </NavLink>
                    ) : (
                      ""
                    )}
                  </div>
                  <div
                    className={`${classes.articleImage}`}
                    style={{
                      backgroundImage: `url(https://picsum.photos/1000?random=${articleDetails.article.articleId})`,
                    }}
                  ></div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: articleDetails.article.content,
                    }}
                    className={`${classes.descriptionContainer}`}
                  ></div>
                </div>
              </div>
            </div>
            <div className={`col-xl-auto col-12 ${classes.rightContainer}`}>
              {articleDetails.article.isOwner ? (
                articleDetails.article.status.toLowerCase() !== "published" ? (
                  <NavLink
                    to={`/article/${articleDetails.article.articleId}/edit`}
                    className="text-decoration-none"
                  >
                    <button
                      className={`d-xl-block d-none ${classes.editArticleButton}`}
                    >
                      edit article
                    </button>
                  </NavLink>
                ) : null
              ) : null}
              {articleDetails.article.status.toLowerCase() === "published" ? (
                <ArticleScoreContainer
                  articleScores={articleScores}
                  articleId={articleDetails.article.articleId}
                />
              ) : null}
              {reviewers.length > 0 && (
                <div className={`${classes.reviewersContainer}`}>
                  <ArticleDetailsSideBarTitle title="reviewers" />
                  <div
                    className={`row justify-content-xl-between justify-content-center ${classes.reviewersProfileContainer}`}
                  >
                    <div className="col-auto overflow-hidden">
                      <div className="row gx-xl-2">
                        {reviewers.map((reviewer, key) => (
                          <div key={key}>
                            <SingleReviewer
                              reviewerName={reviewer.name}
                              userName={reviewer.loginName}
                              userImage={reviewer.profileImageUrl}
                              userId={reviewer.userId}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {fetchedSimilarProfiles ? (
                articleDetails.article.isOwner ? (
                  articleDetails.article.status.toLowerCase() === "draft" ||
                  articleDetails.article.status.toLowerCase() ===
                    "under_review" ||
                  articleDetails.article.status.toLowerCase() ===
                    "review_in_progress" ? (
                    <ArticleDetailsInviteReviewersSection
                      similarProfiles={similarProfiles.slice(0, 5)}
                      articleDetails={articleDetails?.article}
                      openInviteModal={() => setInviteModalShow(true)}
                    />
                  ) : null
                ) : null
              ) : null}
            </div>
          </div>
          <div className="row">
            <div
              className={`col-xl col-12 ${classes.leftContainer} ${classes.commentSection}`}
            >
              <PostArticleComment
                articleId={articleId}
                setComments={setComments}
              />
              <div>
                <p className={`${classes.commentCount}`}>
                  {comments.length} comments
                </p>
                {comments.map((comment, key) => (
                  <SingleCommentItem
                    key={key}
                    userImage={
                      comment.profileImage
                        ? comment.profileImage
                        : defaultAvatar
                    }
                    fullName={`${comment.firstName} ${comment.lastName}`}
                    userName={comment.loginName}
                    userId={comment.userId}
                    comment={comment.content}
                  />
                ))}
              </div>
            </div>
            <div
              className={`col-xl-auto d-xl-block d-none ${classes.rightContainer}`}
            ></div>
          </div>
        </div>
      )}
    </>
  );
}
// this is a temporary solution to give a nice UX in alpha version
// TODO: remove this function when neccessary
const replaceArticleIdWithDummyId = (articleId) => {
  if (articleId.length < 5) {
    return "ARTIC_sarith.rajapaksha_1c9cdd00-4cc3-11ee-88c0-35ddad6c2dd8_1c0f4600-677d-11ee-8428-75e3074fe57e";
  } else {
    return articleId;
  }
};

const articleDetailsLoader =
  (sendRequest) =>
  ({ params: { id } }) => {
    const articleId = replaceArticleIdWithDummyId(id);
    let user = JSON.parse(localStorage.getItem("user"));
    const params = { articleId };

    const resolved = (response) => {
      const dateObj = new Date(response.data.body.article.createdDate);
      let monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      let publishedDate = `${dateObj.getDate()} ${
        monthNames[dateObj.getMonth()]
      }, ${dateObj.getFullYear()}`;

      // change the date format of the response
      response.data.body.article.createdDate = publishedDate;

      //check if the current user is the owner of this article
      if (response.data.body.authorDetails.userId == user?.userId) {
        response.data.body.article.isOwner = true;
      } else {
        response.data.body.article.isOwner = false;
      }

      return { status: "ok", response };
    };

    const rejected = (error) => {
      return { status: "error", error };
    };

    return sendRequest(
      "get",
      "/article/findArticleById",
      params,
      resolved,
      rejected
    ).then((resp) => {
      if (resp.status === "error") {
        throw resp;
      } else {
        return resp;
      }
    });
  };

const articleCommentsLoader =
  (sendRequest) =>
  ({ params: { id: articleId } }) => {
    const params = {
      body: {
        articleId,
        parentCommentId: "-1",
        from: 0,
        count: 50,
        depth: 2,
        depthCount: 5,
      },
    };
    return sendRequest("post", "/article/findArticleComments", params).then(
      (resp) => {
        if (resp.status === "error") {
          throw resp;
        } else {
          return resp;
        }
      }
    );
  };

const articleScoreLoader =
  (sendRequest) =>
  ({ params: { id } }) => {
    const articleId = replaceArticleIdWithDummyId(id);
    const params = { articleId };

    const resolved = (response) => {
      response.data.body.totalScore = (
        response.data.body.totalScore / 100
      ).toFixed(1);

      return {
        status: "ok",
        response,
      };
    };

    return sendRequest(
      "get",
      "/article/getArticleScore",
      params,
      resolved
    ).then((resp) => {
      if (resp.status === "error") {
        throw resp;
      } else {
        return resp;
      }
    });
  };

const reviewRequestsLoader =
  (sendRequest) =>
  ({ params: { id: articleId } }) => {
    const params = { articleId };
    let user = JSON.parse(localStorage.getItem("user"));

    const resolved = (response) => {
      let reviewRequests = response.data.body;
      let isReviewer = false;
      let reviewRequestByCurrentUser = [];

      if (user) {
        reviewRequestByCurrentUser = reviewRequests
          .filter((reviewReq) => reviewReq.reviewerId === user.userId)
          .filter(
            (reviewReq) =>
              reviewReq.reviewRequestStatus == "REVIEW_ACCEPTED" ||
              reviewReq.reviewRequestStatus == "REVIEW_OPEN" ||
              reviewReq.reviewRequestStatus == "REVIEW_IN_PROGRESS"
          );
      }

      if (reviewRequestByCurrentUser.length) {
        isReviewer = true;
        // according to the current backend functionality there may have more than one
        // review request from single article to a single reviewer
        reviewRequestByCurrentUser = reviewRequestByCurrentUser[0];

        response.data.body = { isReviewer, reviewRequestByCurrentUser };
      } else {
        response.data.body = { isReviewer, reviewRequestByCurrentUser: null };
      }

      return {
        status: "ok",
        response,
      };
    };

    return sendRequest(
      "get",
      "/article/findReviewRequestsByArticle",
      params,
      resolved
    ).then((resp) => {
      if (resp.status === "error") {
        throw resp;
      } else {
        return resp;
      }
    });
  };

export const articleLoader = (sendRequest) => async (args) => {
  const articleDetails = articleDetailsLoader(sendRequest)(args);
  const articleComments = articleCommentsLoader(sendRequest)(args);
  const articleScores = articleScoreLoader(sendRequest)(args);
  const reviewRequestDetails = reviewRequestsLoader(sendRequest)(args);

  return defer({
    articleDetails,
    articleComments,
    articleScores,
    reviewRequestDetails,
  });
};
