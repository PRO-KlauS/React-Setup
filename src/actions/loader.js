const SET_LOADER_COUNT = "SET_LOADER_COUNT";

const setReduxLoaderCount = (count) => {
  return { type: SET_LOADER_COUNT, payload: count };
};

const incrementLoaderCount = () => (dispatch, getState) => {
  let loaderCount = getState().loaderCount;
  dispatch({
    type: SET_LOADER_COUNT,
    payload: loaderCount + 1,
  });
};

const decrementLoaderCount = () => (dispatch, getState) => {
  let loaderCount = getState().loaderCount;
  dispatch({
    type: SET_LOADER_COUNT,
    payload: loaderCount ? loaderCount - 1 : 0,
  });
};

export {
  setReduxLoaderCount,
  SET_LOADER_COUNT,
  incrementLoaderCount,
  decrementLoaderCount,
};
