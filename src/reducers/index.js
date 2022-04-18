import { combineReducers } from "redux";
import usersReducer from "./components/usersReducer";
import publicationsReducer from "./components/publicationsReducer";
import todosReducer from "./components/todosReducer";

export default combineReducers({
  usersReducer,
  publicationsReducer,
  todosReducer,
});
