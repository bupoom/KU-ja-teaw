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
  status_plan: string;
  trip_password: string;
  trip_code: string;
  budget?: number;
  note?: Note[]
}