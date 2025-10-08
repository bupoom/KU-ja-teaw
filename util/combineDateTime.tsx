export const combineDateTime = (dateStr: string, timeStr: string) => {
  if (!dateStr) return "";
  if (!timeStr) return dateStr; // fallback

  try {
    const datePart = dateStr.split("T")[0]; // "2025-11-30"
    return `${datePart}T${timeStr}`;        // "2025-11-30T07:00:00"
  } catch {
    return dateStr;
  }
};

export const getTime = (isoString: string): string => {
    return new Date(isoString).toISOString().split("T")[1].split(".")[0]; // "21:40:00"
};