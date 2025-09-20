// mockDataFixed.ts - Corrected Mock Data with all fixes

// ========== MOCK DATA EXPORTS ==========

// 1. Transportation Options (Standard 6 types)
export const mockTransportationOptions: TransportationOption[] = [
  { id: 1, type: 'Car' },
  { id: 2, type: 'Bus' },
  { id: 3, type: 'Train' },
  { id: 4, type: 'Walk' },
  { id: 5, type: 'Flight' },
  { id: 6, type: 'Boat' }
];

// 2. User Details
export const mockUserDetails: UserDetails[] = [
  {
    id: "1",
    name: "John Smith",
    phone: "+1-555-0123",
    user_image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    email: "john.smith@email.com",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    phone: "+1-555-0124",
    user_image:
      "https://images.unsplash.com/photo-1494790108755-2616b2e11881?w=150&h=150&fit=crop&crop=face",
    email: "sarah.johnson@email.com",
  },
  {
    id: "3",
    name: "Chris Lee",
    phone: "+1-555-0131",
    user_image:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop&crop=face",
    email: "chris.lee@email.com",
  },
  {
    id: "4",
    name: "Michael Chen",
    phone: "+1-555-0125",
    user_image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    email: "michael.chen@email.com",
  },
  {
    id: "5",
    name: "Emily Davis",
    phone: "+1-555-0126",
    user_image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    email: "emily.davis@email.com",
  },
  {
    id: "6",
    name: "David Wilson",
    phone: "+1-555-0127",
    user_image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    email: "david.wilson@email.com",
  },
  {
    id: "7",
    name: "Alice Wang",
    phone: "+1-555-0128",
    user_image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    email: "alice.wang@email.com",
  },
  {
    id: "8",
    name: "Bob Chen",
    phone: "+1-555-0129",
    user_image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    email: "bob.chen@email.com",
  },
  {
    id: "9",
    name: "Carol Smith",
    phone: "+1-555-0130",
    user_image:
      "https://images.unsplash.com/photo-1494790108755-2616b2e11881?w=150&h=150&fit=crop",
    email: "carol.smith@email.com",
  },
  {
    id: "10",
    name: "Keen_Kung",
    phone: "+66-812-345-678",
    user_image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    email: "keen.kung@email.com",
  },
  {
    id: "11",
    name: "Sarah Kim",
    phone: "+82-10-1234-5678",
    user_image:
      "https://images.unsplash.com/photo-1494790108755-2616b2e11881?w=150&h=150&fit=crop",
    email: "sarah.kim@email.com",
  },
];



// 4. Flight Data
// เพิ่ม Flight Data สำหรับ Guide Trips
export const mockFlights: Flight[] = [
  // --- ของเดิม ---
  {
    id: 1,
    departure_airport: "LAX",
    arrival_airport: "NRT",
    departure_date: "2025-09-05T10:30:00",
    arrival_date: "2025-09-06T15:45:00",
    airline: "Japan Airlines",
    departure_country: "United States",
    arrival_country: "Japan",
    trip_id: 1
  },
  {
    id: 2,
    departure_airport: "NRT",
    arrival_airport: "LAX",
    departure_date: "2025-09-12T18:20:00",
    arrival_date: "2025-09-12T11:15:00",
    airline: "Japan Airlines",
    departure_country: "Japan",
    arrival_country: "United States",
    trip_id: 1
  },
  {
    id: 3,
    departure_airport: "JFK",
    arrival_airport: "CDG",
    departure_date: "2025-09-23T20:15:00",
    arrival_date: "2025-09-24T09:30:00",
    airline: "Air France",
    departure_country: "United States",
    arrival_country: "France",
    trip_id: 2
  },
  {
    id: 4,
    departure_airport: "BKK",
    arrival_airport: "HKT",
    departure_date: "2025-08-19T08:45:00",
    arrival_date: "2025-08-19T10:15:00",
    airline: "Bangkok Airways",
    departure_country: "Thailand",
    arrival_country: "Thailand",
    trip_id: 3
  },

  // --- ใหม่ เพิ่มให้ trip_id 9–11 ---
  {
    id: 5,
    departure_airport: "SFO",
    arrival_airport: "HND",
    departure_date: "2025-07-14T22:30:00",
    arrival_date: "2025-07-15T04:55:00",
    airline: "ANA",
    departure_country: "United States",
    arrival_country: "Japan",
    trip_id: 9 // Ultimate Japan Travel Guide
  },
  {
    id: 6,
    departure_airport: "HND",
    arrival_airport: "SFO",
    departure_date: "2025-07-25T17:30:00",
    arrival_date: "2025-07-25T10:15:00",
    airline: "ANA",
    departure_country: "Japan",
    arrival_country: "United States",
    trip_id: 9
  },
  {
    id: 7,
    departure_airport: "EWR",
    arrival_airport: "FRA",
    departure_date: "2025-09-09T19:45:00",
    arrival_date: "2025-09-10T09:10:00",
    airline: "Lufthansa",
    departure_country: "United States",
    arrival_country: "Germany",
    trip_id: 10 // European Backpacker's Paradise
  },
  {
    id: 8,
    departure_airport: "FCO",
    arrival_airport: "EWR",
    departure_date: "2025-09-30T14:30:00",
    arrival_date: "2025-09-30T17:45:00",
    airline: "United Airlines",
    departure_country: "Italy",
    arrival_country: "United States",
    trip_id: 10
  },
  {
    id: 9,
    departure_airport: "ICN",
    arrival_airport: "BKK",
    departure_date: "2025-12-19T23:00:00",
    arrival_date: "2025-12-20T02:30:00",
    airline: "Thai Airways",
    departure_country: "South Korea",
    arrival_country: "Thailand",
    trip_id: 11 // Thailand Island Hopping
  },
  {
    id: 10,
    departure_airport: "HKT",
    arrival_airport: "ICN",
    departure_date: "2025-12-28T18:45:00",
    arrival_date: "2025-12-28T23:30:00",
    airline: "Thai Airways",
    departure_country: "Thailand",
    arrival_country: "South Korea",
    trip_id: 11
  }
];


// 5. File Groups
export const mockFileGroups: FileGroup[] = [
  {
    id: 1,
    file_name: "Japan_Itinerary_v2.pdf",
    file_url: "https://example.com/files/japan_itinerary_v2.pdf",
    uploaded_date: "2025-09-01T14:30:00",
    uploaded_by: "John Smith",
    file_size_mb: 2.5,
    file_type: "application/pdf",
    trip_id: 1 // Japan trip
  },
  {
    id: 2,
    file_name: "Hotel_Reservations_Tokyo.docx",
    file_url: "https://example.com/files/hotel_reservations_tokyo.docx",
    uploaded_date: "2025-09-02T09:15:00",
    uploaded_by: "Sarah Johnson",
    file_size_mb: 1.2,
    file_type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    trip_id: 1 // Japan trip
  },
  {
    id: 3,
    file_name: "Europe_Train_Tickets.jpg",
    file_url: "https://example.com/files/europe_train_tickets.jpg",
    uploaded_date: "2025-09-03T16:45:00",
    uploaded_by: "Michael Chen",
    file_size_mb: 0.8,
    file_type: "image/jpeg",
    trip_id: 2 // European trip
  },
  {
    id: 4,
    file_name: "Emergency_Contacts_Europe.xlsx",
    file_url: "https://example.com/files/emergency_contacts_europe.xlsx",
    uploaded_date: "2025-09-04T11:20:00",
    uploaded_by: "Emily Davis",
    file_size_mb: 0.3,
    file_type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    trip_id: 2 // European trip
  },
  {
    id: 5,
    file_name: "Thailand_Passport_Copies.zip",
    file_url: "https://example.com/files/thailand_passport_copies.zip",
    uploaded_date: "2025-08-15T13:10:00",
    uploaded_by: "John Smith",
    file_size_mb: 4.7,
    file_type: "application/zip",
    trip_id: 3 // Thailand trip (completed)
  }
];

