import React, { useCallback, useState, useEffect, useContext } from "react";
import classes from "./OnboardingSelectInterests.module.css";
import DefaultInterestComponent from "../components/DefaultInterestComponent.js";
import SearchedInterestComponent from "../components/SearchedInterestComponent.js";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useActionData,
  useNavigate,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import ManuallySearchInterests from "../components/ManuallySearchInterests";
import useDocumentTitle from "../custom-hooks/useDocumentTitle";

export default function OnboardingSelectInterests() {
  const navigate = useNavigate();
  const submit = useSubmit();
  const navigation = useNavigation();
  const actionData = useActionData();
  // selected interests from the suggested list
  const [selectedInterests, setSelectedInterests] = useState([]);
  // selected interests from the dropdown
  const [searchedInterests, setSearchedInterests] = useState([]);
  const [suggestedInterets, setSuggestedInterests] = useState([
    "python",
    "machine learning",
    "education",
    "linux",
    "handicraft",
    "javascript",
    "centOS",
    "apache",
  ]);

  // set Docuement title
  useDocumentTitle("Puplier | Onboarding | Select Interests");

  // adds an interest when clicked on a suggested interest item
  const addInterests = useCallback(
    (interest) => {
      if (!selectedInterests.includes(interest)) {
        setSelectedInterests((selectedInterests) => [
          ...selectedInterests,
          interest,
        ]);
      }
    },
    [selectedInterests]
  );

  // removes an interest when clicked on a suggested interest item
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
      { method: "post", action: "/signup/onboarding/interest" }
    );
  };

  useEffect(() => {
    if (actionData) {
      if (actionData.status === "ok") {
        toast.success(actionData.response.data.message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        toast.error(
          actionData?.error?.response?.data.message ||
            actionData?.error ||
            "Faild to add interests!"
        );
      }
    }
  }, [actionData]);

  return (
    <div className="container customContainer">
      <div className={classes.centerDiv}>
        <h3 className={classes.title}>Pick your interests.</h3>
        <p className={classes.taglineText}>
          By selecting your preferred topics, we can suggest articles that are
          more relevant to your preferences, and help you discover new content
          that matches your interests.
        </p>
        <div className={classes.interestSelectBox}>
          {suggestedInterets.map((interest, key) => (
            <DefaultInterestComponent
              key={key}
              interest={interest}
              addInterests={addInterests}
              removeInterests={removeInterests}
            />
          ))}
        </div>
        <div className={classes.line}></div>
        <div className={classes.searchInterests}>
          <ManuallySearchInterests
            selectedInterests={selectedInterests}
            searchedInterests={searchedInterests}
            setSearchedInterests={setSearchedInterests}
          />
        </div>
        <div className={classes.searchedInterestsBox}>
          {searchedInterests.map((interest, index) => (
            <div key={index}>
              <SearchedInterestComponent
                key={index}
                index={index}
                interest={interest}
                setInterests={setSearchedInterests}
              />
            </div>
          ))}
        </div>
        <div className={classes.submitBtnDiv}>
          <button
            className={classes.submitBtn}
            onClick={handleSubmit}
            disabled={navigation.state === "idle" ? false : true}
            style={{
              cursor: navigation.state === "idle" ? "pointer" : "not-allowed",
            }}
          >
            {navigation.state === "idle" ? (
              <p className={classes.submitBtnText}>complete</p>
            ) : (
              <BeatLoader loading size={10} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export const selectInterestsAction =
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

    return sendRequest("post", "/user/addUserInterests", data);
  };
