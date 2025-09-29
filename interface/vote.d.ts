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
    number_of_votes: number;
    options: TransportationOption[]; // มีอยู่ 6 เเบบ
    votes: Vote[];
    trip_id: number;
    vote_type: string;
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
    vote_type: string; // อันนี้มีเอาไว้ เเยก UI ในหน้า daily trip ว่าต้องเเสดงเเบบไหน
} // เเสดงหน้า vote place
