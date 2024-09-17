import React, { useContext, useEffect, useState } from "react";
import titleIcon from "./images/edit-profile-title-icon.png";
import classes from "./EditProfileDetails.module.css";
import imageUploadIcon from "./images/edit-profile-image-upload-icon.png";
import EditProfileInputContainer from "../components/EditProfileInputContainer";
import { userContext } from "../components/LoggedInBaseLayout";
import countyData from "../countryList.json";
import EditProfileSelectContainer from "../components/EditProfileSelectContainer";
import { Formik, Form } from "formik";
import {
  defer,
  useActionData,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import EditProfileTextAreaContainer from "../components/EditProfileTextAreaContainer";
import { BeatLoader } from "react-spinners";
import defaultAvatar from "../components/images/avator.png";
import useDocumentTitle from "../custom-hooks/useDocumentTitle";
import RequestProgressBar from "../components/RequestProgressBar";

export default function EditProfileDetails() {
  const [profileImage, setProfileImage] = useState(defaultAvatar);
  const userDetailsLoader = useLoaderData();
  const userDetails = useContext(userContext);
  const countries = countyData.countries;
  const submit = useSubmit();
  const actionData = useActionData();
  const navigation = useNavigation();
  const [startProgressBar, setStartProgressBar] = useState(true);
  const [completeProgressBar, setCompleteProgressBar] = useState(false);

  // set Docuement title
  useDocumentTitle("Puplier | Edit Profile");

  const qualificationOptions = [
    {
      key: "Secondary education or high school",
      value: "Secondary education or high school",
    },
    { key: "GED", value: "GED" },
    { key: "Vocational qualification", value: "Vocational qualification" },
    { key: "BA", value: "BA" },
    { key: "BSc", value: "BSc" },
    { key: "BENG", value: "BENG" },
    { key: "LLB", value: "LLB" },
    { key: "MARTS", value: "MARTS" },
    { key: "MBIOL", value: "MBIOL" },
    { key: "MCOMP", value: "MCOMP" },
    { key: "MENG", value: "MENG" },
    { key: "MMATH", value: "MMATH" },
    { key: "MPHYS", value: "MPHYS" },
    { key: "MSCI", value: "MSCI" },
    { key: "MA", value: "MA" },
    { key: "MSc", value: "MSc" },
    { key: "MBA", value: "MBA" },
    { key: "MPhil", value: "MPhil" },
    { key: "MRes", value: "MRes" },
    { key: "LLM", value: "LLM" },
    { key: "PhD", value: "PhD" },
    { key: "DPhil", value: "DPhil" },
    { key: "Other", value: "Other" },
    { key: "Primary education", value: "Primary education" },
    { key: "No formal education", value: "No formal education" },
  ];

  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    currentPosition: "",
    company: "",
    highestQualification: "",
    website: "",
    description: "",
    profileImage: "",
  });

  // yup url validation
  const yupUrlRegex =
    /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;

  const validationSchema = Yup.object({
    country: Yup.string().required("This field is required!"),
    currentPosition: Yup.string().required("This field is required!"),
    highestQualification: Yup.string().required("This field is required!"),
    description: Yup.string()
      .required("This field is required!")
      .max(1000, "You have exceeded the maximum character limit!"),
    website: Yup.string().matches(yupUrlRegex, "Invalid URL!"),
  });

  // re-initialize the form values when the userData is available
  useEffect(() => {
    const { userData } = userDetailsLoader;

    userData
      .then(({ response }) => {
        let user = response.data.body;

        const newInitialValues = {
          firstName: user?.firstName || "",
          lastName: user?.lastName || "",
          email: user?.email || "",
          country: user?.country || "",
          currentPosition: user?.currentPosition || "",
          company: user?.company || "",
          highestQualification: user?.highestQualification || "",
          website: user?.websiteURL || "",
          description: user?.description || "",
          profileImage: user?.profileImage || "",
        };

        setInitialValues(newInitialValues);
        if (user.profileImage) {
          setProfileImage(user.profileImage);
        }
      })
      .catch(({ error }) => {
        if (error) {
          toast.error(
            error?.response?.data.message || error || "Faild to load user data!"
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
  }, [userDetailsLoader]);

  const onSubmit = (values) => {
    // hide all toast notifications
    toast.dismiss();
    submit(
      { loginName: userDetails?.loginName, ...values },
      { method: "post", action: "/profile/edit/details" }
    );
  };

  // triggers once the response is recieved from the backend
  useEffect(() => {
    if (actionData) {
      if (actionData.status === "ok") {
        toast.success(
          actionData.response.data.message || "Profile updated successfully!"
        );
      } else {
        toast.error(
          actionData.error.response.data.message || "Faild to update profile!"
        );
      }
    }
  }, [actionData]);

  return (
    <div className="col-12">
      <RequestProgressBar
        continuousStart={startProgressBar}
        complete={completeProgressBar}
      />
      <div className="row justify-content-center">
        <div className={`col-xxl-auto col-xl-7 col-lg-8 col-12`}>
          <div className={`${classes.editProfileContainer}`}>
            <div className={`d-flex ${classes.titleContainer}`}>
              <div className={`d-flex ${classes.titleIconContainer}`}>
                <img
                  className={`m-auto ${classes.titleIcon}`}
                  src={titleIcon}
                  alt="icon"
                />
              </div>
              <div className="d-flex">
                <h1 className={`m-auto ${classes.title}`}>Edit Profile</h1>
              </div>
            </div>
            <div className={`${classes.profileImageContainer}`}>
              <div
                className={`${classes.profileImage}`}
                style={{
                  backgroundImage: `url(${profileImage})`,
                }}
              >
                <img
                  className={`${classes.imageUploadIcon}`}
                  src={imageUploadIcon}
                  alt="icon"
                />
              </div>
            </div>
            <div className={`${classes.formContainer}`}>
              <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
                enableReinitialize
              >
                {(formik) => {
                  return (
                    <Form>
                      <div className="row">
                        <div className="col-sm-6 col-12">
                          <EditProfileInputContainer
                            label="first name"
                            name="firstName"
                          />
                        </div>
                        <div className="col-sm-6 col-12">
                          <EditProfileInputContainer
                            label="last name"
                            name="lastName"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-6 col-12">
                          <EditProfileInputContainer
                            label="email"
                            name="email"
                            disabled={true}
                          />
                        </div>
                        <div className="col-sm-6 col-12">
                          <EditProfileSelectContainer
                            options={countries}
                            name="country"
                            label="country"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-6 col-12">
                          <EditProfileInputContainer
                            label="Current Position"
                            name="currentPosition"
                          />
                        </div>
                        <div className="col-sm-6 col-12">
                          <EditProfileSelectContainer
                            options={qualificationOptions}
                            name="highestQualification"
                            label="Highest level of qualification"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-6 col-12">
                          <EditProfileInputContainer
                            label="website"
                            name="website"
                          />
                        </div>
                        <div className="col-sm-6 col-12">
                          <EditProfileInputContainer
                            label="company name"
                            name="company"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <p className={classes.inputLabel}>about</p>
                          <EditProfileTextAreaContainer name="description" />
                        </div>
                      </div>
                      <div className="row justify-content-center">
                        <div className="col-sm-auto col-12">
                          <button
                            type="button"
                            className={classes.formSubmitButton}
                            onClick={() => {
                              // set all the fields as touched. Otherwise formik will not validate the fields
                              formik.setTouched({
                                country: true,
                                currentPosition: true,
                                experience: true,
                                description: true,
                                website: true,
                              });

                              formik.validateForm().then((errors) => {
                                if (Object.keys(errors).length > 0) {
                                  toast.error(
                                    "Please fix the errors before submitting!"
                                  );
                                  // scroll the page to the top
                                  window.scrollTo(0, 0);
                                } else {
                                  formik.handleSubmit();
                                }
                              });
                            }}
                          >
                            {navigation.state === "idle" ? (
                              "submit"
                            ) : (
                              <BeatLoader loading size={10} />
                            )}
                          </button>
                        </div>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const editProfileLoader = (sendRequest) => () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const params = { userId: user?.userId || null };

  const userData = sendRequest("get", "/user/findUserInfoByUser", params).then(
    (resp) => {
      if (resp.status === "error") {
        throw resp;
      } else {
        return resp;
      }
    }
  );

  return defer({ userData });
};

export const editProfileAction =
  (sendRequest) =>
  async ({ request }) => {
    const formData = await request.formData();
    const {
      firstName,
      lastName,
      loginName,
      country,
      currentPosition,
      company,
      highestQualification,
      website: websiteURL,
      description,
      profileImage,
    } = Object.fromEntries(formData);

    const user = JSON.parse(localStorage.getItem("user"));
    const data = {
      body: {
        userId: user?.userId || null,
        firstName,
        lastName,
        loginName,
        country,
        jobTitle: currentPosition,
        company,
        experience: highestQualification,
        websiteURL,
        description,
        profileImage,
      },
    };

    return sendRequest("post", "/user/addUserInfo", data);
  };
