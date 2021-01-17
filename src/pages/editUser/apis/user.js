import { patch } from '../../../core/client';

const editUser = (id, body) => {
  return patch(`user/edit/${id}`, body);
};

export { editUser };
