import axios from 'axios';
import * as api from '../api-client/api';

// Create a custom Axios instance
const axiosInstance = axios.create();

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
        if (error.response?.status === 401) {
            // Access token might be expired; try refreshing
            const refreshToken = localStorage.getItem('refresh_token');
            const accessToken = localStorage.getItem('access_token');
            if (refreshToken && accessToken) {
                try {
                    let tokenApi = api.DefaultApiFactory();
                    let body: api.PostRefreshRequest = {
                        refreshToken: refreshToken,
                    }
                    const refreshResponse = await tokenApi.postRefresh(body);
                    const newAccessToken = refreshResponse.data.accessToken || '';
                    localStorage.setItem('access_token', newAccessToken);

                    // Retry the original request with the new access token
                    error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosInstance.request(error.config);
                } catch (refreshError) {
                    console.error('Failed to refresh token:', refreshError);
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                }
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
