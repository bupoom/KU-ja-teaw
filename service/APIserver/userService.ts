import client from "../client";

const endpoints = {
  auth: {
    getUserDetailById: "/api/users",
    updateUserDetails: "/api/users",
    getUserInvited: "/api/users/invited",
  }
};

// export const updateUserDetails = async (username: string, phone: string, profile: File) => {
export const updateUserDetails = async (username: string, phone: string, profile: string) => {
    try {

    const formData = new FormData();
    formData.append("name", username);
    formData.append("phone", phone);
    formData.append("profile", profile);

    const response = await client.patch(endpoints.auth.updateUserDetails, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};


export const getUserDetailById = async  (userId:string ) => {
  
}