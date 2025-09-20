interface Vote {
    id: number;
    user_id: number;
    activity_id: number;
    vote_type: "place" | "event";
    place_id?: number;
    event_id?: number;
    username: string;
    trip_id: number;
} // บอกว่าใครโหวตอันไหน

interface ActivityVoteEvent {
    id: number;
    date: string;
    time_begin: string;
    time_end: string;
    number_of_votes: number;
    options: TransportationOption[];
    votes: Vote[];
    trip_id: number;
} // เเสดงหน้า vote event

interface ActivityVotePlace {
    id: number;
    date: string;
    time_begin: string;
    time_end: string;
    number_of_votes: number;
    options: PlaceBox[];
    votes: Vote[];
    trip_id: number;
} // เเสดงหน้า vote place
