import client, { endpoints } from "./client";


export interface UserData {
  user_id: string;
  name: string;
  phone: string;
  email: string;
  profile_picture_url: string;
  access_token: string;
  refresh_token: string;
}

export async function loginWithGoogleToken(idToken: string): Promise<UserData> {
  try {
    const res = await client.post<UserData>(endpoints.user.login, { idToken });
    return res.data;
  } catch (err: any) {
    console.log("Alert ,there is error ," , err)
    if (err.response) {
      throw new Error(err.response.data.message || "Login failed");
    } else if (err.request) {
      throw new Error("Server not reachable");
    } else {
      throw new Error(err.message);
    }
  }
}
