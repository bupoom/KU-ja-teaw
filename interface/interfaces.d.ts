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

// // <----------------------- Trip ------------------------>

// interface TripBox {
//   id: number;
//   title: string;
//   trip_image: string; // URL of the image
//   startdate: string; // Start date in ISO format
//   enddate: string; // End date in ISO format
//   member: number;
//   statusPlan: boolean; // false if Planning, true if Completed
//   owner_name: string;
//   owner_image: string; // URL of the owner's image
// } // อันนี้รับรับมาจากการ fetch data from server เเละเเปลงให้ใช้กับ TripBox หรือ InviteBox

// interface CraeteTrip {
//   title: string;
//   trip_image: string;
//   startdate: string;
//   enddate: string;
//   trip_code: string;
//   trip_password:  string;
// } // อันนี้ใช้ในการสร้าง trip ใหม่ เเละส่งไป server

// interface Note {
//     id: number;
//     note: string;
//     user_profile: string; // URL of the user's profile image
//     user_name: string;
//     is_editable: boolean; // true if the note can be edited by the current user
// } // อันนี้รับมาจาก server ใช้กับ NoteBox

// interface interFlight {
//     id: number;
//     flight_number: string;
//     departure_airport: string;
//     arrival_airport: string;
//     departure_date: string; // ISO format
//     arrival_date: string; // ISO format
//     airline: string;
//     departure_country: string;
//     arrival_country: string;
// } // อันนี้รับมาจาก server ใช้กับ FlightBox เเละส่งไป server ตอนเพิ่ม flight

// // <----------------------- Guide ------------------------>

// interface GuideBox {
//   id: number;
//   title: string;
//   staertdate: string;
//   enddate: string;
//   guide_image: string; // URL of the image
//   copies: number;
//   owner_name: string;
//   owner_image: string; // URL of the owner's image
//   owner_comments: number; // ในหน้า Overview มันมีอยู่เอา Note ของ Owner มาโชว์่่
// }

// // <----------------------- Place ------------------------>

// interface PlaceBox {
//   id: number;
//   title: string;
//   rating?: number;
//   reviewCount?: number;
//   location: string;
//   place_image?: string;
// }

// // <----------------------- User ------------------------>

// interface UserDetails {
//   id: number;
//   name: string;
//   phone: string;
//   user_image: string;
//   email?: string;
//   bio_image?: string;
// }

// // <----------------------- Add On Function ------------------------>

// interface LoadingState {
//   currentTrip: boolean;
//   invitations: boolean;
//   places: boolean;
//   guidePlans: boolean;
//   refreshing: boolean;
// }