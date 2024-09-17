import React from "react";
import classes from "./NewArticle.module.css";
import WriteArticle from "../components/WriteArticle";
import { useNavigation } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import useDocumentTitle from "../custom-hooks/useDocumentTitle";

export default function NewArticle() {
  const navigation = useNavigation();

  // set Docuement title
  useDocumentTitle("Puplier | Write New Article");

  return (
    <>
      <WriteArticle mode="createArticle">
        <div className={`row justify-content-center`}>
          <div
            className={`col-sm-auto col-12 d-sm-flex d-block ${classes.buttonsContainer}`}
          >
            <div className="row">
              <div className="col-sm-auto col-12">
                <button type="submit" className={classes.saveDraftButton}>
                  {navigation.state === "submitting" ? (
                    <BeatLoader loading size={8} />
                  ) : (
                    "Save draft"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </WriteArticle>
    </>
  );
}
// todo: send intent to differentiate the response
export const newArticleAction =
  (sendRequest) =>
  async ({ request }) => {
    const formData = await request.formData();
    const { title, category, content, summary, thumbnailUrl, userData } =
      Object.fromEntries(formData);
    const userDetails = JSON.parse(userData);

    let data = {
      body: {
        userId: userDetails?.userId || null,
        loginName: userDetails?.loginName || null,
        authorName: `${
          userDetails
            ? `${userDetails.firstName} ${userDetails.lastName}`
            : null
        }`,
        title,
        summary,
        content,
        thumbnailUrl,
        categoryId: category,
      },
    };

    return sendRequest("post", "/article/createArticle", data);
  };
