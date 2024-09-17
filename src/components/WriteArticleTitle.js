import React, { useEffect } from "react";
import WriteArticleErrorMessage from "./WriteArticleErrorMessage";
import classes from "./WriteArticleTitle.module.css";

function WriteArticleTitle({
  title,
  setTitle,
  titleError,
  setTitleError,
  disabled,
}) {
  // removes the title error when user types in the title field
  useEffect(() => {
    setTitleError(false);
  }, [title]);

  return (
    <div className={classes.articleHeaderEditorContainer}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={classes.articleHeaderEditor}
        type="text"
        placeholder="your article title here..."
        disabled={disabled}
      />
      {titleError && (
        <WriteArticleErrorMessage errorMessage="This field is required!" />
      )}
    </div>
  );
}

export default WriteArticleTitle;
