import { get } from '../setup/client';

const getDashBoardDetails = (body) => {
  return get('company/get-dashboard-counts', body);
};

export { getDashBoardDetails };
