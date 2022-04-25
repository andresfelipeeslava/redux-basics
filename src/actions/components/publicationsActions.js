import axios from "axios";
import {
  COMMENTS_ERROR,
  COMMENTS_LOADING,
  ERROR_PUBLICATIONS,
  GET_COMMENTS,
  GET_PUBLICATIONS_BY_USER,
  LOADING_PUBLICATIONS,
} from "../../types/publicationsTypes";
import * as usersTypes from "../../types/usersTypes";

const API_URL = "https://jsonplaceholder.typicode.com";
const { GET_USERS: GET_ALL_USERS } = usersTypes;

export const getUniqueUser = (key) => {
  return async (dispatch, getState) => {
    dispatch({
      type: LOADING_PUBLICATIONS,
    });

    const { users } = getState().usersReducer;
    const { publications } = getState().publicationsReducer;
    const userId = users[key].id;

    try {
      const response = await axios.get(`${API_URL}/posts?userId=${userId}`);
      // agrego el arreglo de comentarios y variable open/close a cada publicación
      const newPublications = response.data.map((publication) => ({
        ...publication,
        comments: [],
        isOpen: false,
      }));
      const publicationsUpdated = [...publications, newPublications];

      dispatch({
        type: GET_PUBLICATIONS_BY_USER,
        payload: publicationsUpdated,
      });

      // Agregamos la key de la posición de la publicación del usuario
      const userPublicationsKey = publicationsUpdated.length - 1;
      const usersUpdated = [...users];
      usersUpdated[key] = {
        ...users[key],
        userPublicationsKey,
      };

      dispatch({
        type: GET_ALL_USERS,
        payload: usersUpdated,
      });
    } catch (error) {
      new Error(console.error("Error occured: ", error.message));
      dispatch({
        type: ERROR_PUBLICATIONS,
        payload: `Publications not found: ${error.message}`,
      });
    }
  };
};

export const openAndClosePublications = (
  userPublicationsKey,
  publicationCommentsKey
) => {
  return async (dispatch, getState) => {
    const { publications } = getState().publicationsReducer;
    const publicationSelected =
      publications[userPublicationsKey][publicationCommentsKey];
    const publicationSelectedUpdated = {
      ...publicationSelected,
      isOpen: !publicationSelected.isOpen,
    };

    const publicationsUpdated = [...publications];
    publicationsUpdated[userPublicationsKey] = [
      ...publications[userPublicationsKey],
    ];
    publicationsUpdated[userPublicationsKey][publicationCommentsKey] =
      publicationSelectedUpdated;

    dispatch({
      type: GET_PUBLICATIONS_BY_USER,
      payload: publicationsUpdated,
    });
  };
};

export const getComments = (userPublicationsKey, publicationCommentsKey) => {
  return async (dispatch, getState) => {
    dispatch({
      type: COMMENTS_LOADING,
    });

    const { publications } = getState().publicationsReducer;
    const publicationSelected =
      publications[userPublicationsKey][publicationCommentsKey];

    try {
      const response = await axios.get(
        `${API_URL}/comments?postId=${publicationSelected.id}`
      );

      const publicationSelectedUpdated = {
        ...publicationSelected,
        comments: response.data,
      };

      const publicationsUpdated = [...publications];
      publicationsUpdated[userPublicationsKey] = [
        ...publications[userPublicationsKey],
      ];
      publicationsUpdated[userPublicationsKey][publicationCommentsKey] =
        publicationSelectedUpdated;

      dispatch({
        type: GET_COMMENTS,
        payload: publicationsUpdated,
      });
    } catch (error) {
      new Error(console.error("Error occured: ", error.message));
      dispatch({
        type: COMMENTS_ERROR,
        payload: `Comments not found: ${error.message}`,
      });
    }

    return {};
  };
};
