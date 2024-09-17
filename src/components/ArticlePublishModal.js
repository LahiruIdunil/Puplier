import React, { useContext, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import classes from "./ArticlePublishModal.module.css";
import useHttp from "../custom-hooks/useHttp";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { userContext } from "./LoggedInBaseLayout";

function ArticlePublishModal({ articleDetails, ...props }) {
  const user = useContext(userContext);
  const navigate = useNavigate();
  const { sendRequestAndTrackProgress, isLoading, actionData } = useHttp();

  const publishArticle = () => {
    const data = {
      body: {
        articleId: articleDetails.articleId,
        authorId: user.userId,
      },
    };
    sendRequestAndTrackProgress("post", "/article/publishArticle", data);
  };

  useEffect(() => {
    if (actionData) {
      if (actionData.status === "ok") {
        toast.success(actionData.response.data.message);
        navigate(
          `/article/${articleDetails.articleId}/${articleDetails.title
            .split(" ")
            .join("_")}`
        );
      } else {
        toast.error(
          actionData.error.response.data.message ||
            "Faild to publish the article!"
        );
      }
    }
  }, [actionData]);

  return (
    <Modal
      {...props}
      dialogClassName={classes.customPublishModal}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className={classes.customModalBody}>
        <div className={classes.modalCloseButtonContainer}>
          <span
            className={`material-icons ${classes.modalCloseButton}`}
            onClick={props.onHide}
          >
            close
          </span>
        </div>
        <div className={classes.modalBodyContainer}>
          <h4 className={classes.modalTitle}>Publish the Article</h4>
          <p className={classes.description}>
            Do you want to publish the article to Puplier and make it permanent?
            Once it is published, no one, including you, will be able to modify
            or delete it. Do you want to proceed?
          </p>
          <div className={`d-flex justify-content-center`}>
            <div className={classes.buttonContainer}>
              <button
                onClick={props.onHide}
                className={`d-flex justify-content-center align-items-center ${classes.goBackButton}`}
              >
                <div className={classes.returnIconContainer}>
                  <span
                    className={`material-icons-outlined ${classes.returnIcon}`}
                  >
                    keyboard_return
                  </span>
                </div>
                <p className={`m-0`}>Go Back</p>
              </button>
              <button
                type="button"
                onClick={publishArticle}
                className={classes.publishButton}
              >
                {isLoading ? (
                  <BeatLoader loading size={10} />
                ) : (
                  "confirm & publish"
                )}
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ArticlePublishModal;
