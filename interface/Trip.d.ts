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
    // เพิ่มส่วนนี้มาน่ะครับ
    trip_status: boolean; // true = completed, false = planning
    trip_code: string;
    trip_password: string;
}

interface TripBox {
    trip_id: number;
    trip_name: string;
    trip_image: string;
    start_date: string;
    end_date: string;
    member_count: number;
    status_planning: "planning" | "completed";
    owner_name: string | "self";
    owner_image: string | "self";
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
    role: "Owner" | "Editor" | "Viewer";
    trip_id: number;
} // เเสดงในหน้า trip details ที่จบไปเเล้วอ่ะ เเล้ว หน้า Group

interface PatchTrip {
    trip_id?: number;
    title?: string;
    description?: string | null;
    start_date?: string;
    end_date?: string;
    visibility_status?: boolean;
    budget?: number;
    trip_url?: string | null;
    trip_pass?: string;
    trip_picture_path?: string;
    planning_status?: boolean;
}