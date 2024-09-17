import React from "react";

function WriteArticleErrorMessage({ errorMessage }) {
  return <p style={{ color: "red", fontSize: "14px" }}>{errorMessage}</p>;
}

export default WriteArticleErrorMessage;
