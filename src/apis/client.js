import axios from 'axios';
import { messages } from '../constants';
import { getToken, getBaseURL, showToast } from '../utility/common';

const client = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const get = (url, body, headers = {}) =>
  client.get(url, { params: body, headers: headers });

const post = (url, body, headers = {}) => client.post(url, body, { headers });

const put = (url, body, headers = {}) => client.put(url, body, { headers });

const patch = (url, body, headers = {}) => client.patch(url, body, { headers });

const del = (url, body, headers = {}) => client.delete(url, body, { headers });

client.interceptors.request.use(async (config) => {
  config.headers.Authorization = await getToken();
  return config;
});

client.interceptors.response.use(
  function (response) {
    if (response.data && response.data.data && response.data.data.logout) {
      localStorage.removeItem('TOKEN');
      localStorage.setItem('SHOW_TOAST', true);
    }
    return response;
  },
  function (error) {
    showToast(messages.tryAgain);
    return Promise.reject(error);
  },
);

export { get, post, put, del, patch };

export default client;
