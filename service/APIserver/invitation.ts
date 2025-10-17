import { AuthService } from "../authService";
import apiClient from "../client";
import { create_note } from "./Note";
import { addNotification } from "./notification";

export const joinTrip = async (trip_id: number) => {
    try {
        const res = await apiClient.patch(
            `/api/trips/${trip_id}/invite/accept`
        );
        const UserData = await AuthService.getUserData();
        await create_note(
            trip_id,
            `Welcome to our Trip. You can insert Note here!!`
        );
        await addNotification(
            trip_id,
            `Say Hi to ${UserData?.name}`,
            `${UserData?.name} just joined Our trip!!`
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
        const UserData = await AuthService.getUserData();
        await addNotification(
            trip_id,
            `${UserData?.name} rejected`,
            `${UserData?.name} just rejected to Our trip.`
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
): Promise<string> => {
    try {
        const res = (await apiClient.post(`/api/trips/invite/self`, {
            trip_code: trip_code,
            trip_pass: trip_pass,
        })) as {
            data: {
                message: string;
                trip_id: number;
            };
        };
        if (res.data.message === "join successfully") {
            await create_note(
                res.data.trip_id,
                `Welcome to our Trip. You can insert Note here!!`
            );

            const UserData = await AuthService.getUserData();
            await addNotification(
                res.data.trip_id,
                `Say Hi to ${UserData?.name}`,
                `${UserData?.name} just joined Our trip!!`
            );
            return res.data.trip_id.toString();
        } else {
            return "errorCode";
        }
    } catch (error) {
        console.error("Response error:", error);
        throw error;
    }
};
