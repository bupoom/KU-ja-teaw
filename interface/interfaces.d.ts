interface TripBox {
  trip_id: number;
  trip_name: string;
  trip_image: string;
  start_date: string;
  end_date: string;
  member_count: number;
  status_planning: 'planning' | 'completed';
  owner_name: string;
  owner_image: string;
} // เเสดงในหน้า home เเละ user profile ใช้สำหรับ invite ด้วย

interface TripDetails {
  trip_id: number;
  trip_name: string;
  trip_image: string;
  start_date: string;
  end_date: string;
  copies?: number;
  owner_name: string;
  owner_image: string;
  owner_email: string;
  group_members: number;
  budget?: number;
  note?: Note[]
}

interface CreateTrip {
  trip_name: string; 
  trip_image: string;
  start_date: string;
  end_date: string;
  trip_code: string;
  trip_password: string;
} // ใช้ในการสร้าง trip ใหม่ เเละส่งไป server

interface Note {
  id: number;
  note_text: string;
  user_profile: string;
  user_name: string;
  is_editable: boolean;
  refer_user_id: number
  reference_id?: number; // บอกว่าเชื่อมกับ place หรือ event id ไหน
  reference_type?: 'place' | 'event' | 'overview';
  created_at: string;
  trip_id: number;
} // เเสดงในหน้า daily trip, placeDetails ที่เชื่อมกับ activityPlaceBox , activityEventBox

interface Flight {
  id: number;
  departure_airport: string;
  arrival_airport: string;
  departure_date: string;
  arrival_date: string;
  airline: string;
  departure_country: string;
  arrival_country: string;
  trip_id: number;
} // เเสดงในหน้า daily trip, tripDetails, guideDetails

interface FileGroup {
  id: number;
  file_name: string;
  file_url: string;
  uploaded_date: string;
  uploaded_by: string;
  file_size_mb: number;
  file_type?: string;
  trip_id: number;
} // เเสดงในหน้า daily trip

interface ActivityPlaceBox {
  id: number;
  title: string;
  date: string;
  time_begin: string;
  time_end: string;
  location: string;
  place_id?: number;
  place_image?: string;
  trip_id: number;
} // เเสดงในหน้า daily trip

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

// export const weatherCode: Record<number, string> = {
//   0: "Clear",
//   1: "Clouds",
//   2: "Fog/Mist",
//   3: "Drizzle",
//   4: "Rain",
//   5: "Snow",
//   6: "Ice/Sleet",
//   7: "Thunderstorm"
// };

interface Weather {
  id: number;
  trip_id: number;
  date: string;
  weather_code: keyof typeof weatherCode; // 0–7
}


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

interface TransportationOption {
  id: number;
  type: 'Car' | 'Bus' | 'Train' | 'Walk' | 'Flight' | 'Boat';
} // ตัวเลือกการเดินทาง

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

interface NotificationBox {
  id: number;
  title: string;
  message: string;
  created_at: string;
  notification_type?: string;
  trip_id: number;
} // เเสดงหน้า notification ใน daily trip

interface GuideBox {
  id: number;
  title: string;
  start_date: string;
  end_date: string;
  guide_image: string;
  copies: number;
  owner_name: string;
  owner_image: string;
  description?: string;
  trip_id: number
} // เเสดงหน้า search ของ guide bookmark

interface GuideDetails {
  id: number;
  title: string;
  start_date: string;
  end_date: string;
  guide_image: string;
  copies: number;
  owner_name: string;
  owner_image: string;
  description: string;
  owner_email: string;
  group_members: number;
  budget?: number;
  trip_id: number;
} // เเสดงหน้า details ของ guide ตอนกดเข้าไปจาก guide bookmark กับ หน้า home

interface PlaceBox {
  id: number;
  title: string;
  rating?: number;
  review_count?: number;
  location: string;
  place_image?: string;
  place_id?: number;
} // เเสดงหน้า search ของ place bookmark

interface PlaceDetails {
  id: number;
  title: string;
  description?: string;
  rating?: number;
  review_count?: number;
  location: string;
  place_image?: string;
  categories?: string[];
  map_link?: string;
  official_link?: string;
  notes?: Note[];
} // เเสดงหน้า details ของ place ตอนกดเข้าไปจาก place bookmark กับ หน้า daily trip

interface TripMember {
  id: number;
  name: string;
  user_image: string;
  email: string;
  phone: string;
  role: 'owner' | 'editer' | 'viewer';
  trip_id: number
} // เเสดงในหน้า trip details ที่จบไปเเล้วอ่ะ เเล้ว หน้า Group

interface UserDetails {
  id: number;
  name: string;
  phone: string;
  user_image: string;
  email: string;
}

interface LoadingState {
  current_trip: boolean;
  invitations: boolean;
  places: boolean;
  guide_plans: boolean;
  refreshing: boolean;
}