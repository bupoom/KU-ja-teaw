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
            console.log(response.data);
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
            console.log(response.data);
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
): Promise<ActivityVotePlace | null> => {
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
        const options: PlaceBox[] = backendData.voting.map((place: any) => ({
            id: String(place.place_id), // แปลง number เป็น string
            title: place.title || "Unknown Place",
            rating: place.rating,
            review_count: place.review_count,
            location: place.address || "",
            place_image: place.place_picture_url,
            place_id: place.place_id,
        }));

        // สร้าง Vote[] (ดึงจาก Backend ถ้ามี หรือสร้างจาก voting_count)
        const votes: Vote[] = [];
        backendData.voting.forEach((place: any) => {
            // ถ้า Backend ส่ง votes มาแยกต่างหาก ให้ใช้ตรงนี้
            // แต่ถ้าไม่มี เราจะสร้าง mock votes จาก is_voted
            if (place.is_voted) {
                votes.push({
                    id: place.place_id,
                    user_id: 1,
                    activity_id: pit_id,
                    vote_type: "place",
                    place_id: place.place_id,
                    username: "current_user",
                    trip_id: trip_id,
                });
            }
        });

        // นับ total votes
        const totalVotes = backendData.voting.reduce(
            (sum: number, place: any) => sum + place.voting_count,
            0
        );

        // สร้าง ActivityVotePlace object
        const activityVotePlace: ActivityVotePlace = {
            id: pit_id,
            date: backendData.formattedDate,
            time_begin: backendData.time_start,
            time_end: backendData.time_end,
            number_of_votes: totalVotes,
            options: options,
            votes: votes,
            trip_id: trip_id,
            vote_type: "place",
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
            `/api/trips/${trip_id}/activities/${vote_id}/voted`
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
            `/api/trips/${trip_id}/activities/${vote_id}/voted`,
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

export const votePlace = async (
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
            `/api/trips/${trip_id}/activities/${pit_id}/voted/places`,
            {
                user_id: userdata.user_id,
                pit_id: pit_id,
                trip_id: trip_id,
                place_id: place_id,
            }
        );

        console.log("Vote response:", response.data);
        return true;
    } catch (error: any) {
        console.error("Error voting for place:", error);

        if (error.response) {
            console.error("Error response:", error.response.data);
        }

        return false;
    }
};
