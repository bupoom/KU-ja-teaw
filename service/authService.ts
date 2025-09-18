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
      // แตก รอก่อน
      // const BASE_URL = "http://10.0.2.2:3000";

      // const response = await fetch(`${BASE_URL}/api/users/login`, {
      //   method: 'POST',
      //   headers: { 
      //     'accept': 'application/json',
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${process.env.ACCESS_TOKEN_ID}`
      //   },
      //   body: JSON.stringify({ 
      //     idToken: googleIdToken
      //   })
      // });
      const response = {
        status: 201,
        json: () => {},
        body : {
          name: "OSHI",
          phone: "OSHI_PHONE",
          email: "OSHI@gmail.com",
          user_id: "OSHI",
          profile_picture_link : "https://kfvtpdwnpkkrcsjnopax.supabase.co/storage/v1/object/sign/profiles/OSHI-oshi_profile.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jNzc5MThkMC01MzZmLTRkNmItYjYwZS0zYmEyMTJjYzRhMmIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9maWxlcy9PU0hJLW9zaGlfcHJvZmlsZS5qcGciLCJpYXQiOjE3NTgxMjI2NzMsImV4cCI6MTc1ODEyNjI3M30.Q2zIakavM376N93li6wy755IlcZDo5kEb9fqsjPbh0I",
          accessToken : "eyJhbGciOiJSUzI1NiIsImtpZCI6IjA3ZjA3OGYyNjQ3ZThjZDAxOWM0MGRhOTU2OWU0ZjUyNDc5OTEwOTQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIxMzUxMjY1MDM1ODUtbDJmMm9sYmRncnU4amhyb2tsdjV1ZTZmcm05NWs4dmcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIxMzUxMjY1MDM1ODUtNmp0Z2NyNTd0dDdib3FrMzZjNHUwYzBiZTI0b2NvbGYuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDYxMjE4OTk2OTgzMDgwNzUyNzQiLCJlbWFpbCI6ImJ1cG9vbTIwMDVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiLguLRibHVlIGJ1cG9vbSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NMSVIzZWg1RG5EYURCZG8wMzlfZ0RiZVJIYW9uNXJ6LTRlS2U2NThvcDc2c0ktY0ZZPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IuC4tGJsdWUiLCJmYW1pbHlfbmFtZSI6ImJ1cG9vbSIsImlhdCI6MTc1ODEyMDIyNCwiZXhwIjoxNzU4MTIzODI0fQ.RqvSYHwbr8bt2EXGX-D9DrLXr73Quo0mp3-4zgxIBz-x6hvBWuN-Zo0OjGqY1HsANN-3XgBlEOgntVox807vGk3VOyGo9Tr5N6sohB-VPQq7wVPaY08B5mnQJnQGUIXEcb_Y0AtpZ2_lMcW2C6mC7VTSUSwfsqGyk5b7ORG4hHuQHrgxaUqCXulFBAYer2jGUE1Xugq7-tznvRo3EArezd0zCneDK5lKRTr62NrdyaC27F3mBRhwKjZTXSahhld3gpIyqaxtNKJ6gPs8KbnTdXJoxsQ8U6QU9k4jMg0r5V2rxv3vEVirUwDSlFHLe9D2aK7a3ukllf3Tre2TfDIF2A",
          refreshToken : "eyJhbGciOiJSUzI1NiIsImtpZCI6IjA3ZjA3OGYyNjQ3ZThjZDAxOWM0MGRhOTU2OWU0ZjUyNDc5OTEwOTQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIxMzUxMjY1MDM1ODUtbDJmMm9sYmRncnU4amhyb2tsdjV1ZTZmcm05NWs4dmcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIxMzUxMjY1MDM1ODUtNmp0Z2NyNTd0dDdib3FrMzZjNHUwYzBiZTI0b2NvbGYuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDYxMjE4OTk2OTgzMDgwNzUyNzQiLCJlbWFpbCI6ImJ1cG9vbTIwMDVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiLguLRibHVlIGJ1cG9vbSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NMSVIzZWg1RG5EYURCZG8wMzlfZ0RiZVJIYW9uNXJ6LTRlS2U2NThvcDc2c0ktY0ZZPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IuC4tGJsdWUiLCJmYW1pbHlfbmFtZSI6ImJ1cG9vbSIsImlhdCI6MTc1ODEyMDIyNCwiZXhwIjoxNzU4MTIzODI0fQ.RqvSYHwbr8bt2EXGX-D9DrLXr73Quo0mp3-4zgxIBz-x6hvBWuN-Zo0OjGqY1HsANN-3XgBlEOgntVox807vGk3VOyGo9Tr5N6sohB-VPQq7wVPaY08B5mnQJnQGUIXEcb_Y0AtpZ2_lMcW2C6mC7VTSUSwfsqGyk5b7ORG4hHuQHrgxaUqCXulFBAYer2jGUE1Xugq7-tznvRo3EArezd0zCneDK5lKRTr62NrdyaC27F3mBRhwKjZTXSahhld3gpIyqaxtNKJ6gPs8KbnTdXJoxsQ8U6QU9k4jMg0r5V2rxv3vEVirUwDSlFHLe9D2aK7a3ukllf3Tre2TfDIF2A"
        },
        ok: true
        
      }
      console.log(' Response status:', response.status);
      console.log(' data:', response.body);
      
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
        accessToken:  response.body.accessToken,
        refreshToken: response.body.refreshToken,
        expiresAt: Date.now() + 5 * 60 * 1000 
      });

      // บันทึกข้อมูล user
      const userData: UserDetails = {
        id:         response.body.user_id,
        name:       response.body.name,
        phone:      response.body.phone,
        user_image: response.body.profile_picture_link,
        email:      response.body.email,
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