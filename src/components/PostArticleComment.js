import React, { useContext, useEffect, useRef } from "react";
import classes from "./PostArticleComment.module.css";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
import useHttp from "../custom-hooks/useHttp";
import { userContext } from "./LoggedInBaseLayout";

function PostArticleComment({ articleId, setComments }) {
  const commentRef = useRef();
  const { sendRequest, sendRequestAndTrackProgress, isLoading, actionData } =
    useHttp();
  const userDetails = useContext(userContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    // hide all toast notifications
    toast.dismiss();

    if (commentRef.current.value == "") {
      toast.error("Comment field is empty");
      return null;
    }

    const data = {
      body: {
        id: "",
        articleId,
        parentId: "-1",
        userId: userDetails ? userDetails.userId : null,
        content: commentRef.current.value,
        status: 1,
      },
    };

    sendRequestAndTrackProgress("post", "/article/addComment", data);
  };

  // trggers after the comment is submitted
  useEffect(() => {
    if (actionData) {
      if (actionData.status === "ok") {
        toast.success(actionData.response.data.message);
        // clears the comment input filed
        commentRef.current.value = "";

        // fetch updated comments list
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
        const resolved = (response) => {
          setComments(response.data.body.articleComments);
        };
        const rejected = (error) => {
          toast.error(error.response.data.message || "Faild to load comments");
        };

        sendRequest(
          "post",
          "/article/findArticleComments",
          params,
          resolved,
          rejected
        );
      } else {
        toast.error(
          actionData.error.response.data.message || "Faild to submit comment"
        );
      }
    }
  }, [actionData]);

  return (
    <div className={`${classes.writeCommentSection}`}>
      <p className={`${classes.writecommentSectionTitle}`}>Write a comment</p>

      <form onSubmit={handleSubmit}>
        <textarea
          ref={commentRef}
          className={classes.newCommentInput}
          name="comment"
          id="comment"
          cols="30"
          rows="4"
          placeholder="Type something..."
        ></textarea>
        <div className="d-flex justify-content-end">
          <button type="submit" className={classes.commentSubmitButton}>
            {isLoading ? <BeatLoader loading size={10} /> : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default PostArticleComment;
