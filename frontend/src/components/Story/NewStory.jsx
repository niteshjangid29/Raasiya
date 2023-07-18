import React, { useEffect, useMemo, useRef, useState } from "react";
import "./NewStory.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, createStory } from "../../actions/storyActions";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { NEW_STORY_RESET } from "../../constants/storyConstants";
import axios from "axios";

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

  const imageHandler = (e) => {
    const editor = quillRef.current.getEditor();
    // console.log(editor);
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];

      const formData = new FormData();

      formData.append("file", file);
      formData.append("upload_preset", "fo1xfxf9"); // Replace with your Cloudinary upload preset

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dihlykute/image/upload", // Replace with your Cloudinary cloud name
          formData
        );

        const imageUrl = response.data.secure_url;
        editor.insertEmbed(editor.getLength(), "image", imageUrl);
      } catch (error) {
        console.error("Image upload error", error);
      }
    };
  };

  const createStorySubmitHandler = (e) => {
    e.preventDefault();

    const myFrom = new FormData();

    myFrom.set("title", title);
    myFrom.set("content", content.value);

    dispatch(createStory(myFrom));
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: "1" }, { header: "2" }, { font: [] }],
          [{ size: [] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image"],
          ["clean"],
          ["code-block"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      clipboard: {
        matchVisual: false,
      },
    }),
    []
  );
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "code-block",
  ];

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
    </div>
  );
};

export default NewStory;
