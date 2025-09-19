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