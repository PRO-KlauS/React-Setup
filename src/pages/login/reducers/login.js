import { SET_USER_TOKEN } from '../actions/login';

const loginReducer = (token = '', action) => {
  switch (action.type) {
    case SET_USER_TOKEN: {
      return action.payload;
    }
    default: {
      return token;
    }
  }
};

export default loginReducer;
