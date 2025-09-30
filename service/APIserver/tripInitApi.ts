import apiClient from "../client";
import { Image } from "react-native";

export const endpoints = {
    trips: {
        CreateNewTrips: "/api/trips",
    },
};

export const createNewTrips = async (data: {
    trips_name: string;
    start_date: string;
    end_date: string;
    trip_code: string;
    trip_password: string;
    uri?: string
}) => {
    try {
        const formData = new FormData();
        
        formData.append('trip_name', data.trips_name);
        formData.append('start_date', data.start_date);
        formData.append('end_date', data.end_date);
        formData.append('trip_code', data.trip_code);
        formData.append('trip_pass', data.trip_password);

        console.log("here : ",data.uri)
        if (data.uri) {
            formData.append('file', {
                uri: data.uri,
                type: 'image/jpeg',
                name: `trips_poster_${Date.now()}.jpg`,
            } as any);
        } else {
            const defaultPosterImg = Image.resolveAssetSource(
                require("../../assets/images/defaultPosterImg.jpg")
            );
            formData.append('file', {
                uri: defaultPosterImg.uri,
                type: 'image/jpeg',
                name: `trips_poster_${Date.now()}.jpg`,
            } as any);    
        }

        const response = await apiClient.post(
            endpoints.trips.CreateNewTrips,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );

        console.log("create trips response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Response error:", error);
        throw error;
    }
};