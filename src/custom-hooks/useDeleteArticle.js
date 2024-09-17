import useHttp from "./useHttp";

export default function useDeleteArticle(articleId) {
  let user = JSON.parse(localStorage.getItem("user"));
  const { sendRequestAndTrackProgress, isLoading, actionData } = useHttp();

  const deleteArticle = () => {
    const url = "/article/deleteArticle";
    const data = {
      body: {
        articleId,
        userId: user?.userId || null,
      },
    };

    sendRequestAndTrackProgress("delete", url, data);
  };
  return { deleteArticle, actionData, isLoading };
}
