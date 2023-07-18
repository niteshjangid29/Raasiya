import React, { Fragment, useEffect } from "react";
import "./StoryDetails.scss";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearErrors, getStoryDetails } from "../../actions/storyActions";
import Loader from "../layout/Loader/Loader";
import ReactQuill from "react-quill";

const StoryDetails = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, story } = useSelector((state) => state.storyDetails);
  const { id } = useParams();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getStoryDetails(id));
  }, [dispatch, error, alert, id]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="container">
            <div className="story row">
              <div>{story.title}</div>
              <ReactQuill value={story.content} readOnly theme="bubble" />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default StoryDetails;
