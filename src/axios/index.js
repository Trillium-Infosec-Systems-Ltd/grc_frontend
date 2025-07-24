import { createAxiosInstance } from './axiosBase';
export const BASE_URLS = {
    auth: 'https://auth.api.com',
    private: 'http://127.0.0.1:8000/api',
    public: 'http://127.0.0.1:8000/api',
    formData: 'http://127.0.0.1:8000/api',
};

export const AuthAPI = createAxiosInstance(BASE_URLS.auth, true);
export const privateAPI = createAxiosInstance(BASE_URLS.private, true);
export const PublicAPI = createAxiosInstance(BASE_URLS.public, false);
export const FormDataAPI = createAxiosInstance(BASE_URLS.formData, false, 'multipart');
