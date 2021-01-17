import { post } from '../../../core/client';

const addNewUser = (body) => {
  return post('user/add', body);
};

export { addNewUser };
