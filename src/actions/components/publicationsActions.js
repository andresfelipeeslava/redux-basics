import axios from "axios";
import {
  GET_PUBLICATIONS_BY_USER,
  LOADING_PUBLICATIONS,
  ERROR_PUBLICATIONS
} from '../../types/publicationsTypes';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export const getSoleUser = (key) => {
  return async (dispatch, getState) => {
    const { users } = getState().usersReducer;
    const { publications } = getState().publicationsReducer;
    
    const userId = users[key].id;
    const response = await axios.get(`${API_URL}?userId=${userId}`)
    
    const publicationsUpdated = [
      ...publications,
      response.data,
    ];

    dispatch({
      type: LOADING_PUBLICATIONS
    })

    try {
      dispatch({
        type: GET_PUBLICATIONS_BY_USER,
        payload: publicationsUpdated
      })
    }
    catch (error) {
      new Error(console.error('Error occured: ',error.message));
      dispatch({
        type: ERROR_PUBLICATIONS,
        payload: `There's something went wrong: ${error.message}`,
        loading: false
      })
    }
  }
}