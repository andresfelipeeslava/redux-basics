import {
  GET_TODOS,
  LOADING_TODOS,
  ERROR_TODOS,
  SET_USER_ID,
  SET_TITLE,
  TODO_ADDED,
} from "../../types/todosTypes";

const INITIAL_STATE = {
  todos: {},
  isLoading: false,
  error: "",
  userId: "",
  title: "",
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TODOS:
      return {
        ...state,
        todos: action.payload,
        isLoading: false,
        error: "",
      };

    case LOADING_TODOS:
      return {
        ...state,
        isLoading: true,
      };

    case ERROR_TODOS:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
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
        todos: {},
        isLoading: false,
        error: "",
      };

    default:
      return state;
  }
};
