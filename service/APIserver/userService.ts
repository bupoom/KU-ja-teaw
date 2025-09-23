import client from "../client";

const endpoints = {
  user: {
    getUserDetailById: "/api/users",
    updateUserDetails: "/api/users",
    getUserInvited: "/api/users/invited",
  },
};

// =======================
// PATCH: อัปเดต user details
// =======================
export const updateUserDetails = async (data: {
  selectedImageFile?: string; // local uri ของรูป
  username: string;
  phoneNumber?: string;
}) => {
  try {
    const formData = new FormData();

    // ถ้ามีรูป ให้ append
    if (data.selectedImageFile) {
      formData.append("image", {
        uri: data.selectedImageFile,
        name: "photo.png",
        type: "image/png",
      } as any);
    }

    formData.append("name", data.username);
    if (data.phoneNumber) formData.append("phone", data.phoneNumber);

    const response = await client.patch(
      endpoints.user.updateUserDetails,
      formData);

    return response.data;
  } catch (error) {
    console.error("Update user error:", error);
    throw error;
  }
};

// =======================
// GET: ดึง user details
// =======================
export const getUserDetails = async (): Promise<any> => {
  try {
    const response = await client.get(endpoints.user.getUserDetailById);
    return response.data;
  } catch (error) {
    console.error("Error getting user details:", error);
    throw error;
  }
};
