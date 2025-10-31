import apiClient from "../client";
import { addNotification } from "./notification";

type ActivityPlace = (
    | ActivityPlaceBox
    | ActivityEventBox
    | ActivityVotePlace
    | ActivityVoteEvent
)[];

type ActivityGuide = (ActivityPlaceBox | ActivityEventBox)[];

export const getActivitiesInTrip = async (
    trip_id: number,
    Date: string
): Promise<ActivityPlace> => {
    try {
        console.log(
            "fetching activity in trips : ",
            trip_id,
            "In date : ",
            Date
        );
        const response = (await apiClient.get(
            `/api/trips/${trip_id}/activities/${Date}`
        )) as {
            data: { activities: any[] };
        };

        const data = response.data.activities;
        const ActivityList: ActivityPlace = [];
        for (let i = 0; i < data.length; i++) {
            const serverData = data[i];
            const new_start_date = String(serverData.time_start).slice(0, 5);
            const new_end_date = String(serverData.time_end).slice(0, 5);
            if (serverData.is_vote) {
                if (serverData.is_event) {
                    const item: ActivityVoteEvent = {
                        id: serverData.pit_id,
                        title: serverData.event_title,
                        date: serverData.date,
                        time_begin: serverData.time_start,
                        time_end: serverData.time_end,
                        trip_id: trip_id,
                        vote_type: "event",
                    };
                    ActivityList.push(item);
                } else {
                    const item: ActivityVotePlace = {
                        id: serverData.pit_id,
                        date: serverData.date,
                        time_begin: serverData.time_start,
                        time_end: serverData.time_end,
                        trip_id: trip_id,
                        vote_type: "place",
                    };
                    ActivityList.push(item);
                }
            } else {
                if (serverData.is_event) {
                    // เป็น event
                    const item: ActivityEventBox = {
                        id: serverData.pit_id,
                        title: serverData.event_title,
                        date: serverData.date,
                        time_begin: new_start_date,
                        time_end: new_end_date,
                        transportation: serverData.event_name,
                        notes: [],
                        trip_id: serverData.trip_id,
                    };
                    ActivityList.push(item);
                } else {
                    const item: ActivityPlaceBox = {
                        id: serverData.pit_id,
                        title: serverData.address,
                        date: serverData.date,
                        time_begin: new_start_date,
                        time_end: new_end_date,
                        location: serverData.address,
                        place_id: serverData.place_id,
                        place_image: serverData.photo_url,
                        trip_id: serverData.trip_id,
                        notes: [],
                    };
                    ActivityList.push(item);
                }
            }
        }
        return ActivityList;
    } catch (error) {
        console.error("Response data:", error);
        throw error;
    }
};

export const getAllActivitiesInTrip = async (
    trip_id: number
): Promise<ActivityGuide> => {
    try {
        console.log("fetching all activity in trips : ", trip_id);
        const response = (await apiClient.get(
            `/api/trips/${trip_id}/activities/AllDate`
        )) as {
            data: { activities: any[] };
        };

        const data = response.data.activities;
        const ActivityList: ActivityGuide = [];
        for (let i = 0; i < data.length; i++) {
            const serverData = data[i];
            if (serverData.is_event) {
                // เป็น event
                const item: ActivityEventBox = {
                    id: serverData.pit_id,
                    title: serverData.event_title,
                    date: serverData.date,
                    time_begin: serverData.time_start,
                    time_end: serverData.time_end,
                    transportation: serverData.event_name,
                    notes: [], // อย่าลืม ตัวกุในอนาคต
                    trip_id: serverData.trip_id,
                };
                ActivityList.push(item);
            } else {
                const item: ActivityPlaceBox = {
                    id: serverData.pit_id,
                    title: serverData.address,
                    date: serverData.date,
                    time_begin: serverData.time_start,
                    time_end: serverData.time_end,
                    location: serverData.address,
                    place_id: serverData.place_id,
                    place_image: serverData.photo_url,
                    trip_id: serverData.trip_id,
                    notes: [], // อย่าลืม ตัวกุในอนาคต
                };
                ActivityList.push(item);
            }
        }

        return ActivityList;
    } catch (error) {
        console.error("Response data:", error);
        throw error;
    }
};

