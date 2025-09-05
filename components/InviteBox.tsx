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

export const InviteTripData: TripDetails[] = [
  {
    id: 1,
    title: "Trip to Thailand",
    dateRange: "25/08/65-01/08/65",
    image: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=300&h=200&fit=crop",
    creator: "Keen_Kung",
    creator_image: "https://i.pinimg.com/474x/fa/d5/e7/fad5e79954583ad50ccb3f16ee64f66d.jpg",
    participantsCount: 5,
    status: 'Completed',
  },
  {
    id: 2,
    title: "Trip of Osaka",
    dateRange: "15/09/65-22/09/65",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=300&h=200&fit=crop",
    creator: "Oshi_Kung",
    creator_image: "https://i.pinimg.com/474x/fa/d5/e7/fad5e79954583ad50ccb3f16ee64f66d.jpg",
    participantsCount: 3,
    status: "Completed",
  },
  {
    id: 3,
    title: "Trip to Tokyo",
    dateRange: "10/10/65-17/10/65",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=300&h=200&fit=crop",
    creator: "Travel_Pro",
    creator_image: "https://i.pinimg.com/474x/fa/d5/e7/fad5e79954583ad50ccb3f16ee64f66d.jpg",
    participantsCount: 7,
    status: "Planning",
  },
  {
    id: 4,
    title: 'Tokyo Adventure',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=80&h=80&fit=crop',
    dateRange: 'Dec 15-22, 2024',
    participantsCount: 4,
    status: 'Traveling',
    creator:"keen_kung",
    creator_image: "#",
  },
  {
    id: 5,
    title: 'Bali Retreat',
    image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=80&h=80&fit=crop',
    dateRange: 'Jan 10-17, 2025',
    participantsCount: 2,
    status: 'Coming',
    creator:"keen_kung",
    creator_image: "#",
  },
  {
    id: 6,
    title: 'Paris Getaway',
    image: 'https://images2.alphacoders.com/546/546391.jpg',
    dateRange: 'Nov 5-12, 2024',
    participantsCount: 3,
    status: 'Completed',
    creator:"keen_kung",
    creator_image: "#",
  },
  {
    id: 7,
    title: 'Swiss Alps',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=80&h=80&fit=crop',
    dateRange: 'Sep 20-27, 2024',
    participantsCount: 5,
    status: 'Completed',
    creator:"keen_kung",
    creator_image: "#",
  }
];
