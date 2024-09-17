import React, { useEffect, useState } from "react";
import { defer, useLoaderData, useParams } from "react-router-dom";
import SideBarCategoryItem from "../components/home-page-logged-in/SideBarCategoryItem";
import SingleCategoryItem from "../components/home-page-logged-in/SingleCategoryItem";
import SideBarSimilarProfileItem from "../components/SideBarSimilarProfileItem";
import SimilarProfileItem from "../components/SimilarProfileItem";
import classes from "./SearchResults.module.css";
import educationIcon from "../components/images/education-icon.png";
import dataIcon from "../components/images/data-icon.png";
import techIcon from "../components/images/tech-icon.png";
import petIcon from "../components/images/pet-icon.png";
import religionIcon from "../components/images/religion-icon.png";
import fashionIcon from "../components/images/fashion-icon.png";
import useDocumentTitle from "../custom-hooks/useDocumentTitle";
import SingleArticleItem from "../components/SingleArticleItem";
import { toast } from "react-toastify";
import RequestProgressBar from "../components/RequestProgressBar";
import EmptyResultsMessage from "./EmptyResultsMessage";
import Pagination from "../components/Pagination";

export default function SearchResults() {
  const searchResutlsLoader = useLoaderData();
  const [isLoadingUserData, setIsLoadingUserData] = useState(true);
  const [isLoadingArticles, setIsLoadingArticles] = useState(true);
  const [startProgressBar, setStartProgressBar] = useState(true);
  const [completeProgressBar, setCompleteProgressBar] = useState(false);

  const { query: searchQuery, pageNumber } = useParams();
  const { setDoucmentTitle } = useDocumentTitle(`Puplier | Search Results`);

  const [userProfiles, setUserProfiles] = useState(null);
  const [articles, setArticles] = useState(null);

  useEffect(() => {
    // reinitiate the progress bar
    setIsLoadingArticles(true);
    setIsLoadingUserData(true);
    setStartProgressBar(true);
    setCompleteProgressBar(false);

    const { articleSearchResults, userSearchResults } = searchResutlsLoader;

    articleSearchResults
      .then(({ response }) => {
        setArticles(response.data.body.articles);
      })
      .catch(({ error }) => {
        if (error) {
          toast.error(
            error?.response?.data.message || error || "Faild to load user data!"
          );
        }
      })
      .finally(() => {
        setIsLoadingArticles(false);
      });

    userSearchResults
      .then(({ response }) => {
        setUserProfiles(response.data.body.users);
      })
      .catch(({ error }) => {
        if (error) {
          toast.error(
            error?.response?.data.message || error || "Faild to load articles!"
          );
        }
      })
      .finally(() => {
        setIsLoadingUserData(false);
      });

    return () => {
      // Need to cancle this API request on cleanup.
      // But with strictMode,this API request is being aborted in very first render
      // So during the second render, the request is already aborted and it throws an error.
      // It can be fixed by removing the strictMode from index.js
      // But as it's not a good practice to remove strictMode and also it's not a heavy API request,
      // for now, I'm not aborting this request.
    };
  }, [searchResutlsLoader]);

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

  useEffect(() => {
    if (!isLoadingArticles && !isLoadingUserData) {
      setCompleteProgressBar(true);
      setStartProgressBar(false);
    }
  }, [isLoadingArticles, isLoadingUserData]);

  useEffect(() => {
    // set Docuement title
    setDoucmentTitle(`Puplier | Search Results for "${searchQuery}"`);
  }, [searchQuery]);

  return (
    <>
      <RequestProgressBar
        continuousStart={startProgressBar}
        complete={completeProgressBar}
      />
      <div className={`container customContainer ${classes.mainContainer}`}>
        <div className="row">
          <div className={`col-xxl-9 col-12 ${classes.leftContainer}`}>
            <div className={classes.searchResultsHeadingContainer}>
              <p className={classes.searchResultsHeading}>
                Search Results for <span>"{searchQuery}"</span>
              </p>
            </div>
            <div className={`row ${classes.articlesContainer}`}>
              {articles &&
                (articles.length ? (
                  articles.map((article, key) => (
                    <SingleArticleItem {...article} key={key} />
                  ))
                ) : (
                  <EmptyResultsMessage
                    styles={{ padding: "0 21px" }}
                    message="No articles to show..."
                  />
                ))}
            </div>
            {articles &&
              (+pageNumber === 1 ? (
                articles.length === 10 ? (
                  <Pagination
                    searchQuery={searchQuery}
                    currentPage={+pageNumber}
                    articlesCount={articles.length}
                  />
                ) : null
              ) : (
                <Pagination
                  searchQuery={searchQuery}
                  currentPage={+pageNumber}
                  articlesCount={articles.length}
                />
              ))}
            <div
              className={`d-xxl-none d-block ${classes.mobileSearchProfileContainer}`}
            >
              <p className={classes.profileSearchResultsTitle}>
                Profile search resutls
              </p>
              <div className="row">
                {userProfiles &&
                  (userProfiles.length ? (
                    userProfiles.map((profile, key) => (
                      <SimilarProfileItem {...profile} key={key} />
                    ))
                  ) : (
                    <EmptyResultsMessage
                      styles={{ padding: "0 21px" }}
                      message="No profiles to show..."
                    />
                  ))}
              </div>
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
          <div
            className={`col-xxl d-xxl-block d-none ${classes.rightContainer}`}
          >
            <section>
              <p className={classes.profileSearchResultsTitle}>
                Profile search results
              </p>
              {userProfiles &&
                (userProfiles.length ? (
                  userProfiles.map((profile, key) => (
                    <SideBarSimilarProfileItem {...profile} key={key} />
                  ))
                ) : (
                  <EmptyResultsMessage message="No profiles to show..." />
                ))}
            </section>
            <section className={classes.SideBarCategorySection}>
              <p className={classes.interestCategoriesTitle}>
                Categories you may interest
              </p>
              <div className={`row ${classes.listContainer}`}>
                {categoriesList.map((item, key) => (
                  <SideBarCategoryItem category={item.title} key={key} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

const searchArticleLoader = (sendRequest, searchQuery, pageNumber) => {
  const params = {
    page: pageNumber - 1,
    size: 10,
    title: searchQuery,
  };

  return sendRequest("get", "/article/searchArticles", params).then((resp) => {
    if (resp.status === "error") {
      throw resp;
    } else {
      return resp;
    }
  });
};

const searchUserLoader = (sendRequest, searchQuery) => {
  const params = {
    page: 0,
    size: 5,
    name: searchQuery,
  };

  return sendRequest("get", "/user/searchUsers", params).then((resp) => {
    if (resp.status === "error") {
      throw resp;
    } else {
      return resp;
    }
  });
};

export const searchResultsLoader =
  (sendRequest) =>
  async ({ params: { query: searchQuery, pageNumber } }) => {
    const articleSearchResults = searchArticleLoader(
      sendRequest,
      searchQuery,
      pageNumber
    );
    const userSearchResults = searchUserLoader(sendRequest, searchQuery);

    return defer({ articleSearchResults, userSearchResults });
  };
