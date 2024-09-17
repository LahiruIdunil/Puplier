import React from "react";
import classes from "./CreatArtcleFlowIndicatorBar.module.css";
import IndicatorItem from "./IndicatorItem";
import LineBetweenIndicatorItems from "./LineBetweenIndicatorItems";
import draftActiveIndicator from "./images/article-flow-draft-active-indicator.png";
import underReviewActiveIndicator from "./images/article-flow-under-review-active-indicator.png";
import underReviewIndicator from "./images/article-flow-under-review-indicator.png";
import inProgressActiveIndicator from "./images/article-flow-in-progress-active-indicator.png";
import inProgressIndicator from "./images/article-flow-in-progress-indicator.png";
import acceptedActiveIndicaor from "./images/article-flow-accepted-active-indicator.png";
import acceptedIndicaor from "./images/article-flow-accepted-indicator.png";
import publishedActiveIndicator from "./images/article-flow-published-active-indicator.png";
import publishedIndicator from "./images/article-flow-published-indicator.png";

function CreatArtcleFlowIndicatorBar({ articleStatus }) {
  console.log("articleStatus", articleStatus);
  return (
    <div className={`row g-0 d-sm-flex d-none ${classes.indicatorBar}`}>
      <IndicatorItem
        status="draft"
        activeIcon={draftActiveIndicator}
        isActive
      />
      <LineBetweenIndicatorItems
        isActive={articleStatus !== "draft" ? true : false}
      />
      <IndicatorItem
        status="under review"
        activeIcon={underReviewActiveIndicator}
        disabledIcon={underReviewIndicator}
        isActive={articleStatus !== "draft" ? true : false}
      />
      <LineBetweenIndicatorItems
        isActive={
          articleStatus === "review_in_progress" || articleStatus === "accepted"
            ? true
            : false
        }
      />
      <IndicatorItem
        status="review in progress"
        activeIcon={inProgressActiveIndicator}
        disabledIcon={inProgressIndicator}
        isActive={
          articleStatus === "review_in_progress" || articleStatus === "accepted"
            ? true
            : false
        }
      />
      <LineBetweenIndicatorItems
        isActive={articleStatus === "accepted" ? true : false}
      />
      <IndicatorItem
        status="accepted"
        activeIcon={acceptedActiveIndicaor}
        disabledIcon={acceptedIndicaor}
        isActive={articleStatus === "accepted" ? true : false}
      />
      <LineBetweenIndicatorItems />
      <IndicatorItem
        status="published"
        activeIcon={publishedActiveIndicator}
        disabledIcon={publishedIndicator}
      />
    </div>
  );
}

export default CreatArtcleFlowIndicatorBar;
