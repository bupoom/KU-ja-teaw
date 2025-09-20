import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import StatusTag from './StatusTag';
import { formatDateRange } from "@/util/formatDateRange";
import { truncateText } from "@/util/truncateText";

// Interface matching TripBox with additional invitation functions
interface TripBox {
  trip_id: number;
  trip_name: string;
  trip_image: string;
  start_date: string;
  end_date: string;
  member_count: number;
  status_planning: 'planning' | 'completed';
  owner_name: string;
  owner_image: string;
}

type InviteDetails = TripBox & {
  onPressCard?: (trip: TripBox) => void;
  onJoin?: (trip: TripBox) => void;
  onReject?: (trip: TripBox) => void;
};


export default function TripInvitationBox({
  trip_id,
  trip_name,
  trip_image,
  start_date,
  end_date,
  member_count,
  status_planning,
  owner_name,
  owner_image,
  onJoin,
  onReject,
}: InviteDetails) {
  
  const tripData: TripBox = {
    trip_id,
    trip_name,
    trip_image,
    start_date,
    end_date,
    member_count,
    status_planning,
    owner_name,
    owner_image
  };

  return (
    <View
      className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray_border"
    >
      <View className="flex-row mb-2">
        <Image 
          source={{ uri: trip_image }} 
          className="w-20 h-20 rounded-xl" 
        />
        
        <View className="flex-1 ml-4 justify-between py-0">
          {/* Header with trip name and status */}
          <View className="flex-row justify-between">
            <Text 
              className="text-lg font-semibold text-black flex-1 mr-5 leading-6" 
              numberOfLines={1}
            >
              {truncateText(trip_name, 20)}
            </Text>
            <StatusTag
              text={status_planning === 'completed' ? 'Complete' : 'Planning'}
              bg={status_planning === 'completed' ? '#10B981' : '#F59E0B'}
            />
          </View>

          {/* Date and participants info */}
          <View className="flex-row items-center mt-1">
            <Feather name="calendar" size={16} color="#6B7280" />
            <Text className="text-sm text-dark_gray ml-2 font-sf-semibold">
              {formatDateRange(start_date, end_date)}
            </Text>
          </View>
          {/* Agent/Owner info */}
          <View className="flex-row items-center mt-2">
            <Image 
              source={{ uri: owner_image }} 
              className="w-6 h-6 rounded-full" 
            />
            <Text className="text-sm text-dark_gray font-sf-semibold ml-1"> Owner: {owner_name}</Text>
          </View>
        </View>
      </View>

      {/* Action buttons */}
      <View className="flex-row mt-3 gap-2">
        <TouchableOpacity
          onPress={() => onJoin?.(tripData)}
          className="flex-1 bg-green_2 py-2 rounded-lg"
          activeOpacity={0.7}
        >
          <Text className="text-white text-center font-medium">JOIN</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onReject?.(tripData)}
          className="flex-1 border border-gray-300 py-2 rounded-lg"
          activeOpacity={0.7}
        >
          <Text className="text-gray-700 text-center font-medium">Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}