// 6. Notifications
export const mockNotifications: NotificationBox[] = [
  {
    id: 1,
    title: "Vote Required",
    message: "Please vote for dinner location on Day 3 of Japan Adventure trip",
    created_at: "2025-09-07T14:30:00",
    notification_type: "vote",
    trip_id: 1 // Japan trip
  },
  {
    id: 2,
    title: "New Member Joined",
    message: "Michael Chen joined your European Backpacking trip",
    created_at: "2025-09-06T10:15:00",
    notification_type: "member",
    trip_id: 2 // European trip
  },
  {
    id: 3,
    title: "Flight Update",
    message: "Your flight JL061 departure time has been changed to 11:30 AM",
    created_at: "2025-09-05T16:45:00",
    notification_type: "flight",
    trip_id: 1 // Japan trip
  },
  {
    id: 4,
    title: "Trip Reminder",
    message: "Don't forget to pack your passport! Japan trip starts tomorrow",
    created_at: "2025-09-04T09:00:00",
    notification_type: "reminder",
    trip_id: 1 // Japan trip
  },
  {
    id: 5,
    title: "Activity Added",
    message: "Sarah Johnson added 'Visit Louvre Museum' to Day 2 itinerary",
    created_at: "2025-09-03T19:20:00",
    notification_type: "activity",
    trip_id: 2 // European trip
  },
  {
    id: 6,
    title: "Budget Update",
    message: "European trip budget has been updated to $3,200 per person",
    created_at: "2025-09-02T12:15:00",
    notification_type: "budget",
    trip_id: 2 // European trip
  }
];

// 7. Trip Members
export const mockTripMembers: TripMember[] = [
  {
    id: 1,
    name: "John Smith",
    user_image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    email: "john.smith@email.com",
    phone: "+1-555-0123",
    role: "owner",
    trip_id: 1 // Summer Adventure in Japan
  },
  {
    id: 2,
    name: "Sarah Johnson",
    user_image: "https://images.unsplash.com/photo-1494790108755-2616b2e11881?w=150&h=150&fit=crop&crop=face",
    email: "sarah.johnson@email.com",
    phone: "+1-555-0124",
    role: "editor",
    trip_id: 1
  },
  {
    id: 3,
    name: "Chris Lee",
    user_image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop&crop=face",
    email: "chris.lee@email.com",
    phone: "+1-555-0131",
    role: "viewer",
    trip_id: 1
  },
  {
    id: 4,
    name: "Michael Chen",
    user_image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    email: "michael.chen@email.com",
    phone: "+1-555-0125",
    role: "owner",
    trip_id: 2 // European Backpacking Tour
  },
  {
    id: 5,
    name: "Emily Davis",
    user_image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    email: "emily.davis@email.com",
    phone: "+1-555-0126",
    role: "viewer",
    trip_id: 2
  },
  {
    id: 6,
    name: "David Wilson",
    user_image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    email: "david.wilson@email.com",
    phone: "+1-555-0127",
    role: "owner",
    trip_id: 3 // Thailand Beach Getaway
  },
  {
    id: 7,
    name: "Alice Wang",
    user_image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    email: "alice.wang@email.com",
    phone: "+1-555-0128",
    role: "owner",
    trip_id: 4 // Tokyo Winter Festival
  },
  {
    id: 8,
    name: "Bob Chen",
    user_image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    email: "bob.chen@email.com",
    phone: "+1-555-0129",
    role: "owner",
    trip_id: 5 // Bali Adventure
  },
  {
    id: 9,
    name: "Carol Smith",
    user_image: "https://images.unsplash.com/photo-1494790108755-2616b2e11881?w=150&h=150&fit=crop",
    email: "carol.smith@email.com",
    phone: "+1-555-0130",
    role: "owner",
    trip_id: 6 // Swiss Alps Hiking
  },
  {
    id: 10,
    name: "Keen_Kung",
    user_image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    email: "keen.kung@email.com",
    phone: "+66-812-345-678",
    role: "owner",
    trip_id: 7 // Trip to Thailand (Invitation)
  },
  {
    id: 11,
    name: "Sarah Kim",
    user_image: "https://images.unsplash.com/photo-1494790108755-2616b2e11881?w=150&h=150&fit=crop",
    email: "sarah.kim@email.com",
    phone: "+82-10-1234-5678",
    role: "owner",
    trip_id: 8 // Korean Food Tour (Invitation)
  },
];

export const mockWeathers: Weather[] = [
  // Trip 1: Summer Adventure in Japan (2025-09-05 → 2025-09-12, NOW, today=09-08 → มี 4 วันแรกต่อเนื่อง)
  { id: 1, trip_id: 1, date: "2025-09-05", weather_code: 1 }, // Clouds
  { id: 2, trip_id: 1, date: "2025-09-06", weather_code: 4 }, // Rain
  { id: 3, trip_id: 1, date: "2025-09-07", weather_code: 0 }, // Clear
  { id: 4, trip_id: 1, date: "2025-09-08", weather_code: 3 }, // Drizzle

  // Trip 2: European Backpacking Tour (2025-09-23 → 2025-10-13, future → แค่บางวันแรก ๆ)
  { id: 5, trip_id: 2, date: "2025-09-23", weather_code: 0 }, // Clear
  { id: 6, trip_id: 2, date: "2025-09-24", weather_code: 1 }, // Clouds
  { id: 7, trip_id: 2, date: "2025-09-25", weather_code: 2 }, // Fog/Mist

  // Trip 3: Thailand Beach Getaway (2025-08-19 → 2025-08-27, completed → ต้องครบ 9 วัน)
  { id: 8, trip_id: 3, date: "2025-08-19", weather_code: 0 },
  { id: 9, trip_id: 3, date: "2025-08-20", weather_code: 1 },
  { id: 10, trip_id: 3, date: "2025-08-21", weather_code: 4 },
  { id: 11, trip_id: 3, date: "2025-08-22", weather_code: 0 },
  { id: 12, trip_id: 3, date: "2025-08-23", weather_code: 0 },
  { id: 13, trip_id: 3, date: "2025-08-24", weather_code: 5 },
  { id: 14, trip_id: 3, date: "2025-08-25", weather_code: 7 },
  { id: 15, trip_id: 3, date: "2025-08-26", weather_code: 1 },
  { id: 16, trip_id: 3, date: "2025-08-27", weather_code: 0 },

  // Trip 4: Tokyo Winter Festival (2025-12-06 → 2025-12-11, future → บางวันแรกต่อเนื่อง)
  { id: 17, trip_id: 4, date: "2025-12-06", weather_code: 5 }, // Snow
  { id: 18, trip_id: 4, date: "2025-12-07", weather_code: 6 }, // Ice/Sleet

  // Trip 5: Bali Adventure (2025-11-15 → 2025-11-22, future → บางวันแรกต่อเนื่อง)
  { id: 19, trip_id: 5, date: "2025-11-15", weather_code: 0 },
  { id: 20, trip_id: 5, date: "2025-11-16", weather_code: 4 },

  // Trip 6: Swiss Alps Hiking (2025-07-10 → 2025-07-17, completed → ต้องครบ 8 วัน)
  { id: 21, trip_id: 6, date: "2025-07-10", weather_code: 1 },
  { id: 22, trip_id: 6, date: "2025-07-11", weather_code: 4 },
  { id: 23, trip_id: 6, date: "2025-07-12", weather_code: 0 },
  { id: 24, trip_id: 6, date: "2025-07-13", weather_code: 5 },
  { id: 25, trip_id: 6, date: "2025-07-14", weather_code: 6 },
  { id: 26, trip_id: 6, date: "2025-07-15", weather_code: 7 },
  { id: 27, trip_id: 6, date: "2025-07-16", weather_code: 1 },
  { id: 28, trip_id: 6, date: "2025-07-17", weather_code: 0 }
];

