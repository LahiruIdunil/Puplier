import React, { useEffect, useState } from "react";
import classes from "./ArticleSuggestion.module.css";
import DiffComponent from "../components/DiffComponent";
import ArticleSuggestionDescription from "../components/ArticleSuggestionDescription";
import ArticleSuggestionsAcceptDeclineButtonSet from "../components/ArticleSuggestionsAcceptDeclineButtonSet";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import useDocumentTitle from "../custom-hooks/useDocumentTitle";

export default function ArticleSuggestion() {
  const loader = useLoaderData();
  const [originalTitle, setOriginalTitle] = useState("");
  const [suggestedTitle, setSuggestedTitle] = useState("");
  const [originalContent, setOriginalContent] = useState("");
  const [suggestedContent, setSuggestedContent] = useState("");
  const [reviewerDetails, setReviewerDetails] = useState(null);
  const [articleData, setArticleData] = useState({
    articleId: "",
    title: "",
  });

  // set Docuement title
  useDocumentTitle("Puplier | Article Suggestions");

  // triggers on initial load
  useEffect(() => {
    const { articleSuggestedContent, articleDetails } = loader;

    if (articleSuggestedContent.status === "ok") {
      let data = articleSuggestedContent.response.data.body;

      setOriginalTitle(data.originalTitle);
      setSuggestedTitle(data.suggestedTitle);
      setOriginalContent(data.originalContent);
      setSuggestedContent(data.suggestedContent);
    } else {
      toast.error(
        articleSuggestedContent?.error?.response?.data.message ||
          articleSuggestedContent?.error ||
          "Faild to load data!"
      );
    }

    if (articleDetails.status === "ok") {
      let data = articleDetails.response.data.body.article;
      setArticleData({ articleId: data.articleId, title: data.title });

      if (
        articleDetails.response.data.body.reviewers &&
        articleDetails.response.data.body.reviewers.length > 0
      ) {
        setReviewerDetails(articleDetails.response.data.body.reviewers[0]);
      }
    }
  }, [loader]);

  return (
    <div className="container customContainer">
      <div className="row justify-content-center">
        <div className="col-xxl-11 col-12">
          <div className={classes.editArticleContainer}>
            <ArticleSuggestionDescription
              article={articleData}
              reviewerDetails={reviewerDetails}
            />
            <DiffComponent
              type="Title"
              title="Suggestions for the Title"
              prevText={originalTitle}
              newText={suggestedTitle}
            />
            <DiffComponent
              type="Content"
              title="Suggestions for the Content"
              prevText={originalContent}
              newText={suggestedContent}
            />
            <ArticleSuggestionsAcceptDeclineButtonSet />
          </div>
        </div>
      </div>
    </div>
  );
}

const articleSuggestedContentLoader = (
  sendRequest,
  reviewRequestId,
  articleId
) => {
  const data = {
    body: {
      articleId,
      reviewRequestId,
    },
  };

  return sendRequest("post", "/article/findReviewComparisonContent", data);
};

const articleDetailsLoader = (sendRequest, articleId) => {
  const params = { articleId };
  return sendRequest("get", "/article/findArticleById", params);
};

export const articleSuggestionsLoader =
  (sendRequest) =>
  async ({ params: { review_request_id: reviewRequestId }, request }) => {
    const articleId = new URL(request.url).searchParams.get("articleId");

    const [articleSuggestedContent, articleDetails] = await Promise.all([
      articleSuggestedContentLoader(sendRequest, reviewRequestId, articleId),
      articleDetailsLoader(sendRequest, articleId),
    ]);

    return { articleSuggestedContent, articleDetails };
  };

export const articleSuggestionsAction =
  (sendRequest) =>
  async ({ request }) => {
    const formData = await request.formData();
    const user = JSON.parse(localStorage.getItem("user"));
    const { articleReviewReqId, articleStatus, status } =
      Object.fromEntries(formData);

    const data = {
      body: {
        articleReviewReqId,
        userId: user?.userId || null,
        status,
        articleStatus,
      },
    };

    return sendRequest("put", "/article/approveReviewedContent", data);
  };
