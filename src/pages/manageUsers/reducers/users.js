import { SET_USERS } from '../actions/manageUsers';

const usersReducer = (
  users = { items: [], totalItemCount: 0, totalPages: 0 },
  action,
) => {
  switch (action.type) {
    case SET_USERS: {
      return action.payload;
    }
    default: {
      return users;
    }
  }
};

export default usersReducer;
