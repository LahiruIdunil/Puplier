import React, { useEffect, useState } from "react";

export default function useDocumentTitle(title) {
  const [document_title, setDoucmentTitle] = useState(title);

  useEffect(() => {
    document.title = document_title;
  }, [document_title]);

  return { setDoucmentTitle };
}
