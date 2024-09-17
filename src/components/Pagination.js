import React from "react";
import classes from "./Pagination.module.css";
import { useNavigate } from "react-router-dom";

export default function Pagination({
  searchQuery,
  currentPage,
  articlesCount,
}) {
  const navigate = useNavigate();

  const handlePagination = (action) => {
    if (action === "prev" && currentPage > 1) {
      navigate(`/search/${searchQuery}/${currentPage - 1}`);
    } else if (action === "next" && articlesCount >= 10) {
      navigate(`/search/${searchQuery}/${currentPage + 1}`);
    }
  };

  return (
    <div
      className={`d-flex justify-content-xxl-end justify-content-center ${classes.buttonContainer}`}
    >
      <button
        onClick={() => handlePagination("prev")}
        className={`${classes.actionButton} ${
          currentPage === 1 && classes.disabledButton
        }`}
      >
        <span className="material-icons-outlined">navigate_before</span>
      </button>
      <button
        onClick={() => handlePagination("next")}
        className={`${classes.actionButton} ${
          articlesCount < 10 && classes.disabledButton
        }`}
      >
        <span className="material-icons-outlined">navigate_next</span>
      </button>
    </div>
  );
}
