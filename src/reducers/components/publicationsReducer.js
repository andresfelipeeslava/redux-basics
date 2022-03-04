/* eslint-disable import/no-anonymous-default-export */
import {
  GET_PUBLICATIONS_BY_USER,
  LOADING_PUBLICATIONS,
  ERROR_PUBLICATIONS,
  GET_COMMENTS,
  COMMENTS_LOADING,
  COMMENTS_ERROR
} from '../../types/publicationsTypes';

const INITIAL_STATE = {
  publications: [],
  loading: false,
  error: '',
  commentsLoading: false,
  commentsError: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PUBLICATIONS_BY_USER:
      return {
        ...state,
        publications: action.payload,
        loading: false,
        error: '',
        commentsLoading: false,
        commentsError: ''
      }

    case LOADING_PUBLICATIONS:
      return {
        ...state,
        loading: true,
      }

    case ERROR_PUBLICATIONS:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case GET_COMMENTS:
      return {
        ...state,
        publications: action.payload,
        commentsLoading: false,
        commentsError: ''
      }

    case COMMENTS_LOADING:
      return {
        ...state,
        commentsLoading: true,
      }

    case COMMENTS_ERROR:
      return {
        ...state,
        commentsError: action.payload
      }

    default: return state;
  };
};
