import axios from "axios";
import {
  GET_PUBLICATIONS_BY_USER,
  LOADING_PUBLICATIONS,
  ERROR_PUBLICATIONS
} from '../../types/publicationsTypes';
import * as usersTypes from '../../types/usersTypes';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';
const { GET_USERS: GET_ALL_USERS } = usersTypes;

export const getUniqueUser = (key) => {
  return async (dispatch, getState) => {
    dispatch({
      type: LOADING_PUBLICATIONS
    });

    const { users } = getState().usersReducer;
    const { publications } = getState().publicationsReducer;
    const userId = users[key].id;
    
    try {
      const response = await axios.get(`${API_URL}?userId=${userId}`);

      const newPublications = response.data.map((publication) => ({
        ...publication,
        comments: [],
        isOpen: false
      }));

      const publicationsUpdated = [
        ...publications,
        newPublications,
      ];
      dispatch({
        type: GET_PUBLICATIONS_BY_USER,
        payload: publicationsUpdated
      });
  
      const publicationsKey = publicationsUpdated.length - 1;
      const usersUpdated = [ ...users];
      usersUpdated[key] = {
        ...users[key],
        publicationsKey,
      }
      dispatch({
        type: GET_ALL_USERS,
        payload: usersUpdated
      });

    }
    catch (error) {
      new Error(console.error('Error occured: ',error.message));
      dispatch({
        type: ERROR_PUBLICATIONS,
        payload: `Publications not found: ${error.message}`,
      })
    }
  }
}

export const openAndClosePublications = (publicationsKey, commentsKey) => {
  return async (dispatch, getState) => {
    const { publications } = getState().publicationsReducer;
    const publicationSelected = publications[publicationsKey][commentsKey];
    
    const updatePublication = {
      ...publicationSelected,
      isOpen: !publicationSelected.isOpen
    };

    const publicationsUpdated = [...publications];
    publicationsUpdated[publicationsKey] = [
      ...publications[publicationsKey],
    ]
    publicationsUpdated[publicationsKey][commentsKey] = updatePublication;

    dispatch({
      type: GET_PUBLICATIONS_BY_USER,
      payload: publicationsUpdated
    });
  };
};
