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