// <---------------------------------- Note ---------------------------->

// 8. Notes
export const mockNotes: Note[] = [
  // ========== TRIP 1: Summer Adventure in Japan ==========
  {
    id: 1,
    note_text: "Don't forget to try the famous ramen here! Best time to visit is around 11 AM to avoid crowds.",
    user_profile: mockUserDetails[0].user_image,
    user_name: mockUserDetails[0].name, // John Smith
    is_editable: true,
    refer_user_id: 1, // John Smith in trip_id 1
    reference_id: 1,
    reference_type: 'place',
    created_at: "2025-09-08T14:30:00",
    trip_id: 1
  },
  {
    id: 2,
    note_text: "Bring comfortable walking shoes. The temple grounds are quite large.",
    user_profile: mockUserDetails[1].user_image,
    user_name: mockUserDetails[1].name, // Sarah Johnson
    is_editable: false,
    refer_user_id: 2, // Sarah Johnson in trip_id 1
    reference_id: 2,
    reference_type: 'place',
    created_at: "2025-09-07T10:15:00",
    trip_id: 1
  },
  {
    id: 5,
    note_text: "Amazing street food! Try the takoyaki from the vendor on the left side.",
    user_profile: mockUserDetails[1].user_image,
    user_name: mockUserDetails[1].name, // Sarah Johnson
    is_editable: true,
    refer_user_id: 2,
    reference_id: 5,
    reference_type: 'place',
    created_at: "2025-09-07T18:20:00",
    trip_id: 1
  },
  {
    id: 6,
    note_text: "Perfect spot for cherry blossom viewing in spring season.",
    user_profile: mockUserDetails[2].user_image,
    user_name: mockUserDetails[2].name, // Michael Chen (ไม่ใช่ member trip 1 → assign owner แทน)
    is_editable: false,
    refer_user_id: 1, // Fallback ให้ John Smith (owner)
    reference_id: 4,
    reference_type: 'place',
    created_at: "2025-09-06T12:45:00",
    trip_id: 1
  },
  {
    id: 7,
    note_text: "Overall trip highlight: Japan’s culture mix of tradition and modern life.",
    user_profile: mockUserDetails[0].user_image,
    user_name: mockUserDetails[0].name,
    is_editable: true,
    refer_user_id: 1,
    reference_type: 'overview',
    created_at: "2025-09-08T20:00:00",
    trip_id: 1
  },
  {
    id: 8,
    note_text: "Budget seems on track, keep checking transport costs.",
    user_profile: mockUserDetails[1].user_image,
    user_name: mockUserDetails[1].name,
    is_editable: true,
    refer_user_id: 2,
    reference_type: 'overview',
    created_at: "2025-09-08T21:00:00",
    trip_id: 1
  },
  {
  id: 19,
  note_text: "Enjoying the trip so far, great mix of activities and relaxation.",
  user_profile: mockUserDetails[2].user_image, // Michael Chen
  user_name: mockUserDetails[2].name,
  is_editable: false,
  refer_user_id: 3, // Michael Chen
  reference_type: "overview",
  created_at: "2025-09-08T22:00:00",
  trip_id: 1
  },

  // ========== TRIP 2: European Backpacking Tour ==========
  {
    id: 3,
    note_text: "Remember to book train tickets in advance during peak season.",
    user_profile: mockUserDetails[2].user_image,
    user_name: mockUserDetails[2].name, // Michael Chen
    is_editable: true,
    refer_user_id: 3, // Michael Chen in trip_id 2
    reference_id: 1,
    reference_type: 'event',
    created_at: "2025-09-06T16:45:00",
    trip_id: 2
  },
  {
    id: 9,
    note_text: "Trip overview: Backpacking requires lightweight packing.",
    user_profile: mockUserDetails[2].user_image,
    user_name: mockUserDetails[2].name,
    is_editable: true,
    refer_user_id: 3,
    reference_type: 'overview',
    created_at: "2025-09-08T12:00:00",
    trip_id: 2
  },
  {
    id: 10,
    note_text: "Double-check visa requirements for Schengen countries.",
    user_profile: mockUserDetails[1].user_image,
    user_name: mockUserDetails[1].name, // Sarah Johnson (ไม่ใช่ member trip 2 → assign owner แทน)
    is_editable: false,
    refer_user_id: 3, // Michael Chen (owner trip 2)
    reference_type: 'overview',
    created_at: "2025-09-08T12:30:00",
    trip_id: 2
  },

  // ========== TRIP 3: Thailand Beach Getaway ==========
  {
    id: 4,
    note_text: "The sunset view from here is absolutely stunning! Arrive by 6 PM.",
    user_profile: mockUserDetails[0].user_image,
    user_name: mockUserDetails[0].name, // John Smith
    is_editable: true,
    refer_user_id: 1, // John Smith in trip_id 3
    reference_id: 3,
    reference_type: 'place',
    created_at: "2025-08-25T19:20:00",
    trip_id: 3
  },
  {
    id: 11,
    note_text: "Beach trip was relaxing, weather was perfect.",
    user_profile: mockUserDetails[0].user_image,
    user_name: mockUserDetails[0].name,
    is_editable: true,
    refer_user_id: 1,
    reference_type: 'overview',
    created_at: "2025-08-28T10:00:00",
    trip_id: 3
  },
  {
    id: 12,
    note_text: "Expenses lower than expected, mainly food and local transport.",
    user_profile: mockUserDetails[2].user_image,
    user_name: mockUserDetails[2].name, // Michael Chen (ไม่ใช่ member trip 3 → assign David Wilson)
    is_editable: false,
    refer_user_id: 5, // David Wilson (viewer trip 3)
    reference_type: 'overview',
    created_at: "2025-08-28T11:00:00",
    trip_id: 3
  },

  // ========== TRIP 4: Tokyo Winter Festival ==========
  {
    id: 13,
    note_text: "Expect cold weather during the festival.",
    user_profile: mockUserDetails[1].user_image,
    user_name: mockUserDetails[1].name, // Sarah Johnson (ไม่ใช่ member trip 4 → assign owner)
    is_editable: true,
    refer_user_id: 6, // Alice Wang (owner trip 4)
    reference_type: 'overview',
    created_at: "2025-09-08T09:00:00",
    trip_id: 4
  },
  {
    id: 14,
    note_text: "Plan for festival tickets early.",
    user_profile: mockUserDetails[2].user_image,
    user_name: mockUserDetails[2].name, // Michael Chen
    is_editable: false,
    refer_user_id: 6, // Alice Wang
    reference_type: 'overview',
    created_at: "2025-09-08T09:30:00",
    trip_id: 4
  },

  // ========== TRIP 5: Bali Adventure ==========
  {
    id: 15,
    note_text: "Adventure activities may require pre-booking.",
    user_profile: mockUserDetails[0].user_image,
    user_name: mockUserDetails[0].name, // John Smith
    is_editable: true,
    refer_user_id: 7, // Bob Chen (owner trip 5)
    reference_type: 'overview',
    created_at: "2025-09-08T08:00:00",
    trip_id: 5
  },
  {
    id: 16,
    note_text: "Remember to carry local currency for small vendors.",
    user_profile: mockUserDetails[1].user_image,
    user_name: mockUserDetails[1].name, // Sarah Johnson
    is_editable: false,
    refer_user_id: 7, // Bob Chen
    reference_type: 'overview',
    created_at: "2025-09-08T08:30:00",
    trip_id: 5
  },

  // ========== TRIP 6: Swiss Alps Hiking ==========
  {
    id: 17,
    note_text: "Hiking conditions were safe, but some trails steep.",
    user_profile: mockUserDetails[2].user_image,
    user_name: mockUserDetails[2].name, // Michael Chen
    is_editable: true,
    refer_user_id: 8, // Carol Smith (owner trip 6)
    reference_type: 'overview',
    created_at: "2025-07-18T10:00:00",
    trip_id: 6
  },
  {
    id: 18,
    note_text: "Overall great team spirit during the hike.",
    user_profile: mockUserDetails[0].user_image,
    user_name: mockUserDetails[0].name,
    is_editable: false,
    refer_user_id: 8, // Carol Smith
    reference_type: 'overview',
    created_at: "2025-07-18T11:00:00",
    trip_id: 6
  }
];

