import React, { useState } from "react";
import SingleArticleItem from "../SingleArticleItem";
import Title from "./Title";
import titleIcon from "../images/categories-you-may-interest-icon.png";
import classes from "./NewlyPublishedArticlesContainer.module.css";

const NewlyPublishedArticlesContainer = () => {
  const [articlesList, setArticlesList] = useState([
    {
      id: 170,
      title: "The Impact of Climate Change on Species Diversity",
      content:
        "This article presents a comprehensive overview of the current state of research in...",
      author: "Jenny Wilson",
    },
    {
      id: 171,
      title: "The Dynamics of Climate Change",
      content:
        "This article presents a comprehensive overview of the current state of research in...",
      author: "Cody Fisher",
    },
    {
      id: 172,
      title: "The Role of Microbes in Human Health",
      content:
        "This article presents a comprehensive overview of the current state of research in...",
      author: "Robert Fox",
    },
    {
      id: 173,
      title: "The Role of Pollution in Biodiversity Loss",
      content:
        "This article presents a comprehensive overview of the current state of research in...",
      author: "Jenny Wilson",
    },
    {
      id: 174,
      title: "The Impact of Climate Change on Species Diversity",
      content:
        "This article presents a comprehensive overview of the current state of research in...",
      author: "Jenny Wilson",
    },
    {
      id: 175,
      title: "The Dynamics of Climate Change",
      content:
        "This article presents a comprehensive overview of the current state of research in...",
      author: "Cody Fisher",
    },
    {
      id: 176,
      title: "The Role of Microbes in Human Health",
      content:
        "This article presents a comprehensive overview of the current state of research in...",
      author: "Robert Fox",
    },
    {
      id: 177,
      title: "The Role of Pollution in Biodiversity Loss",
      content:
        "This article presents a comprehensive overview of the current state of research in...",
      author: "Jenny Wilson",
    },
  ]);
  return (
    <React.Fragment>
      <Title
        overrideStyles={classes.titleContainer}
        title="Newly Published Publications to Review"
        icon={titleIcon}
      />
      <div className="row">
        {articlesList.map((item, key) => (
          <SingleArticleItem
            key={key}
            id={item.id}
            title={item.title}
            content={item.content}
            author={item.author}
          />
        ))}
      </div>
    </React.Fragment>
  );
};

export default NewlyPublishedArticlesContainer;
