import React, { useState } from "react";
import "./NewStory.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const NewStory = () => {
  const [value, setValue] = useState("");
  return (
    <div className="container">
      <div className="newStory">
        <h1>sdfhisu</h1>
        <div className="editorContainer">
          <ReactQuill theme="snow" value={value} onChange={setValue} />
        </div>
      </div>
    </div>
  );
};

export default NewStory;
