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