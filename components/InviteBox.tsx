// components/TripInvitationBox.tsx
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";

type InviteDetails = TripDetails & {
  onPressCard?: (trip: TripDetails) => void;
  onJoin?: (trip: TripDetails) => void;
  onReject?: (trip: TripDetails) => void;
}; // อันี้คือเอา structure มาจาก interface TripDetails เเล้วมาเพิ่มค่า onPressCard, onJoin, onReject

export default function InviteBox({
  id,
  title,
  image,
  dateRange,
  participantsCount,
  creator,
  creator_image,
  status,
  onPressCard,
  onJoin,
  onReject,
}: InviteDetails) {
  return (
    <TouchableOpacity
      className="bg-white rounded-xl p-4 mb-4 mx-4 shadow-sm border border-gray-100"
      onPress={() => onPressCard?.({ id, title, image, dateRange, participantsCount, creator, creator_image, status })}
      activeOpacity={0.8}
    >
      <View className="flex-row">
        <Image source={{ uri: image }} className="w-20 h-20 rounded-lg mr-3" />
        <View className="flex-1">
          <Text className="text-lg font-semibold text-black mb-1">{title}</Text>

          <View className="flex-row items-center mb-1">
            <Feather name="calendar" size={14} color="#666" />
            <Text className="text-sm text-gray-600 ml-1 mr-3">{dateRange}</Text>
            <Feather name="users" size={14} color="#666" />
            <Text className="text-sm text-gray-600 ml-1">{participantsCount} participants</Text>
          </View>

          <View className="flex-row items-center">
            <Image source={{ uri: creator_image }} className="w-6 h-6 rounded-full mr-3" />
            <Text className="text-sm text-gray-600">{creator}</Text>
          </View>
        </View>
      </View>

      <View className="flex-row mt-3 gap-2">
        <TouchableOpacity
          onPress={() => onJoin?.({ id, title, image, dateRange, participantsCount, creator, creator_image, status })}
          className="flex-1 bg-green_2 py-2 rounded-lg"
          activeOpacity={0.7}
        >
          <Text className="text-white text-center font-medium">JOIN</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onReject?.({ id, title, image, dateRange, participantsCount, creator, creator_image, status })}
          className="flex-1 border border-gray-300 py-2 rounded-lg"
          activeOpacity={0.7}
        >
          <Text className="text-gray-700 text-center font-medium">Reject</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
