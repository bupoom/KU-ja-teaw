export const changeDateformat = (date: string): string => {
    // get "01/01/2026"
    const [day, month, year] = date.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}; // return "2026-01-01"
