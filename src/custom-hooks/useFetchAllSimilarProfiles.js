import { useEffect, useState } from "react";
import useHttp from "./useHttp";
import { toast } from "react-toastify";

export default function useFetchAllSimilarProfiles(userId) {
  const [similarProfiles, setSimilarProfiles] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const { sendRequest } = useHttp();

  const getSimilarProfiles = () => {
    const method = "get";
    const url = "/user/findUserWithSimilarInterests";
    const params = { userId };

    const resolved = (response) => {
      setSuccess(true);
      let similarProfiles = response.data.body;

      setSimilarProfiles(similarProfiles);
    };

    const rejected = (error) => {
      setError(true);
      toast.error(
        error.response.data.message || "Faild to load similar profiles!"
      );
    };

    sendRequest(method, url, params, resolved, rejected);
  };

  useEffect(() => {
    if (userId) {
      getSimilarProfiles();
    }
  }, [userId]);

  return { similarProfiles, success, error };
}
