import axios from 'axios';
import { message } from 'antd';
import { ROUTES } from '../constants/routes.constants';
import { logout, setUser } from '../features/user/userSlice';
import { store } from '../store/store';

export const createAxiosInstance = (
  baseURL,
  withAuth = false,
  contentType = 'application/json'
) => {
  const instance = axios.create({
    baseURL,
    timeout: 50000,
    headers: {
      'Content-Type': contentType,
    },
  });

  if (withAuth) {
    instance.interceptors.request.use((config) => {
      const token = store.getState().session.user;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  instance.interceptors.response.use(
    (res) => res,
    async (err) => {
      const originalRequest = err.config;
      const { refreshToken } = store.getState().session;

      if (
        withAuth &&
        err.response?.status === 401 &&
        !originalRequest._retry &&
        refreshToken
      ) {
        originalRequest._retry = true;
        try {
          const refreshResponse = await axios.post(`${baseURL}/refresh-token`, {
            refreshToken,
          });

          const newToken = refreshResponse.data.accessToken;
          store.dispatch(setUser(newToken));

          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return instance(originalRequest);
        } catch (refreshErr) {
          store.dispatch(logout());
          message.error('Session expired. Please log in again.');
          window.location.href = ROUTES.PUBLIC.ROOT;
          return Promise.reject(refreshErr);
        }
      }

      const msg =
        err.response?.data?.message || err.message || 'Request failed';
      message.error(msg);
      return Promise.reject(err);
    }
  );

  return instance;
};
