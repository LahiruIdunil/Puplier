import React, { useEffect, useState } from "react";
import SingleArticleItemActionButton from "./SingleArticleItemActionButton";
import classes from "./SingleArticleItem.module.css";
import Dropdown from "react-bootstrap/Dropdown";
import { NavLink } from "react-router-dom";
import useDeleteArticle from "../../custom-hooks/useDeleteArticle";
import { toast } from "react-toastify";
import MyArticlesDropdownMenu from "../MyArticlesDropdownMenu";

const SingleArticleItem = ({
  article,
  articlesList,
  setArticlesList,
  setInviteModalShow,
  setArticleDetails,
}) => {
  const { deleteArticle, actionData } = useDeleteArticle(article.articleId);
  const [publishedDate, setPublishedDate] = useState(null);

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

  // change the date format
  useEffect(() => {
    const dateObj = new Date(article.createdDate);

    let monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    setPublishedDate(
      `${dateObj.getFullYear()} ${
        monthNames[dateObj.getMonth()]
      } ${dateObj.getDate()}`
    );
  }, []);

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

  const openInviteModal = () => {
    setArticleDetails(article);
    setInviteModalShow();
  };

  return (
    <div className={`row`}>
      <div className="col-12">
        <div className={`${classes.itemContainer}`}>
          <div className={`d-md-flex d-none ${classes.dateContainer}`}>
            <p className={`${classes.articlePublishedDate}`}>
              {publishedDate} .{" "}
              {article.status.split("_").join(" ").toLowerCase()}
            </p>
          </div>
          <div className="row">
            <div className={`col-auto ${classes.articleImageContainerParent}`}>
              <NavLink
                to={`/article/${article.articleId}/${article.title
                  .split(" ")
                  .join("_")}`}
              >
                <div
                  className={`${classes.articleImageContainer}`}
                  style={{
                    backgroundImage: `url(https://picsum.photos/200?random=${article.articleId})`,
                  }}
                ></div>
              </NavLink>
            </div>
            <div className="col">
              <div className="row justify-content-between">
                <div
                  className={`col ${classes.articletitleContainer}`}
                  style={{ margin: "auto 0" }}
                >
                  <div className="d-flex">
                    <NavLink
                      to={`/article/${article.articleId}/${article.title
                        .split(" ")
                        .join("_")}`}
                      className="text-decoration-none"
                    >
                      <p className={`${classes.articleTitle}`}>
                        {article.title}
                      </p>
                    </NavLink>
                  </div>
                </div>
                <div className="col-auto d-md-flex d-block">
                  <div className={`m-auto ${classes.actionSection}`}>
                    <div
                      className={`${classes.inviteButtonConatainer} ${classes.primaryInviteButtonContainer}`}
                    >
                      {
                        // show only if the article is published or accepted
                        article.status.toLowerCase() === "published" ||
                        article.status.toLowerCase() === "accepted" ? null : (
                          <SingleArticleItemActionButton
                            setModalShow={openInviteModal}
                          />
                        )
                      }
                    </div>
                    <div className={`d-flex ${classes.dropdownContainer}`}>
                      <div className="m-auto">
                        <Dropdown>
                          <Dropdown.Toggle
                            as={CustomToggle}
                            id="dropdown-basic"
                          >
                            <span className="d-md-inline-block d-none material-icons">
                              more_horiz
                            </span>
                            <span className="d-md-none d-inline-block material-icons">
                              more_vert
                            </span>
                          </Dropdown.Toggle>
                          <MyArticlesDropdownMenu
                            article={article}
                            setInviteModalShow={openInviteModal}
                            deleteArticle={deleteArticle}
                          />
                        </Dropdown>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`d-md-block d-none ${classes.articlContentContainer}`}
              >
                <p className={`${classes.articleContent}`}>{article.summary}</p>
              </div>
              {/* creating this duplicate action button here, coz the button defined above is unable to be displaied to the user */}
              {/* when the screen size gets smaller and smaller */}
              <div
                className={`mt-2 ${classes.inviteButtonConatainer}  ${classes.secondaryInviteButtonContainer}`}
              >
                {
                  // show only if the article is published or accepted
                  article.status.toLowerCase() === "published" ||
                  article.status.toLowerCase() === "accepted" ? null : (
                    <SingleArticleItemActionButton
                      setModalShow={openInviteModal}
                    />
                  )
                }
              </div>
              {/* shows only in mobile versions */}
              <div className={`d-md-none d-block ${classes.dateContainer}`}>
                <p className={`${classes.articlePublishedDate}`}>
                  {publishedDate}
                </p>
                <p className={classes.articleStatus}>
                  {article.status.split("_").join(" ").toLowerCase()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleArticleItem;
