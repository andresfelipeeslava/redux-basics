import { GET_USERS, LOADING_USERS, ERROR_USERS } from "../../types/usersTypes";

const INITIAL_STATE = {
  error: "",
  isLoading: false,
  users: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        error: "",
        isLoading: false,
        users: action.payload,
      };

    case LOADING_USERS:
      return {
        ...state,
        isLoading: true,
      };

    case ERROR_USERS:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
