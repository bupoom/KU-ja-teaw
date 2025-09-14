import axios from "axios";
import { AuthService } from "./authService";

const client = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || "https://api.example.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor 
//  - เปลี่ยน header ตาม accesstoken ให้อัตโนมัติ
client.interceptors.request.use(async (config) => {
  try {
    const token = await AuthService.getValidAccessToken();
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  } catch (error) {
    console.error('Error in request interceptor:', error);
    return config;
  }
});

// Response interceptor - ถ้า ถ้า
client.interceptors.response.use(
  (response) => response,
  async (error) => {
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
        console.error('Token refresh failed:', refreshError);
      }

      // ถ้า refresh ไม่ได้ ให้ logout
      await AuthService.logout();
      
      // Redirect ไป login page (ขึ้นอยู่กับ navigation library ที่ใช้)
      // Example: navigation.navigate('Login');
      
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export const endpoints = {
  auth: {
    login: "/api/auth/login",
    refresh: "/api/auth/refresh",
    logout: "/api/auth/logout",
  },
  user: {
    profile: "/api/user/profile",
    update: "/api/user/update",
  }
};

export default client;