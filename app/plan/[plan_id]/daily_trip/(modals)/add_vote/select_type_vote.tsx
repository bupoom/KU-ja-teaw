// app/plan/[plan_id]/daily_trip/(modals)/add_vote/select_type_vote.tsx
import React, { useMemo } from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Header from "@/components/common/Header";

const SelectTypeVote: React.FC = () => {
  const router = useRouter();
  const { plan_id, vote_id } = useLocalSearchParams<{
    plan_id: string;
    vote_id?: string;
  }>();

  // simple temp id if none exists yet (avoid extra deps)
  const tempVoteId = useMemo(
    () => (vote_id ? String(vote_id) : `v_${Date.now().toString(36)}`),
    [vote_id]
  );

  const goBack = () => router.back();

  const goVotePlace = () => {
    router.push(
      `/plan/${plan_id}/daily_trip/(modals)/add_vote/${tempVoteId}/vote_place/select_time`
    );
  };

  const goVoteEvent = () => {
    // expects route: app/plan/[plan_id]/daily_trip/(modals)/add_vote/[vote_id]/vote_event/index.tsx
    router.push(
      `/plan/${plan_id}/daily_trip/(modals)/add_vote/${tempVoteId}/vote_event/select_time`
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <Header title="Add Voting" onBackPress={goBack} />

      <View className="flex-1 px-5 pt-4">
        {/* Card: Vote Place */}
        <TouchableOpacity
          onPress={goVotePlace}
          activeOpacity={0.8}
          className="mb-5 rounded-2xl border border-neutral-200 bg-white p-5"
        >
          <Text className="text-2xl font-semibold text-neutral-900">
            Add Vote Place
          </Text>
          <Text className="mt-2 text-[15px] text-neutral-500">
            Add voting place for decide where to go
          </Text>
        </TouchableOpacity>

        {/* Card: Vote Event */}
        <TouchableOpacity
          onPress={goVoteEvent}
          activeOpacity={0.8}
          className="rounded-2xl border border-neutral-200 bg-white p-5"
        >
          <Text className="text-2xl font-semibold text-neutral-900">
            Add Vote Event
          </Text>
          <Text className="mt-2 text-[15px] text-neutral-500">
            Add voting what to do
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SelectTypeVote;