// <-------------------- Place ----------------------------------->

// 18. Place Boxes (5 places)
export const mockPlaceBoxes: PlaceBox[] = [
  {
    id: 1,
    title: "Tokyo Tower",
    rating: 4.3,
    review_count: 15420,
    location: "Minato City, Tokyo",
    place_image: "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=300&h=200&fit=crop",
    place_id: 1
  },
  {
    id: 2,
    title: "Senso-ji Temple",
    rating: 4.6,
    review_count: 28350,
    location: "Asakusa, Tokyo",
    place_image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=300&h=200&fit=crop",
    place_id: 2
  },
  {
    id: 3,
    title: "Shibuya Crossing",
    rating: 4.4,
    review_count: 32100,
    location: "Shibuya City, Tokyo",
    place_image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=300&h=200&fit=crop",
    place_id: 3
  },
  {
    id: 4,
    title: "Meiji Shrine",
    rating: 4.5,
    review_count: 19800,
    location: "Shibuya City, Tokyo",
    place_image: "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=300&h=200&fit=crop",
    place_id: 4
  },
  {
    id: 5,
    title: "Tsukiji Outer Market",
    rating: 4.2,
    review_count: 12450,
    location: "Chuo City, Tokyo",
    place_image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
    place_id: 5
  },
  {
    id: 6,
    title: "Fushimi Inari Shrine",
    rating: 4.7,
    review_count: 45200,
    location: "Kyoto, Japan",
    place_image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=300&h=200&fit=crop",
    place_id: 6
  },
  {
    id: 7,
    title: "Kiyomizu-dera Temple",
    rating: 4.5,
    review_count: 33100,
    location: "Kyoto, Japan",
    place_image: "https://images.unsplash.com/photo-1529258283598-8d6fe60b27f4?w=300&h=200&fit=crop",
    place_id: 7
  },
  {
    id: 8,
    title: "Osaka Castle",
    rating: 4.3,
    review_count: 28900,
    location: "Osaka, Japan",
    place_image: "https://images.unsplash.com/photo-1590253230532-5e90ac2721d3?w=300&h=200&fit=crop",
    place_id: 8
  },
  // European Places (9-12)
  {
    id: 9,
    title: "Eiffel Tower",
    rating: 4.4,
    review_count: 125000,
    location: "Paris, France",
    place_image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=300&h=200&fit=crop",
    place_id: 9
  },
  {
    id: 10,
    title: "Louvre Museum",
    rating: 4.6,
    review_count: 98500,
    location: "Paris, France",
    place_image: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=300&h=200&fit=crop",
    place_id: 10
  },
  {
    id: 11,
    title: "Colosseum",
    rating: 4.5,
    review_count: 87300,
    location: "Rome, Italy",
    place_image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=300&h=200&fit=crop",
    place_id: 11
  },
  {
    id: 12,
    title: "Sagrada Familia",
    rating: 4.7,
    review_count: 76400,
    location: "Barcelona, Spain",
    place_image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=300&h=200&fit=crop",
    place_id: 12
  },
  // Thailand Places (13-15)
  {
    id: 13,
    title: "Grand Palace",
    rating: 4.4,
    review_count: 42100,
    location: "Bangkok, Thailand",
    place_image: "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=300&h=200&fit=crop",
    place_id: 13
  },
  {
    id: 14,
    title: "Phi Phi Islands",
    rating: 4.6,
    review_count: 35800,
    location: "Krabi, Thailand",
    place_image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
    place_id: 14
  },
  {
    id: 15,
    title: "Wat Pho Temple",
    rating: 4.5,
    review_count: 29200,
    location: "Bangkok, Thailand",
    place_image: "https://images.unsplash.com/photo-1480344734316-0db52fcd5619?w=300&h=200&fit=crop",
    place_id: 15
  }
];

