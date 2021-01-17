import { combineReducers } from 'redux';
import { LOGOUT, SET_USER_TOKEN } from '../pages/login/actions/login';
import loginReducer from '../pages/login/reducers/login';
import loaderReducer from '../reducers/loader';
import profileReducer from '../pages/profile/reducers/profile';
import sidebarReducer from '../reducers/sidebar';
import usersReducer from '../pages/manageUsers/reducers/users';
import dashboardReducer from '../pages/dashboard/reducers/dashboard';

const initialState = {
  token: '',
  loaderCount: 0,
  profile: {},
  sidebar: { isCollapsed: false, isVisible: false },
  users: { items: [], totalItemCount: 0, totalPages: 0 },
  dashboardDetails: {
    entities: 0,
    urls: 0,
    datapoints: 0,
    newEntities: 0,
  },
};

const appReducer = combineReducers({
  token: loginReducer,
  loaderCount: loaderReducer,
  profile: profileReducer,
  sidebar: sidebarReducer,
  users: usersReducer,
  dashboardDetails: dashboardReducer,
});

const rootReducer = (state, action) => {
  let newState = state;
  if (
    action.type === LOGOUT ||
    (action.type !== SET_USER_TOKEN && !localStorage.getItem('TOKEN'))
  ) {
    newState = initialState;
  }
  return appReducer(newState, action);
};

export default rootReducer;
