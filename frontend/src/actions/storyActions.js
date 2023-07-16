import {
  NEW_STORY_SUCCESS,
  NEW_STORY_FAIL,
  NEW_STORY_REQUEST,
  CLEAR_ERRORS,
  ALL_STORY_REQUEST,
  ALL_STORY_SUCCESS,
  ALL_STORY_FAIL,
} from "../constants/storyConstants";

import axios from "axios";

export const getStories = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_STORY_REQUEST });

    const { data } = await axios.get(`/api/v1/stories`);

    dispatch({
      type: ALL_STORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_STORY_FAIL,
      payload: error.response.data.message,
    });
  }
};
// CREATE STORY
export const createStory = (storyData) => async (dispatch, getState) => {
  try {
    dispatch({ type: NEW_STORY_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `/api/v1/admin/story/new`,
      storyData,
      config
    );

    dispatch({
      type: NEW_STORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_STORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
