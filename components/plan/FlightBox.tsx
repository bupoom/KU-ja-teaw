import { formatDateTime } from "@/util/formatFucntion/formatDateTime";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

export const FlightBox: React.FC<Flight> = (flight) => {
  return (
    <View className="bg-white rounded-lg p-4 border border-gray_border mb-3">
      {/* Airport Codes */}
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-lg font-bold text-gray-900 mr-2">
          {flight.departure_airport}
        </Text>
        <Feather name="arrow-right" size={16} color="#6B7280" />
        <Text className="text-lg font-bold text-gray-900 ml-2">
          {flight.arrival_airport}
        </Text>
      </View>

      {/* Countries */}
      <View className="flex-row justify-between mb-2">
        <Text className="text-sm text-gray-600">
          {flight.departure_country}
        </Text>
        <Text className="text-sm text-gray-600">{flight.arrival_country}</Text>
      </View>

      {/* Date + Time */}
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-sm font-medium text-gray-900">
          {formatDateTime(flight.departure_date).time} : {formatDateTime(flight.departure_date).date}
        </Text>
        <Text className="text-sm font-medium text-gray-900">
          {formatDateTime(flight.arrival_date).time} : {formatDateTime(flight.arrival_date).date}
        </Text>
      </View>

      {/* Airline */}
      <View className="bg-gray-50 rounded-lg p-2">
        <Text className="text-sm font-medium text-gray-900 text-center">
          {flight.airline}
        </Text>
      </View>
    </View>
  );
};
