// TODO: this page has hidden divs, search the keyword "HIDDEN SECTION" to find them

import React, { useContext, useEffect, useState } from "react";

import classes from "./LoggedInHomepage.module.css";

import useFetchAllCategories from "../custom-hooks/useFetchAllCategories";

import TopCategoryListBar from "../components/home-page-logged-in/TopCategoryListBar";
import TopArticle from "../components/home-page-logged-in/TopArticle";
import TopArticleListContainer from "../components/home-page-logged-in/TopArticleListContainer";
import CategoriesYouMayInterest from "../components/home-page-logged-in/CategoriesYouMayInterest";
import PopularArticles from "../components/home-page-logged-in/PopularArticles";
import SimilarProfilesContainer from "../components/SimilarProfilesContainer";
import NewlyPublishedArticlesContainer from "../components/home-page-logged-in/NewlyPublishedArticlesContainer";
import TopPicksContainer from "../components/home-page-logged-in/TopPicksContainer";
import SideBarCategoryList from "../components/home-page-logged-in/SideBarCategoryList";
import SideBarSimilarProfiles from "../components/SideBarSimilarProfiles";
import useFetchAllSimilarProfiles from "../custom-hooks/useFetchAllSimilarProfiles";
import { userContext } from "../components/LoggedInBaseLayout";
import RequestProgressBar from "../components/RequestProgressBar";
import useDocumentTitle from "../custom-hooks/useDocumentTitle";

const HomePageLoggedIn = () => {
  const userDetails = useContext(userContext);
  const [startProgressBar, setStartProgressBar] = useState(true);
  const [completeProgressBar, setCompleteProgressBar] = useState(false);
  const { categories } = useFetchAllCategories();
  const {
    similarProfiles,
    success: fetchedSimilarProfiles,
    error: errorLoadingSimilarProfiles,
  } = useFetchAllSimilarProfiles(userDetails?.userId || null);

  // set Docuement title
  useDocumentTitle("Puplier | Home");

  useEffect(() => {
    if (fetchedSimilarProfiles || errorLoadingSimilarProfiles) {
      setCompleteProgressBar(true);
    }
  }, [fetchedSimilarProfiles, errorLoadingSimilarProfiles]);

  return (
    <>
      <RequestProgressBar
        continuousStart={startProgressBar}
        complete={completeProgressBar}
      />
      <section className={`${classes.topCategoryListBarContainer}`}>
        <TopCategoryListBar categories={categories} />
      </section>
      <div className={`container customContainer ${classes.mainContainer}`}>
        <div className="row">
          <div className={`col-xxl-9 col-12 ${classes.leftContainer}`}>
            <section className={`${classes.topArticleContainer}`}>
              <TopArticle />
            </section>
            <section className={`${classes.topArticleListContainer}`}>
              <TopArticleListContainer />
            </section>
            <section className={`${classes.categoriesYouMayInterestContainer}`}>
              <CategoriesYouMayInterest />
            </section>
            <section className={`${classes.popularArticlesConntainer}`}>
              <PopularArticles />
            </section>
            {fetchedSimilarProfiles && (
              <section className={`${classes.similarProfilesContainer}`}>
                <SimilarProfilesContainer
                  similarProfiles={similarProfiles.slice(0, 4)}
                />
              </section>
            )}
            {/* HIDDEN SECTION: below section is hidden in release 1.0 */}
            <section className="d-none">
              <NewlyPublishedArticlesContainer />
            </section>
            <section className={`${classes.topPicksContainer}`}>
              <TopPicksContainer />
            </section>
          </div>
          <div
            className={`col-xxl d-xxl-block d-none ${classes.rightContainer}`}
          >
            <section>
              <SideBarCategoryList />
            </section>
            <section>
              {fetchedSimilarProfiles && (
                <SideBarSimilarProfiles
                  similarProfiles={similarProfiles.slice(0, 5)}
                />
              )}
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePageLoggedIn;
