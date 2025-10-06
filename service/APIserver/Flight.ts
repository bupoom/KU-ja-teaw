import apiClient from "../client";
import { combineDateTime } from "@/util/combineDateTime";

export const get_flight_detail = async (trip_id: number): Promise<Flight[]> => {
    try {
        console.log("fetching flight detail");
        const response = (await apiClient.get(`/api/trips/${trip_id}/flights`)) as {
            data: { flights: any[]};
        };

        console.log(response.data.flights);
        const data = response.data.flights;
        const flight_list: Flight[] = [];
        for (let i = 0; i < data.length; i++){
            const serverData = data[i];

            const departure_date = combineDateTime(serverData.depart_date, serverData.depart_time);
            const arrival_date = combineDateTime(serverData.arrive_date, serverData.arrive_time);

            flight_list.push({
                id: serverData.flight_id,
                departure_airport: serverData.dep_airport_code,
                arrival_airport: serverData.arr_airport_code,
                departure_date,
                arrival_date,
                airline: serverData.airline,
                departure_country: serverData.dep_country,
                arrival_country: serverData.arr_country,
                trip_id: trip_id,
            });
        }
        console.log("Flight list : ", flight_list);
        return flight_list;
    } catch (error) {
        console.error("Response data:", error);
        throw error;
    }
};

export const add_flight = async (trip_id: number, flight: Flight): Promise<void> => {
    try {
        console.log("Adding flight ...");
        const response = (await apiClient.post(`/api/trips/${trip_id}/flights`,
            flight
        ))
    } catch (error) {
        console.error("Response data:", error);
        throw error;
    }
};