const SET_SIDEBAR_COLLAPSE = 'SET_SIDEBAR_COLLAPSE';
const SET_SIDEBAR_VISIBILITY = 'SET_SIDEBAR_VISIBILITY';

const setSidebarCollapse = (isCollapsed) => (dispatch, getState) => {
  dispatch({
    type: SET_SIDEBAR_COLLAPSE,
    payload: {
      isCollapsed: isCollapsed,
      isVisible: getState().sidebar.isVisible,
    },
  });
};

const setSidebarVisibility = (isVisible) => (dispatch, getState) => {
  dispatch({
    type: SET_SIDEBAR_VISIBILITY,
    payload: {
      isCollapsed: getState().sidebar.isCollapsed,
      isVisible: isVisible,
    },
  });
};

export {
  setSidebarCollapse,
  setSidebarVisibility,
  SET_SIDEBAR_COLLAPSE,
  SET_SIDEBAR_VISIBILITY,
};
