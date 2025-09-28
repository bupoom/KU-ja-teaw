// mockDataFixed.ts - Corrected Mock Data with all fixes

// ========== MOCK DATA EXPORTS ==========

// 1. Transportation Options (Standard 6 types)
export const mockTransportationOptions: TransportationOption[] = [
  { id: 1, type: "Car" },
  { id: 2, type: "Bus" },
  { id: 3, type: "Train" },
  { id: 4, type: "Walk" },
  { id: 5, type: "Flight" },
  { id: 6, type: "Boat" },
];

// 2. User Details
export const mockUserDetails: UserDetails[] = [
  {
    user_id: "1",
    name: "John Smith",
    phone: "+1-555-0123",
    profile_picture_link:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    email: "john.smith@email.com",
  },
  {
    user_id: "2",
    name: "Sarah Johnson",
    phone: "+1-555-0124",
    profile_picture_link:
      "https://images.unsplash.com/photo-1494790108755-2616b2e11881?w=150&h=150&fit=crop&crop=face",
    email: "sarah.johnson@email.com",
  },
  {
    user_id: "3",
    name: "Michael Chen",
    phone: "+1-555-0125",
    profile_picture_link:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    email: "michael.chen@email.com",
  },
  {
    user_id: "4",
    name: "Emily Davis",
    phone: "+1-555-0126",
    profile_picture_link:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    email: "emily.davis@email.com",
  },
];

// 4. Flight Data
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
    trip_id: 1,
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
    trip_id: 1,
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
    trip_id: 2,
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
    trip_id: 3,
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
    trip_id: 9, // Ultimate Japan Travel Guide
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
    trip_id: 9,
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
    trip_id: 10, // European Backpacker's Paradise
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
    trip_id: 10,
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
    trip_id: 11, // Thailand Island Hopping
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
    trip_id: 11,
  },
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
    trip_id: 1, // Japan trip
  },
  {
    id: 2,
    file_name: "Hotel_Reservations_Tokyo.docx",
    file_url: "https://example.com/files/hotel_reservations_tokyo.docx",
    uploaded_date: "2025-09-02T09:15:00",
    uploaded_by: "Sarah Johnson",
    file_size_mb: 1.2,
    file_type:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    trip_id: 1, // Japan trip
  },
  {
    id: 3,
    file_name: "Europe_Train_Tickets.jpg",
    file_url: "https://example.com/files/europe_train_tickets.jpg",
    uploaded_date: "2025-09-03T16:45:00",
    uploaded_by: "Michael Chen",
    file_size_mb: 0.8,
    file_type: "image/jpeg",
    trip_id: 2, // European trip
  },
  {
    id: 4,
    file_name: "Emergency_Contacts_Europe.xlsx",
    file_url: "https://example.com/files/emergency_contacts_europe.xlsx",
    uploaded_date: "2025-09-04T11:20:00",
    uploaded_by: "Emily Davis",
    file_size_mb: 0.3,
    file_type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    trip_id: 2, // European trip
  },
  {
    id: 5,
    file_name: "Thailand_Passport_Copies.zip",
    file_url: "https://example.com/files/thailand_passport_copies.zip",
    uploaded_date: "2025-08-15T13:10:00",
    uploaded_by: "John Smith",
    file_size_mb: 4.7,
    file_type: "application/zip",
    trip_id: 3, // Thailand trip (completed)
  },
];

// 6. Notifications
export const mockNotifications: NotificationBox[] = [
  {
    id: 1,
    title: "Vote Required",
    message: "Please vote for dinner location on Day 3 of Japan Adventure trip",
    created_at: "2025-09-07T14:30:00",
    // notification_type: "vote",
    trip_id: 1, // Japan trip
  },
  {
    id: 2,
    title: "New Member Joined",
    message: "Michael Chen joined your European Backpacking trip",
    created_at: "2025-09-06T10:15:00",
    // notification_type: "member",
    trip_id: 2, // European trip
  },
  {
    id: 3,
    title: "Flight Update",
    message: "Your flight JL061 departure time has been changed to 11:30 AM",
    created_at: "2025-09-05T16:45:00",
    // notification_type: "flight",
    trip_id: 1, // Japan trip
  },
  {
    id: 4,
    title: "Trip Reminder",
    message: "Don't forget to pack your passport! Japan trip starts tomorrow",
    created_at: "2025-09-04T09:00:00",
    // notification_type: "reminder",
    trip_id: 1, // Japan trip
  },
  {
    id: 5,
    title: "Activity Added",
    message: "Sarah Johnson added 'Visit Louvre Museum' to Day 2 itinerary",
    created_at: "2025-09-03T19:20:00",
    // notification_type: "activity",
    trip_id: 2, // European trip
  },
  {
    id: 6,
    title: "Budget Update",
    message: "European trip budget has been updated to $3,200 per person",
    created_at: "2025-09-02T12:15:00",
    // notification_type: "budget",
    trip_id: 2, // European trip
  },
];

