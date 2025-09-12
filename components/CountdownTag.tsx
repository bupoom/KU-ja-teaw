// components/CountdownTag.tsx
import React from "react";
import { View, Text } from "react-native";

type CountdownType = 'Now' | 'Days' | 'End';

interface Props {
  startDate: string; // YYYY-MM-DD format
  endDate: string;   // YYYY-MM-DD format
}

interface CountdownResult {
  type: CountdownType;
  text: string;
  bgColor: string;
  textColor: string;
}

const calculateCountdown = (startDate: string, endDate: string): CountdownResult => {
  const today = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  // Reset time to midnight for accurate date comparison
  today.setHours(0, 0, 0, 0);
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  // If today is between start and end date (inclusive)
  if (today >= start && today <= end) {
    return {
      type: 'Now',
      text: 'Now',
      bgColor: '#3B82F6', // blue-500
      textColor: '#FFFFFF'
    };
  }
  
  // If trip has ended
  if (today > end) {
    return {
      type: 'End',
      text: 'End',
      bgColor: '#000000', // black
      textColor: '#FFFFFF'
    };
  }
  
  // If trip is upcoming - calculate days until start
  const diffTime = start.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return {
    type: 'Days',
    text: `${diffDays} Days`,
    bgColor: '#10B981', // green-500
    textColor: '#FFFFFF'
  };
};

const CountdownTag: React.FC<Props> = ({ startDate, endDate }) => {
  const countdown = calculateCountdown(startDate, endDate);

  return (
    <View
      className="px-3 py-1 rounded-full min-w-[60px] items-center justify-center"
      style={{ backgroundColor: countdown.bgColor }}
    >
      <Text 
        className="text-sm font-medium"
        style={{ color: countdown.textColor }}
      >
        {countdown.text}
      </Text>
    </View>
  );
};

export default CountdownTag;
export type { CountdownType };