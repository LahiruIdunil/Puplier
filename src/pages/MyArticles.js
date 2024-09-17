import React, { useContext, useEffect, useState } from "react";
import DashboardMobileWriteArticleButton from "../components/dashboard/DashboardMobileWriteArticleButton";
import DashboardTabTitle from "../components/dashboard/DashboardTabTitle";
import SingleArticleItem from "../components/dashboard/SingleArticleItem";
import InviteModal from "../components/InviteModal";
import myArticlesIcon from "./images/my-articles.png";
import { defer, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { userContext } from "../components/LoggedInBaseLayout";
import useFetchAllSimilarProfiles from "../custom-hooks/useFetchAllSimilarProfiles";
import RequestProgressBar from "../components/RequestProgressBar";
import EmptyArticlesListMessage from "../components/EmptyArticlesListMessage";
import DashboardMessageContainer from "../components/DashboardMessageContainer";
import useDocumentTitle from "../custom-hooks/useDocumentTitle";

export default function MyArticles() {
  const loader = useLoaderData();
  const [startProgressBar, setStartProgressBar] = useState(true);
  const [completeProgressBar, setCompleteProgressBar] = useState(false);
  const [articlesList, setArticlesList] = useState(null);
  const [inviteModalShow, setInviteModalShow] = useState(false);
  const [articleDetails, setArticleDetails] = useState(null);
  const [errorLoadingArticles, setErrorLoadingArticles] = useState(false);
  const userDetails = useContext(userContext);
  const { similarProfiles, success: fetchedSimilarProfiles } =
    useFetchAllSimilarProfiles(userDetails?.userId || null);

  // set Docuement title
  useDocumentTitle("Puplier | My Articles");

  useEffect(() => {
    const { articlesLoader, abortController } = loader;

    articlesLoader
      .then(({ response }) => {
        setArticlesList(response.data.body.articleResponseList);
      })
      .catch(({ error }) => {
        if (error) {
          setErrorLoadingArticles(true);
          toast.error(
            error?.response?.data.message || error || "Faild to load articles!"
          );
        }
      })
      .finally(() => {
        setCompleteProgressBar(true);
      });

    return () => {
      // Need to cancle this API request on cleanup.
      // But with strictMode,this API request is being aborted in very first render
      // So during the second render, the request is already aborted and it throws an error.
      // It can be fixed by removing the strictMode from index.js
      // But as it's not a good practice to remove strictMode and also it's not a heavy API request,
      // for now, I'm not aborting this request.
      // abortController.abort();
    };
  }, [loader]);

  return (
    <>
      <RequestProgressBar
        continuousStart={startProgressBar}
        complete={completeProgressBar}
      />
      <InviteModal
        show={inviteModalShow}
        onHide={() => setInviteModalShow(false)}
        articleDetails={articleDetails}
        similarProfiles={similarProfiles}
        fetchedSimilarProfiles={fetchedSimilarProfiles}
      />
      <DashboardTabTitle
        icon={myArticlesIcon}
        iconWidth="38px"
        iconHeight="38px"
        tabName="my articles"
      />
      {articlesList &&
        (articlesList.length ? (
          articlesList.map((article, key) => (
            <SingleArticleItem
              key={key}
              article={article}
              articlesList={articlesList}
              setArticlesList={setArticlesList}
              setInviteModalShow={() => setInviteModalShow(true)}
              setArticleDetails={setArticleDetails}
            />
          ))
        ) : (
          <EmptyArticlesListMessage />
        ))}
      {/* show error message */}
      {errorLoadingArticles && <DashboardMessageContainer status="error" />}
      <DashboardMobileWriteArticleButton />
    </>
  );
}

export const myArticlesLoader = (findArticlesByUser) => async () => {
  let user = JSON.parse(localStorage.getItem("user"));
  let userId = user?.userId || null;
  const abortController = new AbortController();

  const articlesLoader = findArticlesByUser(userId, true, abortController).then(
    (resp) => {
      if (resp.status === "error") {
        throw resp;
      } else {
        return resp;
      }
    }
  );

  return defer({ articlesLoader, abortController });
};
