import { GET_TODOS, LOADING_TODOS, ERROR_TODOS } from "../../types/todosTypes";

const INITIAL_STATE = {
  todos: {},
  loading: false,
  error: "",
};

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

    default:
      return state;
  }
};
