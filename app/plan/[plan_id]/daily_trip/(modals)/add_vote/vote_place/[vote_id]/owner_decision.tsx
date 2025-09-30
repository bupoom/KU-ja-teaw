import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Feather, Ionicons } from "@expo/vector-icons";

import Header from "@/components/common/Header";
import CustomButton from "@/components/common/CustomButton";
import { formatDate } from "@/util/formatFucntion/formatDate";
import { mockActivityVotePlaces } from "@/mock/mockDataComplete";

const OwnerDecision = () => {
  const router = useRouter();
  const { plan_id, vote_id, date, time_begin, time_end, options } =
    useLocalSearchParams<{
      plan_id: string;
      vote_id: string;
      date: string;
      time_begin: string;
      time_end: string;
      options: string; // ส่งมาเป็น JSON string
    }>();

  const optionIds = JSON.parse(options || "[]") as number[];

  // state เก็บการเลือกของ owner
  const [selected, setSelected] = useState<number | null>(null);

  const handleBack = () => {
    router.back();
  };

  const handleConfirm = () => {
    if (!selected) return;
    // TODO: อัปเดต backend / mockData
    router.replace({
      pathname: `/plan/[plan_id]/daily_trip`,
      params: { plan_id, date },
    });
  };

  const currentVote = mockActivityVotePlaces.find(
    (vote) =>
      vote.id === parseInt(vote_id) && vote.trip_id === parseInt(plan_id)
  );

  return (
    <ScrollView className="flex-1 bg-white">
      <Header title="Owner Decision" onBackPress={handleBack} />

      <View className="px-6 mt-4">
        {/* Time Section */}
        <View className="bg-white rounded-lg border border-gray_border p-4 mb-4">
          <View className="flex-row items-center justify-around">
            <View className="items-center">
              <Text className="text-gray-500 text-lg font-medium mb-2">
                Start
              </Text>
              <Text className="text-black text-2xl font-bold">
                {time_begin}
              </Text>
            </View>

            <View className="flex-col items-center justify-center">
              <Feather name="clock" size={30} color="#6B7280" />
              <Text className="text-black text-base font-bold mt-2">
                {formatDate(date)}
              </Text>
            </View>

            <View className="items-center">
              <Text className="text-gray-500 text-lg font-medium mb-2">
                End
              </Text>
              <Text className="text-black text-2xl font-bold">{time_end}</Text>
            </View>
          </View>
        </View>

        {/* Options */}
        <Text className="text-lg font-semibold text-black mb-3 ml-1">
          Select Final Place
        </Text>
        {currentVote?.options
          .filter((opt) => optionIds.includes(opt.place_id))
          .map((opt) => {
            const isSelected = selected === opt.place_id;

            return (
              <TouchableOpacity
                key={opt.place_id}
                activeOpacity={0.7}
                onPress={() => setSelected(opt.place_id)}
                className={`flex-row p-3 bg-white rounded-lg mb-3 border ${
                  isSelected ? "border-green_2" : "border-gray_border"
                }`}
              >
                <Image
                  source={{ uri: opt.place_image }}
                  className="w-20 h-20 rounded-lg"
                  resizeMode="cover"
                />

                <View className="flex-1 ml-3 justify-center">
                  <Text
                    className="text-base font-semibold text-black mb-1"
                    numberOfLines={1}
                  >
                    {opt.title}
                  </Text>
                  <View className="flex-row items-center">
                    <Feather name="map-pin" size={14} color="#666" />
                    <Text
                      className="text-xs text-dark_gray ml-2 font-semibold"
                      numberOfLines={1}
                    >
                      {opt.location}
                    </Text>
                  </View>
                  <View className="flex-row items-center mt-1">
                    <Ionicons name="star" size={15} color="#FFD700" />
                    <Text className="text-xs text-dark_gray ml-2 font-sf-semibold">
                      {opt.rating} ({opt.review_count} Reviews)
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}

        <CustomButton
          title="Confirm Decision"
          onPress={handleConfirm}
          disabled={!selected}
        />
      </View>
    </ScrollView>
  );
};

export default OwnerDecision;
