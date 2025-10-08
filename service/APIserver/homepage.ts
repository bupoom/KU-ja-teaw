import apiClient from "../client";

const endpoints = {
    guide: {
        recommend: "/api/trips/recommended",
    },
    user: {
        getUserDetail: "/api/users",
    },
    trip: {
        by_user: "/api/trips/by-user",
        invited: "/api/trips/invited",
    },
};

export const getRecommendedGuide = async (): Promise<GuideBox[]> => {
    try {
        console.log("Fetching : Recommended guide");
        const response = (await apiClient.get(endpoints.guide.recommend)) as {
            data: { guides: any[] };
        };

        const guides = response.data.guides || [];
        const guide_list: GuideBox[] = [];

        for (let i = 0; i < guides.length; i++) {
            const serverData = guides[i];
            guide_list.push({
                id: i + 1,
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
        }
        return guide_list;
    } catch (error) {
        console.error("Response data:", error);
        throw error;
    }
};

export const getUserAllUrip = async (): Promise<TripBox[]> => {
    try {
        console.log("Fetching : Current guide");
        const response = (await apiClient.get(endpoints.trip.by_user)) as {
            data: { trips: any[] };
        };
        const user_res = (await apiClient.get(endpoints.user.getUserDetail))
            .data as UserDetails;

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
                status_planning:
                    serverData.planning_status === true
                        ? "completed"
                        : "planning",
                owner_name: user_res.name,
                owner_image: user_res.profile_picture_link,
            });
        }
        return trip_list;
    } catch (error) {
        console.error("Response data:", error);
        throw error;
    }
};

export const getInvitedTrip = async (): Promise<TripBox[]> => {
    try {
        console.log("Fetching : Invited trips");
        const response = (await apiClient.get(endpoints.trip.invited)) as {
            data: { trips: any[] };
        };

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
                status_planning:
                    serverData.planning_status === true
                        ? "completed"
                        : "planning",
                owner_name: serverData.owner_name,
                owner_image: serverData.owner_image,
            });
        }
        return trip_list;
    } catch (error) {
        console.error("Response data:", error);
        throw error;
    }
};
