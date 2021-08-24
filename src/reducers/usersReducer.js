/* eslint-disable import/no-anonymous-default-export */
import { GET_USERS, LOADING, ERROR } from '../types/usersTypes';

const INITIAL_STATE = {
  users: [],
  loading: false,
  error: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
        error: ''
      }

    case LOADING:
      return {
        ...state,
        loading: true
      }

    case ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    default: return state;
  };
};
