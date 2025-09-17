export const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const dateFormatted = date.toLocaleDateString("en-GB"); // DD/MM/YY format
    const timeFormatted = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    return { date: dateFormatted, time: timeFormatted };
  };

// เอาไว้ใช้กับ Flight Box