import apiClient from "../client";
import { Image } from "react-native";

export const endpoints = {
    trip: {
        CreateNewTrips: "/api/trips",
        TripsByUser: "/api/trips/by-user",
        ByTrip: "/api/trips/by-trip",
    },
};

export const createNewTrips = async (data: {
    trips_name: string;
    start_date: string;
    end_date: string;
    trip_code: string;
    trip_password: string;
    uri?: string;
}): Promise<TripBox> => {
    try {
        const formData = new FormData();

        formData.append("trip_name", data.trips_name);
        formData.append("start_date", data.start_date);
        formData.append("end_date", data.end_date);
        formData.append("trip_code", data.trip_code);
        formData.append("trip_pass", data.trip_password);

        console.log("here : ", data.uri);
        if (data.uri) {
            formData.append("file", {
                uri: data.uri,
                type: "image/jpeg",
                name: `trips_poster_${Date.now()}.jpg`,
            } as any);
        } else {
            const defaultPosterImg = Image.resolveAssetSource(
                require("../../assets/images/defaultPosterImg.jpg")
            );
            formData.append("file", {
                uri: defaultPosterImg.uri,
                type: "image/jpeg",
                name: `trips_poster_${Date.now()}.jpg`,
            } as any);
        }

        const response = (await apiClient.post(
            endpoints.trip.CreateNewTrips,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        )) as {
            data: any;
        };
        const Data = response.data;
        const CreatedTrips: TripBox = {
            trip_id: Data.trip_id,
            trip_name: "", // Data.title,
            trip_image: "", // Data.poster_image_link,
            start_date: "", //Data.start_date,
            end_date: "", //Data.end_date,
            member_count: -1, //Data.joined_people,
            status_planning: "planning", //(Data.planning_status) ? "planning" : "completed" ,
            owner_name: "", //(await ownerData).name,
            owner_image: "", //(await ownerData).profile_picture_link,
        };
        return CreatedTrips;
    } catch (error) {
        console.error("Response error:", error);
        throw error;
    }
};

export const fetchAllTrips = async (): Promise<TripBox[]> => {
    try {
        const response = (await apiClient.get(endpoints.trip.TripsByUser)) as {
            data: {
                trips: any;
            };
        };
        const Data = response.data.trips;
        const trips: TripBox[] = [];
        for (let i = 0; i < Data.length; i++) {
            const tripData = Data[i];
            trips.push({
                trip_id: tripData.trip_id,
                trip_name: tripData.title,
                trip_image: tripData.poster_image_link,
                start_date: tripData.start_date,
                end_date: tripData.end_date,
                member_count: tripData.joined_people,
                status_planning: tripData.planning_status
                    ? "completed"
                    : "planning",
                owner_name: "",
                owner_image: "",
            });
        }
        return trips;
    } catch (error) {
        console.error("Response error:", error);
        throw error;
    }
};

export const fetchEndedTrips = async (): Promise<TripBox[]> => {
    try {
        const response = (await apiClient.get(endpoints.trip.TripsByUser)) as {
            data: {
                trips: any;
            };
        };
        const Data = response.data.trips;
        const trips: TripBox[] = [];
        const currentDate = new Date();

        for (let i = 0; i < Data.length; i++) {
            const tripData = Data[i];
            const endDate = new Date(tripData.end_date);
            if (currentDate > endDate) {
                trips.push({
                    trip_id: tripData.trip_id,
                    trip_name: tripData.title,
                    trip_image: tripData.poster_image_link,
                    start_date: tripData.start_date,
                    end_date: tripData.end_date,
                    member_count: tripData.joined_people,
                    status_planning: tripData.planning_status
                        ? "completed"
                        : "planning",
                    owner_name: "",
                    owner_image: "",
                });
            }
        }
        return trips;
    } catch (error) {
        console.error("Response error:", error);
        throw error;
    }
};

export const updateTripDetail = async (NewValue: PatchTrip) => {
    try {
        console.log("try to patch trip data");
        if (!NewValue.trip_id) {
            throw new Error("trip_id is required");
        }

        const formData = new FormData();
        Object.entries(NewValue).forEach(([key, value]) => {
            if (value !== undefined && value !== null && key !== "trip_id") {
                if (value instanceof Date) {
                    formData.append(key, value.toISOString());
                } else if (key === "trip_picture_path") {
                    formData.append("file", {
                        uri: String(value),
                        type: value.type || "image/jpeg",
                        name: value.name || `trips_poster_${Date.now()}.jpg`,
                    } as any);
                } else {
                    formData.append(key, String(value));
                }
            }
        });
        const response = await apiClient.patch(
            `/api/trips/${NewValue.trip_id}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return response.data;
    } catch (error: any) {
        console.error(
            "❌ Update trip failed:",
            error.response?.data || error.message
        );
        throw error;
    }
};

export const get_trip_detail = async (
    trip_id: number
): Promise<TripDetails> => {
    try {
        console.log("Fetching :  overview trip detail");
        const response = (await apiClient.get(
            `${endpoints.trip.ByTrip}/${trip_id}`
        )) as { data: any };

        const trip: TripDetails = {
            trip_id: response.data.trip_id,
            trip_name: response.data.title,
            trip_image: response.data.poster_image_link,
            start_date: response.data.start_date,
            end_date: response.data.end_date,
            copies: response.data.total_copied,
            owner_name: "k",
            owner_email: "k",
            owner_image: "k",
            group_members: response.data.joined_people,
            trip_status: response.data.planning_status,
            trip_code: "k",
            trip_password: "k",
            budget: response.data.budget,
        };
        return trip;
    } catch (error) {
        console.error("Response data:", error);
        throw error;
    }
};

export const leaveTrips = async (
    trip_id: number,
    collab_id: number
): Promise<boolean> => {
    try {
        const response = await apiClient.delete(`/api/trips/${trip_id}/leave`, {
            data: {
                collab_id: collab_id,
            },
        });
        console.log("Leave trip response:", response.data);
        return true;
    } catch (error) {
        console.error("Leave trip error:", error);
        throw error;
    }
};

export const deleteTrip = async (trip_id: number): Promise<boolean> => {
    try {
        const response = await apiClient.delete(`/api/trips/${trip_id}`);
        console.log("Deleting trip response:", response.data);
        return true;
    } catch (error) {
        console.error("Delete trip error:", error);
        throw error;
    }
};

export const copyTrips = async (data: {
    guide_id: string;
    name: string;
    start: string;
    posterUri: string;
    tripCode: string;
    duration: number;
    password: string;
}): Promise<any> => {
    try {
        const response = (await apiClient.post(
            `/api/trips/${data.guide_id}/copyTrip`,
            {
                trip_code: data.tripCode,
            }
        )) as { data: { message: string; trip_id: number } };

        if (response.data.message !== "Trip Copied") {
            return "failed";
        }

        const startDate = new Date(data.start);
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + data.duration - 1);
        const NewData: PatchTrip = {
            trip_id: response.data.trip_id,
            title: data.name,
            description: "",
            start_date: startDate.toISOString(),
            end_date: endDate.toISOString(),
            visibility_status: false,
            trip_pass: data.password,
            trip_picture_path: data.posterUri,
            planning_status: false,
        };

        await updateTripDetail(NewData);

        return { message: "Success", trip_id: response.data.trip_id };
    } catch (error) {
        console.error("Copy trip error:", error);
        return "failed";
    }
};
