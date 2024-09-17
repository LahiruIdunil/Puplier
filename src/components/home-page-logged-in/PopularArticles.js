import React, { useState } from "react";
import SingleArticleItem from "../SingleArticleItem";
import Title from "./Title";
import titleIcon from "../images/popular-articles-title-icon.png";
import classes from "./PopularArticles.module.css";

const PopularArticles = () => {
  const [articlesList, setArticlesList] = useState([
    {
      articleId: 167,
      title:
        "Superconductivity at High Temperatures: Progress and Potential Applications",
      authorName: "Jenny Wilson",
      thumbnailUrl: "https://picsum.photos/id/167/500",
      score: "80%",
      readTime: 3,
      saved: false,
    },
    {
      articleId: 168,
      title:
        "Nuclear Fusion: Progress, Challenges, and the Path to Sustainable Energy",
      authorName: "Cody Fisher",
      thumbnailUrl: "https://picsum.photos/id/168/500",
      score: "96%",
      readTime: 4,
      saved: true,
    },
    {
      articleId: 169,
      title:
        "Understanding Dark Matter Candidates and Their Implications for Cosmology",
      authorName: "Robert Fox",
      thumbnailUrl: "https://picsum.photos/id/169/500",
      score: "75%",
      readTime: 3,
      saved: false,
    },
    {
      articleId: 170,
      title: "Gravitational Wave Detection and Astrophysical Insights",
      authorName: "Jenny Wilson",
      thumbnailUrl: "https://picsum.photos/id/170/500",
      score: "90%",
      readTime: 3,
      saved: true,
    },
    {
      articleId: 171,
      title:
        "Superconductivity at High Temperatures: Progress and Potential Applications",
      authorName: "Jenny Wilson",
      thumbnailUrl: "https://picsum.photos/id/171/500",
      score: "100%",
      readTime: 2,
      saved: false,
    },
    {
      articleId: 172,
      title:
        "Nuclear Fusion: Progress, Challenges, and the Path to Sustainable Energy",
      authorName: "Cody Fisher",
      thumbnailUrl: "https://picsum.photos/id/172/500",
      score: "85%",
      readTime: 3,
      saved: false,
    },
    {
      articleId: 173,
      title:
        "Understanding Dark Matter Candidates and Their Implications for Cosmology",
      authorName: "Robert Fox",
      thumbnailUrl: "https://picsum.photos/id/173/500",
      score: "100%",
      readTime: 4,
      saved: true,
    },
    {
      articleId: 174,
      title: "Gravitational Wave Detection and Astrophysical Insights",
      authorName: "Jenny Wilson",
      thumbnailUrl: "https://picsum.photos/id/174/500",
      score: "70%",
      readTime: 3,
      saved: false,
    },
  ]);

  return (
    <React.Fragment>
      <Title
        overrideStyles={classes.titleContainer}
        title="popular"
        icon={titleIcon}
      />
      <div className="row">
        {articlesList.map((article, key) => (
          <SingleArticleItem {...article} key={key} />
        ))}
      </div>
    </React.Fragment>
  );
};

export default PopularArticles;
