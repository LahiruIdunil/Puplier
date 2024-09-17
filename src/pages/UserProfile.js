import React, { useContext, useEffect, useState } from "react";
import { Link, defer, useLoaderData } from "react-router-dom";
import UserProfileArticleItem from "../components/UserProfileArticleItem";
import SideBarSimilarProfiles from "../components/SideBarSimilarProfiles";
import classes from "./UserProfile.module.css";
import SimilarProfilesContainer from "../components/SimilarProfilesContainer";
import ArticlesYouMayLikeBar from "../components/ArticlesYouMayLikeBar";
import { toast } from "react-toastify";
import useFetchAllSimilarProfiles from "../custom-hooks/useFetchAllSimilarProfiles";
import defaultAvatar from "../components/images/avator.png";
import RequestProgressBar from "../components/RequestProgressBar";
import InviteModal from "../components/InviteModal";
import useDocumentTitle from "../custom-hooks/useDocumentTitle";
import { userContext } from "../components/LoggedInBaseLayout";

export default function UserProfile() {
  const user = useContext(userContext);
  const { similarProfiles, success: fetchedSimilarProfiles } =
    useFetchAllSimilarProfiles(user?.userId || null);
  const [inviteModalShow, setInviteModalShow] = useState(false);
  const [selectedArticleDetails, setSelectedArticleDetails] = useState(null);
  const [articlesByUser, setArticlesByUser] = useState(null);
  const [isAuthor, setIsAuthor] = useState(false);
  const [isLoadingUserData, setIsLoadingUserData] = useState(true);
  const [isLoadingArticles, setIsLoadingArticles] = useState(true);
  const [startProgressBar, setStartProgressBar] = useState(true);
  const [completeProgressBar, setCompleteProgressBar] = useState(false);
  const userDataLoader = useLoaderData();
  const { setDoucmentTitle } = useDocumentTitle(`Puplier | User Profile`);
  const [userDetails, setUserDetails] = useState({
    userId: "",
    firstName: "",
    lastName: "",
    country: "",
    jobTitle: "",
    company: "",
    experience: "",
    profileImage: null,
    description: "",
  });

  useEffect(() => {
    const { userDetails, articlesByUser } = userDataLoader;

    userDetails
      .then(({ response }) => {
        setUserDetails(response.data.body);
        setIsAuthor(response.data.body.isAuthor);
      })
      .catch(({ error }) => {
        if (error) {
          toast.error(
            error?.response?.data.message || error || "Faild to load user data!"
          );
        }
      })
      .finally(() => {
        setIsLoadingUserData(false);
      });

    articlesByUser
      .then(({ response }) => {
        setArticlesByUser(response.data.body.articleResponseList);
      })
      .catch(({ error }) => {
        if (error) {
          toast.error(
            error?.response?.data.message || error || "Faild to load articles!"
          );
        }
      })
      .finally(() => {
        setIsLoadingArticles(false);
      });

    return () => {
      // Need to cancle this API request on cleanup.
      // But with strictMode,this API request is being aborted in very first render
      // So during the second render, the request is already aborted and it throws an error.
      // It can be fixed by removing the strictMode from index.js
      // But as it's not a good practice to remove strictMode and also it's not a heavy API request,
      // for now, I'm not aborting this request.
    };
  }, [userDataLoader]);

  useEffect(() => {
    if (!isLoadingArticles && !isLoadingUserData) {
      setCompleteProgressBar(true);
    }
  }, [isLoadingArticles, isLoadingUserData]);

  useEffect(() => {
    // set Docuement title
    setDoucmentTitle(
      `Puplier | ${userDetails.firstName} ${userDetails.lastName}`
    );
  }, [userDetails]);

  return (
    <>
      <RequestProgressBar
        continuousStart={startProgressBar}
        complete={completeProgressBar}
      />
      <InviteModal
        show={inviteModalShow}
        onHide={() => setInviteModalShow(false)}
        articleDetails={selectedArticleDetails}
        similarProfiles={similarProfiles}
        fetchedSimilarProfiles={fetchedSimilarProfiles}
      />
      <div
        className={`container customContainer ${classes.userProfileContainer}`}
      >
        <div className="row">
          <div className={`col-xxl col-12 ${classes.leftContainer}`}>
            <div className={`row ${classes.topContainer}`}>
              <div className="col-md-auto col-12 d-flex justify-content-md-start justify-content-center">
                <div
                  className={`${classes.userImageContainer}`}
                  style={{
                    backgroundImage: userDetails.profileImage
                      ? `url(${userDetails.profileImage})`
                      : `url(${defaultAvatar})`,
                  }}
                ></div>
              </div>
              <div className="col-md col-12 d-flex flex-column justify-content-center">
                <div>
                  <div
                    className={`d-flex justify-content-md-start justify-content-center ${classes.userNameContainer}`}
                  >
                    <p className={`${classes.userName}`}>
                      {`${userDetails.firstName} ${userDetails.lastName}`}
                    </p>
                    {isAuthor ? (
                      <div className="d-flex align-items-end">
                        <Link to="/profile/edit/details">
                          <p className={classes.editProfileButton}>
                            edit profile
                          </p>
                        </Link>
                      </div>
                    ) : null}
                  </div>
                  <p className={`${classes.userShortDescription}`}>
                    {userDetails.currentPosition} (
                    {userDetails.highestQualification})
                  </p>
                  <div className="d-md-flex d-block">
                    <div className="d-flex flex-md-column flex-row justify-content-center">
                      <div className={classes.profileScoreContainer}>
                        <div className={classes.profileScoreTitleContainer}>
                          <p className={classes.profileScoreTitle}>
                            profile score
                          </p>
                        </div>
                        <div className={classes.profileScoreValueContainer}>
                          {/* TODO: get profile score from the user context */}
                          <p className={classes.profileScore}>0%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <p className={classes.description}>{userDetails.description}</p>
            </div>
            <div className={classes.myArticlesTitleContainer}>
              <p className={classes.myArticlesTitle}>
                Articles by <span>{userDetails.firstName}</span>
              </p>
            </div>
            {articlesByUser &&
              (articlesByUser.length ? (
                <div className="overflow-hidden">
                  <div className={`row gx-5 ${classes.articlesContainer}`}>
                    {articlesByUser.map((article, key) => (
                      <UserProfileArticleItem
                        article={article}
                        author={`${userDetails.firstName} ${userDetails.lastName}`}
                        articlesList={articlesByUser}
                        setArticlesList={setArticlesByUser}
                        setInviteModalShow={() => setInviteModalShow(true)}
                        setArticleDetails={setSelectedArticleDetails}
                        isAuthor={isAuthor}
                        key={key}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <p className={classes.noArticlesTag}>No articles to show</p>
              ))}
            {/* shows only in screens smaller than xxl */}
            {fetchedSimilarProfiles && (
              <div
                className={`d-xxl-none d-block ${classes.similarProfilesContainer}`}
              >
                <SimilarProfilesContainer
                  similarProfiles={similarProfiles.slice(0, 4)}
                />
              </div>
            )}
          </div>
          <div className={`col-xxl-auto col-12 ${classes.rightContainer}`}>
            {/* shows only in screens greater than xxl */}
            {fetchedSimilarProfiles && (
              <div
                className={`d-xxl-block d-none ${classes.similarProfileContainer}`}
              >
                <SideBarSimilarProfiles
                  similarProfiles={similarProfiles.slice(0, 5)}
                />
              </div>
            )}
            <ArticlesYouMayLikeBar
              title="articles you may like"
              overrideStyles={
                classes.overRideStylesOfArtilcesYouMayLikeItemImage
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}

const userProfileArticleLoader = (
  findArticlesByUser,
  authorUserId,
  isOwner
) => {
  return findArticlesByUser(authorUserId, isOwner).then((resp) => {
    if (resp.status === "error") {
      throw resp;
    } else {
      return resp;
    }
  });
};

const userProfileUserDataLoader = (authorUserId, sendRequest, isOwner) => {
  const params = { userId: authorUserId };
  return sendRequest("get", "/user/findUserInfoByUser", params).then((resp) => {
    if (resp.status === "error") {
      throw resp;
    } else {
      resp.response.data.body.isAuthor = isOwner;
      return resp;
    }
  });
};

export const userProfileDataLoader =
  (findArticlesByUser, sendRequest) =>
  async ({ request: { url } }) => {
    let isOwner = false;
    let user = JSON.parse(localStorage.getItem("user"));
    const authorUserId = new URL(url).searchParams.get("id");

    if (authorUserId == user?.userId) {
      isOwner = true;
    }

    const userDetails = userProfileUserDataLoader(
      authorUserId,
      sendRequest,
      isOwner
    );
    const articlesByUser = userProfileArticleLoader(
      findArticlesByUser,
      authorUserId,
      isOwner
    );

    return defer({ userDetails, articlesByUser });
  };