// 19. Place Details (5 places - matching PlaceBox) อ้างอิง Note
export const mockPlaceDetails: PlaceDetails[] = [
  {
    id: 1,
    title: "Tokyo Tower",
    description: "Tokyo Tower is a communications and observation tower in the Sumida district of Tokyo, Japan. At 333 meters tall, it was the tallest structure in Japan from its completion in 1958 until 2012.",
    rating: 4.3,
    review_count: 15420,
    location: "Minato City, Tokyo",
    place_image: "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=300&h=200&fit=crop",
    categories: ["Tourist Attraction", "Observation Deck", "Tower"],
    map_link: "https://maps.google.com/?q=Tokyo+Tower",
    official_link: "https://www.tokyotower.co.jp/en.html",
    notes: mockNotes.filter(note => note.reference_id === 1 && note.reference_type === 'place')
  },
  {
    id: 2,
    title: "Senso-ji Temple",
    description: "Sensō-ji is an ancient Buddhist temple located in Asakusa, Tokyo, Japan. It is Tokyo's oldest temple, and one of its most significant.",
    rating: 4.6,
    review_count: 28350,
    location: "Asakusa, Tokyo",
    place_image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=300&h=200&fit=crop",
    categories: ["Temple", "Religious Site", "Cultural Heritage"],
    map_link: "https://maps.google.com/?q=Senso-ji+Temple",
    official_link: "https://www.senso-ji.jp/",
    notes: mockNotes.filter(note => note.reference_id === 2 && note.reference_type === 'place')
  },
  {
    id: 3,
    title: "Shibuya Crossing",
    description: "Shibuya Crossing is a popular scramble crossing in Shibuya, Tokyo, Japan. It is located in front of the Shibuya Station Hachikō exit and stops vehicles in all directions to allow pedestrians to inundate the entire intersection.",
    rating: 4.4,
    review_count: 32100,
    location: "Shibuya City, Tokyo",
    place_image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=300&h=200&fit=crop",
    categories: ["Tourist Attraction", "Street", "Urban Experience"],
    map_link: "https://maps.google.com/?q=Shibuya+Crossing",
    official_link: "https://www.shibuya-scramble-square.com/",
    notes: mockNotes.filter(note => note.reference_id === 3 && note.reference_type === 'place')
  },
  {
    id: 4,
    title: "Meiji Shrine",
    description: "Meiji Shrine is a Shinto shrine in Shibuya, Tokyo, that is dedicated to the deified spirits of Emperor Meiji and his wife, Empress Shōken. The shrine is located in a forest of 120,000 trees of 365 different species.",
    rating: 4.5,
    review_count: 19800,
    location: "Shibuya City, Tokyo",
    place_image: "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=300&h=200&fit=crop",
    categories: ["Shrine", "Religious Site", "Nature", "Cultural Heritage"],
    map_link: "https://maps.google.com/?q=Meiji+Shrine",
    official_link: "https://www.meijijingu.or.jp/en/",
    notes: []
  },
  {
    id: 5,
    title: "Tsukiji Outer Market",
    description: "The Tsukiji Outer Market is a district in Chūō, Tokyo, Japan, between the Tsukiji and Ginza districts. It is the site of the Tsukiji fish market, famous for its tuna auctions and fresh seafood.",
    rating: 4.2,
    review_count: 12450,
    location: "Chuo City, Tokyo",
    place_image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
    categories: ["Market", "Food", "Cultural Experience"],
    map_link: "https://maps.google.com/?q=Tsukiji+Outer+Market",
    official_link: "https://www.tsukiji.or.jp/english/",
    notes: []
  },
  {
    id: 6,
    title: "Fushimi Inari Shrine",
    description: "Fushimi Inari Taisha is the head shrine of the kami Inari, located in Fushimi-ku, Kyoto, Kyoto Prefecture, Japan. The shrine sits at the base of a mountain also named Inari which is 233 metres above sea level, and includes trails up the mountain to many smaller shrines.",
    rating: 4.7,
    review_count: 45200,
    location: "Kyoto, Japan",
    place_image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=300&h=200&fit=crop",
    categories: ["Shrine", "Religious Site", "Hiking", "Cultural Heritage"],
    map_link: "https://maps.google.com/?q=Fushimi+Inari+Shrine",
    official_link: "http://inari.jp/en/",
    notes: []
  },
  {
    id: 7,
    title: "Kiyomizu-dera Temple",
    description: "Kiyomizu-dera, officially Otowa-san Kiyomizu-dera, is an independent Buddhist temple in eastern Kyoto. The temple is part of the Historic Monuments of Ancient Kyoto UNESCO World Heritage Site.",
    rating: 4.5,
    review_count: 33100,
    location: "Kyoto, Japan",
    place_image: "https://images.unsplash.com/photo-1529258283598-8d6fe60b27f4?w=300&h=200&fit=crop",
    categories: ["Temple", "Religious Site", "UNESCO Site", "Cultural Heritage"],
    map_link: "https://maps.google.com/?q=Kiyomizu-dera+Temple",
    official_link: "https://www.kiyomizudera.or.jp/en/",
    notes: []
  },
  {
    id: 8,
    title: "Osaka Castle",
    description: "Osaka Castle is a Japanese castle in Chūō-ku, Osaka, Japan. The castle is one of Japan's most famous landmarks and it played a major role in the unification of Japan during the sixteenth century of the Azuchi-Momoyama period.",
    rating: 4.3,
    review_count: 28900,
    location: "Osaka, Japan",
    place_image: "https://images.unsplash.com/photo-1590253230532-5e90ac2721d3?w=300&h=200&fit=crop",
    categories: ["Castle", "Historical Site", "Museum", "Cultural Heritage"],
    map_link: "https://maps.google.com/?q=Osaka+Castle",
    official_link: "https://www.osakacastle.net/english/",
    notes: []
  },
  // European Places (9-12)
  {
    id: 9,
    title: "Eiffel Tower",
    description: "The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France. It is named after the engineer Gustave Eiffel, whose company designed and built the tower.",
    rating: 4.4,
    review_count: 125000,
    location: "Paris, France",
    place_image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=300&h=200&fit=crop",
    categories: ["Tower", "Tourist Attraction", "Landmark", "Architecture"],
    map_link: "https://maps.google.com/?q=Eiffel+Tower",
    official_link: "https://www.toureiffel.paris/en",
    notes: []
  },
  {
    id: 10,
    title: "Louvre Museum",
    description: "The Louvre, or the Louvre Museum, is the world's most-visited museum, and a historic landmark in Paris, France. It is the home of some of the best-known works of art, including the Mona Lisa and the Venus de Milo.",
    rating: 4.6,
    review_count: 98500,
    location: "Paris, France",
    place_image: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=300&h=200&fit=crop",
    categories: ["Museum", "Art Gallery", "Cultural Heritage", "Tourist Attraction"],
    map_link: "https://maps.google.com/?q=Louvre+Museum",
    official_link: "https://www.louvre.fr/en",
    notes: []
  },
  {
    id: 11,
    title: "Colosseum",
    description: "The Colosseum is an oval amphitheatre in the centre of the city of Rome, Italy, just east of the Roman Forum. It is the largest amphitheatre ever built, measuring approximately 189 meters long, 156 meters wide and 50 meters high.",
    rating: 4.5,
    review_count: 87300,
    location: "Rome, Italy",
    place_image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=300&h=200&fit=crop",
    categories: ["Historical Site", "Ancient Architecture", "UNESCO Site", "Tourist Attraction"],
    map_link: "https://maps.google.com/?q=Colosseum+Rome",
    official_link: "https://parcocolosseo.it/en/",
    notes: []
  },
  {
    id: 12,
    title: "Sagrada Familia",
    description: "The Basílica de la Sagrada Família, also known as the Sagrada Família, is a large unfinished Roman Catholic minor basilica in the Eixample district of Barcelona, Catalonia, Spain.",
    rating: 4.7,
    review_count: 76400,
    location: "Barcelona, Spain",
    place_image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=300&h=200&fit=crop",
    categories: ["Basilica", "Architecture", "UNESCO Site", "Religious Site"],
    map_link: "https://maps.google.com/?q=Sagrada+Familia",
    official_link: "https://sagradafamilia.org/en/",
    notes: []
  },
  // Thailand Places (13-15)
  {
    id: 13,
    title: "Grand Palace",
    description: "The Grand Palace is a complex of buildings at the heart of Bangkok, Thailand. The palace has been the official residence of the Kings of Siam since 1782.",
    rating: 4.4,
    review_count: 42100,
    location: "Bangkok, Thailand",
    place_image: "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=300&h=200&fit=crop",
    categories: ["Palace", "Historical Site", "Cultural Heritage", "Tourist Attraction"],
    map_link: "https://maps.google.com/?q=Grand+Palace+Bangkok",
    official_link: "https://www.royalgrandpalace.th/en/home",
    notes: []
  },
  {
    id: 14,
    title: "Phi Phi Islands",
    description: "The Phi Phi Islands are an island group in Thailand between the large island of Phuket and the Straits of Malacca coast of Thailand. The islands are administratively part of Krabi Province.",
    rating: 4.6,
    review_count: 35800,
    location: "Krabi, Thailand",
    place_image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
    categories: ["Beach", "Island", "Nature", "Snorkeling"],
    map_link: "https://maps.google.com/?q=Phi+Phi+Islands",
    official_link: "https://www.phiphi.phuket.com/",
    notes: []
  },
  {
    id: 15,
    title: "Wat Pho Temple",
    description: "Wat Pho, also spelled Wat Po, is a Buddhist temple complex in the Phra Nakhon District, Bangkok, Thailand. It is on Rattanakosin Island, directly south of the Grand Palace.",
    rating: 4.5,
    review_count: 29200,
    location: "Bangkok, Thailand",
    place_image: "https://images.unsplash.com/photo-1480344734316-0db52fcd5619?w=300&h=200&fit=crop",
    categories: ["Temple", "Religious Site", "Cultural Heritage", "Massage School"],
    map_link: "https://maps.google.com/?q=Wat+Pho+Temple",
    official_link: "https://www.watpho.com/",
    notes: []
  }
];
// 20. Bookmark Place (from PlaceBox)
export const mockBookmarkPlaces: PlaceBox[] = [
  // User's favorite/bookmarked places from different categories
  {
    id: 1,
    title: "Tokyo Tower",
    rating: 4.3,
    review_count: 15420,
    location: "Minato City, Tokyo",
    place_image: "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=300&h=200&fit=crop",
    place_id: 1
  },
  {
    id: 6,
    title: "Fushimi Inari Shrine",
    rating: 4.7,
    review_count: 45200,
    location: "Kyoto, Japan",
    place_image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=300&h=200&fit=crop",
    place_id: 6
  },
  {
    id: 9,
    title: "Eiffel Tower",
    rating: 4.4,
    review_count: 125000,
    location: "Paris, France",
    place_image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=300&h=200&fit=crop",
    place_id: 9
  },
  {
    id: 10,
    title: "Louvre Museum",
    rating: 4.6,
    review_count: 98500,
    location: "Paris, France",
    place_image: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=300&h=200&fit=crop",
    place_id: 10
  },
  {
    id: 12,
    title: "Sagrada Familia",
    rating: 4.7,
    review_count: 76400,
    location: "Barcelona, Spain",
    place_image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=300&h=200&fit=crop",
    place_id: 12
  },
  {
    id: 14,
    title: "Phi Phi Islands",
    rating: 4.6,
    review_count: 35800,
    location: "Krabi, Thailand",
    place_image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
    place_id: 14
  },
  {
    id: 2,
    title: "Senso-ji Temple",
    rating: 4.6,
    review_count: 28350,
    location: "Asakusa, Tokyo",
    place_image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=300&h=200&fit=crop",
    place_id: 2
  },
  {
    id: 13,
    title: "Grand Palace",
    rating: 4.4,
    review_count: 42100,
    location: "Bangkok, Thailand",
    place_image: "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=300&h=200&fit=crop",
    place_id: 13
  }
];