// 7. Trip Members (Added new members)
export const mockTripMembers: TripMember[] = [
  {
    id: 1,
    name: "John Smith",
    user_image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    email: "john.smith@email.com",
    phone: "+1-555-0123",
    role: "owner",
    trip_id: 1, // Summer Adventure in Japan
  },
  {
    id: 2,
    name: "Sarah Johnson",
    user_image:
      "https://images.unsplash.com/photo-1494790108755-2616b2e11881?w=150&h=150&fit=crop&crop=face",
    email: "sarah.johnson@email.com",
    phone: "+1-555-0124",
    role: "editor",
    trip_id: 1,
  },
  {
    id: 3,
    name: "Michael Chen",
    user_image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    email: "michael.chen@email.com",
    phone: "+1-555-0125",
    role: "owner",
    trip_id: 2, // European Backpacking Tour
  },
  {
    id: 4,
    name: "Emily Davis",
    user_image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    email: "emily.davis@email.com",
    phone: "+1-555-0126",
    role: "viewer",
    trip_id: 2,
  },
  {
    id: 5,
    name: "David Wilson",
    user_image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    email: "david.wilson@email.com",
    phone: "+1-555-0127",
    role: "owner",
    trip_id: 3, // Thailand Beach Getaway
  },
  {
    id: 6,
    name: "Alice Wang",
    user_image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    email: "alice.wang@email.com",
    phone: "+1-555-0128",
    role: "owner",
    trip_id: 4, // Tokyo Winter Festival
  },
  {
    id: 7,
    name: "Bob Chen",
    user_image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    email: "bob.chen@email.com",
    phone: "+1-555-0129",
    role: "owner",
    trip_id: 5, // Bali Adventure
  },
  {
    id: 8,
    name: "Carol Smith",
    user_image:
      "https://images.unsplash.com/photo-1494790108755-2616b2e11881?w=150&h=150&fit=crop",
    email: "carol.smith@email.com",
    phone: "+1-555-0130",
    role: "owner",
    trip_id: 6, // Swiss Alps Hiking
  },
  {
    id: 9,
    name: "Keen_Kung",
    user_image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    email: "keen.kung@email.com",
    phone: "+66-812-345-678",
    role: "owner",
    trip_id: 7, // Trip to Thailand (Invitation)
  },
  {
    id: 10,
    name: "Sarah Kim",
    user_image:
      "https://images.unsplash.com/photo-1494790108755-2616b2e11881?w=150&h=150&fit=crop",
    email: "sarah.kim@email.com",
    phone: "+82-10-1234-5678",
    role: "owner",
    trip_id: 8, // Korean Food Tour (Invitation)
  },
  {
    id: 11,
    name: "Oshi Smitch",
    user_image:
      "https://images.unsplash.com/photo-1494790108755-2616b2e11881?w=150&h=150&fit=crop&crop=face",
    email: "oshi.smitch@email.com",
    phone: "+1-555-0124",
    role: "viewer",
    trip_id: 1,
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
  { id: 28, trip_id: 6, date: "2025-07-17", weather_code: 0 },
];

// <---------------------------------- Note ---------------------------->
// 8. Notes
export const mockNotes: Note[] = [
  // ========== TRIP 1: Summer Adventure in Japan ==========
  {
    id: 1,
    note_text:
      "Don't forget to try the famous ramen here! Best time to visit is around 11 AM to avoid crowds.",
    user_profile: mockUserDetails[0].profile_picture_link,
    user_name: mockUserDetails[0].name, // John Smith
    is_editable: true,
    refer_user_id: 1, // John Smith in trip_id 1
    reference_id: 1,
    reference_type: "place",
    created_at: "2025-09-08T14:30:00",
    trip_id: 1,
  },
    {
    id: 19,
    note_text: "The garden area is beautiful in the evening, recommend after 5 PM.",
    user_profile: mockUserDetails[1].profile_picture_link,
    user_name: mockUserDetails[1].name, // Sarah Johnson
    is_editable: true,
    refer_user_id: 2, // ไม่ใช่ John Smith
    reference_id: 1, // ซ้ำกับ Note id=1 (place)
    reference_type: "place",
    created_at: "2025-09-08T15:00:00",
    trip_id: 1,
  },
  {
    id: 20,
    note_text: "Consider taking the subway instead of taxi to save cost.",
    user_profile: mockUserDetails[2].profile_picture_link,
    user_name: mockUserDetails[2].name, // Michael Chen
    is_editable: false,
    refer_user_id: 3, // ไม่ใช่ John Smith
    reference_id: 2, // ซ้ำกับ Note id=2 (place)
    reference_type: "place",
    created_at: "2025-09-08T15:30:00",
    trip_id: 1,
  },
  {
    id: 2,
    note_text:
      "Bring comfortable walking shoes. The temple grounds are quite large.",
    user_profile: mockUserDetails[1].profile_picture_link,
    user_name: mockUserDetails[1].name, // Sarah Johnson
    is_editable: false,
    refer_user_id: 2, // Sarah Johnson in trip_id 1
    reference_id: 2,
    reference_type: "place",
    created_at: "2025-09-07T10:15:00",
    trip_id: 1,
  },
  {
    id: 5,
    note_text:
      "Amazing street food! Try the takoyaki from the vendor on the left side.",
    user_profile: mockUserDetails[1].profile_picture_link,
    user_name: mockUserDetails[1].name, // Sarah Johnson
    is_editable: true,
    refer_user_id: 2,
    reference_id: 5,
    reference_type: "place",
    created_at: "2025-09-07T18:20:00",
    trip_id: 1,
  },
  {
    id: 6,
    note_text: "Perfect spot for cherry blossom viewing in spring season.",
    user_profile: mockUserDetails[2].profile_picture_link,
    user_name: mockUserDetails[2].name, // Michael Chen (ไม่ใช่ member trip 1 → assign owner แทน)
    is_editable: false,
    refer_user_id: 1, // Fallback ให้ John Smith (owner)
    reference_id: 4,
    reference_type: "place",
    created_at: "2025-09-06T12:45:00",
    trip_id: 1,
  },
  {
    id: 7,
    note_text:
      "Overall trip highlight: Japan’s culture mix of tradition and modern life.",
    user_profile: mockUserDetails[0].profile_picture_link,
    user_name: mockUserDetails[0].name,
    is_editable: true,
    refer_user_id: 1,
    reference_type: "overview",
    created_at: "2025-09-08T20:00:00",
    trip_id: 1,
  },
  {
    id: 8,
    note_text: "Budget seems on track, keep checking transport costs.",
    user_profile: mockUserDetails[1].profile_picture_link,
    user_name: mockUserDetails[1].name,
    is_editable: true,
    refer_user_id: 2,
    reference_type: "overview",
    created_at: "2025-09-08T21:00:00",
    trip_id: 1,
  },

  // ========== TRIP 2: European Backpacking Tour ==========
  {
    id: 3,
    note_text: "Remember to book train tickets in advance during peak season.",
    user_profile: mockUserDetails[2].profile_picture_link,
    user_name: mockUserDetails[2].name, // Michael Chen
    is_editable: true,
    refer_user_id: 3, // Michael Chen in trip_id 2
    reference_id: 1,
    reference_type: "event",
    created_at: "2025-09-06T16:45:00",
    trip_id: 2,
  },
  {
    id: 9,
    note_text: "Trip overview: Backpacking requires lightweight packing.",
    user_profile: mockUserDetails[2].profile_picture_link,
    user_name: mockUserDetails[2].name,
    is_editable: true,
    refer_user_id: 3,
    reference_type: "overview",
    created_at: "2025-09-08T12:00:00",
    trip_id: 2,
  },
  {
    id: 10,
    note_text: "Double-check visa requirements for Schengen countries.",
    user_profile: mockUserDetails[1].profile_picture_link,
    user_name: mockUserDetails[1].name, // Sarah Johnson (ไม่ใช่ member trip 2 → assign owner แทน)
    is_editable: false,
    refer_user_id: 3, // Michael Chen (owner trip 2)
    reference_type: "overview",
    created_at: "2025-09-08T12:30:00",
    trip_id: 2,
  },
    {
    id: 21,
    note_text: "Check luggage size rules for budget airlines.",
    user_profile: mockUserDetails[0].profile_picture_link,
    user_name: mockUserDetails[0].name, // John Smith (ยังไม่ใช่ member trip 2 → assign as guest)
    is_editable: true,
    refer_user_id: 2, // ไม่ใช่ owner Michael Chen
    reference_id: 1, // ซ้ำกับ Note id=3 (event)
    reference_type: "event",
    created_at: "2025-09-07T09:00:00",
    trip_id: 2,
  },
  {
    id: 22,
    note_text: "Great time to visit museums on weekdays, fewer crowds.",
    user_profile: mockUserDetails[1].profile_picture_link,
    user_name: mockUserDetails[1].name, // Sarah Johnson
    is_editable: false,
    refer_user_id: 2, // ไม่ใช่ owner Michael Chen
    reference_id: 1, // ซ้ำกับ Note id=3 (event)
    reference_type: "event",
    created_at: "2025-09-07T09:30:00",
    trip_id: 2,
  },

  // ========== TRIP 3: Thailand Beach Getaway ==========
  {
    id: 4,
    note_text:
      "The sunset view from here is absolutely stunning! Arrive by 6 PM.",
    user_profile: mockUserDetails[0].profile_picture_link,
    user_name: mockUserDetails[0].name, // John Smith
    is_editable: true,
    refer_user_id: 1, // John Smith in trip_id 3
    reference_id: 3,
    reference_type: "place",
    created_at: "2025-08-25T19:20:00",
    trip_id: 3,
  },
  {
    id: 11,
    note_text: "Beach trip was relaxing, weather was perfect.",
    user_profile: mockUserDetails[0].profile_picture_link,
    user_name: mockUserDetails[0].name,
    is_editable: true,
    refer_user_id: 1,
    reference_type: "overview",
    created_at: "2025-08-28T10:00:00",
    trip_id: 3,
  },
  {
    id: 12,
    note_text: "Expenses lower than expected, mainly food and local transport.",
    user_profile: mockUserDetails[2].profile_picture_link,
    user_name: mockUserDetails[2].name, // Michael Chen (ไม่ใช่ member trip 3 → assign David Wilson)
    is_editable: false,
    refer_user_id: 5, // David Wilson (viewer trip 3)
    reference_type: "overview",
    created_at: "2025-08-28T11:00:00",
    trip_id: 3,
  },

  // ========== TRIP 4: Tokyo Winter Festival ==========
  {
    id: 13,
    note_text: "Expect cold weather during the festival.",
    user_profile: mockUserDetails[1].profile_picture_link,
    user_name: mockUserDetails[1].name, // Sarah Johnson (ไม่ใช่ member trip 4 → assign owner)
    is_editable: true,
    refer_user_id: 6, // Alice Wang (owner trip 4)
    reference_type: "overview",
    created_at: "2025-09-08T09:00:00",
    trip_id: 4,
  },
  {
    id: 14,
    note_text: "Plan for festival tickets early.",
    user_profile: mockUserDetails[2].profile_picture_link,
    user_name: mockUserDetails[2].name, // Michael Chen
    is_editable: false,
    refer_user_id: 6, // Alice Wang
    reference_type: "overview",
    created_at: "2025-09-08T09:30:00",
    trip_id: 4,
  },

  // ========== TRIP 5: Bali Adventure ==========
  {
    id: 15,
    note_text: "Adventure activities may require pre-booking.",
    user_profile: mockUserDetails[0].profile_picture_link,
    user_name: mockUserDetails[0].name, // John Smith
    is_editable: true,
    refer_user_id: 7, // Bob Chen (owner trip 5)
    reference_type: "overview",
    created_at: "2025-09-08T08:00:00",
    trip_id: 5,
  },
  {
    id: 16,
    note_text: "Remember to carry local currency for small vendors.",
    user_profile: mockUserDetails[1].profile_picture_link,
    user_name: mockUserDetails[1].name, // Sarah Johnson
    is_editable: false,
    refer_user_id: 7, // Bob Chen
    reference_type: "overview",
    created_at: "2025-09-08T08:30:00",
    trip_id: 5,
  },

  // ========== TRIP 6: Swiss Alps Hiking ==========
  {
    id: 17,
    note_text: "Hiking conditions were safe, but some trails steep.",
    user_profile: mockUserDetails[2].profile_picture_link,
    user_name: mockUserDetails[2].name, // Michael Chen
    is_editable: true,
    refer_user_id: 8, // Carol Smith (owner trip 6)
    reference_type: "overview",
    created_at: "2025-07-18T10:00:00",
    trip_id: 6,
  },
  {
    id: 18,
    note_text: "Overall great team spirit during the hike.",
    user_profile: mockUserDetails[0].profile_picture_link,
    user_name: mockUserDetails[0].name,
    is_editable: false,
    refer_user_id: 8, // Carol Smith
    reference_type: "overview",
    created_at: "2025-07-18T11:00:00",
    trip_id: 6,
  },
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
    place_image:
      "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=300&h=200&fit=crop",
    place_id: 1,
  },
  {
    id: 2,
    title: "Senso-ji Temple",
    rating: 4.6,
    review_count: 28350,
    location: "Asakusa, Tokyo",
    place_image:
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=300&h=200&fit=crop",
    place_id: 2,
  },
  {
    id: 3,
    title: "Shibuya Crossing",
    rating: 4.4,
    review_count: 32100,
    location: "Shibuya City, Tokyo",
    place_image:
      "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=300&h=200&fit=crop",
    place_id: 3,
  },
  {
    id: 4,
    title: "Meiji Shrine",
    rating: 4.5,
    review_count: 19800,
    location: "Shibuya City, Tokyo",
    place_image:
      "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=300&h=200&fit=crop",
    place_id: 4,
  },
  {
    id: 5,
    title: "Tsukiji Outer Market",
    rating: 4.2,
    review_count: 12450,
    location: "Chuo City, Tokyo",
    place_image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
    place_id: 5,
  },
  {
    id: 6,
    title: "Fushimi Inari Shrine",
    rating: 4.7,
    review_count: 45200,
    location: "Kyoto, Japan",
    place_image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=300&h=200&fit=crop",
    place_id: 6,
  },
  {
    id: 7,
    title: "Kiyomizu-dera Temple",
    rating: 4.5,
    review_count: 33100,
    location: "Kyoto, Japan",
    place_image:
      "https://images.unsplash.com/photo-1529258283598-8d6fe60b27f4?w=300&h=200&fit=crop",
    place_id: 7,
  },
  {
    id: 8,
    title: "Osaka Castle",
    rating: 4.3,
    review_count: 28900,
    location: "Osaka, Japan",
    place_image:
      "https://images.unsplash.com/photo-1590253230532-5e90ac2721d3?w=300&h=200&fit=crop",
    place_id: 8,
  },
  // European Places (9-12)
  {
    id: 9,
    title: "Eiffel Tower",
    rating: 4.4,
    review_count: 125000,
    location: "Paris, France",
    place_image:
      "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=300&h=200&fit=crop",
    place_id: 9,
  },
  {
    id: 10,
    title: "Louvre Museum",
    rating: 4.6,
    review_count: 98500,
    location: "Paris, France",
    place_image:
      "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=300&h=200&fit=crop",
    place_id: 10,
  },
  {
    id: 11,
    title: "Colosseum",
    rating: 4.5,
    review_count: 87300,
    location: "Rome, Italy",
    place_image:
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=300&h=200&fit=crop",
    place_id: 11,
  },
  {
    id: 12,
    title: "Sagrada Familia",
    rating: 4.7,
    review_count: 76400,
    location: "Barcelona, Spain",
    place_image:
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=300&h=200&fit=crop",
    place_id: 12,
  },
  // Thailand Places (13-15)
  {
    id: 13,
    title: "Grand Palace",
    rating: 4.4,
    review_count: 42100,
    location: "Bangkok, Thailand",
    place_image:
      "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=300&h=200&fit=crop",
    place_id: 13,
  },
  {
    id: 14,
    title: "Phi Phi Islands",
    rating: 4.6,
    review_count: 35800,
    location: "Krabi, Thailand",
    place_image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
    place_id: 14,
  },
  {
    id: 15,
    title: "Wat Pho Temple",
    rating: 4.5,
    review_count: 29200,
    location: "Bangkok, Thailand",
    place_image:
      "https://images.unsplash.com/photo-1480344734316-0db52fcd5619?w=300&h=200&fit=crop",
    place_id: 15,
  },
  {
    id: 16,
    title: "Suvarnabhumi Airport (BKK)",
    rating: 4.2,
    review_count: 88000,
    location: "Bangkok, Thailand",
    place_image:
      "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=300&h=200&fit=crop",
    place_id: 16,
  },
  {
    id: 17,
    title: "Ueno Park",
    rating: 4.4,
    review_count: 50500,
    location: "Ueno, Tokyo",
    place_image:
      "https://images.unsplash.com/photo-1614312076740-29a58ae0c917?w=300&h=200&fit=crop",
    place_id: 17,
  },
  {
    id: 18,
    title: "Tokyo Skytree",
    rating: 4.6,
    review_count: 75000,
    location: "Sumida, Tokyo",
    place_image:
      "https://images.unsplash.com/photo-1549693578-d683be217e58?w=300&h=200&fit=crop",
    place_id: 18,
  },
  {
    id: 19,
    title: "Montmartre",
    rating: 4.5,
    review_count: 33200,
    location: "Paris, France",
    place_image:
      "https://images.unsplash.com/photo-1606669320460-bd0dbeed52e2?w=300&h=200&fit=crop",
    place_id: 19,
  },
  {
    id: 20,
    title: "Seine River Cruise",
    rating: 4.7,
    review_count: 45600,
    location: "Paris, France",
    place_image:
      "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=300&h=200&fit=crop",
    place_id: 20,
  },
];

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


