/* eslint-disable import/no-anonymous-default-export */
import {
  GET_PUBLICATIONS_BY_USER,
  LOADING_PUBLICATIONS,
  ERROR_PUBLICATIONS
} from '../../types/publicationsTypes';

const INITIAL_STATE = {
  publications: [],
  loading: false,
  error: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PUBLICATIONS_BY_USER:
      return {
        ...state,
        publications: action.payload,
        loading: false,
        error: ''
      }
    
    case LOADING_PUBLICATIONS:
      return {
        ...state,
        loading: true,
        error: ''
      }

    case ERROR_PUBLICATIONS:
      return {
        ...state,
        loading: false,
        error: action.payload
      }  

    default: return state;
  };
};
