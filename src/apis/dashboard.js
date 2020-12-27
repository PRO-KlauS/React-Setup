import { get } from "./client";

const getDashBoardDetails = (body) => {
  return get("company/get-dashboard-counts", body);
};

export { getDashBoardDetails };
