import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export const getUsers = () => {
  return async (dispatch) => {
    const response = await axios.get(API_URL);
    dispatch({
      type: 'get_users',
      payload: response.data
    });
  }
}