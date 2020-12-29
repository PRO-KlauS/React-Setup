import { get } from "./client";

const getDashBoardDetails = (body) => {
  return get("company/get-dashboard-counts", body);
};

const getCompanies = (body) => {
  return get("company/get-entities", body);
};

export { getDashBoardDetails, getCompanies };
