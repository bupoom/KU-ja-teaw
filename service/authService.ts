import * as SecureStore from "expo-secure-store";

// interface Token
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
const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_DATA_KEY = "userData";
const TOKEN_EXPIRES_KEY = "tokenExpires";

// ******************************
const NO_SERVER_WHILE_DEV = true;
// ******************************

export const AuthService = {
    saveTokens: async (tokenData: TokenData): Promise<void> => {
        try {
            await Promise.all([
                SecureStore.setItemAsync(
                    ACCESS_TOKEN_KEY,
                    tokenData.accessToken
                ),
                SecureStore.setItemAsync(
                    REFRESH_TOKEN_KEY,
                    tokenData.refreshToken
                ),
                tokenData.expiresAt
                    ? SecureStore.setItemAsync(
                          TOKEN_EXPIRES_KEY,
                          tokenData.expiresAt.toString()
                      )
                    : Promise.resolve(),
            ]);
        } catch (error) {
            console.error("Error saving tokens:", error);
            throw error;
        }
    },
    getAccessToken: async (): Promise<string | null> => {
        try {
            const token = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
            return token;
        } catch (error) {
            console.error("Error getting access token:", error);
            return null;
        }
    },
    getRefreshToken: async (): Promise<string | null> => {
        try {
            const token = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
            return token;
        } catch (error) {
            console.error("Error getting refresh token:", error);
            return null;
        }
    },
    isAccessTokenExpired: async (): Promise<boolean> => {
        try {
            const expiresAtStr =
                await SecureStore.getItemAsync(TOKEN_EXPIRES_KEY);
            if (!expiresAtStr) return true;

            const expiresAt = parseInt(expiresAtStr);
            const now = Date.now();

            // เผื่อเวลา 5 นาที ก่อนหมดอายุจริง
            return expiresAt - 5 * 60 * 1000 <= now;
        } catch (error) {
            console.error("Error checking token expiration:", error);
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
            console.error("Error getting valid access token:", error);
            return null;
        }
    },
    refreshAccessToken: async (): Promise<boolean> => {
        try {
            const refreshToken = await AuthService.getRefreshToken();
            if (!refreshToken) {
                console.log("No refresh token available");
                return false;
            }

            // เรียก API เพื่อ refresh token
            // TODO: แทนที่ด้วย API endpoint จริง
            const response = await fetch(
                "https://10.0.2.2/api/users/refresh-token",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${refreshToken}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to refresh token");
            }

            const data = await response.json();

            // บันทึก token ใหม่
            await AuthService.saveTokens({
                accessToken: data.accessToken,
                refreshToken: data.refreshToken || refreshToken, // บาง API ให้ refresh token ใหม่ด้วย
                expiresAt: data.expiresAt || Date.now() + 30 * 60 * 1000, // default 30 นาที
            });

            return true;
        } catch (error) {
            console.error("Error refreshing access token:", error);
            // ถ้า refresh ไม่ได้ อาจต้อง logout
            await AuthService.clearAuthData();
            return false;
        }
    },
    saveUserData: async (userData: UserDetails): Promise<void> => {
        try {
            await SecureStore.setItemAsync(
                USER_DATA_KEY,
                JSON.stringify(userData)
            );
        } catch (error) {
            console.error("Error saving user data:", error);
            throw error;
        }
    },
    getUserData: async (): Promise<UserDetails | null> => {
        try {
            const userData = await SecureStore.getItemAsync(USER_DATA_KEY);
            return userData ? JSON.parse(userData) : null;
        } catch (error) {
            console.error("Error getting user data:", error);
            return null;
        }
    },
    clearAuthData: async (): Promise<void> => {
        try {
            await Promise.all([
                SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY),
                SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY),
                SecureStore.deleteItemAsync(USER_DATA_KEY),
                SecureStore.deleteItemAsync(TOKEN_EXPIRES_KEY),
            ]);
        } catch (error) {
            console.error("Error clearing auth data:", error);
        }
    },
    isLoggedIn: async (): Promise<boolean> => {
        try {
            const accessToken = await AuthService.getAccessToken();
            const refreshToken = await AuthService.getRefreshToken();

            // ถ้ามี refresh token ถือว่ายัง login อยู่
            // ถึงแม้ access token จะหมดอายุแล้วก็ตาม
            return !!(accessToken && refreshToken);
        } catch (error) {
            console.error("Error checking login status:", error);
            return false;
        }
    },
    login: async (
        googleIdToken: string
    ): Promise<{ success: boolean; user?: UserDetails; newUser?: boolean }> => {
        try {
            console.log("🔄 Starting API login at SERVER");
            const URL = "http://10.0.2.2:3000/api/users/login";

            let data: any;
            let newUser = false;

            if (NO_SERVER_WHILE_DEV) {
                // Mock response
                data = {
                    name: "OSHI",
                    phone: "OSHI_PHONE",
                    email: "OSHI@gmail.com",
                    user_id: "OSHI",
                    profile_picture_link:
                        "https://ih1.redbubble.net/image.5300710362.9150/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg",
                    Access_token: "mock_access_token_here",
                    Refresh_token: "mock_refresh_token_here",
                };
                newUser = true;
                console.log("📄 Using mock data for development");
            } else {
                // Real API call
                const response = await fetch(URL, {
                    method: "POST",
                    headers: {
                        accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        idToken: googleIdToken,
                    }),
                });

                console.log("📊 Response status:", response.status);

                if (!response.ok) {
                    throw new Error(`Login failed: ${response.statusText}`);
                }

                data = await response.json();
                console.log("📄 Response data received" , data);

                newUser = response.status === 201;
            }

            const DaysBeforeExpires = 5;

            // ✅ Save tokens - ใช้โครงสร้างเดียวกัน
            await AuthService.saveTokens({
                accessToken: data.Access_token,
                refreshToken: data.Refresh_token,
                expiresAt:
                    Date.now() + DaysBeforeExpires * (24 * 60 * 60 * 1000),
            });

            // Save user data
            const userData: UserDetails = {
                user_id: data.user_id,
                name: data.name,
                phone: data.phone,
                profile_picture_link: data.profile_picture_link,
                email: data.email,
            };

            await AuthService.saveUserData(userData);

            return { success: true, user: userData, newUser: newUser };
        } catch (error) {
            console.error("Login error:", error);
            return { success: false };
        }
    },
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
            console.error("Logout API error:", error);
        } finally {
            // ลบข้อมูลทั้งหมดในเครื่อง
            await AuthService.clearAuthData();
        }
    },
};
