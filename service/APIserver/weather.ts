import { Weather } from "@/interface/weather";
import apiClient from "../client";

export const getWeatherByDate = async (
    trip_id: number,
    Date: string
): Promise<Weather[]> => {
    try {
        console.log("Fetching : Weather in trip : ", trip_id, "Date :", Date);
        // const response = await apiClient.get(`/api/weather/${trip_id}/${Date}`) as {data: any[];}
        const response = { data: [{ pit_id: -1, weather_code: 1 }] };
        const DATA = response.data;

        const result: Weather[] = [];

        for (let i = 0; i < DATA.length; i++) {
            const _ = DATA[i];
            result.push({
                id: _.pit_id,
                trip_id: trip_id,
                date: Date,
                weather_code: _.weather_code,
            });
        }
        return result;
    } catch (error) {
        console.error("Response date:", error);
        throw error;
    }
};
