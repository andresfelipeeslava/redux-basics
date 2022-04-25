/* eslint-disable import/no-anonymous-default-export */
import {
  COMMENTS_ERROR,
  COMMENTS_LOADING,
  ERROR_PUBLICATIONS,
  GET_COMMENTS,
  GET_PUBLICATIONS_BY_USER,
  LOADING_PUBLICATIONS,
} from "../../types/publicationsTypes";

const INITIAL_STATE = {
  commentsAreLoading: false,
  commentsError: "",
  error: "",
  isLoading: false,
  publications: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PUBLICATIONS_BY_USER:
      return {
        ...state,
        commentsError: "",
        commentsAreLoading: false,
        error: "",
        isLoading: false,
        publications: action.payload,
      };

    case LOADING_PUBLICATIONS:
      return {
        ...state,
        isLoading: true,
      };

    case ERROR_PUBLICATIONS:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case GET_COMMENTS:
      return {
        ...state,
        commentsError: "",
        commentsAreLoading: false,
        publications: action.payload,
      };

    case COMMENTS_LOADING:
      return {
        ...state,
        commentsAreLoading: true,
      };

    case COMMENTS_ERROR:
      return {
        ...state,
        commentsError: action.payload,
      };

    default:
      return state;
  }
};
