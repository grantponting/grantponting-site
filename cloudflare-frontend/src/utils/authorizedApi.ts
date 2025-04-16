import axios from 'axios';
import * as api from '../api-client/api';

// Create a custom Axios instance
const axiosInstance = axios.create();
let isRefreshing = false;

// Add an interceptor to attach the Authorization header
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token'); // Retrieve the access token from storage
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Handle token expiration and refresh
axiosInstance.interceptors.response.use(
    (response) => response, // Forward successful responses
    async (error) => {
        const originalRequest = error.config;

        // Prevent infinite loop
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem('refresh_token');

            if (refreshToken && !isRefreshing) {
                isRefreshing = true;
                try {
                    const tokenApi = api.DefaultApiFactory();
                    const body: api.PostRefreshRequest = { refreshToken };
                    const refreshResponse = await tokenApi.postRefresh(body);

                    const newAccessToken = refreshResponse.data.accessToken || '';
                    localStorage.setItem('access_token', newAccessToken);

                    // Set header and retry original request
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    isRefreshing = false;
                    return axiosInstance(originalRequest);
                } catch (refreshError) {
                    console.error('Token refresh failed:', refreshError);
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                    isRefreshing = false;
                }
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
