import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { formatDateRange } from "@/util/formatDateRange";
import { formatTimeRange } from "@/util/formatTimeRange";


export const FlightBox: React.FC<Flight> = ({
  id,
  departure_airport,
  arrival_airport,
  departure_date,
  arrival_date,
  airline,
  departure_country,
  arrival_country,
}) => {
  return (
    <View className="bg-white rounded-lg p-4 border border-gray_border mb-3">
      {/* Airport Codes */}
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-lg font-bold text-gray-900 mr-2">
          {departure_airport}
        </Text>
        <Feather name="arrow-right" size={16} color="#6B7280" />
        <Text className="text-lg font-bold text-gray-900 ml-2">
          {arrival_airport}
        </Text>
      </View>

      {/* Countries */}
      <View className="flex-row justify-between mb-2">
        <Text className="text-sm text-gray-600">{departure_country}</Text>
        <Text className="text-sm text-gray-600">{arrival_country}</Text>
      </View>

      {/* Date + Time */}
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-sm font-medium text-gray-900">
          {formatDateRange(departure_date, arrival_date)}
        </Text>
        <Text className="text-sm font-medium text-gray-900">
          {formatTimeRange(departure_date, arrival_date)}
        </Text>
      </View>

      {/* Airline */}
      <View className="bg-gray-50 rounded-lg p-2">
        <Text className="text-sm font-medium text-gray-900 text-center">
          {airline}
        </Text>
      </View>
    </View>
  );
};
