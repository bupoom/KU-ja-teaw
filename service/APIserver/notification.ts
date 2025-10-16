import { Weather } from "@/interface/weather";
import apiClient from "../client";

export const addNotification = async (
    trip_id: number,
    noti_title: string,
    noti_text: string
): Promise<boolean> => {
    try {
        const now = new Date();
        const noti_date = now.toISOString().split("T")[0];
        const noti_time = now.toTimeString().split(" ")[0];
        console.log(noti_date, noti_time);
        const res = (await apiClient.post(
            `/api/trips/${trip_id}/notifications`,
            {
                noti_title: noti_title,
                noti_text: noti_text,
                noti_date: noti_date,
                noti_time: noti_time,
            }
        )) as { data: { message: string } };
        return res.data.message === "Notification added";
    } catch (error) {
        console.error("Response date:", error);
        return false;
    }
};

export const getNotiNumber = async (trip_id: number): Promise<number> => {
    try {
        const res = (await apiClient.get(
            `/api/trips/notifications/${trip_id}/peruser`
        )) as { data: { unseen: number } };
        return res.data.unseen;
    } catch (error) {
        console.error("Response date:", error);
        throw error;
    }
};

export const getNotification = async (
    trip_id: number,
    user_id: string
): Promise<NotificationBox[]> => {
    try {
        const res = (await apiClient.get(
            `/api/trips/notifications/${trip_id}`
        )) as { data: { count: number; noti: any[] } };
        const notiData = res.data.noti;
        const result: NotificationBox[] = [];
        for (let i = 0; i < notiData.length; i++) {
            const each = notiData[i];
            result.push({
                noti_id: i + 1,
                noti_title: each.noti_title,
                noti_text: each.noti_text,
                noti_date: each.noti_date.split("T")[0],
                noti_time: each.noti_time,
            });
        }
        console.log(result)
        return result;
    } catch (error) {
        console.error("Response date:", error);
        throw error;
    }
};
