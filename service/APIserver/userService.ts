import client from "../client";
import { Image } from "react-native";
const endpoints = {
    user: {
        getUserDetailById: "/api/users",
        updateUserDetails: "/api/users",
        getUserInvited: "/api/users/invited",
    },
};

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

        const response = await client.patch(
            endpoints.user.updateUserDetails,
            formData, { headers: {"Content-Type": "multipart/form-data",},}
        );
        return response.data;
    } catch (error) {
        console.error("Response data:", error);
        throw error;
    }
};

export const getUserDetailById = async (Userid : string) => {
    try {
        console.log("fetch user by id: ", Userid);
        const response = await client.get(`${endpoints.user.updateUserDetails}/${Userid}`,);
        return response.data;
    } catch (error) {
        console.error("Response data:", error);
        throw error;
    }
};
