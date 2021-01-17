import { SET_PROFILE_DATA } from '../actions/profile';

const profileReducer = (profile = {}, action) => {
  switch (action.type) {
    case SET_PROFILE_DATA: {
      return action.payload;
    }
    default: {
      return profile;
    }
  }
};

export default profileReducer;
