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
    note?: Note[];
}

interface TripBox {
    trip_id: number;
    trip_name: string;
    trip_image: string;
    start_date: string;
    end_date: string;
    member_count: number;
    status_planning: "planning" | "completed";
    owner_name: string;
    owner_image: string;
} // เเสดงในหน้า home เเละ user profile ใช้สำหรับ invite ด้วย

interface CreateTrip {
    trip_name: string;
    trip_image: string;
    start_date: string;
    end_date: string;
    trip_code: string;
    trip_password: string;
} // ใช้ในการสร้าง trip ใหม่ เเละส่งไป server

interface TripMember {
    id: number;
    name: string;
    user_image: string;
    email: string;
    phone: string;
    role: "owner" | "editor" | "viewer";
    trip_id: number;
} // เเสดงในหน้า trip details ที่จบไปเเล้วอ่ะ เเล้ว หน้า Group
