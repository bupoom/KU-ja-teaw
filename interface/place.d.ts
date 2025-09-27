interface PlaceBox {
    id: strnig;
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
    latitude:number;
    longitude:number;
    official_link?: string;
} // เเสดงหน้า details ของ place ตอนกดเข้าไปจาก place bookmark กับ หน้า dailytrip


interface SearchPlaces {
    text: string;
    placeId: string;
}