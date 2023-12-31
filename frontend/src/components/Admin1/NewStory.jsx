import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import "./NewStory.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Box, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, createStory } from "../../actions/storyActions";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { NEW_STORY_RESET } from "../../constants/storyConstants";
import axios from "axios";
import Sidebar from "./Sidebar";

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
  const [thumbnail, setThumbnail] = useState("/slide1.webp");
  const [thumbnailPreview, setThumbnailPreview] = useState("/slide1.webp");

  const thumbnailDataChange = (e) => {
    if (e.target.name === "thumbnail") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setThumbnailPreview(reader.result);
          setThumbnail(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const imageHandler = (e) => {
    const editor = quillRef.current.getEditor();
    // console.log(editor);
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];

      setImages((oldImages) => [...oldImages, file]);

      editor.insertEmbed(editor.getLength(), "image", "Loading...");
    };
  };

  const uploadImagesToCloudinary = async () => {
    try {
      const uploadImages = await Promise.all(
        images.map((image) => {
          const imageFormData = new FormData();
          imageFormData.append("file", image);
          imageFormData.append("upload_preset", "fo1xfxf9");

          return axios.post(
            "https://api.cloudinary.com/v1_1/dihlykute/image/upload",
            imageFormData
          );
        })
      );

      return uploadImages.map((response) => {
        return {
          url: response.data.secure_url,
          public_id: response.data.public_id,
        };
      });
    } catch (error) {
      console.log("Image Upload error", error);
      return [];
    }
  };

  const createStorySubmitHandler = async (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("title", title);
    myForm.set("thumbnail", thumbnail);

    const editor = quillRef.current.getEditor();
    let contentHtml = editor.root.innerHTML;

    const processedImages = await uploadImagesToCloudinary();
    processedImages.forEach((image, index) => {
      contentHtml = contentHtml.replace(
        "Loading...", // Placeholder image
        `${image.url}`
      );
      myForm.append(`images[${index}][public_id]`, image.public_id);
      myForm.append(`images[${index}][url]`, image.url);
    });

    myForm.set("content", contentHtml);
    dispatch(createStory(myForm));
    setTitle("");
    setContent("");
    setImages([]);
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
    <Fragment>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" className="create-product">
          <h1 className="heading">Write a Story</h1>
          <Box>
            <div className="newStory">
              <div className="text-editor">
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
                  <input
                    type="file"
                    name="thumbnail"
                    accept="image/*"
                    onChange={thumbnailDataChange}
                  />
                  <img
                    src={thumbnailPreview}
                    className="thumbnail"
                    alt="Thumbnail Preview"
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
                    className="myBtn"
                    type="submit"
                    disabled={loading || content.value === null ? true : false}
                  >
                    Create New Story
                  </button>
                </form>
                {/* <div dangerouslySetInnerHTML={{ __html: content.value }}></div> */}
                {/* <div>{content.value}</div> */}
                {/* <ReactQuill value={content.value} readOnly theme="bubble" /> */}
              </div>
            </div>
          </Box>
        </Box>
      </Box>
    </Fragment>
  );
};

export default NewStory;
