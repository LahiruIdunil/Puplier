import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import classes from "./MyArticlesDropdownMenu.module.css";
import { Link, useLocation, useNavigation } from "react-router-dom";

function MyArticlesDropdownMenu({
  article,
  setInviteModalShow,
  deleteArticle,
}) {
  const { pathname } = useLocation();

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
    <Dropdown.Menu as={CustomMenu}>
      <Dropdown.Item
        as={Link}
        to={`/article/${article.articleId}/${article.title
          .split(" ")
          .join("_")}`}
        className={classes.dropdownItem}
      >
        view
      </Dropdown.Item>
      {article.status.toLowerCase() !== "published" ? (
        <Dropdown.Item
          as={Link}
          to={`/article/${article.articleId}/edit`}
          className={classes.dropdownItem}
        >
          edit
        </Dropdown.Item>
      ) : null}
      {article.status.toLowerCase() === "published" ||
      article.status.toLowerCase() === "accepted" ? null : (
        <Dropdown.Item
          onClick={setInviteModalShow}
          className={`${
            pathname === "/dashboard/my-articles" ? "d-md-none" : null
          } ${classes.dropdownItem}`}
        >
          invite reviewers
        </Dropdown.Item>
      )}
      {article.status.toLowerCase() === "draft" ? (
        <Dropdown.Item onClick={deleteArticle} className={classes.dropdownItem}>
          delete
        </Dropdown.Item>
      ) : (
        ""
      )}
    </Dropdown.Menu>
  );
}

export default MyArticlesDropdownMenu;
