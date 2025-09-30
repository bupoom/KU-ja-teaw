import { statusCodes } from "@react-native-google-signin/google-signin";
import apiClient from "../client";

export const joinTrip = async (trip_id: number) => {
    try {
        const res = await apiClient.patch(
            `/api/trips/${trip_id}/invite/accept`
        );
        return res.data;
    } catch (error) {
        console.error("Response data:", error);
        throw error;
    }
};

// Reject Trip
export const rejectTrip = async (trip_id: number) => {
    try {
        const res = await apiClient.delete(
            `/api/trips/${trip_id}/invite/reject`
        );
        return res.data;
    } catch (error) {
        console.error("Response date:", error);
        throw error;
    }
};

export const enterTrip = async (
    trip_code: string,
    trip_pass: string
): Promise<boolean> => {
    try {
        const res = await apiClient.post(
            `/api/trips/invite/self`, 
            {
                trip_code: trip_code,
                trip_pass: trip_pass,
            }
        ) as {
            data : {
                message : string
            }
        };
        return res.data.message === "join successfully";
    } catch (error) {
        console.error("Response error:", error);
        throw error;
    }
};