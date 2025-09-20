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
