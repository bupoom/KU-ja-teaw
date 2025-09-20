interface TripMember {
  id: number;
  name: string;
  user_image: string;
  email: string;
  phone: string;
  role: 'owner' | 'editor' | 'viewer';
  trip_id: number
} // เเสดงในหน้า trip details ที่จบไปเเล้วอ่ะ เเล้ว หน้า Group