import React, { useState } from "react";
import classes from "./ArticleScoreContainer.module.css";
import ArticleScoreShowItem from "./ArticleScoreShowItem";
import VotingModal from "./VotingModal";
import ArticleDetailsSideBarActionButton from "./ArticleDetailsSideBarActionButton";
import ArticleDetailsSideBarTitle from "./ArticleDetailsSideBarTitle";

function ArticleScoreContainer({ articleScores, articleId }) {
  const [showVotingModal, setShowVotingModal] = useState(false);

  return (
    <div className={`${classes.articleScoreContainer}`}>
      <ArticleDetailsSideBarTitle title="article score" />
      <p className={`${classes.articleScore}`}>
        {articleScores.totalScore} / 10
      </p>
      <p className={`${classes.articleScoreSideNote}`}>
        {`(Based on ${articleScores.totalVoteCount} Votes)`}
      </p>
      <div className={`${classes.articleScores}`}>
        <ArticleScoreShowItem
          width={`${articleScores.accuracyScore}%`}
          title="accuracy"
        />
        <ArticleScoreShowItem
          width={`${articleScores.completenessScore}%`}
          title="completeness"
        />
        <ArticleScoreShowItem
          width={`${articleScores.originalityScore}%`}
          title="originality"
        />
        <ArticleScoreShowItem
          width={`${articleScores.consistencyScore}%`}
          title="consistency"
        />
        <ArticleScoreShowItem
          width={`${articleScores.timelinessScore}%`}
          title="timeliness"
        />
        <div className="d-flex justify-content-center">
          <ArticleDetailsSideBarActionButton
            onClick={() => setShowVotingModal(true)}
            btnText={"vote"}
          />
          <VotingModal
            show={showVotingModal}
            onHide={() => setShowVotingModal(false)}
            articleId={articleId}
          />
        </div>
      </div>
    </div>
  );
}

export default ArticleScoreContainer;
