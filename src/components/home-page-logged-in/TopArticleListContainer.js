import React, { useState } from "react";
import SingleArticleItem from "../SingleArticleItem";

const TopArticleListContainer = () => {
  const [articlesList, setArticlesList] = useState([
    {
      articleId: 159,
      title:
        "Superconductivity at High Temperatures: Progress and Potential Applications",
      authorName: "Jenny Wilson",
      thumbnailUrl: "https://picsum.photos/id/54/500",
      score: "100%",
      readTime: 2,
      saved: true,
    },
    {
      articleId: 160,
      title:
        "Nuclear Fusion: Progress, Challenges, and the Path to Sustainable Energy",
      authorName: "Cody Fisher",
      thumbnailUrl: "https://picsum.photos/id/55/500",
      score: "90%",
      readTime: 3,
      saved: false,
    },
    {
      articleId: 161,
      title:
        "Understanding Dark Matter Candidates and Their Implications for Cosmology",
      authorName: "Robert Fox",
      thumbnailUrl: "https://picsum.photos/id/56/500",
      score: "85%",
      readTime: 2,
      saved: false,
    },
    {
      articleId: 162,
      title: "Gravitational Wave Detection and Astrophysical Insights",
      authorName: "Jenny Wilson",
      thumbnail_url: "https://picsum.photos/id/57/500",
      score: "thumbnailUrl%",
      readTime: 4,
      saved: true,
    },
  ]);

  return (
    <div className="row">
      {articlesList.map((article, key) => (
        <SingleArticleItem {...article} key={key} />
      ))}
    </div>
  );
};

export default TopArticleListContainer;
