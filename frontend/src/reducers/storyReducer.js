import {
  ALL_STORY_FAIL,
  ALL_STORY_REQUEST,
  ALL_STORY_SUCCESS,
  CLEAR_ERRORS,
  NEW_STORY_FAIL,
  NEW_STORY_REQUEST,
  NEW_STORY_RESET,
  NEW_STORY_SUCCESS,
} from "../constants/storyConstants";

export const storiesReducer = (state = { stories: [] }, action) => {
  switch (action.type) {
    case ALL_STORY_REQUEST:
      return {
        loading: true,
        stories: [],
      };

    case ALL_STORY_SUCCESS:
      return {
        loading: false,
        stories: action.payload.stories,
        storiesCount: action.payload.storiesCount,
      };

    case ALL_STORY_FAIL:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const newStoryReducer = (state = { story: {} }, action) => {
  switch (action.type) {
    case NEW_STORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_STORY_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        story: action.payload.story,
      };
    case NEW_STORY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_STORY_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
