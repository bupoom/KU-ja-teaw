import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  SafeAreaView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState, useCallback, useEffect } from "react";
import { Feather, Ionicons } from "@expo/vector-icons";

import Header from "@/components/common/Header";
import CustomButton from "@/components/common/CustomButton";
import { getPlaceInVoteBlock, endPlaceVote } from "@/service/APIserver/vote";

const OwnerDecision = () => {
  const router = useRouter();
  const { plan_id, vote_id, date, time_begin, time_end, options } =
    useLocalSearchParams<{
      plan_id: string;
      vote_id: string;
      date: string;
      time_begin: string;
      time_end: string;
      options: string;
    }>();

  const optionIds = JSON.parse(options || "[]") as number[];
  // console.log("Option IDs:", optionIds);

  const [voteData, setVoteData] = useState<VotePlaceData | null>(null);

  // state เก็บการเลือกของ owner
  const [selectVote, setSelectVote] = useState<PlaceVoting>();

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
    const res = await endPlaceVote(parseInt(plan_id), selectVote?.pit_id as number);
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
      const result = await getPlaceInVoteBlock(
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
        places_voting: result.places_voting,
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
    <SafeAreaView className="flex-1 bg-white">
      <Header title="Owner Decision" onBackPress={handleBack} />

      <View className="mt-4">
        <View className="px-6">
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
                <Text className="text-black text-2xl font-bold">
                  {time_end}
                </Text>
              </View>
            </View>
          </View>

          {/* Options */}
          <Text className="text-lg font-semibold text-black mb-3 ml-1">
            Select Final Place
          </Text>
        </View>
      </View>
      <ScrollView className="px-6">
        {voteData?.places_voting
          .filter((opt) => optionIds.includes(opt.pit_id as number))
          .map((opt) => {
            const isSelected = selectVote?.pit_id === opt.pit_id;

            return (
              <TouchableOpacity
                key={opt.place_id}
                activeOpacity={0.7}
                onPress={() => setSelectVote(opt)}
                className={`flex-row p-3 bg-white rounded-lg mb-3 border ${
                  isSelected ? "border-green_2" : "border-gray_border"
                }`}
              >
                <Image
                  source={{ uri: opt.place_picture_url }}
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
                      {opt.address}
                    </Text>
                  </View>
                  <View className="flex-row items-center mt-1">
                    <Ionicons name="star" size={15} color="#FFD700" />
                    <Text className="text-xs text-dark_gray ml-2 font-sf-semibold">
                      {opt.rating !== -1 ? opt.rating : "--"} (
                      {opt.review_count !== -1 ? opt.review_count : "--"}{" "}
                      Reviews)
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}

        <CustomButton
          classname="mx-0"
          title="Confirm Decision"
          onPress={handleConfirm}
          disabled={!selectVote}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default OwnerDecision;
