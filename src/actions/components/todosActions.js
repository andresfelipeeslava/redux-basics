import axios from "axios";
import {
  GET_TODOS,
  LOADING_TODOS,
  ERROR_TODOS,
  SET_USER_ID,
  SET_TITLE,
  TODO_ADDED,
} from "../../types/todosTypes";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

export const getTodos = () => {
  return async (dispatch) => {
    dispatch({
      type: LOADING_TODOS,
    });

    try {
      const response = await axios.get(API_URL);
      // `response` es un arreglo, pero el proyecto necesita
      // que sea un objeto. Por eso que se desestructura
      // y se guarda en `todos` como un objeto.
      const todos = {};
      response.data.map(
        (todo) =>
          (todos[todo.userId] = {
            ...todos[todo.userId], // Al objeto `todos` se le coloca lo que contiene cada usuario.
            [todo.id]: {
              // La posición del id del todo guardará la información de cada `todo`
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

export const setUserId = (userId) => {
  return (dispatch) => {
    dispatch({
      type: SET_USER_ID,
      payload: userId,
    });
  };
};

export const setTitle = (title) => {
  return (dispatch) => {
    dispatch({
      type: SET_TITLE,
      payload: title,
    });
  };
};

export const addTodo = (newTodo) => {
  return async (dispatch) => {
    dispatch({
      type: LOADING_TODOS,
    });

    try {
      const response = await axios.post(API_URL, newTodo);
      dispatch({
        type: TODO_ADDED,
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: ERROR_TODOS,
        payload: `Somenthing went wrong: ${err.message}`,
      });
    }
  };
};
