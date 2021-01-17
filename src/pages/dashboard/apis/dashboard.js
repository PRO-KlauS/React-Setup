import { get } from '../../../core/client';

const getDashBoardDetails = (body) => {
  return get('company/get-dashboard-counts', body);
};

export { getDashBoardDetails };
