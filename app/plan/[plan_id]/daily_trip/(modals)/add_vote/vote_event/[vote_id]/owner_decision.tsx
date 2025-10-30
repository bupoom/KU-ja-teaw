import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState, useCallback, useEffect } from "react";
import Feather from "@expo/vector-icons/Feather";

import TransportationIcon from "@/components/common/TransportIcon";
import Header from "@/components/common/Header";
import CustomButton from "@/components/common/CustomButton";
import { getEventInVoteBlock, endEventVote } from "@/service/APIserver/vote";

const OwnerDecision = () => {
  const { plan_id, vote_id, title, date, time_begin, time_end, options } =
    useLocalSearchParams<{
      plan_id: string;
      vote_id: string;
      title: string;
      date: string;
      time_begin: string;
      time_end: string;
      options: string; // JSON string ของ array
    }>();

  const router = useRouter();
  const optionsName = JSON.parse(options || "[]") as string[];

  const [voteData, setVoteData] = useState<VoteEventData | null>(null);

  // state เก็บการเลือกของ owner
  const [selectVote, setSelectVote] = useState<EventVoting>();

  const handleBack = () => {
    router.back();
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  };

  const handleConfirm = async () => {
    if (!selectVote) return;
    const res = await endEventVote(
      parseInt(plan_id),
      selectVote?.pit_id as number
    );
    if (res) {
      router.replace({
        pathname: `/plan/[plan_id]/daily_trip`,
        params: { plan_id, date },
      });
    } else {
      Alert.alert(
        "Error",
        "Failed to confirm owner decision. Please try again."
      );
      return;
    }
  };

  const fetchVoteData = useCallback(async () => {
    try {
      const result = await getEventInVoteBlock(
        parseInt(plan_id),
        parseInt(vote_id)
      );
      if (!result) {
        setVoteData(null);
        return;
      }

      setVoteData({
        vote_id: result.vote_id,
        date: result.date,
        time_start: result.time_start,
        time_end: result.time_end,
        event_title: result.event_title,
        events_voting: result.events_voting,
      });
    } catch (err) {
      console.error("Error fetching vote data:", err);
      Alert.alert("Error", "Failed to load vote data. Please try again.");
    }
  }, [plan_id, vote_id]);

  useEffect(() => {
    fetchVoteData();
  }, [plan_id, vote_id, fetchVoteData]);

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

        {/* Title Section (read-only) */}
        <View className="bg-white rounded-lg border border-gray_border p-4 mb-4">
          <Text className="text-xl font-bold text-black mb-3 ml-4">Title</Text>
          <View className="border border-gray_border p-3 rounded-lg bg-gray-100">
            <Text className="text-gray-700">{title}</Text>
          </View>
        </View>

        <Text className="text-lg font-semibold text-black mb-3 ml-6">
          Select Final Decision
        </Text>
        <View className="flex-row flex-wrap gap-4 justify-start mb-6">
          {voteData?.events_voting
            .filter((opt) => optionsName.includes(opt.name))
            .map((option) => {
              const isSelected = selectVote?.pit_id === option.pit_id;

              return (
                <TouchableOpacity
                  key={option.pit_id}
                  onPress={() =>
                    setSelectVote(option)
                  }
                  activeOpacity={0.8}
                  className="w-[30%] mb-4 rounded-lg"
                >
                  <View
                    className={`px-4 py-6 rounded-lg items-center border ${
                      isSelected
                        ? "bg-green_2 border-green_2"
                        : "bg-white border-gray_border"
                    }`}
                  >
                    <TransportationIcon
                      transportation={option.name.toLowerCase()}
                      color={isSelected ? "#ffffff" : "#000000"}
                      size={30}
                    />

                    <Text
                      className={`mt-2 font-medium ${
                        isSelected ? "text-white" : "text-black"
                      }`}
                    >
                      {option.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
        </View>

        <CustomButton
          title="Confirm Decision"
          onPress={handleConfirm}
          disabled={!selectVote}
        />
      </View>
    </ScrollView>
  );
};

export default OwnerDecision;