// <-------------------------------------------- Activity ------------------------------------>

// 9. Activity Place Boxes อ้างอิง placeBox
export const mockActivityPlaceBoxes: ActivityPlaceBox[] = [
  // Trip 1: Summer Adventure in Japan
  {
    id: 1,
    title: "Visit Tokyo Tower",
    date: "2025-09-06",
    time_begin: "09:00",
    time_end: "11:30",
    location: "Minato City, Tokyo",
    place_id: 1,
    place_image: mockPlaceBoxes.find(p => p.place_id === 1)?.place_image,
    trip_id: 1
  },
  {
    id: 2,
    title: "Explore Senso-ji Temple",
    date: "2025-09-07",
    time_begin: "14:00",
    time_end: "16:00",
    location: "Asakusa, Tokyo",
    place_id: 2,
    place_image: mockPlaceBoxes.find(p => p.place_id === 2)?.place_image,
    trip_id: 1
  },

  // Trip 2: European Backpacking Tour
  {
    id: 3,
    title: "Eiffel Tower Visit",
    date: "2025-09-24",
    time_begin: "10:00",
    time_end: "12:00",
    location: "Paris, France",
    place_id: 9,
    place_image: mockPlaceBoxes.find(p => p.place_id === 9)?.place_image,
    trip_id: 2
  },
  {
    id: 4,
    title: "Visit Louvre Museum",
    date: "2025-09-25",
    time_begin: "13:30",
    time_end: "16:30",
    location: "Paris, France",
    place_id: 10,
    place_image: mockPlaceBoxes.find(p => p.place_id === 10)?.place_image,
    trip_id: 2
  },

  // Trip 3: Thailand Beach Getaway
  {
    id: 5,
    title: "Explore Grand Palace",
    date: "2025-08-20",
    time_begin: "09:00",
    time_end: "11:30",
    location: "Bangkok, Thailand",
    place_id: 13,
    place_image: mockPlaceBoxes.find(p => p.place_id === 13)?.place_image,
    trip_id: 3
  },
  {
    id: 6,
    title: "Phi Phi Islands Tour",
    date: "2025-08-21",
    time_begin: "08:00",
    time_end: "15:00",
    location: "Krabi, Thailand",
    place_id: 14,
    place_image: mockPlaceBoxes.find(p => p.place_id === 14)?.place_image,
    trip_id: 3
  },

  // Trip 4: Tokyo Winter Festival
  {
    id: 7,
    title: "Shibuya Crossing Walk",
    date: "2025-12-07",
    time_begin: "18:00",
    time_end: "20:00",
    location: "Shibuya City, Tokyo",
    place_id: 3,
    place_image: mockPlaceBoxes.find(p => p.place_id === 3)?.place_image,
    trip_id: 4
  },
  {
    id: 8,
    title: "Visit Meiji Shrine",
    date: "2025-12-08",
    time_begin: "09:30",
    time_end: "11:30",
    location: "Shibuya City, Tokyo",
    place_id: 4,
    place_image: mockPlaceBoxes.find(p => p.place_id === 4)?.place_image,
    trip_id: 4
  },

  // Trip 5: Bali Adventure
  {
    id: 9,
    title: "Explore Ubud Market",
    date: "2025-11-16",
    time_begin: "10:00",
    time_end: "12:00",
    location: "Ubud, Bali",
    place_id: 5, // ใช้แทน Tsukiji (mock ยังไม่มี Bali จริง)
    place_image: mockPlaceBoxes.find(p => p.place_id === 5)?.place_image,
    trip_id: 5
  },
  {
    id: 10,
    title: "Beach Walk at Kuta",
    date: "2025-11-17",
    time_begin: "16:00",
    time_end: "18:00",
    location: "Kuta, Bali",
    place_id: 6, // ใช้ Fushimi Inari เป็น mock
    place_image: mockPlaceBoxes.find(p => p.place_id === 6)?.place_image,
    trip_id: 5
  },

  // Trip 6: Swiss Alps Hiking
  {
    id: 11,
    title: "Zermatt Hiking Trail",
    date: "2025-07-11",
    time_begin: "09:00",
    time_end: "15:00",
    location: "Swiss Alps, Zermatt",
    place_id: 7, // ใช้ Kiyomizu-dera เป็น mock
    place_image: mockPlaceBoxes.find(p => p.place_id === 7)?.place_image,
    trip_id: 6
  },
  {
    id: 12,
    title: "Glacier Viewpoint",
    date: "2025-07-12",
    time_begin: "10:00",
    time_end: "14:00",
    location: "Swiss Alps, Jungfrau",
    place_id: 8,
    place_image: mockPlaceBoxes.find(p => p.place_id === 8)?.place_image,
    trip_id: 6
  },

  // Trip 7: Trip to Thailand (Invitation)
  {
    id: 13,
    title: "Wat Pho Temple Visit",
    date: "2025-10-26",
    time_begin: "09:30",
    time_end: "11:00",
    location: "Bangkok, Thailand",
    place_id: 15,
    place_image: mockPlaceBoxes.find(p => p.place_id === 15)?.place_image,
    trip_id: 7
  },
  {
    id: 14,
    title: "Grand Palace Tour",
    date: "2025-10-27",
    time_begin: "13:00",
    time_end: "15:00",
    location: "Bangkok, Thailand",
    place_id: 13,
    place_image: mockPlaceBoxes.find(p => p.place_id === 13)?.place_image,
    trip_id: 7
  },

  // Trip 8: Korean Food Tour (Invitation)
  {
    id: 15,
    title: "Street Food at Myeongdong",
    date: "2025-12-16",
    time_begin: "17:00",
    time_end: "20:00",
    location: "Seoul, South Korea",
    place_id: 1,
    place_image: mockPlaceBoxes.find(p => p.place_id === 1)?.place_image,
    trip_id: 8
  },
  {
    id: 16,
    title: "Traditional Market Visit",
    date: "2025-12-17",
    time_begin: "11:00",
    time_end: "13:00",
    location: "Seoul, South Korea",
    place_id: 2,
    place_image: mockPlaceBoxes.find(p => p.place_id === 2)?.place_image,
    trip_id: 8
  },

  // Trip 9: Ultimate Japan Travel Guide
  {
    id: 17,
    title: "Tsukiji Market Walk",
    date: "2025-07-16",
    time_begin: "08:00",
    time_end: "10:00",
    location: "Chuo City, Tokyo",
    place_id: 5,
    place_image: mockPlaceBoxes.find(p => p.place_id === 5)?.place_image,
    trip_id: 9
  },
  {
    id: 18,
    title: "Kyoto Fushimi Inari",
    date: "2025-07-17",
    time_begin: "09:00",
    time_end: "12:00",
    location: "Kyoto, Japan",
    place_id: 6,
    place_image: mockPlaceBoxes.find(p => p.place_id === 6)?.place_image,
    trip_id: 9
  },

  // Trip 10: European Backpacker's Paradise
  {
    id: 19,
    title: "Colosseum Tour",
    date: "2025-09-11",
    time_begin: "10:00",
    time_end: "12:30",
    location: "Rome, Italy",
    place_id: 11,
    place_image: mockPlaceBoxes.find(p => p.place_id === 11)?.place_image,
    trip_id: 10
  },
  {
    id: 20,
    title: "Sagrada Familia Visit",
    date: "2025-09-12",
    time_begin: "14:00",
    time_end: "16:00",
    location: "Barcelona, Spain",
    place_id: 12,
    place_image: mockPlaceBoxes.find(p => p.place_id === 12)?.place_image,
    trip_id: 10
  },

  // Trip 11: Thailand Island Hopping
  {
    id: 21,
    title: "Phi Phi Islands Snorkeling",
    date: "2025-12-21",
    time_begin: "09:00",
    time_end: "15:00",
    location: "Krabi, Thailand",
    place_id: 14,
    place_image: mockPlaceBoxes.find(p => p.place_id === 14)?.place_image,
    trip_id: 11
  },
  {
    id: 22,
    title: "Wat Pho Temple Tour",
    date: "2025-12-22",
    time_begin: "10:00",
    time_end: "12:00",
    location: "Bangkok, Thailand",
    place_id: 15,
    place_image: mockPlaceBoxes.find(p => p.place_id === 15)?.place_image,
    trip_id: 11
  }
];


