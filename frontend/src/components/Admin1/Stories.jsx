import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import "./NewStory.scss";
import React, { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  clearErrors,
  deleteStory,
  getStories,
} from "../../actions/storyActions";
import Loader from "../layout/Loader/Loader";
import BlogCard from "../Story/BlogCard";
import { MdDelete } from "react-icons/md";
import { DELETE_STORY_RESET } from "../../constants/storyConstants";
import { useNavigate } from "react-router-dom";

const Stories1 = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { loading, error, stories, storiesCount } = useSelector(
    (state) => state.stories
  );
  const { error: deleteError, isDeleted } = useSelector((state) => state.story);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStoryId, setSelectedStoryId] = useState(null);

  const handleDialogOpen = (storyId) => {
    setSelectedStoryId(storyId);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleDeleteStory = () => {
    dispatch(deleteStory(selectedStoryId));
    handleDialogClose();
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success("Story deleted successfully");
      navigate("/admin/stories");
      dispatch({ type: DELETE_STORY_RESET });
    }
    dispatch(getStories());
  }, [error, alert, dispatch, isDeleted, deleteError, navigate]);
  return (
    <Fragment>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" className="create-product">
          <h1 className="heading">All Stories ({storiesCount})</h1>
          <Box>
            {loading ? (
              <Loader />
            ) : (
              <Fragment>
                <div className="products">
                  {stories &&
                    stories.map((story) => (
                      <div key={story._id} className="story-box">
                        <BlogCard key={story._id} story={story} />
                        <MdDelete
                          className="story-delete"
                          onClick={() => handleDialogOpen(story._id)}
                        />
                      </div>
                    ))}
                </div>
                <Dialog open={openDialog} onClick={handleDialogClose}>
                  <DialogTitle>Confirm Delete</DialogTitle>
                  <DialogContent>
                    Are you sure you want to delete this story?
                    <br />
                    <div>
                      <strong>Story ID</strong> : {selectedStoryId}
                    </div>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                    <Button color="error" onClick={handleDeleteStory}>
                      Delete
                    </Button>
                  </DialogActions>
                </Dialog>
              </Fragment>
            )}
          </Box>
        </Box>
      </Box>
    </Fragment>
  );
};

export default Stories1;
