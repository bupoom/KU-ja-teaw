import { extractDates } from "@/util/extractDates";
import { getAllActivitiesInTrip } from "@/service/APIserver/activity";

export interface DailyActivity {
    date: string;
    activities: (ActivityPlaceBox | ActivityEventBox)[];
}

export const organizeActivitiesByDay = async (
    tripId: number,
    startDate: string,
    endDate: string
): Promise<DailyActivity[]> => {
    try {
        const allActivities = await getAllActivitiesInTrip(tripId);

        const allDates = extractDates(startDate, endDate);

        const dailyActivities: DailyActivity[] = allDates.map(date => {
            const activities = allActivities
                .filter(activity => {
                    const activityDate = new Date(activity.date)
                        .toLocaleDateString("en-CA");
                    const compareDate = new Date(date)
                        .toLocaleDateString("en-CA");

                    return activityDate === compareDate;
                })
                .sort((a, b) => a.time_begin.localeCompare(b.time_begin));

            return {
                date,
                activities,
            };
        });

        console.log("result!! : ", dailyActivities);
        return dailyActivities;
    } catch (error) {
        console.error("Error organizing activities:", error);
        return [];
    }
};
