import { get, patch } from '../../../core/client';

const getUserList = (body) => {
  return get('user/all', body);
};

const editUser = (id, body) => {
  return patch(`user/edit/${id}`, body);
};

export { getUserList, editUser };
