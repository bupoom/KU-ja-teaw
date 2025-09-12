import * as SecureStore from 'expo-secure-store';

export interface UserData {
  idToken: string;
  name?: string;
  email?: string;
  photo?: string;
}

// Keys สำหรับเก็บข้อมูลใน SecureStore
const TOKEN_KEY = 'userToken';
const USER_DATA_KEY = 'userData';

export const AuthService = {
  /**
   * บันทึก token ของ user
   */
  saveToken: async (token: string): Promise<void> => {
    try {
      await SecureStore.setItemAsync(TOKEN_KEY, token);
    } catch (error) {
      console.error('Error saving token:', error);
      throw error; // re-throw เพื่อให้ caller จัดการได้
    }
  },

  /**
   * อ่าน token ของ user
   */
  getToken: async (): Promise<string | null> => {
    try {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      return token;
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  },

  /**
   * บันทึกข้อมูล user
   */
  saveUserData: async (userData: UserData): Promise<void> => {
    try {
      await SecureStore.setItemAsync(USER_DATA_KEY, JSON.stringify(userData));
      await AuthService.saveToken(userData.idToken);
    } catch (error) {
      console.error('Error saving user data:', error);
      throw error;
    }
  },

  /**
   * อ่านข้อมูล user
   */
  getUserData: async (): Promise<UserData | null> => {
    try {
      const userData = await SecureStore.getItemAsync(USER_DATA_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  },

  /**
   * ลบ token และข้อมูล user (สำหรับ logout)
   */
  removeToken: async (): Promise<void> => {
    try {
      await Promise.all([
        SecureStore.deleteItemAsync(TOKEN_KEY),
        SecureStore.deleteItemAsync(USER_DATA_KEY)
      ]);
    } catch (error) {
      console.error('Error removing auth data:', error);
    }
  },

  /**
   * ตรวจสอบว่า user login อยู่หรือไม่
   */
  isLoggedIn: async (): Promise<boolean> => {
    try {
      const token = await AuthService.getToken();
      return !!token;
    } catch (error) {
      console.error('Error checking login status:', error);
      return false;
    }
  },

  /**
   * ตรวจสอบว่า token ยังใช้งานได้หรือไม่ (optional)
   */
  validateToken: async (): Promise<boolean> => {
    try {
      const token = await AuthService.getToken();
      if (!token) return false;
      
      // TODO: เพิ่ม logic ตรวจสอบ token กับ server
      // เช่น ตรวจสอบ expiration date หรือเรียก API verify
      
      return true;
    } catch (error) {
      console.error('Error validating token:', error);
      return false;
    }
  }
};