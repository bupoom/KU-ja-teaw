interface TripDetails {
  id: number;
  title: string;
  image: string;
  dateRange: string;
  participantsCount: number;
  status: 'Traveling' | 'Coming' | 'Completed' | 'Planning';
  creator: string;
  creator_image:  string;
}
interface GuideDetails {
  id: number;
  title: string;
  duration: number;
  copies: number;
  price: number;
  rating: number;
  image: string;
  highlights: string;
  guideId: string;
  creator: string;
  creator_image: string;
}

interface PlaceDetails {
  id: number;
  title: string;
  rating: number;
  reviewCount: number,
  location: string;
  image: string;
}

interface UserInfo {
  idToken: string ,
  name: string,
  email: string,
  photo: string,
};

interface UserDetails {
  id: number;
  name: string;
  username: string;
  phone: string;
  user_image: string;
  email?: string;
  bio?: string;
}

interface LoadingState {
  currentTrip: boolean;
  invitations: boolean;
  places: boolean;
  guidePlans: boolean;
  refreshing: boolean;
}