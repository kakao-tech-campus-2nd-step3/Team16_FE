import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;

const initInstance = (config: AxiosRequestConfig): AxiosInstance => {
  const instance = axios.create({
    timeout: 5000,
    ...config,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...config.headers,
    },
  });

  return instance;
};

export const fetchInstance = initInstance({
  baseURL,
});

// const token = authSessionStorage.get();
const token = 'token';
export const fetchWithToken = initInstance({
  baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

fetchWithToken.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const errorMessage = `서버 에러 : ${error.response.status}`;
    alert(JSON.stringify(errorMessage));
    return Promise.reject(error);
  },
);
