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