import React, { useState } from "react";
import DashboardTabTitle from "../components/dashboard/DashboardTabTitle";
import titleIcon from "./images/bookmarks-title-icon.png";
import BookmarkArticleItem from "../components/dashboard/BookmarkArticleItem";
import useDocumentTitle from "../custom-hooks/useDocumentTitle";

const Bookmarks = () => {
  // set Docuement title
  useDocumentTitle("Puplier | Bookmarks");

  const [articlesList, setArticlesList] = useState({
    status: 200,
    bookmarks: [
      {
        article_id: 123,
        title: "black friday shopping tips for parents",
        date: "2022 feb 12",
        image: "https://picsum.photos/id/23/500",
        content:
          "It's that time of year again: Black Friday shopping is here! Parents everywhere are gearing up to take advantage of the amazing deals this season, but navigating...",
      },
      {
        article_id: 123,
        title: "black friday shopping tips for parents",
        date: "2022 feb 12",
        image: "https://picsum.photos/id/24/500",
        content:
          "It's that time of year again: Black Friday shopping is here! Parents everywhere are gearing up to take advantage of the amazing deals this season, but navigating...",
      },
      {
        article_id: 123,
        title: "black friday shopping tips for parents",
        date: "2022 feb 12",
        image: "https://picsum.photos/id/25/500",
        content:
          "It's that time of year again: Black Friday shopping is here! Parents everywhere are gearing up to take advantage of the amazing deals this season, but navigating...",
      },
      {
        article_id: 123,
        title: "black friday shopping tips for parents",
        date: "2022 feb 12",
        image: "https://picsum.photos/id/26/500",
        content:
          "It's that time of year again: Black Friday shopping is here! Parents everywhere are gearing up to take advantage of the amazing deals this season, but navigating...",
      },
      {
        article_id: 123,
        title: "black friday shopping tips for parents",
        date: "2022 feb 12",
        image: "https://picsum.photos/id/27/500",
        content:
          "It's that time of year again: Black Friday shopping is here! Parents everywhere are gearing up to take advantage of the amazing deals this season, but navigating...",
      },
    ],
  });

  return (
    <React.Fragment>
      <DashboardTabTitle
        icon={titleIcon}
        iconWidth="38px"
        iconHeight="38px"
        tabName="bookmarks"
      />
      {articlesList.bookmarks.map((item, key) => (
        <BookmarkArticleItem
          key={key}
          articleId={item.article_id}
          date={item.date}
          articleImage={item.image}
          articleTitle={item.title}
          articleContent={item.content}
        />
      ))}
    </React.Fragment>
  );
};

export default Bookmarks;
