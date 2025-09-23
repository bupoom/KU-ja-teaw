import axios from "axios";
import { AuthService } from "./authService";

const client = axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 10000
});

// Request interceptor - เปลี่ยน header ตาม accesstoken
client.interceptors.request.use(async config => {
    try { 
        const refresh_token_success = await AuthService.refreshAccessToken();
        if (refresh_token_success) {
            console.log( "sucess", refresh_token_success)
        }
        const token = await AuthService.getValidAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    } catch (error) {
        console.error("Error in request interceptor:", error);
        return config;
    }
});

// Response interceptor
client.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // พยายาม refresh token
                const refreshSuccess = await AuthService.refreshAccessToken();

                if (refreshSuccess) {
                    // ลองเรียก API อีกครั้งด้วย token ใหม่
                    const newToken = await AuthService.getAccessToken();
                    if (newToken) {
                        originalRequest.headers.Authorization = `Bearer ${newToken}`;
                        return client(originalRequest);
                    }
                }
            } catch (refreshError) {
                console.error("Token refresh failed:", refreshError);
            }

            // ถ้า refresh ไม่ได้ให้logout
            await AuthService.logout();
            return Promise.reject(error);
        }

        return Promise.reject(error);
    }
);

export default client;
