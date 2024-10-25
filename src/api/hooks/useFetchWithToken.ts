import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { fetchWithToken } from 'src/api/instance';

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

export const useFetchWithToken = () => {
  const navigate = useNavigate();

  fetchWithToken.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as CustomAxiosRequestConfig;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          await fetchWithToken.post('/auth/refresh-token', {}, { withCredentials: true });
          return await fetchWithToken(originalRequest);
        } catch (tokenError) {
          console.error('Token refresh failed:', tokenError);
          navigate('/login');
        }
      }
      return Promise.reject(error);
    }
  );

  return fetchWithToken;
};