// 10. Activity Event Boxes
export const mockActivityEventBoxes: ActivityEventBox[] = [
  {
    id: 1,
    title: "Travel to Hotel",
    date: "2025-09-05",
    time_begin: "16:00",
    time_end: "17:30",
    transportation: "Train",
    Notes: mockNotes.filter(note => note.reference_id === 1 && note.reference_type === 'event'),
    trip_id: 1 // Japan trip
  },
  {
    id: 2,
    title: "Lunch Break",
    date: "2025-09-07",
    time_begin: "12:00",
    time_end: "13:30",
    transportation: "Walk",
    Notes: [],
    trip_id: 1 // Japan trip
  },
  {
    id: 3,
    title: "Train to Amsterdam",
    date: "2025-09-26",
    time_begin: "09:00",
    time_end: "12:00",
    transportation: "Train",
    Notes: [],
    trip_id: 2 // European trip
  },
    {
    id: 4,
    title: "Train to Amsterdam",
    date: "2025-07-16",
    time_begin: "12:00",
    time_end: "13:00",
    transportation: "Train",
    Notes: [],
    trip_id: 9 // European trip
  }
];

// <--------------------------------------------- Votes ----------------------------------------->

// 11. Votes (FIXED with trip_id)
export const mockVotes: Vote[] = [
  {
    id: 1,
    user_id: 1,
    activity_id: 101,
    vote_type: 'place',
    place_id: 1,
    username: mockUserDetails[0].name,
    trip_id: 1 // Japan trip
  },
  {
    id: 2,
    user_id: 2,
    activity_id: 101,
    vote_type: 'place',
    place_id: 2,
    username: mockUserDetails[1].name,
    trip_id: 1 // Japan trip
  },
  {
    id: 3,
    user_id: 3,
    activity_id: 101,
    vote_type: 'place',
    place_id: 1,
    username: mockUserDetails[2].name,
    trip_id: 1 // Japan trip
  },
  {
    id: 4,
    user_id: 1,
    activity_id: 102,
    vote_type: 'event',
    event_id: 1,
    username: mockUserDetails[0].name,
    trip_id: 2 // European trip
  },
  {
    id: 5,
    user_id: 2,
    activity_id: 102,
    vote_type: 'event',
    event_id: 2,
    username: mockUserDetails[1].name,
    trip_id: 2 // European trip
  },
  {
    id: 6,
    user_id: 3,
    activity_id: 102,
    vote_type: 'event',
    event_id: 1,
    username: mockUserDetails[2].name,
    trip_id: 2 // European trip
  }
];

// 12. Activity Vote Place
export const mockActivityVotePlaces: ActivityVotePlace[] = [
  {
    id: 101,
    date: "2025-09-09",
    time_begin: "18:00",
    time_end: "20:00",
    number_of_votes: 3,
    options: [
      {
        id: 6,
        title: "Sushi Ichiban",
        rating: 4.5,
        review_count: 200,
        location: "Ginza, Tokyo",
        place_image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300&h=200&fit=crop",
        place_id: 6
      },
      {
        id: 7,
        title: "Ramen Yokocho",
        rating: 4.2,
        review_count: 150,
        location: "Shinjuku, Tokyo",
        place_image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&h=200&fit=crop",
        place_id: 7
      },
      {
        id: 8,
        title: "Tempura Matsui",
        rating: 4.7,
        review_count: 180,
        location: "Asakusa, Tokyo",
        place_image: "https://images.unsplash.com/photo-1559314809-0f31657def5e?w=300&h=200&fit=crop",
        place_id: 8
      }
    ],
    votes: mockVotes.filter(vote => vote.activity_id === 101),
    trip_id: 1 // Japan trip
  }
];

