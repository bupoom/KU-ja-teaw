import apiClient from "../client";

type Activity = (
            | ActivityPlaceBox
            | ActivityEventBox
            | ActivityVotePlace
            | ActivityVoteEvent
            
        )[]

export const getActivitiesInTrip = async (trip_id: number , Date: string): Promise<Activity> => {
    try {
        console.log("fetching activity in trips : " , trip_id , "In date : " , Date);
        const response = (await apiClient.get(`/api/trips/${trip_id}/activities/${Date}`)) as {
            data: { activities: any[]};
        };

        const data = response.data.activities;
        const ActivityList: Activity = [];
        for (let i = 0; i < data.length; i++){
            const serverData = data[i];
            if (serverData.is_event) { // เป็น event
                const item:ActivityEventBox = {
                    id: serverData.pit_id,
                    title: serverData.event_title,
                    date: serverData.date,
                    time_begin: serverData.time_start, 
                    time_end: serverData.time_end,
                    transportation: serverData.event_name,
                    notes: [], // อย่าลืม ตัวกุในอนาคต
                    trip_id: serverData.trip_id,
                }
                ActivityList.push(item)
            } else {
                const item:ActivityPlaceBox = {
                    id:serverData.pit_id,
                    title:serverData.address,
                    date:serverData.date,
                    time_begin:serverData.time_start,
                    time_end:serverData.time_end,
                    location:serverData.address,
                    place_id:serverData.place_id,
                    place_image:serverData.photo_url,
                    trip_id:serverData.trip_id,
                    notes: [], // อย่าลืม ตัวกุในอนาคต
                }
                ActivityList.push(item)
            }
        };
        return ActivityList
    } catch (error) {
        console.error("Response data:", error);
        throw error;
    }
};

export const getAllActivitiesInTrip = async (trip_id: number): Promise<Activity> => {
    try {
        console.log("fetching all activity in trips : " , trip_id);
        const response = (await apiClient.get(`/api/trips/${trip_id}/activities/AllDate`)) as {
            data: { activities: any[]};
        };

        const data = response.data.activities;
        const ActivityList: Activity = [];
        for (let i = 0; i < data.length; i++){
            const serverData = data[i];
            if (serverData.is_event) { // เป็น event
                const item:ActivityEventBox = {
                    id: serverData.pit_id,
                    title: serverData.event_title,
                    date: serverData.date,
                    time_begin: serverData.time_start, 
                    time_end: serverData.time_end,
                    transportation: serverData.event_name,
                    notes: [], // อย่าลืม ตัวกุในอนาคต
                    trip_id: serverData.trip_id,
                }
                ActivityList.push(item)
            } else {
                const item:ActivityPlaceBox = {
                    id:serverData.pit_id,
                    title:serverData.address,
                    date:serverData.date,
                    time_begin:serverData.time_start,
                    time_end:serverData.time_end,
                    location:serverData.address,
                    place_id:serverData.place_id,
                    place_image:serverData.photo_url,
                    trip_id:serverData.trip_id,
                    notes: [], // อย่าลืม ตัวกุในอนาคต
                }
                ActivityList.push(item)
            }
        };
        return ActivityList
    } catch (error) {
        console.error("Response data:", error);
        throw error;
    }
};