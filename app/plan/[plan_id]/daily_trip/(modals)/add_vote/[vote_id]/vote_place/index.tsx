import React, { useMemo } from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";

type Params = {
  plan_id: string;
  vote_id: string;
  date?: string;   // "YYYY-MM-DD"
  start?: string;  // "HH:mm"
  end?: string;    // "HH:mm"
};

export default function VotePlaceIndex() {
  const { plan_id, vote_id, date, start, end } = useLocalSearchParams<Params>();

  const timeText = useMemo(() => {
    const s = start ?? "--:--";
    const e = end ?? "--:--";
    return { s, e };
  }, [start, end]);

  const goSearch = () => {
    router.push({
      pathname:
        "/plan/[plan_id]/daily_trip/(modals)/add_vote/[vote_id]/vote_place/search_place",
      params: {
        plan_id: String(plan_id),
        vote_id: String(vote_id),
        date: String(date ?? ""),
        start: String(start ?? ""),
        end: String(end ?? ""),
      },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-center py-3 border-b border-gray-200">
        <Text className="text-[17px] font-semibold text-[#0E1820]">Vote Place</Text>
      </View>

      {/* Start / End card */}
      <View className="mx-5 mt-4 rounded-2xl border bg-white" style={{ borderColor: "#E5E7EB" }}>
        <View className="flex-row items-center justify-between px-5 py-4">
          <View className="items-center">
            <Text className="text-gray-500 mb-1">Start</Text>
            <Text className="text-[28px] font-semibold text-gray-900">{timeText.s}</Text>
          </View>
          <View className="items-center">
            <View className="w-10 h-10 rounded-full border items-center justify-center" style={{ borderColor: "#E5E7EB" }}>
              <Ionicons name="time-outline" size={20} color="#6B7280" />
            </View>
          </View>
          <View className="items-center">
            <Text className="text-gray-500 mb-1">End</Text>
            <Text className="text-[28px] font-semibold text-gray-900">{timeText.e}</Text>
          </View>
        </View>
      </View>

      {/* Search bar (press to go to search_place) */}
      <View className="px-5 mt-4">
        <TouchableOpacity
          onPress={goSearch}
          activeOpacity={0.85}
          className="flex-row items-center h-12 px-4 rounded-2xl border border-gray-300 bg-white"
        >
          <Ionicons name="search-outline" size={18} color="#6B7280" />
          <Text className="ml-2 text-gray-500">Search ...</Text>
        </TouchableOpacity>
      </View>

      {/* Voting summary (optional – update with your real numbers) */}
      <View className="px-6 mt-2 items-end">
        <Text className="text-gray-500">Voting: 0/5</Text>
      </View>

      {/* Empty state – page shows no places until user searches/chooses */}
      <View className="flex-1 px-5 mt-4">
        {/* intentionally empty per your request */}
      </View>

      {/* Footer (optional Close button – remove if not needed here) */}
      {/* <View className="px-5 pb-7">
        <TouchableOpacity
          activeOpacity={0.9}
          className="py-4 rounded-xl items-center"
          style={{ backgroundColor: "#294C43" }}
        >
          <Text className="text-white font-semibold text-[16px]">Close Vote</Text>
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
}