// 19. Place Details (5 places - matching PlaceBox) อ้างอิง Note
export const mockPlaceDetails: PlaceDetails[] = [
  {
    id: 1,
    title: "Tokyo Tower",
    description:
      "Tokyo Tower is a communications and observation tower in the Sumida district of Tokyo, Japan...",
    rating: 4.3,
    review_count: 15420,
    location: "Minato City, Tokyo",
    place_image:
      "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=300&h=200&fit=crop",
    categories: ["Tourist Attraction", "Observation Deck", "Tower"],
    map_link: "https://maps.google.com/?q=Tokyo+Tower",
    official_link: "https://www.tokyotower.co.jp/en.html",
    latitude: 35.6586,
    longitude: 139.7454,
  },
  {
    id: 2,
    title: "Senso-ji Temple",
    description:
      "Sensō-ji is an ancient Buddhist temple located in Asakusa, Tokyo...",
    rating: 4.6,
    review_count: 28350,
    location: "Asakusa, Tokyo",
    place_image:
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=300&h=200&fit=crop",
    categories: ["Temple", "Religious Site", "Cultural Heritage"],
    map_link: "https://maps.google.com/?q=Senso-ji+Temple",
    official_link: "https://www.senso-ji.jp/",
    latitude: 35.7148,
    longitude: 139.7967,
  },
  {
    id: 3,
    title: "Shibuya Crossing",
    description:
      "Shibuya Crossing is a popular scramble crossing in Shibuya...",
    rating: 4.4,
    review_count: 32100,
    location: "Shibuya City, Tokyo",
    place_image:
      "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=300&h=200&fit=crop",
    categories: ["Tourist Attraction", "Street", "Urban Experience"],
    map_link: "https://maps.google.com/?q=Shibuya+Crossing",
    official_link: "https://www.shibuya-scramble-square.com/",
    latitude: 35.6595,
    longitude: 139.7005,
  },
  {
    id: 4,
    title: "Meiji Shrine",
    description: "Meiji Shrine is a Shinto shrine in Shibuya, Tokyo...",
    rating: 4.5,
    review_count: 19800,
    location: "Shibuya City, Tokyo",
    place_image:
      "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=300&h=200&fit=crop",
    categories: ["Shrine", "Religious Site", "Nature", "Cultural Heritage"],
    map_link: "https://maps.google.com/?q=Meiji+Shrine",
    official_link: "https://www.meijijingu.or.jp/en/",
    latitude: 35.6764,
    longitude: 139.6993,
  },
  {
    id: 5,
    title: "Tsukiji Outer Market",
    description: "The Tsukiji Outer Market is a district in Chūō, Tokyo...",
    rating: 4.2,
    review_count: 12450,
    location: "Chuo City, Tokyo",
    place_image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
    categories: ["Market", "Food", "Cultural Experience"],
    map_link: "https://maps.google.com/?q=Tsukiji+Outer+Market",
    official_link: "https://www.tsukiji.or.jp/english/",
    latitude: 35.6655,
    longitude: 139.7708,
  },
  {
    id: 6,
    title: "Fushimi Inari Shrine",
    description: "Fushimi Inari Taisha is the head shrine of the kami Inari...",
    rating: 4.7,
    review_count: 45200,
    location: "Kyoto, Japan",
    place_image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=300&h=200&fit=crop",
    categories: ["Shrine", "Religious Site", "Hiking", "Cultural Heritage"],
    map_link: "https://maps.google.com/?q=Fushimi+Inari+Shrine",
    official_link: "http://inari.jp/en/",
    latitude: 34.9671,
    longitude: 135.7727,
  },
  {
    id: 7,
    title: "Kiyomizu-dera Temple",
    description:
      "Kiyomizu-dera is an independent Buddhist temple in eastern Kyoto...",
    rating: 4.5,
    review_count: 33100,
    location: "Kyoto, Japan",
    place_image:
      "https://images.unsplash.com/photo-1529258283598-8d6fe60b27f4?w=300&h=200&fit=crop",
    categories: [
      "Temple",
      "Religious Site",
      "UNESCO Site",
      "Cultural Heritage",
    ],
    map_link: "https://maps.google.com/?q=Kiyomizu-dera+Temple",
    official_link: "https://www.kiyomizudera.or.jp/en/",
    latitude: 34.9949,
    longitude: 135.785,
  },
  {
    id: 8,
    title: "Osaka Castle",
    description: "Osaka Castle is a Japanese castle in Chūō-ku, Osaka...",
    rating: 4.3,
    review_count: 28900,
    location: "Osaka, Japan",
    place_image:
      "https://images.unsplash.com/photo-1590253230532-5e90ac2721d3?w=300&h=200&fit=crop",
    categories: ["Castle", "Historical Site", "Museum", "Cultural Heritage"],
    map_link: "https://maps.google.com/?q=Osaka+Castle",
    official_link: "https://www.osakacastle.net/english/",
    latitude: 34.6873,
    longitude: 135.5259,
  },
  {
    id: 9,
    title: "Eiffel Tower",
    description: "The Eiffel Tower is a wrought-iron lattice tower in Paris...",
    rating: 4.4,
    review_count: 125000,
    location: "Paris, France",
    place_image:
      "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=300&h=200&fit=crop",
    categories: ["Tower", "Tourist Attraction", "Landmark", "Architecture"],
    map_link: "https://maps.google.com/?q=Eiffel+Tower",
    official_link: "https://www.toureiffel.paris/en",
    latitude: 48.8584,
    longitude: 2.2945,
  },
  {
    id: 10,
    title: "Louvre Museum",
    description: "The Louvre is the world's most-visited museum in Paris...",
    rating: 4.6,
    review_count: 98500,
    location: "Paris, France",
    place_image:
      "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=300&h=200&fit=crop",
    categories: [
      "Museum",
      "Art Gallery",
      "Cultural Heritage",
      "Tourist Attraction",
    ],
    map_link: "https://maps.google.com/?q=Louvre+Museum",
    official_link: "https://www.louvre.fr/en",
    latitude: 48.8606,
    longitude: 2.3376,
  },
  {
    id: 11,
    title: "Colosseum",
    description:
      "The Colosseum is an oval amphitheatre in the centre of Rome...",
    rating: 4.5,
    review_count: 87300,
    location: "Rome, Italy",
    place_image:
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=300&h=200&fit=crop",
    categories: [
      "Historical Site",
      "Ancient Architecture",
      "UNESCO Site",
      "Tourist Attraction",
    ],
    map_link: "https://maps.google.com/?q=Colosseum+Rome",
    official_link: "https://parcocolosseo.it/en/",
    latitude: 41.8902,
    longitude: 12.4922,
  },
  {
    id: 12,
    title: "Sagrada Familia",
    description:
      "The Basílica de la Sagrada Família is a large unfinished basilica...",
    rating: 4.7,
    review_count: 76400,
    location: "Barcelona, Spain",
    place_image:
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=300&h=200&fit=crop",
    categories: ["Basilica", "Architecture", "UNESCO Site", "Religious Site"],
    map_link: "https://maps.google.com/?q=Sagrada+Familia",
    official_link: "https://sagradafamilia.org/en/",
    latitude: 41.4036,
    longitude: 2.1744,
  },
  {
    id: 13,
    title: "Grand Palace",
    description:
      "The Grand Palace is a complex of buildings at the heart of Bangkok...",
    rating: 4.4,
    review_count: 42100,
    location: "Bangkok, Thailand",
    place_image:
      "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=300&h=200&fit=crop",
    categories: [
      "Palace",
      "Historical Site",
      "Cultural Heritage",
      "Tourist Attraction",
    ],
    map_link: "https://maps.google.com/?q=Grand+Palace+Bangkok",
    official_link: "https://www.royalgrandpalace.th/en/home",
    latitude: 13.75,
    longitude: 100.4913,
  },
  {
    id: 14,
    title: "Phi Phi Islands",
    description: "The Phi Phi Islands are an island group in Thailand...",
    rating: 4.6,
    review_count: 35800,
    location: "Krabi, Thailand",
    place_image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
    categories: ["Beach", "Island", "Nature", "Snorkeling"],
    map_link: "https://maps.google.com/?q=Phi+Phi+Islands",
    official_link: "https://www.phiphi.phuket.com/",
    latitude: 7.7407,
    longitude: 98.7784,
  },
  {
    id: 15,
    title: "Wat Pho Temple",
    description: "Wat Pho is a Buddhist temple complex in Bangkok, Thailand...",
    rating: 4.5,
    review_count: 29200,
    location: "Bangkok, Thailand",
    place_image:
      "https://images.unsplash.com/photo-1480344734316-0db52fcd5619?w=300&h=200&fit=crop",
    categories: [
      "Temple",
      "Religious Site",
      "Cultural Heritage",
      "Massage School",
    ],
    map_link: "https://maps.google.com/?q=Wat+Pho+Temple",
    official_link: "https://www.watpho.com/",
    latitude: 13.7467,
    longitude: 100.493,
  },
  {
    id: 16,
    title: "Suvarnabhumi Airport (BKK)",
    description:
      "Suvarnabhumi Airport is the main international airport in Bangkok, Thailand...",
    rating: 4.2,
    review_count: 88000,
    location: "Bangkok, Thailand",
    place_image:
      "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=300&h=200&fit=crop",
    categories: ["Airport", "Transportation", "International Travel"],
    map_link: "https://maps.google.com/?q=Suvarnabhumi+Airport",
    official_link: "https://www.suvarnabhumiairport.com/en",
    latitude: 13.69,
    longitude: 100.7501,
  },
  {
    id: 17,
    title: "Ueno Park",
    description:
      "Ueno Park is a spacious public park in the Ueno district of Taitō, Tokyo...",
    rating: 4.4,
    review_count: 50500,
    location: "Ueno, Tokyo",
    place_image:
      "https://images.unsplash.com/photo-1614312076740-29a58ae0c917?w=300&h=200&fit=crop",
    categories: ["Park", "Nature", "Cultural Experience"],
    map_link: "https://maps.google.com/?q=Ueno+Park",
    official_link: "https://www.gotokyo.org/en/spot/87/index.html",
    latitude: 35.7156,
    longitude: 139.7745,
  },
  {
    id: 18,
    title: "Tokyo Skytree",
    description:
      "Tokyo Skytree is a broadcasting and observation tower in Sumida, Tokyo...",
    rating: 4.6,
    review_count: 75000,
    location: "Sumida, Tokyo",
    place_image:
      "https://images.unsplash.com/photo-1549693578-d683be217e58?w=300&h=200&fit=crop",
    categories: ["Tower", "Observation Deck", "Landmark"],
    map_link: "https://maps.google.com/?q=Tokyo+Skytree",
    official_link: "https://www.tokyo-skytree.jp/en/",
    latitude: 35.7101,
    longitude: 139.8107,
  },
  {
    id: 19,
    title: "Montmartre",
    description:
      "Montmartre is a large hill in Paris famous for its artistic history...",
    rating: 4.5,
    review_count: 33200,
    location: "Paris, France",
    place_image:
      "https://images.unsplash.com/photo-1606669320460-bd0dbeed52e2?w=300&h=200&fit=crop",
    categories: ["Neighborhood", "Culture", "Art"],
    map_link: "https://maps.google.com/?q=Montmartre+Paris",
    official_link:
      "https://en.parisinfo.com/discovering-paris/walks-in-paris/montmartre",
    latitude: 48.8867,
    longitude: 2.3431,
  },
  {
    id: 20,
    title: "Seine River Cruise",
    description:
      "A Seine River Cruise offers panoramic views of Paris’ top landmarks...",
    rating: 4.7,
    review_count: 45600,
    location: "Paris, France",
    place_image:
      "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=300&h=200&fit=crop",
    categories: ["Tour", "Cruise", "Sightseeing"],
    map_link: "https://maps.google.com/?q=Seine+River+Cruise",
    official_link: "https://www.bateauxparisiens.com/",
    latitude: 48.8584,
    longitude: 2.2945,
  },
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
    place_image:
      "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=300&h=200&fit=crop",
    place_id: 1,
  },
  {
    id: 6,
    title: "Fushimi Inari Shrine",
    rating: 4.7,
    review_count: 45200,
    location: "Kyoto, Japan",
    place_image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=300&h=200&fit=crop",
    place_id: 6,
  },
  {
    id: 9,
    title: "Eiffel Tower",
    rating: 4.4,
    review_count: 125000,
    location: "Paris, France",
    place_image:
      "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=300&h=200&fit=crop",
    place_id: 9,
  },
  {
    id: 10,
    title: "Louvre Museum",
    rating: 4.6,
    review_count: 98500,
    location: "Paris, France",
    place_image:
      "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=300&h=200&fit=crop",
    place_id: 10,
  },
  {
    id: 12,
    title: "Sagrada Familia",
    rating: 4.7,
    review_count: 76400,
    location: "Barcelona, Spain",
    place_image:
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=300&h=200&fit=crop",
    place_id: 12,
  },
  {
    id: 14,
    title: "Phi Phi Islands",
    rating: 4.6,
    review_count: 35800,
    location: "Krabi, Thailand",
    place_image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
    place_id: 14,
  },
  {
    id: 2,
    title: "Senso-ji Temple",
    rating: 4.6,
    review_count: 28350,
    location: "Asakusa, Tokyo",
    place_image:
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=300&h=200&fit=crop",
    place_id: 2,
  },
  {
    id: 13,
    title: "Grand Palace",
    rating: 4.4,
    review_count: 42100,
    location: "Bangkok, Thailand",
    place_image:
      "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=300&h=200&fit=crop",
    place_id: 13,
  },
];

