import React, { useState } from "react";
import classes from "./ArticlesYouMayLikeBar.module.css";
import ArticlesYouMayLikeItem from "./ArticlesYouMayLikeItem";

const ArticlesYouMayLikeBar = (props) => {
  const [postsList, setPostsList] = useState([
    {
      article_id: "1",
      image: "https://picsum.photos/500?random=1",
      title: "Kids Fall Fashion Tips with Wendy Lam",
      authorName: "john doe",
      authorImage: "https://picsum.photos/id/177/500",
      publishedDate: "21 jan 2022",
      readTime: "12",
    },
    {
      article_id: "11",
      image: "https://picsum.photos/500?random=2",
      title: "Kids Fall Fashion Tips with Wendy Lam",
      authorName: "john doe",
      authorImage: "https://picsum.photos/id/178/500",
      publishedDate: "21 jan 2022",
      readTime: "12",
    },
    {
      article_id: "12",
      image: "https://picsum.photos/500?random=3",
      title: "Kids Fall Fashion Tips with Wendy Lam",
      authorName: "john doe",
      authorImage: "https://picsum.photos/id/179/500",
      publishedDate: "21 jan 2022",
      readTime: "12",
    },
    {
      article_id: "13",
      image: "https://picsum.photos/500?random=4",
      title: "Kids Fall Fashion Tips with Wendy Lam",
      authorName: "john doe",
      authorImage: "https://picsum.photos/id/180/500",
      publishedDate: "21 jan 2022",
      readTime: "12",
    },
    {
      article_id: "14",
      image: "https://picsum.photos/500?random=5",
      title: "Kids Fall Fashion Tips with Wendy Lam",
      authorName: "john doe",
      authorImage: "https://picsum.photos/id/177/500",
      publishedDate: "21 jan 2022",
      readTime: "12",
    },
  ]);

  return (
    <div className={`row`}>
      <div className="col-12">
        <p className={`${classes.title}`}>{props.title}</p>
      </div>
      <div className="col-12">
        <div className="row">
          {postsList.map((article, key) => (
            <ArticlesYouMayLikeItem
              article={article}
              overrideStyles={props.overrideStyles}
              key={key}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticlesYouMayLikeBar;
