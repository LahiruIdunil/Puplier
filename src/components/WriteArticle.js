import React, { useContext, useEffect, useRef, useState } from "react";
import classes from "./WriteArticle.module.css";
import uploadImage from "./images/edit-article-page-upload-image-container.png";
import EditArticleEditor from "./EditArticleEditor";
import WriteArticleCategorySelector from "./WriteArticleCategorySelector";
import { useActionData, useNavigate, useSubmit } from "react-router-dom";
import { toast } from "react-toastify";
import WriteArticleErrorMessage from "./WriteArticleErrorMessage";
import { userContext } from "./LoggedInBaseLayout";
import WriteArticleTitle from "./WriteArticleTitle";
import CreatArtcleFlowIndicatorBar from "./CreatArtcleFlowIndicatorBar";

function WriteArticle({ articleDetails, mode, children }) {
  const submit = useSubmit();
  const actionData = useActionData();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  // this ref (contentRef) is used to keep track of the content, a user types within the tinymce
  const contentRef = useRef(null);
  // refference to the file(image) upload input field
  const imageUploadInputRef = useRef();
  const [imgSrc, setImgSrc] = useState(null);
  // this variable (articleContent) is only used to set the content initially inside the editor
  const articleContent = articleDetails?.content || null;
  const [isSelectedFromDropdown, setIsSelectedFromDropdown] = useState(false);
  const [disabled, setDisabled] = useState(false);
  // value that the user types in the 'selecte-category' box
  const [searchText, setSearchText] = useState("");
  // errors
  const [titleError, setTitleError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [contentError, setContentError] = useState(false);
  const [categoryErrorMessage, setCategoryErrorMessage] = useState("");
  const userDetails = useContext(userContext);

  // triggers to display existing values in relavent input fields in editArticle page
  useEffect(() => {
    if (articleDetails) {
      setTitle(articleDetails?.title);
      setIsSelectedFromDropdown(true);
      setSearchText(articleDetails?.categoryId);

      // author should not be able to edit the article is in "ACCEPTED" status
      if (articleDetails?.status === "ACCEPTED") {
        setDisabled(true);
      } else {
        setDisabled(false);
      }

      if (articleDetails.thumbnailUrl) {
        setImgSrc(articleDetails.thumbnailUrl);
      }
    }
  }, [articleDetails]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (title && contentRef.current.getContent() && searchText) {
      if (isSelectedFromDropdown) {
        // generates the summery
        let summary =
          contentRef.current
            .getContent({ format: "text" })
            .split(" ")
            .slice(0, 30)
            .join(" ") + "...";

        const values = {
          title,
          category: searchText,
          content: contentRef.current.getContent(),
          summary,
          // TODO: update the thumbnailUrl field once the image uploading method is implemented
          thumbnailUrl: "",
          userData: JSON.stringify(userDetails),
        };

        if (mode === "createArticle") {
          submit(values, {
            method: "post",
            action: "/dashboard/my-articles/new",
          });
        } else if (mode === "editArticle") {
          values.articleId = articleDetails?.articleId;

          submit(values, {
            method: "post",
            action: `/article/${articleDetails?.articleId}/edit`,
          });
        }
      } else {
        // scroll the page to the top
        window.scrollTo(0, 0);

        setCategoryErrorMessage("Please select from the dropdown!");
        setCategoryError(true);
        toast.error("Please fix the errors before submitting");
      }
    } else {
      // scroll the page to the top
      window.scrollTo(0, 0);

      toast.error("Please fix the errors before submitting");
      if (!title) {
        setTitleError(true);
      }
      if (!contentRef.current.getContent()) {
        setContentError(true);
      }
      if (!searchText) {
        setCategoryErrorMessage("This field is required!");
        setCategoryError(true);
      }
    }
  };

  // this function triggers after the article is saved as a "DRAFT"
  useEffect(() => {
    if (actionData) {
      if (actionData.status == "ok") {
        toast.success(actionData.response.data.message);

        if (mode === "createArticle") {
          navigate(`/dashboard/my-articles`);
        }
      } else {
        toast.error(
          actionData?.error?.response?.data.message ||
            actionData?.error?.message ||
            actionData.error
        );
      }
    }
  }, [actionData]);

  const handleImageUpload = () => {
    // todo: validate the image and do the below after validation
    const currentFile = imageUploadInputRef.current.files[0];
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
      <div className="row justify-content-center">
        <div className="col-xxl-auto col-xl-8 col-12">
          <div className={classes.editArticleContainer}>
            <CreatArtcleFlowIndicatorBar
              articleStatus={
                articleDetails?.status === undefined
                  ? "draft"
                  : articleDetails?.status.toLowerCase()
              }
            />
            {imgSrc ? (
              <div className={`${classes.uploadedImageParentContainer}`}>
                <div className={`d-flex justify-content-center`}>
                  <img src={imgSrc} className={`${classes.uploadedImage}`} />
                </div>
                {disabled ? null : (
                  <div className="d-flex justify-content-center">
                    <button
                      onClick={() => setImgSrc(null)}
                      className={`${classes.imageRemoveButton}`}
                    >
                      remove image
                    </button>
                  </div>
                )}
              </div>
            ) : disabled ? null : (
              <div className={`d-flex`}>
                <div
                  onClick={() => imageUploadInputRef.current.click()}
                  className={`d-flex ${classes.addCoverPhotoContainer}`}
                >
                  <div className="d-flex">
                    <img className="m-auto" src={uploadImage} alt="icon" />
                  </div>
                  <div className="d-flex">
                    <p className={classes.addCoverPhoto}>Add a cover photo</p>
                  </div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  ref={imageUploadInputRef}
                  onChange={handleImageUpload}
                />
              </div>
            )}
            <form onSubmit={onSubmit}>
              <WriteArticleTitle
                title={title}
                setTitle={setTitle}
                titleError={titleError}
                setTitleError={setTitleError}
                disabled={disabled}
              />
              <div className="d-flex">
                <div
                  className={`position-relative ${classes.categorySelectorContainer}`}
                >
                  <WriteArticleCategorySelector
                    searchText={searchText}
                    setSearchText={setSearchText}
                    setIsSelectedFromDropdown={setIsSelectedFromDropdown}
                    setCategoryError={setCategoryError}
                    disabled={disabled}
                  />
                  {categoryError && (
                    <WriteArticleErrorMessage
                      errorMessage={categoryErrorMessage}
                    />
                  )}
                </div>
              </div>
              <div className={classes.editorContainer}>
                <EditArticleEditor
                  setContentError={setContentError}
                  content={articleContent}
                  contentRef={contentRef}
                  disabled={disabled}
                />
                {contentError && (
                  <WriteArticleErrorMessage errorMessage="This field is required!" />
                )}
              </div>

              {children}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WriteArticle;
