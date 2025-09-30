import { useRouter, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "@/components/common/Header";

const SelectTypeVote = () => {

  const { plan_id } = useLocalSearchParams<{ plan_id: string }>();
  const router = useRouter();
  const [selectedCard, setSelectedCard] = useState("");

  const handleVotePlace = () => {
    setSelectedCard("place");
    setTimeout(() => {
      router.push(`/plan/${plan_id}/daily_trip/(modals)/add_vote/vote_place/select_time`);
    }, 50);
  };

  const handleVoteEvent = () => {
    setSelectedCard("event");
    setTimeout(() => {
      router.push(`/plan/${plan_id}/daily_trip/(modals)/add_vote/vote_event/select_time`);
    }, 50);
  };

  const handleBackPress = () => {
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Header */}
      <Header title="Choose your action" onBackPress={handleBackPress} />

      {/* Content */}
      <View className="flex-1 px-4 pt-10 mt-6 mb-6">
        {/* Create Trip Card */}
        <TouchableOpacity
          className={`rounded-lg p-6 mb-5 shadow-sm border-2 w-[95%] h-[120px] mx-auto ${
            selectedCard === "place" ? "border-green_2" : "border-gray_border"
          }`}
          style={{
            backgroundColor: selectedCard === "place" ? "#284D44" : "#ffffff",
          }}
          onPress={handleVotePlace}
          activeOpacity={0.7}
        >
          <Text
            className={`text-2xl font-bold mb-2 ${
              selectedCard === "place" ? "text-white" : "text-gray-800"
            }`}
          >
            Add Vote Place
          </Text>
          <Text
            className={`text-sm leading-5 ${
              selectedCard === "place" ? "text-white" : "text-gray-600"
            }`}
          >
            Create a vote to decide where the group will go
          </Text>
        </TouchableOpacity>

        {/* Join Trip Card */}
        <TouchableOpacity
          className={`rounded-lg p-6 mb-5 shadow-sm border-2 w-[95%] h-[120px] mx-auto ${
            selectedCard === "event" ? "border-green_2" : "border-gray_border"
          }`}
          style={{
            backgroundColor: selectedCard === "event" ? "#284D44" : "#ffffff",
          }}
          onPress={handleVoteEvent}
          activeOpacity={0.7}
        >
          <Text
            className={`text-2xl font-bold mb-2 ${
              selectedCard === "event" ? "text-white" : "text-gray-800"
            }`}
          >
            Add Vote Event
          </Text>
          <Text
            className={`text-sm leading-5 ${
              selectedCard === "event" ? "text-white" : "text-gray-600"
            }`}
          >
            Create a vote to decide what transportation to go
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default SelectTypeVote;
