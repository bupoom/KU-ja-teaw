interface Vote {
  id: number;
  user_id: number;
  activity_id: number;
  vote_type: 'place' | 'event';
  place_id?: number;
  event_id?: number;
  username: string;
  trip_id: number;
} // บอกว่าใครโหวตอันไหน