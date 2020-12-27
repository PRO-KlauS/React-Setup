import { post } from './client';

const login = (body) => {
  return post('user/login', body);
};

export { login };
