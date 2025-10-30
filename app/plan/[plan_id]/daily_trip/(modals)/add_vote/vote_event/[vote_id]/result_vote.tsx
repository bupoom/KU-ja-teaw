import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useState, useCallback } from "react";
import Feather from "@expo/vector-icons/Feather";

import { mockTransportationOptions } from "@/mock/mockDataComplete";

import Header from "@/components/common/Header";
import CustomButton from "@/components/common/CustomButton";
import TransportationIcon from "@/components/common/TransportIcon";

import { get_more_detail } from "@/service/APIserver/userService";
import { get_trip_detail } from "@/service/APIserver/tripApi";
import {
  getEventInVoteBlock,
  patchNewUserVote,
  endEventVote,
} from "@/service/APIserver/vote";

const ResultVoteEvent = () => {
  const router = useRouter();
  const { plan_id, vote_id } = useLocalSearchParams<{
    plan_id: string;
    vote_id: string;
  }>();

  const [title, setTitle] = useState<string>("");
  const [voteData, setVoteData] = useState<VoteEventData | null>();
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [role, setRole] = useState<string>("Viewer");
  const [numMember, setNumMember] = useState<Number>(1);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const canClose = role === "Owner";

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  };

  const handleBack = () => {
    router.replace({
      pathname: `/plan/[plan_id]/daily_trip`,
      params: { plan_id, date: voteData?.date },
    });
  };

  const handleCloseVote = async () => {
    if (!voteData) return;
    const mostVoted = voteData.events_voting.filter(
      (p) => p.is_most_voted === true
    );

    if (mostVoted.length === 1) {
      const res = await endEventVote(
        parseInt(plan_id),
        mostVoted[0].pit_id as number
      );
      if (res) {
        router.replace({
          pathname: `/plan/[plan_id]/daily_trip`,
          params: { plan_id, date: voteData.date },
        });
      } else {
        Alert.alert(
          "Error",
          "Failed to confirm owner decision. Please try again."
        );
        return;
      }
    } else {
      // tie → ไปหน้า owner_decision
      router.push({
        pathname: `/plan/[plan_id]/daily_trip/(modals)/add_vote/vote_event/[vote_id]/owner_decision`,
        params: {
          plan_id,
          vote_id,
          title,
          date: voteData.date,
          time_begin: voteData.time_start,
          time_end: voteData.time_end,
          options: JSON.stringify(mostVoted.map((p) => p.name)),
        },
      });
    }
  };

  const fetchVoteData = useCallback(async () => {
    try {
      setError(null);
      const result = await getEventInVoteBlock(
        parseInt(plan_id),
        parseInt(vote_id)
      );
      if (!result) {
        setVoteData(null);
        return;
      }

      const userData = await get_more_detail(parseInt(plan_id));
      if (userData?.role) setRole(userData.role);

      const member = await get_trip_detail(parseInt(plan_id));
      setNumMember(member?.group_members ?? 1);

      setVoteData({
        vote_id: result.vote_id,
        date: result.date,
        time_start: result.time_start,
        time_end: result.time_end,
        event_title: result.event_title,
        events_voting: result.events_voting,
      });

      setTitle(result.event_title);
      setEditTitle(result.event_title);
    } catch (err) {
      console.error("Error fetching vote data:", err);
      setError("Failed to load vote data");
      Alert.alert("Error", "Failed to load vote data. Please try again.");
    }
  }, [plan_id, vote_id]);

  const firstVote = async (pit_id: number) => {
    console.log("First Vote");
    const res = await patchNewUserVote(parseInt(plan_id), pit_id, -1);
    console.log("Result Change:", res);
  };

  const cancelVote = async (pit_id: number) => {
    console.log("Cancel Vote");
    const res = await patchNewUserVote(parseInt(plan_id), pit_id, pit_id);
    console.log("Result Change:", res);
  };

  const changeVote = async (vote_pit_id: number, from_pit_id: number) => {
    console.log("Change Vote");
    const res = await patchNewUserVote(
      parseInt(plan_id),
      vote_pit_id,
      from_pit_id
    );
    console.log("Result Change:", res);
  };

  const handleToggleVote = async (pit_id: number) => {
    try {
      console.log("Select This Place pit_id:", pit_id);
      const previouslyVoted = voteData?.events_voting.find(
        (p) => p.is_voted === true
      );

      if (!previouslyVoted) {
        // First vote
        console.log("🟢 First Vote");
        await firstVote(pit_id);
      } else {
        if (previouslyVoted.pit_id === pit_id) {
          // Cancel vote
          console.log("🟡 Cancel Vote");
          await cancelVote(pit_id);
        } else {
          // Change vote
          console.log("🔵 Change Vote");
          await changeVote(pit_id, previouslyVoted.pit_id);
        }
      }

      await fetchVoteData();
    } catch (error) {
      console.error("Error while toggling vote:", error);
      Alert.alert("Error", "Failed to update vote. Please try again.");
    }
  };

  useEffect(() => {
    console.log("Refresh Vote Data:", voteData?.events_voting);
  }, [voteData]);

  useEffect(() => {
    if (vote_id && plan_id) {
      fetchVoteData();
    }
  }, [plan_id, vote_id]);

  if (loading) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <Text className="text-gray-500">Loading vote data...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 bg-white">
        <Header title="Vote Place" onBackPress={handleBack} />
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-red-500 text-center mb-4">{error}</Text>
          <CustomButton
            title="Try Again"
            onPress={async () => {
              setLoading(true);
              await fetchVoteData();
              setLoading(false);
            }}
          />
        </View>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white">
      <Header title="Vote Event" onBackPress={handleBack} />

      <View className="px-6 mt-4">
        {/* Time Section */}
        <View className="bg-white rounded-lg border border-gray_border p-4 mb-4">
          <View className="flex-row items-center justify-around">
            <View className="items-center">
              <Text className="text-gray-500 text-lg font-medium mb-2">
                Start
              </Text>
              <Text className="text-black text-2xl font-bold">
                {voteData?.time_start || "--:--"}
              </Text>
            </View>

            <View className="flex-col items-center justify-center">
              <Feather name="clock" size={30} color="#6B7280" />
              <Text className="text-black text-base font-bold mt-2">
                {formatDate(voteData?.date || "")}
              </Text>
            </View>

            <View className="items-center">
              <Text className="text-gray-500 text-lg font-medium mb-2">
                End
              </Text>
              <Text className="text-black text-2xl font-bold">
                {voteData?.time_end || "--:--"}
              </Text>
            </View>
          </View>
        </View>

        {/* Title Section */}
        <View className="bg-white rounded-lg border border-gray_border p-4 mb-4">
          <Text className="text-xl font-bold text-black mb-3 ml-4">Title</Text>

          {isEditingTitle ? (
            <View>
              <TextInput
                value={editTitle}
                onChangeText={setEditTitle}
                multiline
                className="border border-gray-300 rounded-lg p-3 text-gray-700 min-h-[60px]"
                style={{ textAlignVertical: "top" }}
              />
              <View className="flex-row gap-2 mt-2">
                <TouchableOpacity
                  onPress={() => {
                    setTitle(editTitle);
                    setIsEditingTitle(false);
                  }}
                  className="bg-green_2 px-4 py-2 rounded-lg flex-1"
                >
                  <Text className="text-white text-center font-medium">
                    Save
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setEditTitle(title);
                    setIsEditingTitle(false);
                  }}
                  className="bg-white px-4 py-2 rounded-lg flex-1 border border-gray_border"
                >
                  <Text className="text-gray-700 text-center font-medium">
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => setIsEditingTitle(true)}
              className="border border-gray_border p-3 rounded-lg"
            >
              <Text className="text-gray-700">
                {title || "Tap to add a title..."}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Voting Results */}
        <Text className="text-right text-sm text-gray-500 mb-4">
          Voting:
          {voteData?.events_voting.reduce(
            (acc, p) => acc + p.voting_count,
            0
          ) ?? 0}
          /{String(numMember)}
        </Text>

        {/* Transportation Options Grid */}
        <View className="flex-row flex-wrap justify-between mb-6">
          {mockTransportationOptions.map((option) => {
            const voteCount =
              voteData?.events_voting.find((v) => v.name === option.type)
                ?.voting_count || 0;
            const isUserSelected = voteData?.events_voting.some(
              (v) => v.name === option.type && v.is_voted
            );
            const isMostVoted = voteData?.events_voting.some(
              (v) => v.name === option.type && v.is_most_voted
            );
            const transportOption = voteData?.events_voting.find((v) => v.name === option.type)

            return (
              <TouchableOpacity
                key={option.id}
                onPress={() => handleToggleVote(transportOption?.pit_id as number)}
                activeOpacity={0.8}
                className="w-[30%] mb-4 rounded-lg"
              >
                <View
                  className={`px-4 py-6 rounded-lg items-center mb-1 border ${
                    isUserSelected
                      ? "bg-green_2 border-green_2"
                      : "bg-white border-gray_border"
                  }`}
                >
                  <TransportationIcon
                    transportation={option.type.toLowerCase()}
                    color={isUserSelected ? "#ffffff" : "#000000"}
                    size={30}
                  />
                  <Text
                    className={`mt-2 text-base font-semibold ${
                      isUserSelected ? "text-white" : "text-black"
                    }`}
                  >
                    {option.type}
                  </Text>
                </View>

                <View
                  className={`items-center mt-2 py-2 border rounded-xl mx-4 ${
                    isMostVoted ? "border-green_2" : "border-gray_border"
                  }`}
                >
                  <Text className="text-xs font-semibold text-black">
                    {voteCount} Votes
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {canClose && (
          <CustomButton title="Close Vote" onPress={handleCloseVote} />
        )}
      </View>
    </ScrollView>
  );
};

export default ResultVoteEvent;
