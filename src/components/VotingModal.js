import React, { useEffect, useReducer } from "react";
import Modal from "react-bootstrap/Modal";
import VotingModalRange from "./VotingModalRange";
import classes from "./VotingModal.module.css";
import useHttp from "../custom-hooks/useHttp";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";

function VotingModal({ articleId, ...props }) {
  const initialScores = {
    accuracyScore: {
      score: 0,
    },
    completenessScore: {
      score: 0,
    },
    originalityScore: {
      score: 0,
    },
    consistencyScore: {
      score: 0,
    },
    timelinessScore: {
      score: 0,
    },
  };

  const reducer = (state, action) => {
    switch (action.id) {
      case "accuracyScore":
        return { ...state, accuracyScore: { score: action.score } };
      case "completenessScore":
        return { ...state, completenessScore: { score: action.score } };
      case "originalityScore":
        return { ...state, originalityScore: { score: action.score } };
      case "consistencyScore":
        return { ...state, consistencyScore: { score: action.score } };
      case "timelinessScore":
        return { ...state, timelinessScore: { score: action.score } };
      default:
        return state;
    }
  };

  const [scoreFields, dispatcher] = useReducer(reducer, initialScores);
  const { sendRequestAndTrackProgress, isLoading, actionData } = useHttp();

  const handleSubmit = () => {
    const {
      accuracyScore,
      completenessScore,
      originalityScore,
      consistencyScore,
      timelinessScore,
    } = scoreFields;

    const data = {
      body: {
        articleId,
        accuracyScore: accuracyScore.score,
        completenessScore: completenessScore.score,
        originalityScore: originalityScore.score,
        consistencyScore: consistencyScore.score,
        timelinessScore: timelinessScore.score,
      },
    };

    sendRequestAndTrackProgress("put", "/article/voteArticle", data);
  };

  useEffect(() => {
    if (actionData) {
      if (actionData.status === "ok") {
        toast.success(actionData.response.data.message);
        setTimeout(() => {
          props.onHide();
        }, 1500);
      } else {
        toast.error(
          actionData?.error?.response?.data.message ||
            actionData?.error ||
            "Faild to sumbit the vote!"
        );
      }
    }
    return () => {
      toast.dismiss();
    };
  }, [actionData]);

  return (
    <Modal
      {...props}
      dialogClassName={classes.votingModalContainer}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className={classes.customModalBody}>
        <div>
          <h3 className={`${classes.title}`}>
            How would you rate this article?
          </h3>
          <div>
            <VotingModalRange
              label="Accuracy"
              id="accuracyScore"
              dispatcher={dispatcher}
              articleScore={scoreFields.accuracyScore.score}
            />
          </div>
          <div>
            <VotingModalRange
              label="Completeness"
              id="completenessScore"
              dispatcher={dispatcher}
              articleScore={scoreFields.completenessScore.score}
            />
          </div>
          <div>
            <VotingModalRange
              label="Originality"
              id="originalityScore"
              dispatcher={dispatcher}
              articleScore={scoreFields.originalityScore.score}
            />
          </div>
          <div>
            <VotingModalRange
              label="Consistancy"
              id="consistencyScore"
              dispatcher={dispatcher}
              articleScore={scoreFields.consistencyScore.score}
            />
          </div>
          <div>
            <VotingModalRange
              label="Timeliness"
              id="timelinessScore"
              dispatcher={dispatcher}
              articleScore={scoreFields.timelinessScore.score}
            />
          </div>
          <div className="w-100">
            <button
              onClick={handleSubmit}
              className={`${classes.submitButton}`}
            >
              {isLoading ? (
                <BeatLoader loading size={10} />
              ) : (
                <p className={classes.submitButtonContent}>submit vote</p>
              )}
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default VotingModal;
