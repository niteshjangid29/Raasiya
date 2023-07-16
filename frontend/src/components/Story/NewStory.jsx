import React, { useEffect, useRef, useState } from "react";
import "./NewStory.scss";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats, QuillToolbar } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, createStory } from "../../actions/storyActions";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { NEW_STORY_RESET } from "../../constants/storyConstants";
import { FaLink } from "react-icons/fa";

const NewStory = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const quillRef = useRef();

  const { loading, error, success, story } = useSelector(
    (state) => state.newStory
  );

  const [content, setContent] = useState({ value: null });
  const [title, setTitle] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const createStoryImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const createStorySubmitHandler = (e) => {
    e.preventDefault();

    const myFrom = new FormData();

    // myFrom.set("title", title);
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
        <form action="" encType="multipart/form-data">
          <input
            type="file"
            name="storyImg"
            accept="image/*"
            multiple
            onChange={createStoryImagesChange}
          />
          <div className="storyImagePreview">
            {imagesPreview.map((image, index) => (
              <div>
                <img key={index} src={image} alt="Story Images Preview" />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    navigator.clipboard.writeText(image);
                  }}
                >
                  <FaLink />
                  Copy Url
                </button>
              </div>
            ))}
          </div>
        </form>
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
              ref={quillRef}
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
        {/* <div dangerouslySetInnerHTML={{ __html: content.value }}></div> */}
        {/* <div>{content.value}</div> */}
        {/* <ReactQuill value={content.value} readOnly theme="bubble" /> */}
      </div>
      <div className="fff"></div>
    </div>
  );
};

export default NewStory;
