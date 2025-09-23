import client from "../client";

const endpoints = {
  guide: {
    GuideDetails: (tripId: string) => `/api/trips/${tripId}/summarize`,
  }
};




// export const updateUserDetails = async (username: string, phone: string, profile: File) => {
export const getGuideDetails = async (tripId: string) => {
  try {
    const response = await client.get(endpoints.guide.GuideDetails(tripId));
    return response.data;
  } catch (error) {
    console.error("Error fetching guide details:", error);
    throw error;
  }
};

// Example Data guide 2 
// {
//   "trip_detail": [
//     {
//       "trip_id": 2,
//       "title": "TRAVEL GUIDE TO OSHI KINGDOM",
//       "joined_people": 3,
//       "start_date": "2025-12-31T17:00:00.000Z",
//       "end_date": "2999-12-31T17:00:00.000Z",
//       "budget": 42069420,
//       "poster_image_link": "https://kfvtpdwnpkkrcsjnopax.supabase.co/storage/v1/object/sign/posters/2-noice.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jNzc5MThkMC01MzZmLTRkNmItYjYwZS0zYmEyMTJjYzRhMmIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwb3N0ZXJzLzItbm9pY2UuanBnIiwiaWF0IjoxNzU4Mjg1NTA0LCJleHAiOjE3NTgyODkxMDR9.SJnjAr5pWWp3BLCo0G_2V3_if7OY9M3Euu43lAXxjws"
//     }
//   ],
//   "owner_detail": {
//     "name": "OSHI",
//     "phone": "OSHI_PHONE",
//     "email": "OSHI@gmail.com",
//     "user_id": "OSHI",
//     "profile_picture_link": "https://kfvtpdwnpkkrcsjnopax.supabase.co/storage/v1/object/sign/profiles/OSHI-oshi_profile.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jNzc5MThkMC01MzZmLTRkNmItYjYwZS0zYmEyMTJjYzRhMmIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9maWxlcy9PU0hJLW9zaGlfcHJvZmlsZS5qcGciLCJpYXQiOjE3NTgyODU1MDQsImV4cCI6MTc1ODI4OTEwNH0.ieezQ6KIudqrxRH8z3BPuKVAMNtXeYK7420RjNgeH8A"
//   },
//   "members_detail": [
//     {
//       "name": "Keen",
//       "phone": "0123456",
//       "email": "keen@example.com",
//       "user_id": "keen1234",
//       "profile_picture_link": "https://kfvtpdwnpkkrcsjnopax.supabase.co/storage/v1/object/sign/profiles/keen1234-keen_profile.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jNzc5MThkMC01MzZmLTRkNmItYjYwZS0zYmEyMTJjYzRhMmIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9maWxlcy9rZWVuMTIzNC1rZWVuX3Byb2ZpbGUuanBnIiwiaWF0IjoxNzU4Mjg1NTA1LCJleHAiOjE3NTgyODkxMDV9.KgL0_OfUHjSGtao8RpliEj511SeepyM8HkZ4eVuym2s"
//     },
//     {
//       "name": "zen",
//       "phone": "zen123",
//       "email": "zen@example.com",
//       "user_id": "zenne",
//       "profile_picture_link": "https://kfvtpdwnpkkrcsjnopax.supabase.co/storage/v1/object/sign/profiles/zen_profile.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jNzc5MThkMC01MzZmLTRkNmItYjYwZS0zYmEyMTJjYzRhMmIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9maWxlcy96ZW5fcHJvZmlsZS5qcGciLCJpYXQiOjE3NTgyODU1MDUsImV4cCI6MTc1ODI4OTEwNX0.nRX1YSQKJrCorwAmGBT2HwS2LCn6zssgPWBXiiORjVQ"
//     }
//   ],
//   "flight_detail": [
//     {
//       "flight_id": 16,
//       "depart": {
//         "dep_date": "18/11/3222",
//         "dep_time": "00:39",
//         "dep_country": "string",
//         "dep_airp_code": "str"
//       },
//       "arrive": {
//         "arr_date": "31/10/6558",
//         "arr_time": "20:45",
//         "arr_country": "string",
//         "arr_airp_code": "str"
//       },
//       "airl_name": "string"
//     }
//   ]
// }