import axios from 'axios';
import i18nInstance from './i18next';
import { getToken, getBaseURL, showToast } from '../utility';

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

const del = (url, body, headers = {}) =>
  client.delete(url, { params: body, headers: headers });

client.interceptors.request.use(async (config) => {
  config.headers.Authorization = await getToken();
  // config.params = {
  //   ...(config.params || {}),
  //   locale: i18nInstance.language || "en",
  // };
  return config;
});

client.interceptors.response.use(
  function (response) {
    if (response.data && response.data.data && response.data.data.logout) {
      localStorage.removeItem('TOKEN');
    }
    return response;
  },
  function (error) {
    showToast(i18nInstance.t('messages.tryAgain'));
    return Promise.reject(error);
  },
);

export { get, post, put, del, patch };

export default client;
