import { SET_LOADER_COUNT } from "../actions/loader";

const loaderReducer = (loaderCount = 0, action) => {
  switch (action.type) {
    case SET_LOADER_COUNT: {
      return action.payload;
    }
    default: {
      return loaderCount;
    }
  }
};

export default loaderReducer;
