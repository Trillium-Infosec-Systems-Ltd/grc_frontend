import axios from "axios";
import { message } from "antd";
import { ROUTES } from "../constants/routesConstants";
import { logout, setUser } from "../features/user/userSlice";
import { store } from "../store/store";

export const createAxiosInstance = (
  baseURL,
  withAuth = false,
  contentType = "application/json"
) => {
  const instance = axios.create({
    baseURL,
    timeout: 50000,
    headers: {
      "Content-Type": contentType,
    },
  });

  if (withAuth) {
    instance.interceptors.request.use((config) => {
      const user = store.getState().session.user;
      const { access_token } = user || {};
      if (access_token) {
        config.headers.Authorization = `Bearer ${access_token}`;
      }
      return config;
    });
  }

  instance.interceptors.response.use(
    (res) => res,
    async (err) => {
      const originalRequest = err.config;
      const user = store.getState().session.user;
      const { refresh_token } = user || {};

      if (
        withAuth &&
        err.response?.status === 401 &&
        !originalRequest._retry &&
        refresh_token
      ) {
        originalRequest._retry = true;
        try {
          const refreshResponse = await axios.post(`${baseURL}/auth/refresh`, {
            refresh_token,
          });

          const newToken = refreshResponse.data.access_token;
          store.dispatch(setUser({ ...user, access_token: newToken }));

          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return instance(originalRequest);
        } catch (refreshErr) {
          store.dispatch(logout());
          message.error("Session expired. Please log in again.");
          window.location.href = ROUTES.PUBLIC.ROOT;
          return Promise.reject(refreshErr);
        }
      }

      const msg = err.response?.data?.detail || err.message || "Request failed";
      message.error(msg);
      return Promise.reject(err);
    }
  );

  return instance;
};