// <-------------------------------------------- Activity ------------------------------------>

// 9. Activity Place Boxes อ้างอิง placeBox
export const mockActivityPlaceBoxes: ActivityPlaceBox[] = [
  // Trip 1: Summer Adventure in Japan
  {
    id: 1,
    date: "2025-09-06",
    time_begin: "09:00",
    time_end: "11:30",
    place_id: 1,
    title: mockPlaceBoxes.find((p) => p.place_id === 1)?.title ?? "Unknown Title",
    location: mockPlaceBoxes.find((p) => p.place_id === 1)?.location ?? "Unknown Location",
    place_image: mockPlaceBoxes.find((p) => p.place_id === 1)?.place_image,
    trip_id: 1,
    notes: mockNotes.filter((note) => note.reference_id === 1 && note.reference_type === "place" && note.trip_id === 1),
  },
  {
    id: 2,
    date: "2025-09-07",
    time_begin: "14:00",
    time_end: "16:00",
    place_id: 2,
    title: mockPlaceBoxes.find((p) => p.place_id === 2)?.title ?? "Unknown Title",
    location: mockPlaceBoxes.find((p) => p.place_id === 2)?.location ?? "Unknown Location",
    place_image: mockPlaceBoxes.find((p) => p.place_id === 2)?.place_image,
    trip_id: 1,
    notes: mockNotes.filter((note) => note.reference_id === 2 && note.reference_type === "place" && note.trip_id === 1),
  },
  {
    id: 23,
    date: "2025-09-05",
    time_begin: "07:00",
    time_end: "10:00",
    place_id: 16,
    title: mockPlaceBoxes.find((p) => p.place_id === 16)?.title ?? "Unknown Title",
    location: mockPlaceBoxes.find((p) => p.place_id === 16)?.location ?? "Unknown Location",
    place_image: mockPlaceBoxes.find((p) => p.place_id === 16)?.place_image,
    trip_id: 1,
    notes: mockNotes.filter((note) => note.reference_id === 23 && note.reference_type === "place" && note.trip_id === 1),
  },
  {
    id: 24,
    date: "2025-09-06",
    time_begin: "13:00",
    time_end: "15:00",
    place_id: 18,
    title: mockPlaceBoxes.find((p) => p.place_id === 18)?.title ?? "Unknown Title",
    location: mockPlaceBoxes.find((p) => p.place_id === 18)?.location ?? "Unknown Location",
    place_image: mockPlaceBoxes.find((p) => p.place_id === 18)?.place_image,
    trip_id: 1,
    notes: mockNotes.filter((note) => note.reference_id === 24 && note.reference_type === "place" && note.trip_id === 1),
  },
  {
    id: 25,
    date: "2025-09-07",
    time_begin: "09:00",
    time_end: "11:00",
    place_id: 17,
    title: mockPlaceBoxes.find((p) => p.place_id === 17)?.title ?? "Unknown Title",
    location: mockPlaceBoxes.find((p) => p.place_id === 17)?.location ?? "Unknown Location",
    place_image: mockPlaceBoxes.find((p) => p.place_id === 17)?.place_image,
    trip_id: 1,
    notes: mockNotes.filter((note) => note.reference_id === 25 && note.reference_type === "place" && note.trip_id === 1),
  },

  // Trip 2: European Backpacking Tour
  {
    id: 3,
    date: "2025-09-24",
    time_begin: "10:00",
    time_end: "12:00",
    place_id: 9,
    title: mockPlaceBoxes.find((p) => p.place_id === 9)?.title ?? "Unknown Title",
    location: mockPlaceBoxes.find((p) => p.place_id === 9)?.location ?? "Unknown Location",
    place_image: mockPlaceBoxes.find((p) => p.place_id === 9)?.place_image,
    trip_id: 2,
    notes: mockNotes.filter((note) => note.reference_id === 3 && note.reference_type === "place" && note.trip_id === 2),
  },
  {
    id: 4,
    date: "2025-09-25",
    time_begin: "13:30",
    time_end: "16:30",
    place_id: 10,
    title: mockPlaceBoxes.find((p) => p.place_id === 10)?.title ?? "Unknown Title",
    location: mockPlaceBoxes.find((p) => p.place_id === 10)?.location ?? "Unknown Location",
    place_image: mockPlaceBoxes.find((p) => p.place_id === 10)?.place_image,
    trip_id: 2,
    notes: mockNotes.filter((note) => note.reference_id === 4 && note.reference_type === "place" && note.trip_id === 2),
  },
  {
    id: 26,
    date: "2025-09-23",
    time_begin: "10:00",
    time_end: "15:00",
    place_id: 16,
    title: mockPlaceBoxes.find((p) => p.place_id === 16)?.title ?? "Unknown Title",
    location: mockPlaceBoxes.find((p) => p.place_id === 16)?.location ?? "Unknown Location",
    place_image: mockPlaceBoxes.find((p) => p.place_id === 16)?.place_image,
    trip_id: 2,
    notes: mockNotes.filter((note) => note.reference_id === 26 && note.reference_type === "place" && note.trip_id === 2),
  },
  {
    id: 27,
    date: "2025-09-24",
    time_begin: "14:00",
    time_end: "16:00",
    place_id: 19,
    title: mockPlaceBoxes.find((p) => p.place_id === 19)?.title ?? "Unknown Title",
    location: mockPlaceBoxes.find((p) => p.place_id === 19)?.location ?? "Unknown Location",
    place_image: mockPlaceBoxes.find((p) => p.place_id === 19)?.place_image,
    trip_id: 2,
    notes: mockNotes.filter((note) => note.reference_id === 27 && note.reference_type === "place" && note.trip_id === 2),
  },
  {
    id: 28,
    date: "2025-09-25",
    time_begin: "18:00",
    time_end: "20:00",
    place_id: 20,
    title: mockPlaceBoxes.find((p) => p.place_id === 20)?.title ?? "Unknown Title",
    location: mockPlaceBoxes.find((p) => p.place_id === 20)?.location ?? "Unknown Location",
    place_image: mockPlaceBoxes.find((p) => p.place_id === 20)?.place_image,
    trip_id: 2,
    notes: mockNotes.filter((note) => note.reference_id === 28 && note.reference_type === "place" && note.trip_id === 2),
  },

  // Trip 3: Thailand Beach Getaway
  {
    id: 5,
    date: "2025-08-20",
    time_begin: "09:00",
    time_end: "11:30",
    place_id: 13,
    title: mockPlaceBoxes.find((p) => p.place_id === 13)?.title ?? "Unknown Title",
    location: mockPlaceBoxes.find((p) => p.place_id === 13)?.location ?? "Unknown Location",
    place_image: mockPlaceBoxes.find((p) => p.place_id === 13)?.place_image,
    trip_id: 3,
    notes: mockNotes.filter((note) => note.reference_id === 5 && note.reference_type === "place" && note.trip_id === 3),
  },
  {
    id: 6,
    date: "2025-08-21",
    time_begin: "08:00",
    time_end: "15:00",
    place_id: 14,
    title: mockPlaceBoxes.find((p) => p.place_id === 14)?.title ?? "Unknown Title",
    location: mockPlaceBoxes.find((p) => p.place_id === 14)?.location ?? "Unknown Location",
    place_image: mockPlaceBoxes.find((p) => p.place_id === 14)?.place_image,
    trip_id: 3,
    notes: mockNotes.filter((note) => note.reference_id === 6 && note.reference_type === "place" && note.trip_id === 3),
  },

  // Trip 4: Tokyo Winter Festival
  {
    id: 7,
    date: "2025-12-07",
    time_begin: "18:00",
    time_end: "20:00",
    place_id: 3,
    title: mockPlaceBoxes.find((p) => p.place_id === 3)?.title ?? "Unknown Title",
    location: mockPlaceBoxes.find((p) => p.place_id === 3)?.location ?? "Unknown Location",
    place_image: mockPlaceBoxes.find((p) => p.place_id === 3)?.place_image,
    trip_id: 4,
    notes: mockNotes.filter((note) => note.reference_id === 7 && note.reference_type === "place" && note.trip_id === 4),
  },
  {
    id: 8,
    date: "2025-12-08",
    time_begin: "09:30",
    time_end: "11:30",
    place_id: 4,
    title: mockPlaceBoxes.find((p) => p.place_id === 4)?.title ?? "Unknown Title",
    location: mockPlaceBoxes.find((p) => p.place_id === 4)?.location ?? "Unknown Location",
    place_image: mockPlaceBoxes.find((p) => p.place_id === 4)?.place_image,
    trip_id: 4,
    notes: mockNotes.filter((note) => note.reference_id === 8 && note.reference_type === "place" && note.trip_id === 4),
  },

  // Trip 5: Bali Adventure
  {
    id: 9,
    date: "2025-11-16",
    time_begin: "10:00",
    time_end: "12:00",
    place_id: 5,
    title: mockPlaceBoxes.find((p) => p.place_id === 5)?.title ?? "Unknown Title",
    location: mockPlaceBoxes.find((p) => p.place_id === 5)?.location ?? "Unknown Location",
    place_image: mockPlaceBoxes.find((p) => p.place_id === 5)?.place_image,
    trip_id: 5,
    notes: mockNotes.filter((note) => note.reference_id === 9 && note.reference_type === "place" && note.trip_id === 5),
  },
  {
    id: 10,
    date: "2025-11-17",
    time_begin: "16:00",
    time_end: "18:00",
    place_id: 6,
    title: mockPlaceBoxes.find((p) => p.place_id === 6)?.title ?? "Unknown Title",
    location: mockPlaceBoxes.find((p) => p.place_id === 6)?.location ?? "Unknown Location",
    place_image: mockPlaceBoxes.find((p) => p.place_id === 6)?.place_image,
    trip_id: 5,
    notes: mockNotes.filter((note) => note.reference_id === 10 && note.reference_type === "place" && note.trip_id === 5),
  },

  // Trip 6: Swiss Alps Hiking
  {
    id: 11,
    date: "2025-07-11",
    time_begin: "09:00",
    time_end: "15:00",
    place_id: 7,
    title: mockPlaceBoxes.find((p) => p.place_id === 7)?.title ?? "Unknown Title",
    location: mockPlaceBoxes.find((p) => p.place_id === 7)?.location ?? "Unknown Location",
    place_image: mockPlaceBoxes.find((p) => p.place_id === 7)?.place_image,
    trip_id: 6,
    notes: mockNotes.filter((note) => note.reference_id === 11 && note.reference_type === "place" && note.trip_id === 6),
  },
  {
    id: 12,
    date: "2025-07-12",
    time_begin: "10:00",
    time_end: "14:00",
    place_id: 8,
    title: mockPlaceBoxes.find((p) => p.place_id === 8)?.title ?? "Unknown Title",
    location: mockPlaceBoxes.find((p) => p.place_id === 8)?.location ?? "Unknown Location",
    place_image: mockPlaceBoxes.find((p) => p.place_id === 8)?.place_image,
    trip_id: 6,
    notes: mockNotes.filter((note) => note.reference_id === 12 && note.reference_type === "place" && note.trip_id === 6),
  },

  // Trip 7: Trip to Thailand (Invitation)
  {
    id: 13,
    date: "2025-10-26",
    time_begin: "09:30",
    time_end: "11:00",
    place_id: 15,
    title: mockPlaceBoxes.find((p) => p.place_id === 15)?.title ?? "Unknown Title",
    location: mockPlaceBoxes.find((p) => p.place_id === 15)?.location ?? "Unknown Location",
    place_image: mockPlaceBoxes.find((p) => p.place_id === 15)?.place_image,
    trip_id: 7,
    notes: mockNotes.filter((note) => note.reference_id === 13 && note.reference_type === "place" && note.trip_id === 7),
  },
  {
    id: 14,
    date: "2025-10-27",
    time_begin: "13:00",
    time_end: "15:00",
    place_id: 13,
    title: mockPlaceBoxes.find((p) => p.place_id === 13)?.title ?? "Unknown Title",
    location: mockPlaceBoxes.find((p) => p.place_id === 13)?.location ?? "Unknown Location",
    place_image: mockPlaceBoxes.find((p) => p.place_id === 13)?.place_image,
    trip_id: 7,
    notes: mockNotes.filter((note) => note.reference_id === 14 && note.reference_type === "place" && note.trip_id === 7),
  },

  // Trip 8: Korean Food Tour (Invitation)
  {
    id: 15,
    date: "2025-12-16",
    time_begin: "17:00",
    time_end: "20:00",
    place_id: 1,
    title: mockPlaceBoxes.find((p) => p.place_id === 1)?.title ?? "Unknown Title",
    location: mockPlaceBoxes.find((p) => p.place_id === 1)?.location ?? "Unknown Location",
    place_image: mockPlaceBoxes.find((p) => p.place_id === 1)?.place_image,
    trip_id: 8,
    notes: mockNotes.filter((note) => note.reference_id === 15 && note.reference_type === "place" && note.trip_id === 8),
  },
  {
    id: 16,
    date: "2025-12-17",
    time_begin: "11:00",
    time_end: "13:00",
    place_id: 2,
    title: mockPlaceBoxes.find((p) => p.place_id === 2)?.title ?? "Unknown Title",
    location: mockPlaceBoxes.find((p) => p.place_id === 2)?.location ?? "Unknown Location",
    place_image: mockPlaceBoxes.find((p) => p.place_id === 2)?.place_image,
    trip_id: 8,
    notes: mockNotes.filter((note) => note.reference_id === 16 && note.reference_type === "place" && note.trip_id === 8),
  },

  // Trip 9: Ultimate Japan Travel Guide
  {
    id: 17,
    date: "2025-07-16",
    time_begin: "08:00",
    time_end: "10:00",
    place_id: 5,
    title: mockPlaceBoxes.find((p) => p.place_id === 5)?.title ?? "Unknown Title",
    location: mockPlaceBoxes.find((p) => p.place_id === 5)?.location ?? "Unknown Location",
    place_image: mockPlaceBoxes.find((p) => p.place_id === 5)?.place_image,
    trip_id: 9,
    notes: mockNotes.filter((note) => note.reference_id === 17 && note.reference_type === "place" && note.trip_id === 9),
  },
  {
    id: 18,
    date: "2025-07-17",
    time_begin: "09:00",
    time_end: "12:00",
    place_id: 6,
    title: mockPlaceBoxes.find((p) => p.place_id === 6)?.title ?? "Unknown Title",
    location: mockPlaceBoxes.find((p) => p.place_id === 6)?.location ?? "Unknown Location",
    place_image: mockPlaceBoxes.find((p) => p.place_id === 6)?.place_image,
    trip_id: 9,
    notes: mockNotes.filter((note) => note.reference_id === 18 && note.reference_type === "place" && note.trip_id === 9),
  },

  // Trip 10: European Backpacker's Paradise
  {
    id: 19,
    date: "2025-09-11",
    time_begin: "10:00",
    time_end: "12:30",
    place_id: 11,
    title: mockPlaceBoxes.find((p) => p.place_id === 11)?.title ?? "Unknown Title",
    location: mockPlaceBoxes.find((p) => p.place_id === 11)?.location ?? "Unknown Location",
    place_image: mockPlaceBoxes.find((p) => p.place_id === 11)?.place_image,
    trip_id: 10,
    notes: mockNotes.filter((note) => note.reference_id === 19 && note.reference_type === "place" && note.trip_id === 10),
  },
  {
    id: 20,
    date: "2025-09-12",
    time_begin: "14:00",
    time_end: "16:00",
    place_id: 12,
    title: mockPlaceBoxes.find((p) => p.place_id === 12)?.title ?? "Unknown Title",
    location: mockPlaceBoxes.find((p) => p.place_id === 12)?.location ?? "Unknown Location",
    place_image: mockPlaceBoxes.find((p) => p.place_id === 12)?.place_image,
    trip_id: 10,
    notes: mockNotes.filter((note) => note.reference_id === 20 && note.reference_type === "place" && note.trip_id === 10),
  },

  // Trip 11: Thailand Island Hopping
  {
    id: 21,
    date: "2025-12-21",
    time_begin: "09:00",
    time_end: "15:00",
    place_id: 14,
    title: mockPlaceBoxes.find((p) => p.place_id === 14)?.title ?? "Unknown Title",
    location: mockPlaceBoxes.find((p) => p.place_id === 14)?.location ?? "Unknown Location",
    place_image: mockPlaceBoxes.find((p) => p.place_id === 14)?.place_image,
    trip_id: 11,
    notes: mockNotes.filter((note) => note.reference_id === 21 && note.reference_type === "place" && note.trip_id === 11),
  },
  {
    id: 22,
    date: "2025-12-22",
    time_begin: "10:00",
    time_end: "12:00",
    place_id: 15,
    title: mockPlaceBoxes.find((p) => p.place_id === 15)?.title ?? "Unknown Title",
    location: mockPlaceBoxes.find((p) => p.place_id === 15)?.location ?? "Unknown Location",
    place_image: mockPlaceBoxes.find((p) => p.place_id === 15)?.place_image,
    trip_id: 11,
    notes: mockNotes.filter((note) => note.reference_id === 22 && note.reference_type === "place" && note.trip_id === 11),
  },
];

