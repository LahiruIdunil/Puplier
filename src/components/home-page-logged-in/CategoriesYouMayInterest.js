import React, { useState } from "react";
import SingleCategoryItem from "./SingleCategoryItem";
import titleIcon from "../images/categories-you-may-interest-icon.png";

import educationIcon from "../images/education-icon.png";
import dataIcon from "../images/data-icon.png";
import techIcon from "../images/tech-icon.png";
import petIcon from "../images/pet-icon.png";
import religionIcon from "../images/religion-icon.png";
import fashionIcon from "../images/fashion-icon.png";
import Title from "./Title";

const CategoriesYouMayInterest = () => {
  const [categoriesList, setCategoriesList] = useState([
    {
      title: "education",
      icon: educationIcon,
    },
    {
      title: "data",
      icon: dataIcon,
    },
    {
      title: "tech",
      icon: techIcon,
    },
    {
      title: "pets",
      icon: petIcon,
    },
    {
      title: "religion",
      icon: religionIcon,
    },
    {
      title: "fashion",
      icon: fashionIcon,
    },
  ]);

  return (
    <React.Fragment>
      <Title icon={titleIcon} title="Categories you may interest" />
      <div className="row">
        {categoriesList.map((item, key) => (
          <SingleCategoryItem title={item.title} icon={item.icon} key={key} />
        ))}
      </div>
    </React.Fragment>
  );
};

export default CategoriesYouMayInterest;
