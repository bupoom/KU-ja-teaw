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