// 10. Activity Event Boxes
export const mockActivityEventBoxes: ActivityEventBox[] = [
  // ---------- Trip 1: Japan ----------
  {
    id: 1,
    title: "Travel to Hotel",
    date: "2025-09-05",
    time_begin: "16:00",
    time_end: "17:30",
    transportation: "Train",
    notes: mockNotes.filter(
      (note) =>
        note.reference_id === 1 &&
        note.reference_type === "event" &&
        note.trip_id === 1
    ),
    trip_id: 1,
  },
  {
    id: 2,
    title: "Lunch Break",
    date: "2025-09-07",
    time_begin: "12:00",
    time_end: "13:30",
    transportation: "Walk",
    notes: mockNotes.filter(
      (note) =>
        note.reference_id === 2 &&
        note.reference_type === "event" &&
        note.trip_id === 1
    ),
    trip_id: 1,
  },
  {
    id: 5,
    title: "Evening Shopping at Shibuya",
    date: "2025-09-07",
    time_begin: "18:00",
    time_end: "20:00",
    transportation: "Walk",
    notes: mockNotes.filter(
      (note) =>
        note.reference_id === 5 &&
        note.reference_type === "event" &&
        note.trip_id === 1
    ),
    trip_id: 1,
  },

  // ---------- Trip 2: Europe ----------
  {
    id: 3,
    title: "Train to Amsterdam",
    date: "2025-09-26",
    time_begin: "09:00",
    time_end: "12:00",
    transportation: "Train",
    notes: mockNotes.filter(
      (note) =>
        note.reference_id === 3 &&
        note.reference_type === "event" &&
        note.trip_id === 2
    ),
    trip_id: 2,
  },
  {
    id: 6,
    title: "Dinner in Paris",
    date: "2025-09-25",
    time_begin: "19:00",
    time_end: "21:00",
    transportation: "Walk",
    notes: mockNotes.filter(
      (note) =>
        note.reference_id === 6 &&
        note.reference_type === "event" &&
        note.trip_id === 2
    ),
    trip_id: 2,
  },
  {
    id: 7,
    title: "Morning Museum Tour",
    date: "2025-09-25",
    time_begin: "09:00",
    time_end: "11:30",
    transportation: "Walk",
    notes: mockNotes.filter(
      (note) =>
        note.reference_id === 7 &&
        note.reference_type === "event" &&
        note.trip_id === 2
    ),
    trip_id: 2,
  },

  // ---------- Trip 9: Japan Guide ----------
  {
    id: 4,
    title: "Train to Osaka",
    date: "2025-07-16",
    time_begin: "12:00",
    time_end: "13:00",
    transportation: "Train",
    notes: mockNotes.filter(
      (note) =>
        note.reference_id === 4 &&
        note.reference_type === "event" &&
        note.trip_id === 9
    ),
    trip_id: 9,
  },
  {
    id: 8,
    title: "Kyoto Temple Visit",
    date: "2025-07-17",
    time_begin: "14:00",
    time_end: "16:00",
    transportation: "Bus",
    notes: mockNotes.filter(
      (note) =>
        note.reference_id === 8 &&
        note.reference_type === "event" &&
        note.trip_id === 9
    ),
    trip_id: 9,
  },
  {
    id: 9,
    title: "Evening Street Food Tour",
    date: "2025-07-17",
    time_begin: "18:00",
    time_end: "20:00",
    transportation: "Walk",
    notes: mockNotes.filter(
      (note) =>
        note.reference_id === 9 &&
        note.reference_type === "event" &&
        note.trip_id === 9
    ),
    trip_id: 9,
  },
];

