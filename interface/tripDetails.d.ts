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
  note?: Note[]
}