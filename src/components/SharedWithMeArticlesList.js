import React from "react";
import classes from "./SharedWithMeArticlesList.module.css";
import SharedWithMeArticleItem from "./dashboard/shared-with-me-tab/SharedWithMeArticleItem";
import DashboardMessageContainer from "./DashboardMessageContainer";

function SharedWithMeArticlesList({ articlesList }) {
  return (
    <div className={classes.listContainer}>
      {articlesList.length > 0 ? (
        <>
          <p className={classes.listTitle}>
            Assist authors in enhancing the quality of their articles by
            suggesting improvements.
          </p>
          {articlesList?.map((sharedArticle, key) => (
            <SharedWithMeArticleItem
              key={key}
              article={sharedArticle.article}
              reviewRequestId={sharedArticle.reviewRequestId}
              reviewRequestStatus={sharedArticle.reviewRequestStatus}
            />
          ))}
        </>
      ) : (
        <DashboardMessageContainer
          message="No reviews in progress!"
          status="empty"
        />
      )}
    </div>
  );
}

export default SharedWithMeArticlesList;
