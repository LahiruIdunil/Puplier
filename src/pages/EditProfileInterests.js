import React, { useCallback, useEffect, useState } from "react";
import classes from "./EditProfileInterests.module.css";
import contentTick from "./images/content-tick.png";
import { toast } from "react-toastify";
import ManuallySearchInterests from "../components/ManuallySearchInterests";
import SavedInterestComponenet from "../components/SavedInterestComponenet.js";
import SearchedInterestComponent from "../components/SearchedInterestComponent";
import {
  defer,
  useActionData,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { BeatLoader } from "react-spinners";
import RequestProgressBar from "../components/RequestProgressBar";
import useDocumentTitle from "../custom-hooks/useDocumentTitle";

export default function EditProfileInterests() {
  const submit = useSubmit();
  const navigation = useNavigation();
  const actionData = useActionData();
  const interestsLoader = useLoaderData();
  // selected interests from the dropdown
  const [searchedInterests, setSearchedInterests] = useState([]);
  // selected interests from the saved interests list
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [startProgressBar, setStartProgressBar] = useState(true);
  const [completeProgressBar, setCompleteProgressBar] = useState(false);

  // set Docuement title
  useDocumentTitle("Puplier | Edit Interests");

  useEffect(() => {
    const { editInterestsLoader } = interestsLoader;

    editInterestsLoader
      .then(({ response }) => {
        setSelectedInterests(
          response.data.body.userInterests.map((topicName) =>
            topicName.toLowerCase()
          )
        );
      })
      .catch(({ error }) => {
        if (error) {
          toast.error(
            error?.response?.data.message ||
              error ||
              "Error loading user interests!"
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
    };
  }, [interestsLoader]);

  // removes an interest when clicked on previously saved interest item
  const removeInterests = useCallback(
    (interest) => {
      if (selectedInterests.includes(interest)) {
        let tempArr = [...selectedInterests];
        let index = tempArr.indexOf(interest);
        tempArr.splice(index, 1);
        setSelectedInterests(tempArr);
      }
    },
    [selectedInterests]
  );

  const handleSubmit = () => {
    // remove all currently open toast notifications
    toast.dismiss();

    let allInterests = [...selectedInterests, ...searchedInterests];

    if (allInterests.length == 0) {
      toast.error("You should select at least one interest to complete");
      return null;
    }

    submit(
      { allInterests },
      { method: "post", action: "/profile/edit/interests" }
    );
  };

  // triggers after the requests is submitted
  useEffect(() => {
    if (actionData) {
      if (actionData.status === "ok") {
        setSearchedInterests([]);
        toast.success(actionData.response.data.message);
      } else {
        toast.error(
          actionData?.error?.response?.data.message ||
            actionData?.error ||
            "Faild to update interests!"
        );
      }
    }
  }, [actionData]);

  return (
    <>
      <RequestProgressBar
        continuousStart={startProgressBar}
        complete={completeProgressBar}
      />
      <div className={classes.centerDiv}>
        <div className={classes.titleBox}>
          <img
            src={contentTick}
            alt="content with tick icon"
            className={classes.icon}
          />
          <h3 className={classes.title}>Edit Interests</h3>
        </div>
        <div className={classes.taglineBox}>
          <p className={classes.titleTagline}>
            By selecting your preferred topics, we can suggest articles that are
            more relevant to your preferences, and help you discover new content
            that matches your interests.
          </p>
        </div>
        <div className={classes.previouslySelectedInterestsBox}>
          {selectedInterests.map((interest, index) => (
            <SavedInterestComponenet
              key={index}
              interest={interest}
              removeInterest={removeInterests}
            />
          ))}
        </div>
        <div className={classes.bottomBox}>
          <div className={classes.line}></div>
          <div className={classes.searchInterests}>
            <ManuallySearchInterests
              selectedInterests={selectedInterests}
              searchedInterests={searchedInterests}
              setSearchedInterests={setSearchedInterests}
            />
          </div>
        </div>
        <div className={classes.searchedInterestsBox}>
          {searchedInterests.map((interest, index) => (
            <SearchedInterestComponent
              key={index}
              index={index}
              interest={interest}
              setInterests={setSearchedInterests}
            />
          ))}
        </div>
        <div className={classes.submitBtnDiv}>
          <button onClick={handleSubmit} className={classes.submitBtn}>
            {navigation.state === "idle" ? (
              <p className={classes.submitBtnText}>update</p>
            ) : (
              <BeatLoader loading size={10} />
            )}
          </button>
        </div>
      </div>
    </>
  );
}

export const editInterestsLoader = (sendRequest) => () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const params = { userId: user?.userId || null };

  const editInterestsLoader = sendRequest(
    "get",
    "/user/findUserInterests",
    params
  ).then((resp) => {
    if (resp.status === "error") {
      throw resp;
    } else {
      return resp;
    }
  });

  return defer({ editInterestsLoader });
};

export const editInterestAction =
  (sendRequest) =>
  async ({ request }) => {
    const formData = await request.formData();
    const { allInterests } = Object.fromEntries(formData);

    const user = JSON.parse(localStorage.getItem("user"));
    const data = {
      body: {
        userId: user?.userId || null,
        topicName: allInterests.split(","),
      },
    };

    return sendRequest("put", "/user/updateUserInterests", data);
  };
