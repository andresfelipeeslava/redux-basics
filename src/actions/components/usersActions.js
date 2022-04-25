import axios from "axios";
import { ERROR_USERS, GET_USERS, LOADING_USERS } from "../../types/usersTypes";

const API_URL = "https://jsonplaceholder.typicode.com/users";

export const getUsers = () => {
  return async (dispatch) => {
    dispatch({
      type: LOADING_USERS,
    });

    try {
      const response = await axios.get(API_URL);

      dispatch({
        type: GET_USERS,
        payload: response.data,
      });
    } catch (err) {
      new Error(console.error("Error occured: ", err.message));

      dispatch({
        type: ERROR_USERS,
        payload: `There's something went wrong: ${err.message}`,
      });
    }
  };
};
