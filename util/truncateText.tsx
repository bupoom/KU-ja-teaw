export const truncateText = (text: string, maxLength: number = 20): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + '...';
};

// หรือแบบที่ยืดหยุ่นมากกว่า รองรับตัดที่ช่องว่าง
export const truncateTextAtWord = (text: string, maxLength: number = 20): string => {
  if (text.length <= maxLength) {
    return text;
  }
  
  const truncated = text.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  
  // ถ้าเจอช่องว่าง และไม่ใช่ตัวอักษรแรก ให้ตัดที่ช่องว่าง
  if (lastSpaceIndex > 0) {
    return truncated.substring(0, lastSpaceIndex) + '...';
  }
  
  // ถ้าไม่เจอช่องว่าง ให้ตัดปกติ
  return truncated + '...';
};

// เอาไว้ตัดคำ