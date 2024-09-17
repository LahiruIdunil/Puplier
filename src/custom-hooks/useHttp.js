import axios from "axios";
import { useCallback, useState } from "react";

export default function useHttp() {
  const [isLoading, setIsloading] = useState(false);
  const [actionData, setActionData] = useState(null);

  // this function is used to make API requests within action/loader functions
  // and apiReuqests that don't need to track the progess of the request
  // (specially the requests run in the background)
  const sendRequest = useCallback(
    (
      method,
      url,
      data,
      resolved = defaultResolved,
      rejected = defaultRejected,
      abortController = null
    ) => {
      let isAuthenticated =
        JSON.parse(localStorage.getItem("isLoggedIn")) || false;
      let requestBody = prepareRequestBody(
        method,
        url,
        data,
        isAuthenticated,
        abortController
      );

      return axios(requestBody)
        .then((response) => {
          if (response.data.httpStatus === 200) {
            return resolved(response);
          } else {
            throw response.data.message;
          }
        })
        .catch((error) => {
          return rejected(error);
        });
    },
    []
  );

  // this function is used to make api requests that need to
  // track the progress of request
  const sendRequestAndTrackProgress = useCallback(
    (method, url, data, abortController = null) => {
      setIsloading(true);

      let isAuthenticated =
        JSON.parse(localStorage.getItem("isLoggedIn")) || false;
      let requestBody = prepareRequestBody(
        method,
        url,
        data,
        isAuthenticated,
        abortController
      );

      axios(requestBody)
        .then((response) => {
          if (response.data.httpStatus === 200) {
            setActionData({ status: "ok", response });
          } else {
            throw response.data.message;
          }
        })
        .catch((error) => {
          setActionData({ status: "error", error });
        })
        .finally(() => {
          setIsloading(false);
        });
    },
    []
  );

  const trimStringsWithinObject = (obj) => {
    if (obj) {
      Object.keys(obj).forEach((key) => {
        if (typeof obj[key] === "string") {
          obj[key] = obj[key].trim();
        }
      });
    }
    return obj;
  };

  const prepareRequestBody = (
    method,
    url,
    data,
    isAuthenticated,
    abortController
  ) => {
    const user = JSON.parse(localStorage.getItem("user"));

    const requestObj = {
      method,
      url: process.env.REACT_APP_BACKEND_URL + url,
      signal: abortController?.signal || null,
    };

    if (isAuthenticated) {
      requestObj.headers = {
        Authorization: "Bearer " + user?.accessToken,
      };
    }

    if (method === "get") {
      requestObj.params = trimStringsWithinObject(data);
      requestObj.data = {};
    } else {
      data.body = trimStringsWithinObject(data.body);
      data.header = {
        tenantCode: "DEFAULT_TENANT",
        userId: isAuthenticated ? (user ? user.userId : null) : null,
        clientIP: "192.168.1.2",
      };
      requestObj.data = data;
    }

    return requestObj;
  };

  const defaultResolved = (response) => {
    return {
      status: "ok",
      response,
    };
  };

  const defaultRejected = (error) => {
    return {
      status: "error",
      error,
    };
  };

  return {
    sendRequest,
    sendRequestAndTrackProgress,
    isLoading,
    actionData,
  };
}
