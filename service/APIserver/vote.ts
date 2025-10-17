import { AuthService } from "../authService";
import apiClient from "../client";

export const createBlockVote = async (
    trip_id: number,
    selectDate: string,
    start: string,
    end: string,
    event_title: string,
    type: string
): Promise<number> => {
    try {
        console.log("Creating vote activities : ", trip_id);
        let pit: number = 0;
        if (type === "places") {
            const response = (await apiClient.post(
                `/api/trips/${trip_id}/activities/votes/${type}`,
                {
                    trip_id: trip_id,
                    place_id: 0,
                    date: selectDate,
                    time_start: start,
                    time_end: end,
                    is_vote: true,
                    is_event: false,
                }
            )) as { data: any };
            pit = response.data.pit_id;
        } else if (type === "events") {
            const response = (await apiClient.post(
                `/api/trips/${trip_id}/activities/votes/${type}`,
                {
                    trip_id: trip_id,
                    place_id: 1,
                    date: selectDate,
                    time_start: start,
                    time_end: end,
                    is_vote: true,
                    is_event: false,
                    event_title: event_title,
                }
            )) as { data: any };
            pit = response.data.pit_id;
        }
        return pit;
    } catch (error) {
        console.error("Response date:", error);
        throw error;
    }
};

export const getPlaceInVoteBlock = async (
    trip_id: number,
    pit_id: number
): Promise<VoteData | null> => {
    try {
        console.log("Getting place vote Block: ", pit_id);
        const response = (await apiClient.get(
            `/api/trips/${trip_id}/activities/${pit_id}/votes`
        )) as { data: any };

        // ตรวจสอบว่าไม่มีข้อมูล
        if (!response.data || response.data.message) {
            console.log("No candidates found");
            return null;
        }
        const backendData = response.data;

        let votes: PlaceVoting[] = [];
        if (!backendData.voting) {
            backendData.places_voting.forEach((place: any) => {
                // ถ้า Backend ส่ง votes มาแยกต่างหาก ให้ใช้ตรงนี้
                // แต่ถ้าไม่มี เราจะสร้าง mock votes จาก is_voted
                votes.push({
                    pit_id: pit_id,
                    place_id: place.place_id,
                    address: place.address,
                    place_picture_url: place.place_picture_url,
                    rating: place.rating,
                    title: place.name,
                    review_count: place.rating_count,
                    voting_count: place.voting_count,
                    is_voted: place.is_vote,
                    is_most_voted: place.is_most_voted
                });
            });
        }

        // สร้าง ActivityVotePlace object
        const activityVotePlace: VoteData = {
            vote_id: pit_id,
            date: backendData.date,
            time_start: backendData.time_start.slice(0,5),
            time_end: backendData.time_end.slice(0,5),
            places_voting: votes
        };

        return activityVotePlace;
    } catch (error: any) {
        console.error("Error fetching place vote block:", error);

        if (error.response && error.response.status === 500) {
            const errorMessage = error.response.data?.message;
            if (
                typeof errorMessage === "string" &&
                errorMessage.includes("No candidates found for block")
            ) {
                console.log(`Specific error caught: ${errorMessage}`);
                return null;
            }
        }

        throw error;
    }
};

export const DeleteBlockVote = async (
    trip_id: number,
    vote_id: number
): Promise<boolean> => {
    try {
        console.log("Deleting vote activities : ", trip_id);
        const response = (await apiClient.delete(
            `/api/trips/${trip_id}/activities/${vote_id}/votes`
        )) as { data: any };
        if (response) {
            // check condition ด้วยตัวผมในอนาคต
        }
        return true;
    } catch (error) {
        console.error("Response date:", error);
        throw error;
    }
};

export const checkIsUserVoted = async (
    trip_id: number,
    vote_id: number
): Promise<boolean> => {
    try {
        console.log("Deleting vote activities : ", trip_id);
        const response = (await apiClient.get(
            `/api/trips/${trip_id}/activities/${vote_id}/votes`
        )) as { data: any };
        return response.data.votedd;
    } catch (error) {
        console.error("Response date:", error);
        throw error;
    }
};

export const patchNewVoteTime = async (
    trip_id: number,
    vote_id: number,
    date: string,
    start_time: string,
    end_time: string
): Promise<void> => {
    try {
        console.log("Deleting vote activities : ", trip_id);
        const response = (await apiClient.get(
            `/api/trips/${trip_id}/activities/${vote_id}/votes`,
            {
                date: date,
                start_time: start_time,
                end_time: end_time,
            }
        )) as { data: any };
    } catch (error) {
        console.error("Response date:", error);
        throw error;
    }
};

export const addPlaceInVote = async (
    trip_id: number,
    pit_id: number,
    place_id: number
): Promise<boolean> => {
    try {
        console.log("Voting for place:", { trip_id, pit_id, place_id });
        const userdata = await AuthService.getUserData();

        if (!userdata?.user_id) {
            console.error("User not found");
            return false;
        }
        const response = await apiClient.post(
            `/api/trips/${trip_id}/activities/${pit_id}/votes/${place_id}`,
            {
                user_id: userdata.user_id,
                pit_id: pit_id,
                trip_id: trip_id,
                place_id: place_id,
            }
        );

        console.log(response)

        return true;
    } catch (error: any) {
        console.error("Error voting for place:", error);

        if (error.response) {
            console.error("Error response:", error.response.data);
        }

        return false;
    }
};
