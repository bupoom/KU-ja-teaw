import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { formatDateTime } from "@/util/formatFucntion/formatDateTime";

interface DateSelectorProps {
  dates: string[];
  selectedDate?: string | null;
  onDateSelect: (date: string) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({
  dates = [],
  selectedDate = null,
  onDateSelect,
}) => {
  const [currentSelected, setCurrentSelected] = useState<string | null>(
    selectedDate
  );

  // Update currentSelected when selectedDate prop changes
  useEffect(() => {
    if (selectedDate !== null) {
      setCurrentSelected(selectedDate);
    }
  }, [selectedDate]);

  // Auto-select first date if no date is selected and dates are available
  useEffect(() => {
    if (!currentSelected && dates.length > 0) {
      const firstDate = dates[0];
      setCurrentSelected(firstDate);
      onDateSelect(firstDate);
    }
  }, [dates]);

  const handleDatePress = useCallback(
    (date: string) => {
      setCurrentSelected(date);
      onDateSelect(date);
    },
    [onDateSelect]
  );

  if (!dates || dates.length === 0) {
    return (
      <View className="p-4">
        <Text className="text-gray-500 text-center">No dates available</Text>
      </View>
    );
  }

  return (
    <View className="py-3">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
        }}
        className="flex-grow-0"
      >
        {dates.map((date, index) => {
          const isSelected = currentSelected === date;

          return (
            <TouchableOpacity
              key={`${date}-${index}`}
              onPress={() => handleDatePress(date)}
              className={`px-4 py-2 rounded-full mr-3 ${
                isSelected ? "bg-green_2" : "bg-white border border-gray-300"
              }`}
            >
              <Text
                className={`text-sm font-medium ${
                  isSelected ? "text-white" : "text-dark_gray"
                }`}
              >
                {formatDateTime(date).date.split("/").slice(0, 2).join("/")}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default DateSelector;
