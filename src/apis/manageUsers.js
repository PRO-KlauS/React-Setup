import { get, post, patch } from '../setup/client';

const addNewUser = (body) => {
  return post('user/add', body);
};

const getUserList = (body) => {
  return get('user/all', body);
};

const editUser = (id, body) => {
  return patch(`user/edit/${id}`, body);
};

export { addNewUser, getUserList, editUser };
