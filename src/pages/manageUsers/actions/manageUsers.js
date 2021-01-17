import * as apis from '../apis/users';
import {
  incrementLoaderCount,
  decrementLoaderCount,
} from '../../../actions/loader';

const SET_USERS = 'SET_USERS';

const getUsers = (body) => (dispatch) => {
  dispatch(incrementLoaderCount());
  return apis
    .getUserList(body)
    .then((res) => {
      if (res.data.status) {
        let users = {
          items: (res.data.data && res.data.data.users) || [],
          totalItemCount:
            (res.data.pagination && res.data.pagination.count) || 0,
          totalPages: (res.data.pagination && res.data.pagination.pages) || 0,
        };
        dispatch(usersAction(users));
      }
      dispatch(decrementLoaderCount());
      return res.data;
    })
    .catch(() => dispatch(decrementLoaderCount()));
};

const usersAction = (data) => ({
  type: SET_USERS,
  payload: data,
});

export { SET_USERS, getUsers };
