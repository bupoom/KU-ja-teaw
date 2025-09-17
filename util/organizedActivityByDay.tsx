// utils/organizeActivities.ts
import { mockActivityPlaceBoxes, mockActivityEventBoxes } from "@/mock/mockDataComplete";

interface ActivityPlaceBox {
  id: number;
  title: string;
  date: string;
  time_begin: string;
  time_end: string;
  location: string;
  place_id?: number;
  place_image?: string;
  trip_id: number;
}

interface ActivityEventBox {
  id: number;
  title: string;
  date: string;
  time_begin: string;
  time_end: string;
  transportation?: string;
  Notes?: any[];
  trip_id: number;
}

export interface DailyActivity {
  date: string;
  activities: (ActivityPlaceBox | ActivityEventBox)[];
}

export const organizeActivitiesByDay = (tripId: number): DailyActivity[] => {
  try {
    // ขั้นตอนที่ 1: กรองข้อมูลตาม trip_id
    const filteredPlaces = mockActivityPlaceBoxes.filter(place => place.trip_id === tripId);
    const filteredEvents = mockActivityEventBoxes.filter(event => event.trip_id === tripId);

    // ขั้นตอนที่ 2: รวมข้อมูลเข้าด้วยกัน
    const allActivities = [...filteredPlaces, ...filteredEvents];

    // ขั้นตอนที่ 3: จัดกลุ่มตามวันที่
    const groupedByDate: Record<string, (ActivityPlaceBox | ActivityEventBox)[]> = {};
    
    allActivities.forEach(activity => {
      if (!groupedByDate[activity.date]) {
        groupedByDate[activity.date] = [];
      }
      groupedByDate[activity.date].push(activity);
    });

    // ขั้นตอนที่ 4: เรียงลำดับกิจกรรมในแต่ละวันตามเวลา
    Object.keys(groupedByDate).forEach(date => {
      groupedByDate[date].sort((a, b) => {
        return a.time_begin.localeCompare(b.time_begin);
      });
    });

    // ขั้นตอนที่ 5: แปลงเป็น array และเรียงตามวันที่
    const dailyActivities: DailyActivity[] = Object.keys(groupedByDate)
      .sort()
      .map(date => ({
        date,
        activities: groupedByDate[date]
      }));

    return dailyActivities;
  } catch (error) {
    console.error("Error organizing activities:", error);
    return [];
  }
};