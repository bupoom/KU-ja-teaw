export type TripStatus = "Now" | "Coming" | "END";

/**
 * Calculate trip status based on current date and trip dates
 * This is separate from status_planning which is just a tag for planning status
 */
export const calculateTripStatus = (
    startDate: string,
    endDate: string
): TripStatus => {
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Reset time to midnight for accurate date comparison
    today.setHours(0, 0, 0, 0);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    // If today is between start and end date (inclusive) - Currently traveling
    if (today >= start && today <= end) {
        return "Now";
    }

    // If trip is in the future - Coming soon
    if (today < start) {
        return "Coming";
    }

    // If trip is in the past - Ended
    return "END";
};
