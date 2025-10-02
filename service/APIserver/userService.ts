import  apiClient  from "../client";
import { Image } from "react-native";
import { endpoints } from "../config";

export const updateUserDetails = async (data: {
    selectedImageFile?: {
        uri: string;
        type: string;
        name: string;
    };
    username: string;
    phoneNumber?: string;
}) => {
    try {
        console.log("🔍 API received data:", data);
        const formData = new FormData();
        formData.append("name", data.username);
        if (data.phoneNumber) {
            formData.append("phone", data.phoneNumber);
        }
        if (!data.selectedImageFile) {
            const defaultUserIcon = Image.resolveAssetSource(
                require("../../assets/images/user_icon.png")
            );
            data.selectedImageFile = {
                uri: defaultUserIcon.uri,
                type: "image/png",
                name: "user_icon.png",
            };
        }

        console.log("📸 Final Image:", data.selectedImageFile);
        formData.append("image", {
            uri: data.selectedImageFile.uri,
            name: data.selectedImageFile.name,
            type: data.selectedImageFile.type,
        } as any);

        const response = await apiClient.patch(
            endpoints.user.updateUserDetails,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
        );
        return response.data;
    } catch (error) {
        console.error("Response data:", error);
        throw error;
    }
}; 

export const getUserDetailById = async (userId?: string) => {
    try {
        let response: UserDetails;
        if (!userId) {
            console.log("fetch owner user details");
            response = (await apiClient.get(`${endpoints.user.getUserDetail}`)).data as UserDetails;
        } else {
            console.log("fetch user by id:", userId);
            response = (await apiClient.get(`${endpoints.user.getUserDetail}/${userId}`)).data as UserDetails;
        }
        return response;
    } catch (error) {
        console.error("Get user details error:", error);
        throw error;
    }
};

export const get_more_detail = async (trip_id: number): Promise<MoreUserDetail> => {
    try {
        console.log("fetching user more detail");
        const response = (await apiClient.get(`${endpoints.user.getmoredetail}/${trip_id}`)) as {
            data: any;
        };

        console.log(response.data);
        const detail : MoreUserDetail = {
            user_id: response.data.user_id,
            username: response.data.username,
            role: response.data.role,
            user_image: response.data.user_image
        }
        return detail;
    } catch (error) {
        console.error("Response data:", error);
        throw error;
    }
};