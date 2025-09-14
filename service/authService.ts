import { statusCodes } from '@react-native-google-signin/google-signin';
import * as SecureStore from 'expo-secure-store';

export interface TokenData {
  accessToken: string;
  refreshToken: string;
  expiresAt?: number; // timestamp เมื่อ access token หมดอายุ
}

// ------------------ อธิบาย function ทั้งหมด ----------------------------------
// saveTokens() → เก็บ access_token , refresh_token
// getAccessToken() → อ่าน access token ซึ่งเรียกใช้จาก getValidAccessToken เท่านั้นนะไอโอชิ หรือกรที่เข้ามาอ่าน
// getRefreshToken() → อ่าน refresh token
// isAccessTokenExpired() → เช็คหมดอายุหรือยังตาม exp date
// getValidAccessToken() → ขอ token ที่ใช้ได้ (auto-refresh)
// refreshAccessToken() → ขอ token ใหม่
// isLoggedIn() → เช็ค login status
// login() → เข้าสู่ระบบ
// logout() → ออกจากระบบ


// Keys สำหรับเก็บข้อมูลใน SecureStore
const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const USER_DATA_KEY = 'userData';
const TOKEN_EXPIRES_KEY = 'tokenExpires';

const BASE_URL = "http://192.168.1.104:3000"

export const AuthService = {
  /**
   * บันทึก tokens
   */
  saveTokens: async (tokenData: TokenData): Promise<void> => {
    try {
      await Promise.all([
        SecureStore.setItemAsync(ACCESS_TOKEN_KEY, tokenData.accessToken),
        SecureStore.setItemAsync(REFRESH_TOKEN_KEY, tokenData.refreshToken),
        tokenData.expiresAt 
          ? SecureStore.setItemAsync(TOKEN_EXPIRES_KEY, tokenData.expiresAt.toString())
          : Promise.resolve()
      ]);
    } catch (error) {
      console.error('Error saving tokens:', error);
      throw error;
    }
  },

  /**
   * อ่าน Access Token
   */
  getAccessToken: async (): Promise<string | null> => {
    try {
      const token = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
      return token;
    } catch (error) {
      console.error('Error getting access token:', error);
      return null;
    }
  },

  /**
   * อ่าน Refresh Token
   */
  getRefreshToken: async (): Promise<string | null> => {
    try {
      const token = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
      return token;
    } catch (error) {
      console.error('Error getting refresh token:', error);
      return null;
    }
  },

  /**
   * ตรวจสอบว่า Access Token หมดอายุหรือยัง
   */
  isAccessTokenExpired: async (): Promise<boolean> => {
    try {
      const expiresAtStr = await SecureStore.getItemAsync(TOKEN_EXPIRES_KEY);
      if (!expiresAtStr) return true;
      
      const expiresAt = parseInt(expiresAtStr);
      const now = Date.now();
      
      // เผื่อเวลา 5 นาที ก่อนหมดอายุจริง
      return (expiresAt - 5 * 60 * 1000) <= now;
    } catch (error) {
      console.error('Error checking token expiration:', error);
      return true;
    }
  },

 
  getValidAccessToken: async (): Promise<string | null> => {
    try {
      const isExpired = await AuthService.isAccessTokenExpired();
      
      if (isExpired) {
        // พยายาม refresh token
        const refreshed = await AuthService.refreshAccessToken();
        if (!refreshed) {
          return null;
        }
      }
      
      return await AuthService.getAccessToken();
    } catch (error) {
      console.error('Error getting valid access token:', error);
      return null;
    }
  },

  /**
   * Refresh Access Token ด้วย Refresh Token
   */
  refreshAccessToken: async (): Promise<boolean> => {
    try {
      const refreshToken = await AuthService.getRefreshToken();
      if (!refreshToken) {
        console.log('No refresh token available');
        return false;
      }

      // เรียก API เพื่อ refresh token
      // TODO: แทนที่ด้วย API endpoint จริง
      const response = await fetch('https://your-api-domain.com/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${refreshToken}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to refresh token');
      }

      const data = await response.json();
      
      // บันทึก token ใหม่
      await AuthService.saveTokens({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken || refreshToken, // บาง API ให้ refresh token ใหม่ด้วย
        expiresAt: data.expiresAt || (Date.now() + (30 * 60 * 1000)) // default 30 นาที
      });

      return true;
    } catch (error) {
      console.error('Error refreshing access token:', error);
      // ถ้า refresh ไม่ได้ อาจต้อง logout
      await AuthService.clearAuthData();
      return false;
    }
  },

  /**
   * บันทึกข้อมูล user
   */
  saveUserData: async (userData: UserDetails): Promise<void> => {
    try {
      await SecureStore.setItemAsync(USER_DATA_KEY, JSON.stringify(userData));
    } catch (error) {
      console.error('Error saving user data:', error);
      throw error;
    }
  },

  /**
   * อ่านข้อมูล user
   */
  getUserData: async (): Promise<UserDetails | null> => {
    try {
      const userData = await SecureStore.getItemAsync(USER_DATA_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  },

  /**
   * ลบข้อมูล authentication ทั้งหมด
   */
  clearAuthData: async (): Promise<void> => {
    try {
      await Promise.all([
        SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY),
        SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY),
        SecureStore.deleteItemAsync(USER_DATA_KEY),
        SecureStore.deleteItemAsync(TOKEN_EXPIRES_KEY)
      ]);
    } catch (error) {
      console.error('Error clearing auth data:', error);
    }
  },

  /**
   * ตรวจสอบว่า user login อยู่หรือไม่
   */
  isLoggedIn: async (): Promise<boolean> => {
    try {
      const accessToken = await AuthService.getAccessToken();
      const refreshToken = await AuthService.getRefreshToken();
      
      // ถ้ามี refresh token ถือว่ายัง login อยู่
      // ถึงแม้ access token จะหมดอายุแล้วก็ตาม
      return !!(accessToken && refreshToken);
    } catch (error) {
      console.error('Error checking login status:', error);
      return false;
    }
  },

  /**
   * Login และบันทึก tokens
   */
  login: async (googleIdToken: string): Promise<{ success: boolean; user?: UserDetails , newUser? : boolean }> => {
    try {
      console.log('🔄 Starting API login with Google token...');
      // TODO: เรียก login API
      const response = await fetch(`${BASE_URL}/api/users/login`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.ACCESS_TOKEN_ID}`
        },
        body: JSON.stringify({ 
          token_id: googleIdToken
        })
      });
      console.log('📡 Response status:', response.status);
      
      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      let newUser = false
      switch (response.status) {
        case 200:
          newUser = false
          break;
        case 201:
          newUser = true
          break;
        default:
          console.log('Unexpected status:', response.status);
      }
      // บันทึก tokens
      await AuthService.saveTokens({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        expiresAt: data.expiresAt
      });

      // บันทึกข้อมูล user
      const userData: UserDetails = {
        id: data.user_id,
        name: data.name,
        phone: data.phone,
        user_image: data.profile_picture_url,
        email: data.email,
      };
      await AuthService.saveUserData(userData);

      return { success: true, user: userData , newUser : newUser };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false };
    }
  },

  /**
   * Logout
   */
  logout: async (): Promise<void> => {
    try {
      const refreshToken = await AuthService.getRefreshToken();
      
      // if (refreshToken) {
      //   await fetch('https://api.example.com/auth/logout', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //       'Authorization': `Bearer ${refreshToken}`
      //     }
      //   });
      // }
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      // ลบข้อมูลทั้งหมดในเครื่อง
      await AuthService.clearAuthData();
    }
  }
};