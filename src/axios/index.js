import { isNullOrEmpty } from "../utils/utils";
import { createAxiosInstance } from "./axiosBase";
// export const BASE_URLS = {
//   auth: "https://auth.api.com",
//   private: "http://127.0.0.1:8000/api",
//   public: "http://127.0.0.1:8000/api",
//   formData: "http://127.0.0.1:8000/api",
// };

export const createBaseURL = (PORT = "8000") => {
  const hostname = window.location.hostname;
  const protocol = window.location.protocol;

  let baseURL = `:${PORT}/api`;

  if (isNullOrEmpty(hostname)) {
      baseURL = `${protocol}//localhost${baseURL}`;
    } else {
      baseURL = `${protocol}//${hostname}${baseURL}`;
  }

  return baseURL;
};

export const AuthAPI = createAxiosInstance(createBaseURL(), true);
export const privateAPI = createAxiosInstance(createBaseURL(), true);
// export const privateAPI = createAxiosInstance(BASE_URLS.private, true);
export const PublicAPI = createAxiosInstance(createBaseURL(), false);
export const FormDataAPI = createAxiosInstance(
  createBaseURL(),
  false,
  "multipart"
);
