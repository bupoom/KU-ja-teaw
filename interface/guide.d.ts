interface GuideDetails {
    id: number;
    title: string; // 
    start_date: string; // 
    end_date: string; //  
    guide_image: string; //  
    copies: number;
    owner_name: string;
    owner_image: string;
    description: string;
    owner_email: string;
    group_members: number; // 
    budget?: number;
    trip_id: number; // 
    note?: Note[];
}

// {
//   "trip_id": 0,
//   "title": "string",
//   "joined_people": 0,
//   "start_date": "2025-09-25",
//   "end_date": "2025-09-25",
//   "poster_image_link": "Unknown Type: string,null",
//   "planning_status": true
// }

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
    trip_id: number;
}
