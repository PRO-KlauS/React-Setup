import { combineReducers } from 'redux';
import { LOGOUT, SET_USER_TOKEN } from '../actions/login';
import loginReducer from './login';
import loaderReducer from './loader';
import profileReducer from './profile';
import sidebarReducer from './sidebar';
import languageReducer from './internationalization';
import { removeToken } from '../utility/common';

const initialState = {
  token: '',
  loaderCount: 0,
  profile: {},
  sidebar: { isCollapsed: false, isVisible: false },
  language: 'en-US',
};

const appReducer = combineReducers({
  token: loginReducer,
  loaderCount: loaderReducer,
  profile: profileReducer,
  sidebar: sidebarReducer,
  language: languageReducer,
});

const rootReducer = (state, action) => {
  let newState = state;
  if (
    action.type === LOGOUT ||
    (action.type !== SET_USER_TOKEN && !localStorage.getItem('TOKEN'))
  ) {
    newState = initialState;
    removeToken();
  }
  return appReducer(newState, action);
};

export default rootReducer;
export { initialState };
