import { GET_USERS, LOADING_USERS, ERROR_USERS } from '../../types/usersTypes';

const INITIAL_STATE = {
  users: [],
  loading: false,
  error: ''
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
        error: ''
      }

    case LOADING_USERS:
      return {
        ...state,
        loading: true
      }

    case ERROR_USERS:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    default: return state;
  };
};
