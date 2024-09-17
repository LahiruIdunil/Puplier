import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import classes from "./UserProfileArticleItem.module.css";
import Dropdown from "react-bootstrap/Dropdown";
import { toast } from "react-toastify";
import useDeleteArticle from "../custom-hooks/useDeleteArticle";
import MyArticlesDropdownMenu from "./MyArticlesDropdownMenu";
import InviteModal from "./InviteModal";

const UserProfileArticleItem = ({
  article,
  articlesList,
  setArticlesList,
  author,
  isAuthor,
  setInviteModalShow,
  setArticleDetails,
}) => {
  const { deleteArticle, actionData } = useDeleteArticle(article.articleId);

  const openInviteModal = () => {
    setArticleDetails(article);
    setInviteModalShow();
  };

  // triggers once an article is deleted
  useEffect(() => {
    if (actionData) {
      if (actionData.status === "ok") {
        // remove article from the list
        let deletedArticleId = actionData.response.data.body.articleId;
        let newArticlesList = articlesList.filter(
          (article) => article.articleId !== deletedArticleId
        );
        setArticlesList(newArticlesList);
        toast.success(actionData.response.data.message);
      } else {
        toast.error(
          actionData?.error?.response?.data.message ||
            actionData?.error?.message ||
            actionData.error
        );
      }
    }
  }, [actionData]);

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <div className={classes.customToggle}>
      <a
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
        style={{ cursor: "pointer" }}
      >
        {children}
      </a>
    </div>
  ));

  return (
    <div className={`col-lg-4 col-md-6 col-12`}>
      <div className={classes.articleContainer}>
        <NavLink
          to={`/article/${article.articleId}/${article.title
            .split(" ")
            .join("_")}`}
        >
          <div
            className={`${classes.articleImage}`}
            style={{
              backgroundImage: `url(https://picsum.photos/450?random=${article.articleId})`,
            }}
          ></div>
        </NavLink>
        {isAuthor ? (
          <div className="row">
            <div className={`col-auto ${classes.articleTitleContainer}`}>
              <NavLink
                to={`/article/${article.articleId}/${article.title
                  .split(" ")
                  .join("_")}`}
                className="text-decoration-none"
              >
                <p className={`${classes.articleTitle}`}>{article.title}</p>
              </NavLink>
            </div>

            <div className="col-auto">
              <div className="d-flex">
                <div className="m-auto">
                  <Dropdown>
                    <Dropdown.Toggle as={CustomToggle} id="dropdown-basic">
                      <span className="material-icons">more_vert</span>
                    </Dropdown.Toggle>
                    <MyArticlesDropdownMenu
                      article={article}
                      deleteArticle={deleteArticle}
                      setInviteModalShow={openInviteModal}
                    />
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <NavLink
            to={`/article/${article.articleId}/${article.title
              .split(" ")
              .join("_")}`}
            className="text-decoration-none"
          >
            <p className={`${classes.articleTitle}`}>{article.title}</p>
          </NavLink>
        )}
        <p className={`${classes.articleAuthor}`}>by {author}</p>
      </div>
    </div>
  );
};

export default UserProfileArticleItem;
