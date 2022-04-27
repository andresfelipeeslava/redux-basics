import axios from "axios";
import {
  ERROR_TODOS,
  GET_TODOS,
  LOADING_TODOS,
  SET_TITLE,
  SET_USER_ID,
  TODOS_CLEANUP,
  TODOS_UPDATE,
  TODO_SAVED,
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
        type: TODO_SAVED,
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

export const editTodo = (editedTodo) => {
  return async (dispatch) => {
    dispatch({
      type: LOADING_TODOS,
    });

    try {
      const response = await axios.put(
        `${API_URL}/${editedTodo.id}`,
        editedTodo
      );
      dispatch({
        type: TODO_SAVED,
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

export const markCheckbox = (userId, todoId) => {
  return (dispatch, getState) => {
    const { todos } = getState().todosReducer;
    const selectedTodo = todos[userId][todoId];

    const todosUpdated = {
      ...todos,
    };
    todosUpdated[userId] = {
      ...todos[userId],
    };
    todosUpdated[userId][todoId] = {
      ...todos[userId][todoId],
      completed: !selectedTodo.completed,
    };
    dispatch({
      type: TODOS_UPDATE,
      payload: todosUpdated,
    });
  };
};

export const deleteTodo = (todoId) => {
  return async (dispatch) => {
    dispatch({
      type: LOADING_TODOS,
    });

    try {
      const response = await axios.delete(`${API_URL}/${todoId}`);

      dispatch({
        type: GET_TODOS,
        payload: {},
      });
    } catch (err) {
      console.error(err.message);
      dispatch({
        type: ERROR_TODOS,
        payload: `Service not available: ${err.message}`,
      });
    }
  };
};
export const cleanUp = () => {
  return (dispatch) => {
    dispatch({
      type: TODOS_CLEANUP,
    });
  };
};