// <--------------------------------------------- Votes ----------------------------------------->
// 11. Votes (FIXED with trip_id)
export const mockVotes: Vote[] = [
  {
    id: 1,
    user_id: 1,
    activity_id: 101,
    vote_type: "place",
    place_id: 1,
    username: mockUserDetails[0].name,
    trip_id: 1, // Japan trip
  },
  {
    id: 2,
    user_id: 2,
    activity_id: 101,
    vote_type: "place",
    place_id: 2,
    username: mockUserDetails[1].name,
    trip_id: 1, // Japan trip
  },
  {
    id: 3,
    user_id: 3,
    activity_id: 101,
    vote_type: "place",
    place_id: 1,
    username: mockUserDetails[2].name,
    trip_id: 1, // Japan trip
  },
  {
    id: 4,
    user_id: 1,
    activity_id: 102,
    vote_type: "event",
    event_id: 1,
    username: mockUserDetails[0].name,
    trip_id: 2, // European trip
  },
  {
    id: 5,
    user_id: 2,
    activity_id: 102,
    vote_type: "event",
    event_id: 2,
    username: mockUserDetails[1].name,
    trip_id: 2, // European trip
  },
  {
    id: 6,
    user_id: 3,
    activity_id: 102,
    vote_type: "event",
    event_id: 1,
    username: mockUserDetails[2].name,
    trip_id: 2, // European trip
  },
  {
    id: 7,
    user_id: 1,
    activity_id: 104,
    vote_type: "place",
    place_id: 21,
    username: mockUserDetails[0].name,
    trip_id: 1,
  },
  {
    id: 8,
    user_id: 2,
    activity_id: 104,
    vote_type: "place",
    place_id: 21,
    username: mockUserDetails[1].name,
    trip_id: 1,
  },
  {
    id: 9,
    user_id: 3,
    activity_id: 104,
    vote_type: "place",
    place_id: 21,
    username: mockUserDetails[2].name,
    trip_id: 1,
  },
  {
    id: 10,
    user_id: 4,
    activity_id: 104,
    vote_type: "place",
    place_id: 22,
    username: mockUserDetails[3].name,
    trip_id: 1,
  },
  {
    id: 11,
    user_id: 1,
    activity_id: 105,
    vote_type: "event",
    event_id: 1, // Car
    username: mockUserDetails[0].name,
    trip_id: 1,
  },
  {
    id: 12,
    user_id: 2,
    activity_id: 105,
    vote_type: "event",
    event_id: 3, // Train
    username: mockUserDetails[1].name,
    trip_id: 1,
  },
  {
    id: 13,
    user_id: 3,
    activity_id: 105,
    vote_type: "event",
    event_id: 1, // Car
    username: mockUserDetails[2].name,
    trip_id: 1,
  },
  {
    id: 14,
    user_id: 4,
    activity_id: 105,
    vote_type: "event",
    event_id: 3, // Train
    username: mockUserDetails[3].name,
    trip_id: 1,
  },
  {
    id: 15,
    user_id: 1,
    activity_id: 106,
    vote_type: "place",
    place_id: 24,
    username: mockUserDetails[0].name,
    trip_id: 2,
  },
  {
    id: 16,
    user_id: 2,
    activity_id: 106,
    vote_type: "place",
    place_id: 24,
    username: mockUserDetails[1].name,
    trip_id: 2,
  },
  {
    id: 17,
    user_id: 3,
    activity_id: 106,
    vote_type: "place",
    place_id: 24,
    username: mockUserDetails[2].name,
    trip_id: 2,
  },
  {
    id: 18,
    user_id: 4,
    activity_id: 106,
    vote_type: "place",
    place_id: 23,
    username: mockUserDetails[3].name,
    trip_id: 2,
  },
  {
    id: 19,
    user_id: 5,
    activity_id: 106,
    vote_type: "place",
    place_id: 24,
    username: mockUserDetails[0].name,
    trip_id: 2,
  },
  {
    id: 20,
    user_id: 1,
    activity_id: 107,
    vote_type: "event",
    event_id: 2, // Bus
    username: mockUserDetails[0].name,
    trip_id: 2,
  },
  {
    id: 21,
    user_id: 2,
    activity_id: 107,
    vote_type: "event",
    event_id: 4, // Walk
    username: mockUserDetails[1].name,
    trip_id: 2,
  },
  {
    id: 22,
    user_id: 3,
    activity_id: 107,
    vote_type: "event",
    event_id: 3, // Train
    username: mockUserDetails[2].name,
    trip_id: 2,
  },
  {
    id: 23,
    user_id: 4,
    activity_id: 107,
    vote_type: "event",
    event_id: 2, // Bus
    username: mockUserDetails[3].name,
    trip_id: 2,
  },
];

