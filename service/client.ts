import axios from "axios";
import { AuthService } from "./authService";
import { BASE_URL } from "./config";

const client = axios.create({
    baseURL: BASE_URL,
    timeout: 10000
});

// Wrapper function with improved error handling
const makeAuthenticatedRequest = async (config: any) => {
    try {
        const token = await AuthService.getValidAccessToken();
        
        if (token) {
            if (!config.headers) {
                config.headers = {};
            }
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        console.log('🚀 Request:', {
            method: config.method?.toUpperCase(),
            url: config.url,
            hasToken: !!token
        });
        
        return await client(config);
    } catch (error: any) {
        console.log('❌ Request failed:', {
            status: error.response?.status,
            url: config.url,
            method: config.method?.toUpperCase()
        });

        // Handle 401 here directly
        if (error.response?.status === 401) {
            console.log('🔄 401 detected, trying to refresh...');
            
            try {
                const refreshSuccess = await AuthService.refreshAccessToken();
                
                if (refreshSuccess) {
                    console.log('✅ Token refreshed, retrying request...');
                    const newToken = await AuthService.getAccessToken();
                    if (newToken) {
                        config.headers = config.headers || {};
                        config.headers.Authorization = `Bearer ${newToken}`;
                        
                        // Retry the request
                        console.log('🔄 Retrying with new token...');
                        return await client(config);
                    }
                }
                
                console.log('❌ Refresh failed, logging out user');
                // ถ้า refresh ไม่ได้
                await AuthService.logout();
                
                // สามารถเพิ่ม navigation redirect ได้ที่นี่
                // NavigationService.navigate('Login');
                
            } catch (refreshError) {
                console.error('❌ Error during token refresh:', refreshError);
                await AuthService.logout();
            }
        }
        
        throw error;
    }
};

// Export wrapper functions แทน client ตรงๆ
export const apiClient = {
    get: (url: string, config?: any) => 
        makeAuthenticatedRequest({ method: 'GET', url, ...config }),
    
    post: (url: string, data?: any, config?: any) => 
        makeAuthenticatedRequest({ method: 'POST', url, data, ...config }),
    
    put: (url: string, data?: any, config?: any) => 
        makeAuthenticatedRequest({ method: 'PUT', url, data, ...config }),
    
    patch: (url: string, data?: any, config?: any) => 
        makeAuthenticatedRequest({ method: 'PATCH', url, data, ...config }),
    
    delete: (url: string, config?: any) => 
        makeAuthenticatedRequest({ method: 'DELETE', url, ...config }),
};

// สำหรับใช้กับ old code ที่ยัง import client ตรงๆ
export default apiClient;