// {
//   "trip_id": 0,
//   "place_id": 0,
//   "date": "5830-09-48",
//   "time_start": "21:19",
//   "time_end": "21:03",
//   "event_name": "string",
//   "is_vote": false,
//   "is_event": true,
//   "event_title": "string"
// }
export const addPlaceToTrip = async (
    trip_id: number,
    place_id: number,
    date: string,
    time_start: string,
    time_end: string
): Promise<string> => {
    try {
        const response = await apiClient.post(
            `/api/trips/${trip_id}/activities/places`,
            {
                place_id: place_id,
                date: date,
                time_start: time_start,
                time_end: time_end,
                is_vote: false,
                event_name: "",
                event_title: "",
                is_event: false,
            }
        );
        if (response.data === "Time overlap detected") {
            return "time_overlap";
        }
        
        return "success";
    } catch (error) {
        console.error("Response data:", error);
        throw error;
    }
};

export const addEventToTrip = async (
    trip_id: number,
    date: string,
    time_start: string,
    time_end: string,
    event_name: string,
    evet_title: string
): Promise<string> => {
    try {
        const response = await apiClient.post(
            `/api/trips/${trip_id}/activities/events`,
            {
                trip_id: trip_id,
                place_id: 0,
                date: date,
                time_start: time_start,
                time_end: time_end,
                event_name: event_name,
                is_vote: false,
                is_event: true,
                event_title: evet_title,
            }
        );
        if (response.data === "Time overlap detected") {
            return "time_overlap";
        }
        return "success";
    } catch (error) {
        console.error("Response data:", error);
        throw error;
    }
};

export const deleteActivityInTrip = async (
    trip_id: number,
    pit_id: number,
    ActType?: string
): Promise<string> => {
    try {
        console.log("Deleting Trip activity: ", pit_id);
        try {
            const response = await apiClient.delete(
                `/api/trips/${trip_id}/activities/${pit_id}/votes`
            );
        } catch (error) {
            console.error("Response data:", error);
            return "failed";
        }
    

        const response = await apiClient.delete(
            `/api/trips/${trip_id}/activities/${pit_id}`
        );
        return "success";
    } catch (error) {
        console.error("Response data:", error);
        throw error;
    }
};

export const getActivitiesForMap = async (
    trip_id: number,
    date: string
): Promise<MarkerPlacePros[]> => {
    try {
        const response = (await apiClient.get(
            `/api/trips/${trip_id}/activities/onlyPlaces/${date}`
        )) as { data: any[] };

        const activities = response.data;
        const result: MarkerPlacePros[] = [];

        for (let i = 0; i < activities.length; i++) {
            const item = activities[i];
            result.push({
                title: item.name || item.title || `Activity ${i + 1}`,
                coordinates: {
                    latitude: Number(item.latitude ?? item.lat ?? 0),
                    longitude: Number(item.longitude ?? item.lng ?? 0),
                },
                draggable: false,
            });
        }
        return result;
    } catch (error: any) {
        console.error(
            "Error fetching activities for map:",
            error.response?.data || error
        );
        throw new Error("Failed to fetch activities for map");
    }
};

export const getActivitiesDetails = async (
    trip_id: number,
    pit_id: number
): Promise<ActivityEventBox> => {
    try {
        const response = (await apiClient.get(
            `/api/trips/${trip_id}/activities/${pit_id}/detail`
        )) as { data: any };

        console.log(response);
        const activities = response.data[0];

        const result: ActivityEventBox = {
            id: activities.pit_id,
            title: activities.event_title,
            date: activities.date,
            time_begin: activities.time_start.slice(0, 5),
            time_end: activities.time_end.slice(0, 5),
            transportation: activities.event_name,
            notes: [],
            trip_id: trip_id,
        };
        return result;
    } catch (error: any) {
        console.error(
            "Error fetching activities for map:",
            error.response?.data || error
        );
        throw new Error("Failed to fetch activities for map");
    }
};
