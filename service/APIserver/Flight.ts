import apiClient from "../client";

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
            flight_list.push({
                id: serverData.flight_id,
                departure_airport: serverData.dep_airp_code,
                arrival_airport: serverData.arr_airp_code,
                departure_date: serverData.dep_date,
                arrival_date: serverData.arr_date,
                airline: serverData.airl_name,
                departure_country: serverData.dep_country,
                arrival_country: serverData.arr_country,
                trip_id: trip_id,
            });
        }
        return flight_list;
    } catch (error) {
        console.error("Response data:", error);
        throw error;
    }
};