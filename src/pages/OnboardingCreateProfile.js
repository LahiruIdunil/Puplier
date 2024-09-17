import React, { useContext, useEffect, useState } from "react";
import classes from "./OnboardingCreateProfile.module.css";
import OnboardingCreateProfileInput from "../components/OnboardingCreateProfileInput.js";
import OnboardingCreateProfileSelect from "../components/OnboardingCreateProfileSelect.js";
import uploadImageIcon from "./images/add_photo.png";
import waveImg from "./images/wave.png";
import Dropzone from "react-dropzone";
import { toast } from "react-toastify";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  useActionData,
  useNavigate,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { BeatLoader } from "react-spinners";
import OnboardingCreateProfileTextarea from "../components/OnboardingCreateProfileTextarea";
import countyData from "../countryList.json";
import { userContext } from "../components/LoggedInBaseLayout";
import useDocumentTitle from "../custom-hooks/useDocumentTitle";

export default function OnboardingCreateProfile() {
  const countries = countyData.countries;
  const firstName = new URLSearchParams(window.location.search).get("fname");
  const lastName = new URLSearchParams(window.location.search).get("lname");
  const submit = useSubmit();
  const navigate = useNavigate();
  const actionData = useActionData();
  const navigation = useNavigation();
  const [imgSrc, setImgSrc] = useState(null);
  const user = useContext(userContext);

  // set Docuement title
  useDocumentTitle("Puplier | Onboarding | Create Profile");

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

  // yup url validation
  const yupUrlRegex =
    /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;

  const validationSchema = Yup.object({
    country: Yup.string().required("This field is required!"),
    currentPosition: Yup.string().required("This field is required!"),
    qualification: Yup.string().required("This field is required!"),
    description: Yup.string()
      .required("This field is required!")
      .max(1000, "You have exceeded the maximum character limit!"),
    website: Yup.string().matches(yupUrlRegex, "Invalid URL!"),
  });

  const initialValues = {
    country: "",
    currentPosition: "",
    company: "",
    qualification: "",
    website: "",
    description: "",
    profileImage: "",
  };

  const onSubmit = (values) => {
    // hide all toast notifications
    toast.dismiss();
    submit(
      { firstName, lastName, loginName: user.loginName, ...values },
      { method: "post", action: "/signup/onboarding/profile" }
    );
  };

  useEffect(() => {
    if (actionData) {
      if (actionData.status === "ok") {
        navigate("/signup/onboarding/interest");
      } else {
        toast.error(
          actionData.error.response.data.message || "Faild to add user info!"
        );
      }
    }
  }, [actionData]);

  const handleImageUpload = (files, rejectedFiles) => {
    // todo: validate the image and do the below after validation
    const currentFile = files[0];
    const imgFileReader = new FileReader();
    imgFileReader.addEventListener(
      "load",
      () => {
        setImgSrc(imgFileReader.result);
      },
      false
    );
    imgFileReader.readAsDataURL(currentFile);
  };

  return (
    <div className="container customContainer">
      <div className={`${classes.centerDiv}`}>
        <div className={classes.waveAndHello}>
          <div className={classes.waveImgDiv}>
            <img src={waveImg} alt="wave image" className={classes.waveImg} />
          </div>
          <p className={`${classes.helloText}`}>
            Hello {firstName ? firstName : "User"},
          </p>
        </div>
        <p className={`${classes.fewMoreStepsText}`}>
          Just a few more steps to complete your profile
        </p>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(formik) => {
            return (
              <Form>
                <div className={`row`}>
                  <div className={`col-12 col-md-6`}>
                    <OnboardingCreateProfileSelect
                      options={countries}
                      defaultValue="Select Country"
                      name="country"
                      label="Country"
                      required={true}
                    />
                  </div>
                  <div className={`col-12 col-md-6`}>
                    <OnboardingCreateProfileInput
                      type="text"
                      name="currentPosition"
                      label="Current Position"
                      required={true}
                    />
                  </div>
                </div>
                <div className={`row`}>
                  <div className={`col-12 col-md-6`}>
                    <OnboardingCreateProfileInput
                      type="text"
                      name="company"
                      label="Company Name"
                    />
                  </div>
                  <div className={`col-12 col-md-6`}>
                    <OnboardingCreateProfileSelect
                      options={qualificationOptions}
                      defaultValue="Select Qualification"
                      name="qualification"
                      label="Highest level of qualification"
                      required={true}
                    />
                  </div>
                </div>
                <div>
                  <OnboardingCreateProfileInput
                    type="text"
                    name="website"
                    label="Website"
                  />
                </div>
                <div>
                  <OnboardingCreateProfileTextarea
                    label="About You"
                    name="description"
                    required={true}
                  />
                </div>
                {imgSrc ? (
                  <div className={`${classes.uploadedImageParentContainer}`}>
                    <div className={`d-flex justify-content-center`}>
                      <img
                        className={`${classes.uploadedImage}`}
                        src={imgSrc}
                      />
                    </div>
                    <div className="d-flex justify-content-center">
                      <button
                        onClick={() => setImgSrc(null)}
                        className={`${classes.imageRemoveButton}`}
                      >
                        remove image
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <Dropzone
                      // todo: set maxSize
                      multiple={false}
                      accept="image/*"
                      onDrop={handleImageUpload}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <section>
                          <div
                            className={classes.uploadImageBox}
                            {...getRootProps()}
                          >
                            <input {...getInputProps()} />
                            <div className={classes.uploadImageInnerBox}>
                              <div className={classes.uploadImageIcon}>
                                <img src={uploadImageIcon} alt="Upload Image" />
                              </div>
                              <p className={classes.uploadImageText}>
                                Upload Image
                              </p>
                            </div>
                          </div>
                        </section>
                      )}
                    </Dropzone>
                  </>
                )}
                <div className={classes.imageUploadBottomTextDiv}>
                  <p className={`${classes.imageUploadBottomText}`}>
                    We recommend uploading your real photo as it will help you
                    to be identified by your community
                  </p>
                </div>
                <button
                  type="button"
                  className={`${classes.submitButton}`}
                  onClick={() => {
                    // set all fields as touched. Otherwise formik will not validate the fields
                    formik.setTouched({
                      country: true,
                      currentPosition: true,
                      qualification: true,
                      description: true,
                      website: true,
                    });

                    formik.validateForm().then((errors) => {
                      if (Object.keys(errors).length > 0) {
                        // scroll the page to the top
                        toast.error("Please fix the errors before submitting!");
                        window.scrollTo(0, 0);
                      } else {
                        formik.handleSubmit();
                      }
                    });
                  }}
                >
                  {navigation.state === "idle" ? (
                    <p className={classes.submitButtonText}>next</p>
                  ) : (
                    <BeatLoader loading size={10} />
                  )}
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export const onboardingCreateProfileAction =
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
      qualification,
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
        experience: qualification,
        websiteURL,
        description,
        profileImage,
      },
    };

    return sendRequest("post", "/user/addUserInfo", data);
  };
