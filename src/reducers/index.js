import { combineReducers } from "redux";
import { LOGOUT, SET_USER_TOKEN } from "../actions/login";
import loginReducer from "./login";
import loaderReducer from "./loader";
import profileReducer from "./profile";
import sidebarReducer from "./sidebar";

const initialState = {
  token: "",
  loaderCount: 0,
  profile: {},
  sidebar: { isCollapsed: false, isVisible: false },
};

const appReducer = combineReducers({
  token: loginReducer,
  loaderCount: loaderReducer,
  profile: profileReducer,
  sidebar: sidebarReducer,
});

const rootReducer = (state, action) => {
  let newState = state;
  if (
    action.type === LOGOUT ||
    (action.type !== SET_USER_TOKEN && !localStorage.getItem("TOKEN"))
  ) {
    newState = initialState;
  }
  return appReducer(newState, action);
};

export default rootReducer;
