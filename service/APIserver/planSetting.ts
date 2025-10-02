import  apiClient  from "../client";

export const endpoints = {
    useMember: {
        getUserDetail: "/api/users",
    },
}

// user details กับ user details by id คือ function เดียวกัน

export const updateUserDetails = async (): Promise<{}> => {
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
