import {
  mockActivityPlaceBoxes,
  mockActivityEventBoxes,
} from "@/mock/mockDataComplete";
import { extractDates } from "@/util/extractDates";

export interface DailyActivity {
  date: string;
  activities: (ActivityPlaceBox | ActivityEventBox)[];
}

export const organizeActivitiesByDay = (
  tripId: number,
  startDate: string,
  endDate: string
): DailyActivity[] => {
  try {
    // 1. กรองข้อมูลตาม trip_id
    const filteredPlaces = mockActivityPlaceBoxes.filter(
      (place) => place.trip_id === tripId
    );
    const filteredEvents = mockActivityEventBoxes.filter(
      (event) => event.trip_id === tripId
    );

    const allActivities = [...filteredPlaces, ...filteredEvents];

    // 2. เอาช่วงวันทั้งหมดจาก trip
    const allDates = extractDates(startDate, endDate);

    // 3. แมปทุกวันเข้า array
    const dailyActivities: DailyActivity[] = allDates.map((date) => {
      // หากิจกรรมของวันนั้น
      const activities = allActivities
        .filter((activity) => activity.date === date)
        .sort((a, b) => a.time_begin.localeCompare(b.time_begin));

      return {
        date,
        activities,
      };
    });

    return dailyActivities;
  } catch (error) {
    console.error("Error organizing activities:", error);
    return [];
  }
};