import { createAxiosInstance } from './axios.base';
const BASE_URLS = {
    auth: 'https://auth.api.com',
    private: 'https://private.api.com',
    public: 'http://localhost:8000/api',
    formData: 'https://public.api.com',
};

export const AuthAPI = createAxiosInstance(BASE_URLS.auth, true);
export const privateAPI = createAxiosInstance(BASE_URLS.private, true);
export const PublicAPI = createAxiosInstance(BASE_URLS.public, false);
export const FormDataAPI = createAxiosInstance(BASE_URLS.formData, true, 'multipart');
