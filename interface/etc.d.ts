interface Note {
    id: number;
    note_text: string;
    user_profile: string;
    user_name: string;
    is_editable: boolean;
    refer_user_id: string;
    reference_id?: number; // บอกว่าเชื่อมกับ place หรือ event id ไหน
    reference_type?: "place" | "event" | "overview";
    created_at: string;
    trip_id: number;
} // เเสดงในหน้า daily trip, placeDetails ที่เชื่อมกับ activityPlaceBox , activityEventBox

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

interface TransportationOption {
    id: number;
    type: "Car" | "Bus" | "Train" | "Walk" | "Flight" | "Boat";
} // ตัวเลือกการเดินทาง

interface NotificationBox {
    id: number;
    title: string;
    message: string;
    created_at: string;
    // notification_type?: string;
    trip_id: number;
} // เเสดงหน้า notification ใน daily trip

interface LoadingState {
    currentTrip: boolean;
    invitations: boolean;
    places: boolean;
    guidePlans: boolean;
    refreshing: boolean;
}

interface ImageFile {
    uri: string;
    type: string;
    name: string;
}
