import React, { useEffect, useState } from "react";
import "./NewStory.scss";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, createStory } from "../../actions/storyActions";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { NEW_STORY_RESET } from "../../constants/storyConstants";

const NewStory = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { loading, error, success, story } = useSelector(
    (state) => state.newStory
  );

  const [content, setContent] = useState({ value: null });
  const [title, setTitle] = useState("");

  const createStorySubmitHandler = (e) => {
    e.preventDefault();

    const myFrom = new FormData();

    myFrom.set("title", title);
    myFrom.set("content", content.value);

    dispatch(createStory(myFrom));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Story Created Successfully");
      navigate(`/story/${story._id}`);

      dispatch({ type: NEW_STORY_RESET });
    }
  }, [error, alert, success, dispatch, navigate, story._id]);

  return (
    <div className="newStory">
      <div className="text-editor">
        <h1>Write a Story</h1>
        <form
          action=""
          encType="multipart/form-data"
          onSubmit={createStorySubmitHandler}
        >
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            value={title}
            placeholder="Write title of the Story"
            onChange={(e) => setTitle(e.target.value)}
          />
          <div>
            <EditorToolbar />
            <ReactQuill
              theme="snow"
              value={content.value}
              onChange={(value) => setContent({ value })}
              placeholder={"Write something awesome..."}
              modules={modules}
              formats={formats}
            />
          </div>
          <button
            className="btn btn-primary"
            type="submit"
            disabled={loading || content.value === null ? true : false}
          >
            Create
          </button>
        </form>
        <div dangerouslySetInnerHTML={{ __html: content.value }}></div>
        {/* <ReactQuill value={state.value} readOnly theme="bubble" /> */}
      </div>
      <div className="fff"></div>
    </div>
  );
};

export default NewStory;