// 12. Activity Vote Place
export const mockActivityVotePlaces: ActivityVotePlace[] = [
  {
    id: 101,
    date: "2025-09-09",
    time_begin: "18:00",
    time_end: "20:00",
    number_of_votes: 3,
    vote_type: "place",
    options: [
      {
        id: 6,
        title: "Sushi Ichiban",
        rating: 4.5,
        review_count: 200,
        location: "Ginza, Tokyo",
        place_image:
          "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300&h=200&fit=crop",
        place_id: 6,
      },
      {
        id: 7,
        title: "Ramen Yokocho",
        rating: 4.2,
        review_count: 150,
        location: "Shinjuku, Tokyo",
        place_image:
          "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&h=200&fit=crop",
        place_id: 7,
      },
      {
        id: 8,
        title: "Tempura Matsui",
        rating: 4.7,
        review_count: 180,
        location: "Asakusa, Tokyo",
        place_image:
          "https://images.unsplash.com/photo-1559314809-0f31657def5e?w=300&h=200&fit=crop",
        place_id: 8,
      },
    ],
    votes: mockVotes.filter(
      (vote) => vote.activity_id === 101 && vote.vote_type === "place"
    ),
    trip_id: 1, // Japan trip
  },
  {
    id: 104,
    date: "2025-09-10",
    time_begin: "19:00",
    time_end: "21:00",
    number_of_votes: 4,
    vote_type: "place",
    options: [
      {
        id: 21,
        title: "Sushi Saito",
        rating: 4.8,
        review_count: 320,
        location: "Tokyo, Japan",
        place_image:
          "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=300&h=200&fit=crop",
        place_id: 21,
      },
      {
        id: 22,
        title: "Izakaya Tokyo",
        rating: 4.4,
        review_count: 210,
        location: "Tokyo, Japan",
        place_image:
          "https://images.unsplash.com/photo-1576866209830-5a7e67f52c41?w=300&h=200&fit=crop",
        place_id: 22,
      },
    ],
    votes: mockVotes.filter(
      (vote) => vote.activity_id === 104 && vote.vote_type === "place"
    ),
    trip_id: 1,
  },
  {
    id: 106,
    date: "2025-09-27",
    time_begin: "18:00",
    time_end: "20:00",
    number_of_votes: 5,
    vote_type: "place",
    options: [
      {
        id: 23,
        title: "Brussels Cafe",
        rating: 4.3,
        review_count: 120,
        location: "Brussels, Belgium",
        place_image:
          "https://images.unsplash.com/photo-1541542684-4a5c6fd39d2f?w=300&h=200&fit=crop",
        place_id: 23,
      },
      {
        id: 24,
        title: "Amsterdam Steakhouse",
        rating: 4.6,
        review_count: 260,
        location: "Amsterdam, Netherlands",
        place_image:
          "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=300&h=200&fit=crop",
        place_id: 24,
      },
    ],
    votes: mockVotes.filter(
      (vote) => vote.activity_id === 106 && vote.vote_type === "place"
    ),
    trip_id: 2,
  },
];

