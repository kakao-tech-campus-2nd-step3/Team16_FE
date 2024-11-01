import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';

import { RouterPath } from '@/routes/path';

export const baseURL = process.env.REACT_APP_BASE_URL;

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
    return response.data;
  },
  async function (error) {
    if (error.response && error.response.status === 401) {
      console.warn("401 Unauthorized: Access token expired or invalid");

      try {
        // SuccessPage로 리다이렉트하여 토큰 재발급 시도
        window.location.href = RouterPath.success;
      } catch (refreshError) {
        // 재발급 실패 시 백엔드 로그인 페이지로 이동
        window.location.href =`${baseURL}/login`;
      }
    } else {
      // 기타 오류는 기존 방식으로 처리
      return Promise.reject(error);
    }
  }
);
