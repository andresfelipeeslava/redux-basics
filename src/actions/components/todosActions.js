import axios from "axios";
import { GET_TODOS, LOADING_TODOS, ERROR_TODOS } from "../../types/todosTypes";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

export const getTodos = () => {
  return async (dispatch) => {
    dispatch({
      type: LOADING_TODOS,
    });

    try {
      const response = await axios.get(API_URL);
      const todos = {};
      response.data.map(
        (todo) =>
          (todos[todo.userId] = {
            ...todos[todo.userId],
            [todo.id]: {
              ...todo,
            },
          })
      );

      dispatch({
        type: GET_TODOS,
        payload: todos,
      });
    } catch (err) {
      new Error(console.error("Error occured: ", err.message));

      dispatch({
        type: ERROR_TODOS,
        payload: `There's something went wrong: ${err.message}`,
      });
    }
  };
};