// 13. Activity Vote Event
export const mockActivityVoteEvents: ActivityVoteEvent[] = [
  {
    id: 102,
    title: "Paris to Amsterdam",
    date: "2025-09-26",
    time_begin: "09:00",
    time_end: "10:00",
    number_of_votes: 3,
    vote_type: "event",
    options: mockTransportationOptions,
    votes: mockVotes.filter(
      (vote) => vote.activity_id === 102 && vote.vote_type === "event"
    ),
    trip_id: 2, // European trip
  },
  {
    id: 103,
    title: "Paris City Tour",
    date: "2025-09-08",
    time_begin: "09:00",
    time_end: "10:00",
    number_of_votes: 3,
    vote_type: "event",
    options: mockTransportationOptions,
    votes: mockVotes.filter(
      (vote) => vote.activity_id === 103 && vote.vote_type === "event"
    ),
    trip_id: 2, // European trip
  },
  {
    id: 105,
    title: "Tokyo Morning Trip",
    date: "2025-09-11",
    time_begin: "10:00",
    time_end: "11:00",
    number_of_votes: 3,
    vote_type: "event",
    options: mockTransportationOptions, // Car, Bus, Train, Walk, Flight, Boat
    votes: mockVotes.filter(
      (vote) => vote.activity_id === 105 && vote.vote_type === "event"
    ),
    trip_id: 1, // Japan trip
  },
];


// <-------------------------- Trip ----------------------------------------->
// 14. Trip Boxes (FIXED dates to 2025)
export const mockTripBoxes: TripBox[] = [
  // MAIN TRIPS (with full data)
  {
    trip_id: 1,
    trip_name: "Summer Adventure in Japan", // NOW - Currently traveling
    trip_image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop",
    start_date: "2025-09-05", // Started 3 days ago (today is 2025-09-08)
    end_date: "2025-09-12", // Ends in 4 days
    member_count: 4,
    status_planning: "planning",
    owner_name: mockTripMembers[0].name,
    owner_image: mockTripMembers[0].user_image,
  },
  {
    trip_id: 2,
    trip_name: "European Backpacking Tour", // DAYS - Upcoming trip
    trip_image:
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&h=300&fit=crop",
    start_date: "2025-09-23", // Starts in 15 days
    end_date: "2025-10-13", // Ends in 35 days
    member_count: 3,
    status_planning: "planning",
    owner_name: mockTripMembers[1].name,
    owner_image: mockTripMembers[1].user_image,
  },
  {
    trip_id: 3,
    trip_name: "Thailand Beach Getaway", // END - Completed trip
    trip_image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    start_date: "2025-08-19", // Started 20 days ago
    end_date: "2025-08-27", // Ended 12 days ago
    member_count: 2,
    status_planning: "completed",
    owner_name: mockTripMembers[0].name,
    owner_image: mockTripMembers[0].user_image,
  },

  // ADDITIONAL TRIPS (for variety - FIXED to 2025)
  {
    trip_id: 4,
    trip_name: "Tokyo Winter Festival",
    trip_image:
      "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=400&h=300&fit=crop",
    start_date: "2025-12-06", // Future trip
    end_date: "2025-12-11",
    member_count: 6,
    status_planning: "planning",
    owner_name: mockTripMembers[5].name, // Alice Wang
    owner_image: mockTripMembers[5].user_image,
  },
  {
    trip_id: 5,
    trip_name: "Bali Adventure",
    trip_image:
      "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=300&fit=crop",
    start_date: "2025-11-15", // Future trip
    end_date: "2025-11-22",
    member_count: 8,
    status_planning: "planning",
    owner_name: mockTripMembers[6].name, // Bob Chen
    owner_image: mockTripMembers[6].user_image,
  },
  {
    trip_id: 6,
    trip_name: "Swiss Alps Hiking",
    trip_image:
      "https://images.unsplash.com/photo-1464822759844-d150078e9243?w=400&h=300&fit=crop",
    start_date: "2025-07-10", // Past trip
    end_date: "2025-07-17",
    member_count: 4,
    status_planning: "completed",
    owner_name: mockTripMembers[7].name, // Carol Smith
    owner_image: mockTripMembers[7].user_image,
  },
];

// 15. Trip Invitations (Separate from main trips)
export const mockTripInvitations: TripBox[] = [
  {
    trip_id: 7,
    trip_name: "Trip to Thailand",
    trip_image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    start_date: "2025-10-25", // Future invitation
    end_date: "2025-11-01",
    member_count: 3,
    status_planning: "planning",
    owner_name: mockTripMembers[8].name, // Keen_Kung
    owner_image: mockTripMembers[8].user_image,
  },
  {
    trip_id: 8,
    trip_name: "Korean Food Tour",
    trip_image:
      "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=400&h=300&fit=crop",
    start_date: "2025-12-15", // Future invitation
    end_date: "2025-12-22",
    member_count: 6,
    status_planning: "planning",
    owner_name: mockTripMembers[9].name, // Sarah Kim
    owner_image: mockTripMembers[9].user_image,
  },
];

export const mockTripDetails: TripDetails[] = [
  ...mockTripBoxes,
  ...mockTripInvitations,
].map((trip) => ({
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
  note: mockNotes.filter((n) => n.trip_id === trip.trip_id),
  trip_status: trip.status_planning,
  trip_code: `TRIP${trip.trip_id}CODE`,
  trip_password: `pass${trip.trip_id}`,
}));

// <-------------------------------------- Guides --------------------------------------->
// 16. Guide Boxes (Updated dates to 2025)
export const mockGuideBoxes: GuideBox[] = [
  {
    id: 1,
    title: "Ultimate Japan Travel Guide",
    start_date: "2025-07-15",
    end_date: "2025-07-25",
    guide_image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop",
    copies: 156,
    owner_name: mockTripMembers[0].name,
    owner_image: mockTripMembers[0].user_image,
    description:
      "I spend 10 days on this amazing journey and will tell everyone my plan here...",
    trip_id: 9,
  },
  {
    id: 2,
    title: "European Backpacker's Paradise",
    start_date: "2025-09-10",
    end_date: "2025-09-30",
    guide_image:
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&h=300&fit=crop",
    copies: 89,
    owner_name: mockTripMembers[1].name,
    owner_image: mockTripMembers[1].user_image,
    description:
      "Discover the best routes and hidden gems across Europe with this comprehensive guide...",
    trip_id: 10,
  },
  {
    id: 3,
    title: "Thailand Island Hopping",
    start_date: "2025-12-20",
    end_date: "2025-12-28",
    guide_image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    copies: 234,
    owner_name: mockTripMembers[2].name,
    owner_image: mockTripMembers[2].user_image,
    description:
      "Explore the most beautiful islands in Thailand with insider tips and recommendations...",
    trip_id: 11,
  },
];

// 17. Trip Guide Details (Updated dates to 2025)
export const mockGuideDetails: GuideDetails[] = [
  {
    id: 1,
    title: "Ultimate Japan Travel Guide",
    start_date: "2025-07-15",
    end_date: "2025-07-25",
    guide_image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop",
    copies: 156,
    owner_name: mockTripMembers[0].name,
    owner_image: mockTripMembers[0].user_image,
    description:
      "I spend 10 days on this amazing journey and will tell everyone my plan here...",
    owner_email: mockTripMembers[0].email!,
    group_members: 4,
    budget: 2500,
    trip_id: 9,
  },
  {
    id: 2,
    title: "European Backpacker's Paradise",
    start_date: "2025-09-10",
    end_date: "2025-09-30",
    guide_image:
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&h=300&fit=crop",
    copies: 89,
    owner_name: mockTripMembers[1].name,
    owner_image: mockTripMembers[1].user_image,
    description:
      "Discover the best routes and hidden gems across Europe with this comprehensive guide...",
    owner_email: mockTripMembers[1].email!,
    group_members: 3,
    budget: 3200,
    trip_id: 10,
  },
  {
    id: 3,
    title: "Thailand Island Hopping",
    start_date: "2025-12-20",
    end_date: "2025-12-28",
    guide_image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    copies: 234,
    owner_name: mockTripMembers[2].name,
    owner_image: mockTripMembers[2].user_image,
    description:
      "Explore the most beautiful islands in Thailand with insider tips and recommendations...",
    owner_email: mockTripMembers[2].email!,
    group_members: 2,
    budget: 1800,
    trip_id: 11,
  },
];
