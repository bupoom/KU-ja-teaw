import apiClient from "../client";

export const get_all_file = async (trip_id:number): Promise<FileGroup[]> => {
    try {
        console.log("Fetching all files in trip");
        const response = (await apiClient.get(`/api/trips/${trip_id}/documents`)) as {
            data: { files: any[]};
        };
        const data = response.data.files;
        const file_list: FileGroup[] = [];
        for (let i = 0; i < data.length; i++){
            const serverData = data[i];
            file_list.push({
                id: serverData.doc_id,
                file_name: serverData.doc_name,
                file_url: "mock",
                uploaded_date: serverData.modified,
                uploaded_by: serverData.uploaded_by,
                file_size_mb: (serverData.doc_size) / 1000000,
                file_type: serverData.mimetype,
                trip_id: trip_id,
            });
        }
        return file_list;
    } catch (error) {
        console.error("Fetch file error:", error);
        throw error;
    }
};

export const delete_file = async (trip_id:number, doc_id:number): Promise<void> => {
    try {
        console.log("Deleting file in trip");
        const response = (await apiClient.delete(`/api/trips/${trip_id}/documents/${doc_id}`))
    } catch (error) {
        console.error("Fetch file error:", error);
        throw error;
    }
};

export const get_download_link = async (trip_id:number, doc_id:number): Promise<string> => {
    try {
        console.log("Get file link");
        const response = (await apiClient.get(`/api/trips/${trip_id}/documents/${doc_id}`)) as {
            data : any
        }
        return response.data.signedUrl;
        
    } catch (error) {
        console.error("Fetch file error:", error);
        throw error;
    }
};

export const upload_file = async (
    selectedImageFile: { uri: string; mimeType: string; name: string;}, trip_id:number
) => {
    try {
        const formData = new FormData();
        formData.append("file", {
            uri: selectedImageFile.uri,
            name: selectedImageFile.name,
            type: selectedImageFile.mimeType,
        } as any);

        const response = await apiClient.post(
            `/api/trips/${trip_id}/documents`,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
        );
        return response.data;
        
    } catch (error) {
        console.error("Upload file error:", error);
        throw error;
    }
};