import apiClient from "../client";

const endpoints = {
    guide: {
        recommend: "/api/trips/recommended"
    },
    user: {
        getUserDetail: "/api/users"
    },
    trip:{
        by_user: "/api/trips/by-user",
        invited: "/api/trips/invited"
    },
};

// getBookmarkPlaceList && getBookmarkGuideList อยู่หน้า tabs/place หรือ guide/index
// UnbookmarkByPlaceId && UnbookmarkByGuideId อยู่ใน component

export const getrecommendedguide = async (): Promise<GuideBox[]> => {
    try {
        console.log("fetching recommended guide");
        const response = (await apiClient.get(endpoints.guide.recommend)) as {
            data: { guides: any[] };
        };

        console.log(response.data.guides);
        const guides = response.data.guides || [];
        const guide_list: GuideBox[] = [];

        for (let i = 0; i < guides.length; i++) {
            const serverData = guides[i];
            guide_list.push({
                id: i+1,
                title: serverData.title,
                start_date: serverData.start_date,
                end_date: serverData.end_date,
                guide_image: serverData.guide_image,
                copies: serverData.total_copied,
                owner_name: serverData.owner_name,
                owner_image: serverData.owner_image,
                description: serverData.description,
                trip_id: serverData.trip_id,
            });

            console.log(guide_list[i]);
        }
        return guide_list;
    } catch (error) {
        console.error("Response data:", error);
        throw error;
    }
};

export const getuseralltrip = async (): Promise<TripBox[]> => {
    try {
        console.log("fetching current guide");
        const response = (await apiClient.get(endpoints.trip.by_user)) as {
            data: { trips: any[] };
        };
        const user_res = (await apiClient.get(endpoints.user.getUserDetail)).data as UserDetails;

        console.log(response.data.trips);
        const trips = response.data.trips || [];
        const trip_list: TripBox[] = [];

        for (let i = 0; i < trips.length; i++) {
            const serverData = trips[i];
            trip_list.push({
                trip_id: serverData.trip_id,
                trip_name: serverData.title,
                trip_image: serverData.poster_image_link,
                start_date: serverData.start_date,
                end_date: serverData.end_date,
                member_count: serverData.joined_people,
                status_planning: serverData.planning_status === true ? "completed" : "planning",
                owner_name: user_res.name,
                owner_image: user_res.profile_picture_link,
            });

            console.log(trip_list[i]);
        }
        return trip_list;
    } catch (error) {
        console.error("Response data:", error);
        throw error;
    }
};

export const getinvitedtrip = async (): Promise<TripBox[]> => {
    try {
        console.log("fetching invited trips");
        const response = (await apiClient.get(endpoints.trip.invited)) as {
            data: { trips: any[] };
        };

        console.log(response.data.trips);
        const trips = response.data.trips || [];
        const trip_list: TripBox[] = [];

        for (let i = 0; i < trips.length; i++) {
            const serverData = trips[i];
            trip_list.push({
                trip_id: serverData.trip_id,
                trip_name: serverData.title,
                trip_image: serverData.guide_image,
                start_date: serverData.start_date,
                end_date: serverData.end_date,
                member_count: 0,
                status_planning: "completed",
                owner_name: serverData.owner_name,
                owner_image: serverData.owner_image,
            });

            console.log(trip_list[i]);
        }
        return trip_list;
    } catch (error) {
        console.error("Response data:", error);
        throw error;
    }
};