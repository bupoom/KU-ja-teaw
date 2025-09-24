export const extractDates = (startDate: string, endDate: string): string[] => {
  const dateArray: string[] = [];
  let currentDate = new Date(startDate + "T00:00:00");
  const lastDate = new Date(endDate + "T00:00:00");

  while (currentDate <= lastDate) {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    dateArray.push(`${year}-${month}-${day}`);

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateArray;
};
