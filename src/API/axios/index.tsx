import axios from "axios";

// const instance = axios.create({
//   baseURL: '/',
//   timeout: 1000,
//   headers: {'X-Custom-Header': 'foobar'}
// });

const apiConfig = {
  headers: {
    Authorization: `Bearer ${'your_token'}`
  },
  baseURL: '/_api/'
}

axios.interceptors.request.use(
  (config) => {
//     console.log('config', config);
    config.headers.Authorization = `Bearer ${'your_token'}`;
    config.baseURL = '/_api/';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const HTTPClient = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch
};

export default HTTPClient;