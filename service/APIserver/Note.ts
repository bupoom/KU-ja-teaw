import apiClient from "../client";

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