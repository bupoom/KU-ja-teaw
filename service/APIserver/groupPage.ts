import apiClient from "../client";

const endpoints = {
    member: {
        all_member: "/api/trips/members",
    },
    search: {
        user: "/api/search/users",
    },
};

export const get_trip_member = async (trip_id:number): Promise<TripMember[]> => {
    try {
        console.log("fetching trip member");
        const response = (await apiClient.get(`${endpoints.member.all_member}/${trip_id}`)) as {data: any[] };

        console.log(response.data);
        const data = response.data;
        const member_list : TripMember[] = [];
        for (let i = 0; i < data.length; i++){
            const serverData = data[i];
            member_list.push({
                id: serverData.collab_id,
                name: serverData.name,
                user_image: serverData.profile_picture_link,
                email: serverData.email,
                phone: serverData.phone,
                role: serverData.role,
                trip_id: trip_id,
            });
        }
        return member_list;
    } catch (error) {
        console.error("Response data:", error);
        throw error;
    }
};

export const edit_role = async (trip_id:number, collab_id:number, role:string): Promise<void> => {
    try {
        console.log("editing role");
        const response = (await apiClient.patch(`${endpoints.member.all_member}/${trip_id}`,
            {collab_id:`${collab_id}`, role:`${role}`}));
        console.log("editing role success");
        
    } catch (error) {
        console.error("Response data:", error);
        throw error;
    }
};

export const delete_mem = async (trip_id:number, collab_id:number): Promise<void> => {
    try {
        console.log("deleting member");
        const response = (await apiClient.delete(`${endpoints.member.all_member}/${trip_id}/${collab_id}`));
        console.log("member has been deleted");
    } catch (error) {
        console.error("Response data:", error);
        throw error;
    }
};

export const search_user = async (username:string, trip_id:number): Promise<UserDetails[]> => {
    try {
        console.log("searching for user");
        const response = (await apiClient.get(`${endpoints.search.user}/${username}/${trip_id}`)) as {data : any[]};

        console.log(response.data);
        const user_list : UserDetails[] = [];
        for (let i = 0; i < response.data.length; i++){
            const serverData = response.data[i];
            user_list.push({
                user_id: serverData.user_id,
                name: serverData.username,
                phone: serverData.phone,
                email: serverData.email,
                profile_picture_link: serverData.profile_picture_link,
            });
        }
        return user_list;
    } catch (error) {
        console.error("Response data:", error);
        throw error;
    }
};

export const invite_user = async (username:string, trip_id:number): Promise<void> => {
    try {
        console.log("inviting user");
        const response = (await apiClient.post(`/api/trips/${trip_id}/invite`, {name:`${username}`}));
        console.log("user has been invited");
    } catch (error) {
        console.error("Response data:", error);
        throw error;
    }
};