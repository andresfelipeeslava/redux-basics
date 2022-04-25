import {
  GET_TODOS,
  LOADING_TODOS,
  ERROR_TODOS,
  SET_USER_ID,
  SET_TITLE,
} from "../../types/todosTypes";

const INITIAL_STATE = {
  todos: {},
  loading: false,
  error: "",
  userId: "4",
  title: "wrteqy",
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TODOS:
      return {
        ...state,
        todos: action.payload,
        loading: false,
        error: "",
      };

    case LOADING_TODOS:
      return {
        ...state,
        loading: true,
      };

    case ERROR_TODOS:
      return {
        ...state,
        loading: false,
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

    default:
      return state;
  }
};
