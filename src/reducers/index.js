import { combineReducers } from 'redux';
import usersReducer from './components/usersReducer';
import publicationsReducer from './components/publicationsReducer';

export default combineReducers({
  usersReducer,
  publicationsReducer,
});
