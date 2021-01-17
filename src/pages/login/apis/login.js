import { post } from '../../../core/client';

const login = (body) => {
  return post('user/login', body);
};

export { login };
