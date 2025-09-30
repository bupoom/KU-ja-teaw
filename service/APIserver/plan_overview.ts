import TripDetail from "@/app/dynamicPage/trips/[trip_id]";
import apiClient from "../client";
import { mockUserDetails } from "@/mock/mockDataComplete";

const endpoints = {
    user: {
        getmoredetail: "/api/users/more_detail",
    },
    trip: {
        by_trip: "/api/trips/by-trip",
    },
};

export const get_trip_detail = async (trip_id:number): Promise<TripDetails> => {
    try {
        console.log("fetching overview trip detail");
        const response = (await apiClient.get(`${endpoints.trip.by_trip}/${trip_id}`)) as {data: any };

        console.log(response.data);
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
        };
        return trip
    } catch (error) {
        console.error("Response data:", error);
        throw error;
    }
};

export const get_more_detail = async (trip_id: number): Promise<MoreUserDetail> => {
    try {
        console.log("fetching user more detail");
        const response = (await apiClient.get(`${endpoints.user.getmoredetail}/${trip_id}`)) as {
            data: any;
        };

        console.log(response.data);
        const detail : MoreUserDetail = {
            user_id: response.data.user_id,
            username: response.data.username,
            role: response.data.role,
            user_image: response.data.user_image
        }
        return detail;
    } catch (error) {
        console.error("Response data:", error);
        throw error;
    }
};

export const get_overview_note = async (trip_id: number): Promise<Note[]> => {
    try {
        console.log("fetching overview notes");
        const response = (await apiClient.get(`/api/trips/${trip_id}/notes`)) as {
            data: { notes: any[]};
        };

        console.log(response.data.notes);
        const data = response.data.notes;
        const note_list: Note[] = [];
        for (let i = 0; i < data.length; i++){
            const serverData = data[i];
            note_list.push({
                id: serverData.nit_id,
                note_text: serverData.note,
                user_profile: serverData.profile_picture_path,
                user_name: serverData.name,
                is_editable: serverData.is_editable,
                created_at: serverData.note_time,
                refer_user_id: serverData.user_id,
                trip_id: trip_id,
            });
        }
        return note_list
    } catch (error) {
        console.error("Response data:", error);
        throw error;
    }
};

export const create_note = async (trip_id: number, user_id:string, user_image:string, username:string): Promise<Note> => {
    try {
        console.log("adding overview note");
        const response = (await apiClient.post(`/api/trips/${trip_id}/notes`, {"note":"init"})) as {
            data: any;
        };
        console.log(response.data);
        const new_note : Note = {
            id: response.data.nit_id,
            note_text: response.data.note,
            user_profile: user_image,
            user_name: username,
            is_editable: true,
            created_at: response.data.note_time,
            refer_user_id: user_id,
            trip_id: trip_id,
        }
        return new_note;
    } catch (error) {
        console.error("Response data:", error);
        throw error;
    }
};

export const edit_note = async (trip_id: number, nit_id:number, editText:string, user_id:string, user_image:string, username:string): Promise<Note> => {
    try {
        console.log("fetching overview notes");
        const response = (await apiClient.patch(`/api/trips/${trip_id}/${nit_id}/notes`, {"note":`${editText}`})) as {
            data: any;
        };
        console.log(response.data);
        const new_note : Note = {
            id: response.data.nit_id,
            note_text: response.data.note,
            user_profile: user_image,
            user_name: username,
            is_editable: true,
            created_at: response.data.note_time,
            refer_user_id: user_id,
            trip_id: trip_id,
        }
        return new_note;
    } catch (error) {
        console.error("Response data:", error);
        throw error;
    }
};