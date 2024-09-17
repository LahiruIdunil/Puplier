import React, { useEffect, useState } from "react";
import WriteArticle from "../components/WriteArticle";
import { useLoaderData, useNavigate } from "react-router-dom";
import DraftButtonSet from "../components/DraftButtonSet";
import UnderReviewButtonSet from "../components/UnderReviewButtonSet";
import AcceptedButtonSet from "../components/AcceptedButtonSet";
import { toast } from "react-toastify";
import useDocumentTitle from "../custom-hooks/useDocumentTitle";

export default function EditArticle() {
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();
  const articleLoader = useLoaderData();
  const [articleDetails, setArticleDetails] = useState(null);
  const [articleStatus, setArticleStatus] = useState(null);

  // set document title
  useDocumentTitle(`Puplier | Edit Article`);

  useEffect(() => {
    if (articleLoader.status === "ok") {
      const authorId = articleLoader.response.data.body.authorDetails.userId;

      if (user) {
        if (authorId === user.userId) {
          setArticleDetails(articleLoader.response.data.body.article);
          setArticleStatus(articleLoader.response.data.body.article.status);

          // automatically scrolls the page to the top
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        } else {
          navigate(`/dashboard/my-articles/new`);
        }
      } else {
        navigate(`/`);
      }
    } else {
      toast.error(
        articleLoader?.error?.response?.data.message ||
          articleLoader?.error ||
          "Faild to load article data!"
      );
    }
  }, [articleLoader]);

  return (
    <>
      <WriteArticle articleDetails={articleDetails} mode="editArticle">
        {articleStatus === "DRAFT" ? (
          <DraftButtonSet articleDetails={articleDetails} />
        ) : articleStatus === "UNDER_REVIEW" ? (
          <UnderReviewButtonSet articleDetails={articleDetails} />
        ) : articleStatus === "ACCEPTED" ? (
          <AcceptedButtonSet articleDetails={articleDetails} />
        ) : (
          ""
        )}
      </WriteArticle>
    </>
  );
}

export const editArticleLoader =
  (sendRequest) =>
  ({ params: { id: articleId } }) => {
    const params = { articleId };
    return sendRequest("get", "/article/findArticleById", params);
  };

export const editArticleAction =
  (sendRequest) =>
  async ({ request }) => {
    const formData = await request.formData();
    const {
      title,
      category,
      content,
      summary,
      thumbnailUrl,
      articleId,
      userData,
    } = Object.fromEntries(formData);

    const userDetails = JSON.parse(userData);
    let data = {
      body: {
        articleId,
        title,
        summary,
        content,
        thumbnailUrl,
        authorName: `${
          userDetails
            ? `${userDetails.firstName} ${userDetails.lastName}`
            : null
        }`,
        categoryId: category,
        updatedBy: `${
          userDetails
            ? `${userDetails.firstName} ${userDetails.lastName}`
            : null
        }`,
      },
    };

    return sendRequest("put", "/article/updateArticle", data);
  };
