import React, { useState, useEffect, useContext } from "react";
import classes from "./SharedWithMeArticleItem.module.css";
import Dropdown from "react-bootstrap/Dropdown";
import SuggestChangesButton from "./SuggestChangesButton";
import { NavLink } from "react-router-dom";
import { userContext } from "../../LoggedInBaseLayout";
import useSuggestReview from "../../../custom-hooks/useSuggestReview";
import { toast } from "react-toastify";

const SharedWithMeArticleItem = ({
  article,
  reviewRequestId,
  reviewRequestStatus,
}) => {
  const [publishedDate, setPublishedDate] = useState("");
  const user = useContext(userContext);
  // isAuthorized: check if the current user is authorized to suggest reviews
  // startReviewArticle: If the current user is authorized to suggest reviews,navigate him to the suggest changes page
  const { isAuthorized, isLoading, startReviewArticle } = useSuggestReview(
    reviewRequestStatus,
    reviewRequestId,
    user.userId || null,
    article.articleId
  );

  // change the date format
  useEffect(() => {
    const dateObj = new Date(article.createdDate);
    const monthNames = [
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
  }, [article]);

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

  const CustomMenu = React.forwardRef(
    ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
      const [value, setValue] = useState("");

      return (
        <div
          ref={ref}
          style={style}
          className={`${className} ${classes.customMenu}`}
          aria-labelledby={labeledBy}
        >
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value)
            )}
          </ul>
        </div>
      );
    }
  );

  return (
    <div className={`row`}>
      <div className="col-12">
        <div className={`${classes.itemContainer}`}>
          <div className={`d-md-block d-none ${classes.dateContainer}`}>
            <p className={`${classes.articlePublishedDate}`}>{publishedDate}</p>
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
                  <NavLink
                    to={`/article/${article.articleId}/${article.title
                      .split(" ")
                      .join("_")}`}
                    className="text-decoration-none"
                  >
                    <p className={`${classes.articleTitle}`}>{article.title}</p>
                  </NavLink>
                </div>
                <div className="col-auto d-md-flex d-block">
                  <div className="d-flex m-auto">
                    <div className={classes.primaryButtonSet}>
                      <SuggestChangesButton
                        isAuthorized={isAuthorized}
                        startReviewArticle={startReviewArticle}
                        isLoading={isLoading}
                      />
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

                          <Dropdown.Menu as={CustomMenu}>
                            <Dropdown.Item
                              href={`/article/${
                                article.articleId
                              }/${article.title.split(" ").join("_")}`}
                              className={classes.dropdownItem}
                            >
                              view original
                            </Dropdown.Item>
                            {isAuthorized ? (
                              <Dropdown.Item
                                onClick={startReviewArticle}
                                className={classes.dropdownItem}
                              >
                                start editing
                              </Dropdown.Item>
                            ) : (
                              <Dropdown.Item
                                className={classes.disabledDropdownItem}
                                onClick={() =>
                                  toast.warning(
                                    "Suggesting changes is temporarily unavailable as some other reviewer is currently editing this article."
                                  )
                                }
                              >
                                start editing
                              </Dropdown.Item>
                            )}
                          </Dropdown.Menu>
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
              {/* shows only in mobile versions */}
              <div className={`d-md-none d-block ${classes.dateContainer}`}>
                <p className={`${classes.articlePublishedDate}`}>
                  {publishedDate}
                </p>
              </div>
              <div className={`mt-md-3 ${classes.secondaryButtonSet}`}>
                <SuggestChangesButton
                  isAuthorized={isAuthorized}
                  startReviewArticle={startReviewArticle}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharedWithMeArticleItem;
