import React, { useContext, useEffect, useRef, useState } from "react";
import classes from "./SuggestChangesToArticle.module.css";
import WriteArticleTitle from "../components/WriteArticleTitle";
import EditArticleEditor from "../components/EditArticleEditor";
import WriteArticleErrorMessage from "../components/WriteArticleErrorMessage";
import SuggestChangesArticleButtonSet from "../components/SuggestChangesArticleButtonSet";
import { useLoaderData, useActionData } from "react-router";
import { toast } from "react-toastify";
import {
  useSearchParams,
  useParams,
  useSubmit,
  useNavigate,
  defer,
} from "react-router-dom";
import { userContext } from "../components/LoggedInBaseLayout";
import useDocumentTitle from "../custom-hooks/useDocumentTitle";
import RequestProgressBar from "../components/RequestProgressBar";

export default function SuggestChangesToArticle() {
  const [title, setTitle] = useState("");
  // this ref (contentRef) is used to keep track of the content, a user types within the tinymce
  const contentRef = useRef(null);
  // this variable (articleContent) is used only to set the content initially inside the editor
  const [articleContent, setArticleContent] = useState(null);
  const [otherArticleData, setOtherArticleData] = useState(null);
  const [searchParams] = useSearchParams();
  const articleReviewRequestId = searchParams.get("reviewRequestId");
  const { id: articleId } = useParams();
  // actionType is either save or submit(reviewers can just save the article or sumbit review to the author)
  const [actionType, setActionType] = useState("save");
  const articleLoader = useLoaderData();
  const actionData = useActionData();
  const submit = useSubmit();
  const navigate = useNavigate();
  const user = useContext(userContext);
  const [startProgressBar, setStartProgressBar] = useState(true);
  const [completeProgressBar, setCompleteProgressBar] = useState(false);

  // errors
  const [titleError, setTitleError] = useState(false);
  const [contentError, setContentError] = useState(false);

  // set Docuement title
  useDocumentTitle("Puplier | Suggest Changes To Article");

  // triggers to display existing values in relavent input fields(Triggers once the loader is finished executing)
  useEffect(() => {
    const { suggestChangesLoader } = articleLoader;

    suggestChangesLoader
      .then(({ response }) => {
        const articleDetails = response.data.body.articleReviewContent;

        setTitle(articleDetails.title);
        setArticleContent(articleDetails.content);
        setOtherArticleData(articleDetails);
      })
      .catch(({ error }) => {
        if (error) {
          toast.error(
            error?.response?.data.message ||
              error ||
              "Faild to load article data!"
          );
        }
      })
      .finally(() => {
        setCompleteProgressBar(true);
      });
  }, [articleLoader]);

  const onSubmit = (submitActionType) => {
    if (title && contentRef.current.getContent()) {
      let values = {};

      if (submitActionType === "save") {
        values = {
          articleReviewRequestId,
          title,
          content: contentRef.current.getContent(),
          thumbnailUrl: otherArticleData?.thumbnailUrl,
          score: otherArticleData?.score,
          actionType: submitActionType,
        };
      } else {
        values = {
          articleReviewReqId: articleReviewRequestId,
          userId: user.userId,
          status: "REVIEW_COMPLETED",
          actionType: submitActionType,
        };
      }

      submit(values, {
        method: "post",
        action: `/article/${articleId}/suggest-changes?reviewRequestId=${articleReviewRequestId}`,
      });
    } else {
      // scroll the page to the top
      window.scrollTo(0, 0);

      toast.error("Please fix the errors before submitting");
      if (!title) {
        setTitleError(true);
      }
      if (!contentRef.current.getContent()) {
        setContentError(true);
      }
    }
  };

  // this useEffect triggers after the action method is executed
  useEffect(() => {
    if (actionData) {
      // this block triggers if the user had pressed the "save" button
      if (actionType === "save") {
        if (actionData.status === "ok") {
          toast.success(actionData.response.data.message);
        } else {
          toast.error(
            actionData?.error?.response?.data.message ||
              "Faild to save the article!"
          );
        }
      }
      // this block triggers if the user had pressed the "submit chagnes" button
      else if (actionType === "submit") {
        if (actionData.status === "ok") {
          if (actionData.intent === "save") {
            // saveReview request was successfull
            // then we have to submit the review
            onSubmit("submit");
          } else {
            // submitReview request was successfull
            toast.success(actionData.response.data.message);
            navigate(`/dashboard/shared-with-me`);
          }
        } else {
          if (actionData.intent === "save") {
            // saveReview request was failed
            toast.error(
              actionData?.error?.response?.data.message ||
                "Faild to save the article!"
            );
          } else {
            // submitReview request was failed
            toast.error(
              actionData?.error?.response?.data.message ||
                "Faild to submit changes!"
            );
          }
        }
      }
    }
  }, [actionData]);

  return (
    <>
      <RequestProgressBar
        continuousStart={startProgressBar}
        complete={completeProgressBar}
      />
      <div className="container customContainer">
        <div className="row justify-content-center">
          <div className="col-xxl-auto col-xl-8 col-12">
            <div className={classes.editArticleContainer}>
              <form>
                <WriteArticleTitle
                  title={title}
                  setTitle={setTitle}
                  titleError={titleError}
                  setTitleError={setTitleError}
                />
                <EditArticleEditor
                  setContentError={setContentError}
                  content={articleContent}
                  contentRef={contentRef}
                />
                {contentError && (
                  <WriteArticleErrorMessage errorMessage="This field is required!" />
                )}
                <SuggestChangesArticleButtonSet
                  setActionType={setActionType}
                  actionType={actionType}
                  onSubmit={onSubmit}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const suggestChangesLoader =
  (sendRequest) =>
  ({ request }) => {
    const reviewRequestId = new URL(request.url).searchParams.get(
      "reviewRequestId"
    );
    const data = {
      body: {
        reviewRequestId,
      },
    };

    const suggestChangesLoader = sendRequest(
      "post",
      "/article/getReviewedContentById",
      data
    ).then((resp) => {
      if (resp.status === "error") {
        throw resp;
      } else {
        return resp;
      }
    });

    return defer({ suggestChangesLoader });
  };

export const suggestChangesAction =
  (sendRequest) =>
  async ({ request }) => {
    const formData = await request.formData();
    const { actionType, ...body } = Object.fromEntries(formData);

    let url = "";
    const data = { body };
    let resolved = null;
    let rejected = null;

    if (actionType === "save") {
      url = "/article/updateArticleReviewContent";
      resolved = (response) => {
        return {
          status: "ok",
          intent: "save",
          response,
        };
      };

      rejected = (error) => {
        return {
          status: "error",
          intent: "save",
          error,
        };
      };
    } else {
      url = "/article/completeArticleReview";
      resolved = (response) => {
        return {
          status: "ok",
          intent: "submit",
          response,
        };
      };

      rejected = (error) => {
        return {
          status: "error",
          intent: "submit",
          error,
        };
      };
    }

    return sendRequest("put", url, data, resolved, rejected);
  };