// 13. Activity Vote Event
export const mockActivityVoteEvents: ActivityVoteEvent[] = [
  {
    id: 102,
    date: "2025-09-26",
    time_begin: "09:00",
    time_end: "10:00",
    number_of_votes: 3,
    options: mockTransportationOptions,
    votes: mockVotes.filter(vote => vote.activity_id === 102),
    trip_id: 2 // European trip
  }
];

// <-------------------------- Trip ----------------------------------------->

// 14. Trip Boxes (FIXED dates to 2025)
export const mockTripBoxes: TripBox[] = [
  // MAIN TRIPS (with full data)
  {
    trip_id: 1,
    trip_name: "Summer Adventure in Japan", // NOW - Currently traveling
    trip_image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop",
    start_date: "2025-09-05", // Started 3 days ago (today is 2025-09-08)
    end_date: "2025-09-12",   // Ends in 4 days
    member_count: 4,
    status_planning: 'planning',
    owner_name: mockTripMembers[0].name,
    owner_image: mockTripMembers[0].user_image
  },
  {
    trip_id: 2,
    trip_name: "European Backpacking Tour", // DAYS - Upcoming trip
    trip_image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&h=300&fit=crop",
    start_date: "2025-09-23", // Starts in 15 days
    end_date: "2025-10-13",   // Ends in 35 days
    member_count: 3,
    status_planning: 'planning',
    owner_name: mockTripMembers[1].name,
    owner_image: mockTripMembers[1].user_image
  },
  {
    trip_id: 3,
    trip_name: "Thailand Beach Getaway", // END - Completed trip
    trip_image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    start_date: "2025-08-19", // Started 20 days ago
    end_date: "2025-08-27",   // Ended 12 days ago
    member_count: 2,
    status_planning: 'completed',
    owner_name: mockTripMembers[0].name,
    owner_image: mockTripMembers[0].user_image
  },
  
  // ADDITIONAL TRIPS (for variety - FIXED to 2025)
  {
    trip_id: 4,
    trip_name: "Tokyo Winter Festival",
    trip_image: "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=400&h=300&fit=crop",
    start_date: "2025-12-06", // Future trip
    end_date: "2025-12-11",   
    member_count: 6,
    status_planning: 'planning',
    owner_name: mockTripMembers[5].name, // Alice Wang
    owner_image: mockTripMembers[5].user_image
  },
  {
    trip_id: 5,
    trip_name: "Bali Adventure",
    trip_image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=300&fit=crop",
    start_date: "2025-11-15", // Future trip
    end_date: "2025-11-22",   
    member_count: 8,
    status_planning: 'planning',
    owner_name: mockTripMembers[6].name, // Bob Chen
    owner_image: mockTripMembers[6].user_image
  },
  {
    trip_id: 6,
    trip_name: "Swiss Alps Hiking",
    trip_image: "https://images.unsplash.com/photo-1464822759844-d150078e9243?w=400&h=300&fit=crop",
    start_date: "2025-07-10", // Past trip 
    end_date: "2025-07-17",   
    member_count: 4,
    status_planning: 'completed',
    owner_name: mockTripMembers[7].name, // Carol Smith
    owner_image: mockTripMembers[7].user_image
  }
];

// 15. Trip Invitations (Separate from main trips)
export const mockTripInvitations: TripBox[] = [
  {
    trip_id: 7,
    trip_name: "Trip to Thailand",
    trip_image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    start_date: "2025-10-25", // Future invitation
    end_date: "2025-11-01",
    member_count: 3,
    status_planning: 'planning',
    owner_name: mockTripMembers[8].name, // Keen_Kung
    owner_image: mockTripMembers[8].user_image
  },
  {
    trip_id: 8,
    trip_name: "Korean Food Tour",
    trip_image: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=400&h=300&fit=crop",
    start_date: "2025-12-15", // Future invitation
    end_date: "2025-12-22",
    member_count: 6,
    status_planning: 'planning',
    owner_name: mockTripMembers[9].name, // Sarah Kim
    owner_image: mockTripMembers[9].user_image
  }
];


export const mockTripDetails: TripDetails[] = mockTripBoxes.map(trip => ({
  trip_id: trip.trip_id,
  trip_name: trip.trip_name,
  trip_image: trip.trip_image,
  start_date: trip.start_date,
  end_date: trip.end_date,
  copies: 1,
  owner_name: trip.owner_name,
  owner_image: trip.owner_image,
  owner_email: `${trip.owner_name.toLowerCase().replace(" ", ".")}@example.com`,
  group_members: trip.member_count,
  budget: 1000 + trip.trip_id * 200, // mock budget
  note: mockNotes.filter(n => n.trip_id === trip.trip_id)
}));

// <-------------------------------------- Guides --------------------------------------->

// 16. Guide Boxes (Updated dates to 2025)
export const mockGuideBoxes: GuideBox[] = [
  {
    id: 1,
    title: "Ultimate Japan Travel Guide",
    start_date: "2025-07-15",
    end_date: "2025-07-25",
    guide_image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop",
    copies: 156,
    owner_name: mockTripMembers[0].name,
    owner_image: mockTripMembers[0].user_image,
    description: "I spend 10 days on this amazing journey and will tell everyone my plan here...",
    trip_id: 9
  },
  {
    id: 2,
    title: "European Backpacker's Paradise",
    start_date: "2025-09-10",
    end_date: "2025-09-30",
    guide_image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&h=300&fit=crop",
    copies: 89,
    owner_name: mockTripMembers[1].name,
    owner_image: mockTripMembers[1].user_image,
    description: "Discover the best routes and hidden gems across Europe with this comprehensive guide...",
    trip_id: 10
  },
  {
    id: 3,
    title: "Thailand Island Hopping",
    start_date: "2025-12-20",
    end_date: "2025-12-28",
    guide_image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    copies: 234,
    owner_name: mockTripMembers[2].name,
    owner_image: mockTripMembers[2].user_image,
    description: "Explore the most beautiful islands in Thailand with insider tips and recommendations...",
    trip_id: 11
  }
];

// 17. Trip Guide Details (Updated dates to 2025)
export const mockGuideDetails: GuideDetails[] = [
  {
    id: 1,
    title: "Ultimate Japan Travel Guide",
    start_date: "2025-07-15",
    end_date: "2025-07-25",
    guide_image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop",
    copies: 156,
    owner_name: mockTripMembers[0].name,
    owner_image: mockTripMembers[0].user_image,
    description: "I spend 10 days on this amazing journey and will tell everyone my plan here...",
    owner_email: mockTripMembers[0].email!,
    group_members: 4,
    budget: 2500,
    trip_id: 9
  },
  {
    id: 2,
    title: "European Backpacker's Paradise",
    start_date: "2025-09-10",
    end_date: "2025-09-30",
    guide_image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&h=300&fit=crop",
    copies: 89,
    owner_name: mockTripMembers[1].name,
    owner_image: mockTripMembers[1].user_image,
    description: "Discover the best routes and hidden gems across Europe with this comprehensive guide...",
    owner_email: mockTripMembers[1].email!,
    group_members: 3,
    budget: 3200,
    trip_id: 10
  },
  {
    id: 3,
    title: "Thailand Island Hopping",
    start_date: "2025-12-20",
    end_date: "2025-12-28",
    guide_image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    copies: 234,
    owner_name: mockTripMembers[2].name,
    owner_image: mockTripMembers[2].user_image,
    description: "Explore the most beautiful islands in Thailand with insider tips and recommendations...",
    owner_email: mockTripMembers[2].email!,
    group_members: 2,
    budget: 1800,
    trip_id: 11
  }
];

