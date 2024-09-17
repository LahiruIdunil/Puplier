import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import SideBarCategoryItem from "../components/home-page-logged-in/SideBarCategoryItem";
import SingleCategoryItem from "../components/home-page-logged-in/SingleCategoryItem";
import SimilarProfileItem from "../components/SimilarProfileItem";
import classes from "./CategoryArchive.module.css";
import educationIcon from "../components/images/education-icon.png";
import dataIcon from "../components/images/data-icon.png";
import techIcon from "../components/images/tech-icon.png";
import petIcon from "../components/images/pet-icon.png";
import religionIcon from "../components/images/religion-icon.png";
import fashionIcon from "../components/images/fashion-icon.png";
import { userContext } from "../components/LoggedInBaseLayout";
import useFetchAllSimilarProfiles from "../custom-hooks/useFetchAllSimilarProfiles";
import useDocumentTitle from "../custom-hooks/useDocumentTitle";
import SingleArticleItem from "../components/SingleArticleItem";
import SideBarSimilarProfiles from "../components/SideBarSimilarProfiles";
import SimilarProfilesContainer from "../components/SimilarProfilesContainer";

function CategoryArchive() {
  const userDetails = useContext(userContext);
  const { similarProfiles, success: fetchedSimilarProfiles } =
    useFetchAllSimilarProfiles(userDetails?.userId || null);
  const { category_name } = useParams();

  // set Docuement title
  useDocumentTitle(`Puplier | ${category_name}`);

  const [articles, setArticles] = useState({
    status: 200,
    articles: [
      {
        articleId: 123,
        title: "The Role of Cytokines in Cancer Immunotherapy",
        thumbnailUrl: "https://picsum.photos/id/54/500",
        score: "100%",
        readTime: 2,
        authorName: "jenny willson",
        saved: true,
      },
      {
        articleId: 124,
        title: "The Role of Cytokines in Cancer Immunotherapy",
        thumbnailUrl: "https://picsum.photos/id/55/500",
        score: "65%",
        readTime: 2,
        authorName: "jenny willson",
        saved: false,
      },
      {
        articleId: 125,
        title: "The Role of Cytokines in Cancer Immunotherapy",
        thumbnailUrl: "https://picsum.photos/id/56/500",
        score: "65%",
        readTime: 2,
        authorName: "jenny willson",
        saved: false,
      },
      {
        articleId: 126,
        title: "The Role of Cytokines in Cancer Immunotherapy",
        thumbnailUrl: "https://picsum.photos/id/57/500",
        score: "65%",
        readTime: 2,
        authorName: "jenny willson",
        saved: true,
      },
      {
        articleId: 127,
        title: "The Role of Cytokines in Cancer Immunotherapy",
        thumbnailUrl: "https://picsum.photos/id/58/500",
        score: "65%",
        readTime: 2,
        authorName: "jenny willson",
        saved: true,
      },
      {
        articleId: 128,
        title: "The Role of Cytokines in Cancer Immunotherapy",
        thumbnailUrl: "https://picsum.photos/id/59/500",
        score: "65%",
        readTime: 2,
        authorName: "jenny willson",
        saved: false,
      },
    ],
  });

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
    <div className={`container customContainer ${classes.mainContainer}`}>
      <div className="row">
        <div className={`col-xxl-9 col-12 ${classes.leftContainer}`}>
          <div className={classes.searchResultsHeadingContainer}>
            <p className={classes.searchResultsHeading}>{category_name}</p>
          </div>
          <div className={`row ${classes.articlesContainer}`}>
            {articles.articles.map((article, key) => (
              <SingleArticleItem {...article} key={key} />
            ))}
          </div>
          <div
            className={`d-xxl-none d-block ${classes.mobileSearchProfileContainer}`}
          >
            {fetchedSimilarProfiles && (
              <div className="row">
                <SimilarProfilesContainer
                  similarProfiles={similarProfiles.slice(0, 4)}
                />
              </div>
            )}
          </div>
          <div
            className={`d-xxl-none d-block ${classes.mobileInterestCategoriesdiv}`}
          >
            <p className={classes.interestCategoriesTitle}>
              Categories you may interest
            </p>
            <div className="row">
              {categoriesList.map((category, key) => (
                <SingleCategoryItem
                  title={category.title}
                  icon={category.icon}
                  key={key}
                />
              ))}
            </div>
          </div>
        </div>
        <div className={`col-xxl d-xxl-block d-none ${classes.rightContainer}`}>
          <section className={classes.interestCategoriesDiv}>
            <p className={classes.interestCategoriesTitle}>
              Categories you may interest
            </p>
            <div className={`row ${classes.listContainer}`}>
              {categoriesList.map((item, key) => (
                <SideBarCategoryItem category={item.title} key={key} />
              ))}
            </div>
          </section>
          {fetchedSimilarProfiles && (
            <SideBarSimilarProfiles
              similarProfiles={similarProfiles.slice(0, 5)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default CategoryArchive;
