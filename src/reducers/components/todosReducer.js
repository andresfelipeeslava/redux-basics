import {
  ERROR_TODOS,
  GET_TODOS,
  LOADING_TODOS,
  SET_TITLE,
  SET_USER_ID,
  TODO_ADDED,
} from "../../types/todosTypes";

const INITIAL_STATE = {
  error: "",
  isLoading: false,
  isRedirecting: false,
  title: "",
  todos: {},
  userId: "",
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TODOS:
      return {
        ...state,
        error: "",
        isLoading: false,
        isRedirecting: false,
        todos: action.payload,
      };

    case LOADING_TODOS:
      return {
        ...state,
        isLoading: true,
      };

    case ERROR_TODOS:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case SET_USER_ID:
      return {
        ...state,
        userId: action.payload,
      };

    case SET_TITLE:
      return {
        ...state,
        title: action.payload,
      };

    case TODO_ADDED:
      return {
        ...state,
        error: "",
        isLoading: false,
        isRedirecting: true,
        title: "",
        todos: {},
        userId: "",
      };

    default:
      return state;
  }
};
