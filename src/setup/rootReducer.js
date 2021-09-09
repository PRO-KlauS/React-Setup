import { combineReducers } from 'redux';
import { LOGOUT, SET_USER_TOKEN } from '../actions/login';
import loginReducer from '../reducers/login';
import loaderReducer from '../reducers/loader';
import profileReducer from '../reducers/profile';
import sidebarReducer from '../reducers/sidebar';
import languageReducer from '../reducers/internationalization';
import { removeToken } from '../utility';

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
