import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Preloader from "./Preloader";

function EditArticleEditor({
  content,
  contentRef,
  setContentError,
  disabled = false,
}) {
  const [showPreLoader, setShowPreLoader] = useState(true);

  const onInit = (evt, editor) => {
    contentRef.current = editor;
    setShowPreLoader(false);
  };

  return (
    <>
      <Preloader isLoading={showPreLoader} />
      <Editor
        tinymceScriptSrc={process.env.PUBLIC_URL + "/tinymce/tinymce.min.js"}
        onInit={(evt, editor) => onInit(evt, editor)}
        initialValue={content}
        onChange={() => setContentError(false)}
        disabled={disabled}
        init={{
          height: 893,
          max_height: 893,
          placeholder: "Write your article here...",
          content_css: `default, ${process.env.PUBLIC_URL}/tinymce-editor-custom.css`,
          external_plugins: {
            tiny_mce_wiris:
              process.env.PUBLIC_URL +
              "/@wiris/mathtype-tinymce5/plugin.min.js",
          },
          plugins: "advlist lists link image",
          toolbar:
            "undo redo| formatselect styles | forecolor | tiny_mce_wiris_formulaEditor tiny_mce_wiris_formulaEditorChemistry | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | outdent indent | bullist numlist | link image",
          advlist_bullet_styles: "square",
          advlist_number_styles:
            "lower-alpha,lower-roman,upper-alpha,upper-roman",
          browser_spellcheck: true,
          contextmenu: false,
          menubar: false,
          branding: false,
          statusbar: false,
          draggable_modal: true,
          images_upload_url: "test.php",
        }}
      />
    </>
  );
}

export default EditArticleEditor;
