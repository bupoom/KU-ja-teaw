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
            console.log("... Starting API login  at SERVER");
            const URL = "http://10.0.2.2:3000/api/users/login";
            // const response = await fetch(URL, {
            //     method: "POST",
            //     headers: {
            //         accept: "application/json",
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify({
            //         idToken: googleIdToken,
            //     }),
            // });
            // console.log("📊 Response status:", response.status);
            // if (!response.ok) {
            //     throw new Error("Login failed");
            // }

            // const data = await response.json();
            const mockResponse = {
                status: 201, // 200 : user ใหม่ 201 user เก่า
                json: () => {},
                body: {
                    name: "OSHI",
                    phone: "OSHI_PHONE",
                    email: "OSHI@gmail.com",
                    user_id: "OSHI",
                    profile_picture_link:
                        "https://ih1.redbubble.net/image.5300710362.9150/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg",
                    token: {
						Access_token:
                        "eyJhbGciOiJSUzI1NiIsImtpZCI6IjA3ZjA3OGYyNjQ3ZThjZDAxOWM0MGRhOTU2OWU0ZjUyNDc5OTEwOTQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIxMzUxMjY1MDM1ODUtbDJmMm9sYmRncnU4amhyb2tsdjV1ZTZmcm05NWs4dmcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIxMzUxMjY1MDM1ODUtNmp0Z2NyNTd0dDdib3FrMzZjNHUwYzBiZTI0b2NvbGYuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDYxMjE4OTk2OTgzMDgwNzUyNzQiLCJlbWFpbCI6ImJ1cG9vbTIwMDVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiLguLRibHVlIGJ1cG9vbSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NMSVIzZWg1RG5EYURCZG8wMzlfZ0RiZVJIYW9uNXJ6LTRlS2U2NThvcDc2c0ktY0ZZPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IuC4tGJsdWUiLCJmYW1pbHlfbmFtZSI6ImJ1cG9vbSIsImlhdCI6MTc1ODEyMDIyNCwiZXhwIjoxNzU4MTIzODI0fQ.RqvSYHwbr8bt2EXGX-D9DrLXr73Quo0mp3-4zgxIBz-x6hvBWuN-Zo0OjGqY1HsANN-3XgBlEOgntVox807vGk3VOyGo9Tr5N6sohB-VPQq7wVPaY08B5mnQJnQGUIXEcb_Y0AtpZ2_lMcW2C6mC7VTSUSwfsqGyk5b7ORG4hHuQHrgxaUqCXulFBAYer2jGUE1Xugq7-tznvRo3EArezd0zCneDK5lKRTr62NrdyaC27F3mBRhwKjZTXSahhld3gpIyqaxtNKJ6gPs8KbnTdXJoxsQ8U6QU9k4jMg0r5V2rxv3vEVirUwDSlFHLe9D2aK7a3ukllf3Tre2TfDIF2A",
						Refresh_token:
                        "eyJhbGciOiJSUzI1NiIsImtpZCI6IjA3ZjA3OGYyNjQ3ZThjZDAxOWM0MGRhOTU2OWU0ZjUyNDc5OTEwOTQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIxMzUxMjY1MDM1ODUtbDJmMm9sYmRncnU4amhyb2tsdjV1ZTZmcm05NWs4dmcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIxMzUxMjY1MDM1ODUtNmp0Z2NyNTd0dDdib3FrMzZjNHUwYzBiZTI0b2NvbGYuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDYxMjE4OTk2OTgzMDgwNzUyNzQiLCJlbWFpbCI6ImJ1cG9vbTIwMDVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiLguLRibHVlIGJ1cG9vbSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NMSVIzZWg1RG5EYURCZG8wMzlfZ0RiZVJIYW9uNXJ6LTRlS2U2NThvcDc2c0ktY0ZZPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IuC4tGJsdWUiLCJmYW1pbHlfbmFtZSI6ImJ1cG9vbSIsImlhdCI6MTc1ODEyMDIyNCwiZXhwIjoxNzU4MTIzODI0fQ.RqvSYHwbr8bt2EXGX-D9DrLXr73Quo0mp3-4zgxIBz-x6hvBWuN-Zo0OjGqY1HsANN-3XgBlEOgntVox807vGk3VOyGo9Tr5N6sohB-VPQq7wVPaY08B5mnQJnQGUIXEcb_Y0AtpZ2_lMcW2C6mC7VTSUSwfsqGyk5b7ORG4hHuQHrgxaUqCXulFBAYer2jGUE1Xugq7-tznvRo3EArezd0zCneDK5lKRTr62NrdyaC27F3mBRhwKjZTXSahhld3gpIyqaxtNKJ6gPs8KbnTdXJoxsQ8U6QU9k4jMg0r5V2rxv3vEVirUwDSlFHLe9D2aK7a3ukllf3Tre2TfDIF2A",
					}
                },
                ok: true,
            };
			const mockData = await mockResponse.body;
            console.log("📄 Response data:", mockData);

            let newUser = false;
            switch (mockResponse.status) {
                case 200:
                    newUser = false;
                    break;
                case 201:
                    newUser = true;
                    break;
                default:
                    console.log("Unexpected status:", mockResponse.status);
            }

            const DaysBeforeExpries = 5;
            // บันทึก tokens
            await AuthService.saveTokens({
                accessToken: mockData.token.Access_token,
                refreshToken: mockData.token.Refresh_token,
                expiresAt:
                    Date.now() + DaysBeforeExpries * (24 * 60 * 60 * 1000),
            });

            // บันทึกข้อมูล user
            const userData: UserDetails = {
                user_id: mockData.user_id,
                name: mockData.name,
                phone: mockData.phone,
                profile_picture_link: mockData.profile_picture_link,
                email: mockData.email,
            };
            await AuthService.saveUserData(userData);

            return { success: true, user: userData, newUser: newUser };
        } catch (error) {
            console.error("❌ Login error:", error);
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
