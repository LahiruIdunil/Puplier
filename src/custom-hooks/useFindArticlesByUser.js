import useHttp from "./useHttp";

export default function useFindArticlesByUser(trackRequestProgress = false) {
  const { sendRequest, sendRequestAndTrackProgress, isLoading, actionData } =
    useHttp();

  const findArticlesByUser = (
    userIdentity,
    currentUser,
    abortController = null
  ) => {
    // if the user who is sending the request is the owner of the profile
    // => currentUser = true
    const submitUrl = "/article/findArticleByUser";
    const data = {
      body: {
        userIdentity,
        currentUser,
      },
    };

    const resolved = (response) => {
      if (currentUser) {
        response.data.body.isAuthor = true;
      } else {
        response.data.body.isAuthor = false;
      }
      return { status: "ok", response };
    };
    const rejected = (error) => {
      return { status: "error", error };
    };

    if (trackRequestProgress) {
      // currently we do not need to track the progress of this request..
      // But we might want to do so in the future..
      // TODO: implement the functionality inside this block in the future if we need to.
      return null;
    }

    return sendRequest(
      "post",
      submitUrl,
      data,
      resolved,
      rejected,
      abortController
    );
  };
  return { findArticlesByUser, isLoading, actionData };
}
