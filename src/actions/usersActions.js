import axios from 'axios';
import { GET_USERS, LOADING, ERROR } from '../types/usersTypes';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export const getUsers = () => {
  return async (dispatch) => {
    dispatch({
      type: LOADING
    })
    
    try {
      const response = await axios.get(API_URL);
      dispatch({
        type: GET_USERS,
        payload: response.data
      });
    } catch (err) {
      new Error(console.error('Error occured: ',err.message));
      dispatch({
        type: ERROR,
        loading: false,
        payload: err.message,
      });
    }
  }
}