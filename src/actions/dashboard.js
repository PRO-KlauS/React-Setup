import { getDashBoardDetails } from "../apis/dashboard";
import { incrementLoaderCount, decrementLoaderCount } from "./loader";

const SET_DASHBOARD_DETAILS = "SET_DASHBOARD_DETAILS";

const setDashboardData = () => (dispatch) => {
  dispatch(incrementLoaderCount());
  return getDashBoardDetails()
    .then((res) => {
      if (res.data.status) {
        let dashboardDetails = {
          entities: res.data.data ? res.data.data.entities : 0,
          urls: res.data.data ? res.data.data.urls : 0,
          datapoints: res.data.data ? res.data.data.datapoints : 0,
          newEntities: res.data.data ? res.data.data.new_entities : 0,
        };
        dispatch({
          type: SET_DASHBOARD_DETAILS,
          payload: dashboardDetails,
        });
      }
      dispatch(decrementLoaderCount());
      return res.data;
    })
    .catch(() => dispatch(decrementLoaderCount()));
};

export { setDashboardData, SET_DASHBOARD_DETAILS };
