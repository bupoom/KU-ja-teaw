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
    title: string;
    date: string;
    time_begin: string;
    time_end: string;
    trip_id: number;
    vote_type: string;
} // เเสดงหน้า vote event

interface ActivityVotePlace {
    id: number;
    date: string;
    time_begin: string;
    time_end: string;
    trip_id: number;
    vote_type: string; // อันนี้มีเอาไว้ เเยก UI ในหน้า daily trip ว่าต้องเเสดงเเบบไหน
} // เเสดงหน้า vote place


// ----------------- Types -----------------
interface PlaceVoting {
    pit_id: number;
    place_id: number;
    address: string;
    place_picture_url: string;
    rating?: number;
    title: string;
    review_count?: number;
    voting_count: number;
    is_voted: boolean;
    is_most_voted: boolean;
}

interface VotePlaceData {
    vote_id: number;
    date: string;
    time_start: string;
    time_end: string;
    places_voting: PlaceVoting[];
}

interface EventVoting {
    pit_id: number;
    name: string;
    voting_count: number;
    is_voted: boolean;
    is_most_voted: boolean;
}

interface VoteEventData {
    vote_id: number;
    date: string;
    time_start: string;
    time_end: string;
    event_title: string;
    events_voting: EventVoting[];
}
