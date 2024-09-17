import React, { useState } from "react";
import ArticlesYouMayLikeItem from "./ArticlesYouMayLikeItem";
import SideBarTitle from "./SideBarTitle";

const ArticlesYouMayLikeList = (props) => {
  const [postsList, setPostsList] = useState([
    {
      image: "https://picsum.photos/id/17/500",
      title: "Kids Fall Fashion Tips with Wendy Lam",
    },
    {
      image: "https://picsum.photos/id/16/500",
      title: "Kids Fall Fashion Tips with Wendy Lam",
    },
    {
      image: "https://picsum.photos/id/18/500",
      title: "Kids Fall Fashion Tips with Wendy Lam",
    },
    {
      image: "https://picsum.photos/id/19/500",
      title: "Kids Fall Fashion Tips with Wendy Lam",
    },
    {
      image: "https://picsum.photos/id/20/500",
      title: "Kids Fall Fashion Tips with Wendy Lam",
    },
  ]);

  return (
    <div>
      <SideBarTitle title="articles you may like" />
      <div>
        {postsList.map((item) => (
          <ArticlesYouMayLikeItem
            image={item.image}
            title={item.title}
            overRideStyles={props.overRideStyles}
          />
        ))}
      </div>
    </div>
  );
};

export default ArticlesYouMayLikeList;
