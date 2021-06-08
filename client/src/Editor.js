import { useCallback } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const Editor = () => {
  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;
    wrapper.innerHTML = "";

    const editor = document.createElement("div");
    wrapper.append(editor);
    new Quill(editor, { theme: "snow" });
  }, []);
  return <div className="container" ref={wrapperRef}></div>;
};

export default Editor;
