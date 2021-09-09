import { get, put, post } from '../setup/client';

const getProfile = (body) => {
  return get('user/me', body);
};

const updateProfile = (id, body) => {
  return put(`user/profileupdate/${id}`, body);
};

const changePassword = (id, body) => {
  return post(`user/passwordchange/${id}`, body);
};

export { getProfile, updateProfile, changePassword };
