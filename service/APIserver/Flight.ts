import apiClient from "../client";
import { changeDateformat } from "@/util/formatFucntion/makeDateCorrect";

const endpoints = {
    guide: {
        getGuideDetails:"/api/trips", // /{trips_id}/summarize
    },
};

interface GuideAndFlight {
    GuideData : GuideDetails;
    FlightData: Flight[];
 }

export const getGuideDetails = async (Id:number): Promise<GuideAndFlight> => {
    try {
        console.log("start : fetching Guide Deatails with guide ID : " ,Id);
        const response_guide = (await apiClient.get(
            `${endpoints.guide.getGuideDetails}/${Id}/summarize`
        )) as {
            data: any;
        };

        const Data = response_guide.data;

        const resultGuideDetails: GuideDetails = {
            id: Data.trip_detail.trip_id, // backend ไม่แยก Trips id กับ Trips id !!
            title: Data.trip_detail.title, 
            start_date: Data.trip_detail.start_date, 
            end_date: Data.trip_detail.end_date, 
            guide_image: Data.trip_detail.poster_image_link, 
            copies: Data.trip_detail.total_copied, 
            owner_name: Data.owner_detail.name, 
            owner_image: Data.owner_detail.profile_picture_link, 
            description: "", // server ไม่มีนะคับ
            owner_email: Data.owner_detail.email, 
            group_members: Data.trip_detail.joined_people, 
            budget: Data.trip_detail.budget, 
            trip_id: Data.trip_detail.trip_id, 
            note: [], 
        }
        const FlightList = Data.flight_detail;
        const FlatList : Flight[] = [];
        for (let i = 0 ; i < FlightList.length; i++ ) {
            const Flight = FlightList[i];
            FlatList.push({
                id: Flight.flight_id,
                departure_airport: Flight.depart.dep_airp_code,
                arrival_airport: Flight.arrive.arr_airp_code,
                departure_date: changeDateformat(Flight.depart.dep_date),
                arrival_date: changeDateformat(Flight.arrive.arr_date),
                airline: Flight.airl_name,
                departure_country: Flight.depart.dep_country,
                arrival_country: Flight.arrive.arr_country,
                trip_id: Data.trip_detail.trip_id,
            });
        }

        return {
            GuideData: resultGuideDetails,
            FlightData: FlatList
        };

    } catch (error) {
        console.error("Response data:", error);
        throw error;
        
    }
};
