import React from "react";
import { View, Text } from "react-native";
import { formatDateTime } from "@/util/formatDateTime";

interface Flight {
  id: number;
  departure_airport: string;
  arrival_airport: string;
  departure_date: string;
  arrival_date: string;
  airline: string;
  departure_country: string;
  arrival_country: string;
  trip_id: number;
}

export const FlightBox: React.FC<Flight> = ({
  id,
  departure_airport,
  arrival_airport,
  departure_date,
  arrival_date,
  airline,
  departure_country,
  arrival_country,
  trip_id,
}) => {
  const departureDateTime = formatDateTime(departure_date);
  const arrivalDateTime = formatDateTime(arrival_date);

  return (
    <View className="border-2 border-gray_border rounded-xl p-4 mb-4">
      {/* Airport Codes and Countries */}
      <View className="flex-row justify-between items-start mb-1">
        <View className="flex-1">
          <Text className="text-base font-bold text-black">
            {departure_airport}
          </Text>
          <Text className="text-gray-600 text-sm font-sf-light">
            {departure_country}
          </Text>
        </View>

        <View className="flex-1 items-end mb-1">
          <Text className="text-base font-bold text-black">
            {arrival_airport}
          </Text>
          <Text className="text-gray-600 text-sm font-sf-light">
            {arrival_country}
          </Text>
        </View>
      </View>

      <View className="flex-row justify-between items-center mb-1">
        <Text className="text-xs font-medium text-black">
          {departureDateTime.date} - {arrivalDateTime.date}
        </Text>
        <Text className="text-xs font-medium text-black">{airline}</Text>
      </View>

      <Text className="text-xs font-medium text-black">
        {departureDateTime.time} - {arrivalDateTime.time}
      </Text>
    </View>
  );
};