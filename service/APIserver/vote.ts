import { AuthService } from "../authService";
import apiClient from "../client";
import { addNotification } from "./notification";

export const createBlockVote = async (
    trip_id: number,
    selectDate: string,
    start: string,
    end: string,
    event_title: string,
    type: string
): Promise<number> => {
    try {
        console.log("Creating vote activities from trip_id : ", trip_id);
        let pit_id: number = 0;
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
            pit_id = response.data.pit_id;
        } else if (type === "events") {
            console.log({
                trip_id: trip_id,
                place_id: 7,
                date: selectDate,
                time_start: start,
                time_end: end,
                is_vote: true,
                is_event: true,
                event_title: event_title,
            });
            const response = (await apiClient.post(
                `/api/trips/${trip_id}/activities/votes/${type}`,
                {
                    trip_id: trip_id,
                    place_id: 7,
                    date: selectDate,
                    time_start: start,
                    time_end: end,
                    is_vote: true,
                    is_event: true,
                    event_title: event_title,
                }
            )) as { data: any };

            pit_id = response.data.pit_id;
            console.log("Created event vote pit_id:", pit_id);
            const transportationOptions = [
                "Car",
                "Bus",
                "Train",
                "Walk",
                "Flight",
                "Boat",
            ];

            if (pit_id) {
                for (const name of transportationOptions) {
                    try {
                        console.log(
                            `➡️ Creating vote option: ${name} for pit_id: ${pit_id}`
                        );

                        await apiClient.post(
                            `/api/trips/${trip_id}/activities/${pit_id}/votes/0`,
                            { event_name: name }
                        );

                        console.log(`✅ Created: ${name}`);
                    } catch (error: any) {
                        console.error(`❌ Failed to create option: ${name}`);

                        // ✅ แสดง message ปกติ
                        console.error("Message:", error?.message);

                        // ✅ ถ้ามี response จาก server
                        if (error.response) {
                            console.error(
                                "Status Code:",
                                error.response.status
                            );
                            console.error("Server Error:", error.response.data);
                        }

                        // ✅ ถ้ามี request แต่ server ไม่ตอบ
                        else if (error.request) {
                            console.error("No response received from server.");
                        }

                        // ✅ อื่น ๆ
                        else {
                            console.error("Unknown Error:", error);
                        }

                        throw error; // ถ้าต้องการให้หยุด loop ให้คงไว้
                    }
                }
            }
        }
        await addNotification(
            trip_id,
            "Vote added",
            `New vote added on date ${selectDate}`
        );

        return pit_id;
    } catch (error) {
        console.error("Response date:", error);
        throw error;
    }
};

export const getPlaceInVoteBlock = async (
    trip_id: number,
    pit_id: number
): Promise<VotePlaceData | null> => {
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
                    pit_id: place.pit_id,
                    place_id: place.place_id,
                    address: place.address,
                    place_picture_url: place.place_picture_url,
                    rating: parseInt(place.rating),
                    title: place.name,
                    review_count: place.rating_count,
                    voting_count: place.voting_count,
                    is_voted: place.is_voted,
                    is_most_voted: place.is_most_voted,
                });
            });
        }

        // สร้าง ActivityVotePlace object
        const activityVotePlace: VotePlaceData = {
            vote_id: backendData.block_id,
            date: backendData.date,
            time_start: backendData.time_start.slice(0, 5),
            time_end: backendData.time_end.slice(0, 5),
            places_voting: votes,
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

export const getEventInVoteBlock = async (
    trip_id: number,
    pit_id: number
): Promise<VoteEventData | null> => {
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
        // console.log("Backend data for event vote:", backendData);

        let votes: EventVoting[] = [];
        if (!backendData.voting) {
            backendData.event_voting.forEach((event: any) => {
                votes.push({
                    pit_id: event.pit_id,
                    name: event.event_names,
                    voting_count: event.voting_count,
                    is_voted: event.is_voted,
                    is_most_voted: event.is_most_voted,
                });
            });
        }

        // สร้าง ActivityVotePlace object
        const activityVotePlace: VoteEventData = {
            vote_id: backendData.block_id,
            date: backendData.date,
            time_start: backendData.time_start.slice(0, 5),
            time_end: backendData.time_end.slice(0, 5),
            event_title: backendData.event_title,
            events_voting: votes,
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

export const deleteActivityInVote = async (
    trip_id: number,
    pit_id: number,
): Promise<string> => {
    try {
        console.log("Deleting Trip activity: ", pit_id);

        const response = await apiClient.delete(
            `/api/trips/${trip_id}/activities/${pit_id}`
        );
        return "success";
    } catch (error) {
        console.error("Response data:", error);
        throw error;
    }
};

export const checkIsUserVoted = async (
    trip_id: number,
    vote_id: number
): Promise<boolean> => {
    try {
        console.log("Check vote activities : ", trip_id);
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

        console.log(response);

        return true;
    } catch (error: any) {
        console.error("Error voting for place:", error);

        if (error.response) {
            console.error("Error response:", error.response.data);
        }

        return false;
    }
};

export const patchNewUserVote = async (
    TripId: number,
    VotePitId: number,
    FromPitId: number,
    eventName?: string
): Promise<boolean> => {
    try {
        console.log("Voting candidate pit_id:", VotePitId);
        console.log("From pit_id:", FromPitId);

        if (VotePitId === FromPitId) {
            const res = (await apiClient.delete(
                `/api/trips/${TripId}/activities/${FromPitId}/voted`,
                { event_name: eventName || "" }
            )) as { data: { success: boolean } };
            return res.data?.success || false;
        }

        if (FromPitId !== -1) {
            try {
                const deleteRes = (await apiClient.delete(
                    `/api/trips/${TripId}/activities/${FromPitId}/voted`,
                    { event_name: eventName || "" }
                )) as { data: { success: boolean } };

                if (!deleteRes.data?.success) {
                    console.error("Failed to remove previous vote");
                    return false;
                }
            } catch (error) {
                console.error("Error removing previous vote:", error);
                return false;
            }
        }

        if (!eventName) {
            const res = (await apiClient.post(
                `/api/trips/${TripId}/activities/${VotePitId}/voted/places`,
                { event_name: "" }
            )) as { data: boolean };
            return res.data || false;
        } else {
            // Vote for event
            const res = (await apiClient.post(
                `/api/trips/${TripId}/activities/${VotePitId}/voted/events`,
                { event_name: eventName }
            )) as { data: boolean };
            return res.data || false;
        }
    } catch (error) {
        console.error("Error in patchNewUserVote:", error);
        return false;
    }
};

export const endPlaceVote = async (
    trip_id: number,
    candidatePitId: number
): Promise<boolean> => {
    try {
        console.log("End Vote : ", candidatePitId);
        const response = (await apiClient.post(
            `/api/trips/${trip_id}/activities/${candidatePitId}/votes/places/endOwner`
        )) as { data: any };
        if (!response.data.pit_id) return false;
        return true;
    } catch (error) {
        console.error("Response date:", error);
        throw error;
    }
};

export const endEventVote = async (
    trip_id: number,
    candidatePitId: number
): Promise<boolean> => {
    try {
        console.log("End Vote : ", candidatePitId);
        const response = (await apiClient.post(
            `/api/trips/${trip_id}/activities/${candidatePitId}/votes/events/endOwner`
        )) as { data: any };
        if (!response.data.pit_id) return false;
        return true;
    } catch (error) {
        console.error("Response date:", error);
        throw error;
    }
};
