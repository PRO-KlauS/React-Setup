import { post } from '../setup/client';

const login = (body) => {
  return post('user/login', body);
};

export { login };
