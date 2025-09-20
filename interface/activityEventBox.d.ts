interface ActivityEventBox {
  id: number;
  title: string;
  date: string;
  time_begin: string;
  time_end: string;
  transportation?: string;
  Notes?: Note[];
  trip_id: number;
} // เเสดงในหน้า daily trip, eventDetails