import { AuthService } from "./../authService";
import apiClient from "../client";

export const get_activity_note = async (trip_id: number): Promise<void> => {
    // Promise<Note[]> => {
    try {
        console.log("fetching overview notes");

        // return note_list
    } catch (error) {
        console.error("Response data:", error);
        throw error;
    }
};

export const get_overview_note = async (trip_id: number): Promise<Note[]> => {
    try {
        console.log("fetching overview notes");
        const response = (await apiClient.get(
            `/api/trips/${trip_id}/notes`
        )) as {
            data: { notes: any[] };
        };

        const data = response.data.notes;
        const note_list: Note[] = [];
        for (let i = 0; i < data.length; i++) {
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
        return note_list;
    } catch (error) {
        console.error("Response data:", error);
        throw error;
    }
};

export const create_note = async (
    trip_id: number,
    note: string
): Promise<Note> => {
    try {
        console.log("adding overview note");
        const response = (await apiClient.post(`/api/trips/${trip_id}/notes`, {
            note: note,
        })) as {
            data: any;
        };
        const _ = response.data;
        const new_note: Note = {
            id: _.nit_id,
            note_text: _.note,
            user_profile: _.profile_picture_path,
            user_name: _.name,
            is_editable: _.is_editable === 1 ? true : false,
            created_at: response.data.note_time,
            refer_user_id: _.user_id,
            trip_id: trip_id,
        };
        return new_note;
    } catch (error) {
        console.error("Response data:", error);
        throw error;
    }
};

export const edit_note = async (
    trip_id: number,
    nit_id: number,
    editText: string
): Promise<Note> => {
    try {
        console.log("fetching overview notes");
        const response = (await apiClient.patch(
            `/api/trips/${trip_id}/${nit_id}/notes`,
            { note: `${editText}` }
        )) as {
            data: any;
        };
        const data = response.data;
        const new_note: Note = {
            id: data.nit_id,
            note_text: data.note,
            user_profile: data.profile_picture_path,
            user_name: data.name,
            is_editable: data.is_editable === 1 ? true : false,
            created_at: data.note_time,
            refer_user_id: data.user_id,
            trip_id: trip_id,
        };
        return new_note;
    } catch (error) {
        console.error("Response data:", error);
        throw error;
    }
};

export const getAllActivitiesNote = async (
    trip_id: number
): Promise<Note[]> => {
    try {
        console.log("fetching activities notes");
        const response = (await apiClient.get(
            `/api/trips/${trip_id}/act_notes`
        )) as {
            data: [];
        };

        const data = response.data;
        const note_list: Note[] = [];
        for (let i = 0; i < data.length; i++) {
            const serverData: any = data[i];
            note_list.push({
                id: serverData.pnote_id,
                note_text: serverData.note,
                user_profile: serverData.profile_picture_path,
                user_name: serverData.name,
                is_editable: serverData.is_editable,
                reference_id : serverData.pit_id,
                created_at: serverData.note_time,
                refer_user_id: serverData.user_id,
                trip_id: trip_id,
            });
        }
        return note_list;
    } catch (error) {
        console.error("Response data:", error);
        throw error;
    }
};

export const getActivitiesNote = async (
    trip_id: number,
    pit_id: number
): Promise<Note[]> => {
    try {
        console.log("fetching activities notes");
        const response = (await apiClient.get(
            `/api/trips/${trip_id}/act_notes`
        )) as {
            data: [];
        };

        const data = response.data;
        const note_list: Note[] = [];
        for (let i = 0; i < data.length; i++) {
            const serverData: any = data[i];

            // กรองเฉพาะ note ที่ตรงกับ pit_id
            if (serverData.pit_id === pit_id) {
                note_list.push({
                    id: serverData.pnote_id,
                    note_text: serverData.note,
                    user_profile: serverData.profile_picture_path,
                    user_name: serverData.name,
                    is_editable: serverData.is_editable,
                    created_at: serverData.note_time,
                    refer_user_id: serverData.user_id,
                    trip_id: trip_id,
                });
            }
        }
        return note_list;
    } catch (error) {
        console.error("Response data:", error);
        throw error;
    }
};

export const addActivitiesNote = async (
    trip_id: number,
    pit_id: number,
    note_text: string
): Promise<Note | null> => {
    try {
        console.log("Fetching activities Notes");
        const response = (await apiClient.post(
            `/api/trips/${trip_id}/${pit_id}/act_notes`,
            {
                note: note_text,
            }
        )) as {
            data: any;
        };

        const data = response.data;
        const userData = await AuthService.getUserData();
        if (!userData) return null;
        const result: Note = {
            id: data.pnote_id,
            note_text: data.note,
            user_profile: userData.profile_picture_link,
            user_name: userData.name,
            is_editable: true,
            refer_user_id: userData.user_id,
            reference_id: data.pit_id,
            created_at: data.note_time,
            trip_id: trip_id,
        };
        return result;
    } catch (error) {
        console.error("Response data:", error);
        throw error;
    }
};

export const updateActivitiesNote = async (
    trip_id: number,
    pnote_id: number,
    note_text: string
): Promise<boolean> => {
    try {
        console.log("Fetching activities Notes");
        const response = (await apiClient.patch(
            `/api/trips/${trip_id}/${pnote_id}/act_notes`,
            {
                note: note_text,
            }
        )) as {
            data: any;
        };

        const data = response.data;
        if (!data.note) {
            return false;
        }
        return true;
    } catch (error) {
        console.error("Response data:", error);
        throw error;
    }
};
