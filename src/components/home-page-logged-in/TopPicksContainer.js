import TopPickItem from "./TopPickItem";
import React, { useState } from "react";
import Title from "./Title";
import titleIcon from "../images/categories-you-may-interest-icon.png";
import classes from "./TopPicksContainer.module.css";

const TopPicksContainer = () => {
  const [itemlist, setItemsList] = useState([
    {
      title: "health",
      links: [
        { id: 1, topic: "improving your mental health" },
        { id: 1, topic: "health benefits of exercise" },
        { id: 1, topic: "change your diet" },
        { id: 1, topic: "benefits of meditation" },
      ],
    },
    {
      title: "environment",
      links: [
        { id: 1, topic: "reduce your carbon footprint" },
        { id: 1, topic: "dangers of pollution" },
        { id: 1, topic: "different types of energy" },
        { id: 1, topic: "protecting endangered species" },
      ],
    },
    {
      title: "funding",
      links: [
        { id: 1, topic: "finding funds for businesses" },
        { id: 1, topic: "5 grant opportunities" },
        { id: 1, topic: "different funding sources" },
        { id: 1, topic: "small business loans" },
      ],
    },
    {
      title: "environment",
      links: [
        { id: 1, topic: "reduce your carbon footprint" },
        { id: 1, topic: "dangers of pollution" },
        { id: 1, topic: "different types of energy" },
        { id: 1, topic: "protecting endangered species" },
      ],
    },
    {
      title: "funding",
      links: [
        { id: 1, topic: "finding funds for businesses" },
        { id: 1, topic: "5 grant opportunities" },
        { id: 1, topic: "different funding sources" },
        { id: 1, topic: "small business loans" },
      ],
    },
    {
      title: "health",
      links: [
        { id: 1, topic: "improving your mental health" },
        { id: 1, topic: "health benefits of exercise" },
        { id: 1, topic: "change your diet" },
        { id: 1, topic: "benefits of meditation" },
      ],
    },
  ]);
  return (
    <React.Fragment>
      <Title
        overrideStyles={classes.titleContainer}
        title="top picks"
        icon={titleIcon}
      />
      <div className="row">
        {itemlist.map((item, key) => (
          <TopPickItem title={item.title} links={item.links} key={key} />
        ))}
      </div>
    </React.Fragment>
  );
};

export default TopPicksContainer;
