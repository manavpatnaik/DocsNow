import { useCallback } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const TOOLBAR_CONFIG = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ size: ["small", false, "large", "huge"] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "underline", "italic"],
  ["link", "image", "blockquote", "code-block"],
  [({ color: [] }, { background: [] })],
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }],
  [{ align: [] }],
  [{ script: "sub" }, { script: "super" }],
  ["clean"],
];

const Editor = () => {
  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;
    wrapper.innerHTML = "";

    const editor = document.createElement("div");
    wrapper.append(editor);
    new Quill(editor, { theme: "snow", modules: { toolbar: TOOLBAR_CONFIG } });
  }, []);
  return <div className="container" ref={wrapperRef}></div>;
};

export default Editor;
