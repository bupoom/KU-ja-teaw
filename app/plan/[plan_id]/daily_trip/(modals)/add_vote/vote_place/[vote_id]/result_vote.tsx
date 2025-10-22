import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  RefreshControl,
  SafeAreaView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useState, useCallback } from "react";
import { Feather, Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import Header from "@/components/common/Header";
import CustomButton from "@/components/common/CustomButton";
import { get_more_detail } from "@/service/APIserver/userService";
import {
  getPlaceInVoteBlock,
  patchNewUserVote,
  endVote,
} from "@/service/APIserver/vote";
import { get_trip_detail } from "@/service/APIserver/tripApi";
import { deleteActivityInTrip } from "@/service/APIserver/activity";

const ResultVotePlace = () => {
  const router = useRouter();
  const { plan_id, vote_id } = useLocalSearchParams<{
    plan_id: string;
    vote_id: string;
  }>();

  const [voteData, setVoteData] = useState<VoteData | null>(null);
  const [role, setRole] = useState<string>("Viewer");
  const [numMember, setNumMember] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const canClose = role === "Owner";
  const canEdit = role === "Owner" || role === "Editor";

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

  const handleSearch = () => {
    router.push({
      pathname: `/plan/[plan_id]/daily_trip/(modals)/add_vote/vote_place/[vote_id]/search_place`,
      params: {
        plan_id: plan_id,
        vote_id: vote_id,
        selectDate: voteData?.date,
        start: voteData?.time_start,
        end: voteData?.time_end,
      },
    });
  };

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
      const previouslyVoted = voteData?.places_voting.find(
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

  const handleDelete = async (pit_id: number) => {
    Alert.alert("Delete Place", "Do you want to remove this place?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          const res = await deleteActivityInTrip(parseInt(plan_id), pit_id);
          fetchVoteData();
        },
      },
    ]);
  };

  const handleCloseVote = async () => {
    if (!voteData) return;
    const mostVoted = voteData.places_voting.filter(
      (p) => p.is_most_voted === true
    );

    console.log("Most Voted Places:", mostVoted.length);

    if (mostVoted.length === 1) {
      const res = await endVote(
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
      router.push({
        pathname: `/plan/[plan_id]/daily_trip/(modals)/add_vote/vote_place/[vote_id]/owner_decision`,
        params: {
          plan_id,
          vote_id,
          date: voteData.date,
          time_begin: voteData.time_start,
          time_end: voteData.time_end,
          options: JSON.stringify(mostVoted.map((p) => p.pit_id)),
        },
      });
    }
  };

  const fetchVoteData = useCallback(async () => {
    try {
      setError(null);
      const result = await getPlaceInVoteBlock(
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
        places_voting: result.places_voting,
      });
    } catch (err) {
      console.error("Error fetching vote data:", err);
      setError("Failed to load vote data");
      Alert.alert("Error", "Failed to load vote data. Please try again.");
    }
  }, [plan_id, vote_id]);

  useEffect(() => {
    console.log("Refresh Vote Data:", voteData?.places_voting);
  }, [voteData]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchVoteData();
      setLoading(false);
    };
    if (plan_id && vote_id) loadData();
  }, [plan_id, vote_id, fetchVoteData]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchVoteData();
    setRefreshing(false);
  };

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
    <SafeAreaView className="flex-1 bg-white">
      <Header title="Vote Place" onBackPress={handleBack} />

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

          {/* Search Bar */}
          {canEdit && (
            <TouchableOpacity
              onPress={handleSearch}
              className="flex-row items-center bg-white rounded-full px-4 py-4 border border-gray_border mb-4"
            >
              <Feather name="search" size={20} color="#666" />
              <Text className="text-gray-400 ml-3 flex-1">
                Search to Add Place Voting...
              </Text>
            </TouchableOpacity>
          )}

          {/* Voting Results */}
          <Text className="text-right text-sm text-gray-500 mb-4">
            Voting:
            {voteData?.places_voting.reduce(
              (acc, p) => acc + p.voting_count,
              0
            ) ?? 0}
            /{String(numMember)}
          </Text>
        </View>
      </View>
      <ScrollView
        className="px-6"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#075952"]}
            tintColor="#075952"
          />
        }
      >
        {/* Place List */}
        {!voteData || voteData.places_voting.length === 0 ? (
          <View className="items-center justify-center py-10">
            <Feather name="map-pin" size={48} color="#D1D5DB" />
            <Text className="text-gray-500 mt-4">No places to vote yet</Text>
            <Text className="text-gray-400 text-sm mt-2">
              Tap search above to add places
            </Text>
          </View>
        ) : (
          voteData.places_voting.map((opt) => (
            <TouchableOpacity
              key={opt.place_id}
              activeOpacity={0.7}
              onPress={() => handleToggleVote(opt.pit_id)}
              className={`flex-row p-3 bg-white rounded-lg mb-3 border ${
                opt.is_voted ? "border-green_2" : "border-gray_border"
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
                    {opt.review_count !== -1 ? opt.review_count : "--"} Reviews)
                  </Text>
                </View>
              </View>

              <View className="items-end justify-between">
                <Text
                  className={`px-2 py-1 text-xs rounded-full font-medium ${
                    opt.is_most_voted
                      ? "bg-green_2 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {opt.voting_count} Votes
                </Text>

                {canEdit && (
                  <TouchableOpacity
                    className="mt-4"
                    onPress={() => handleDelete(opt.pit_id)}
                  >
                    <MaterialIcons
                      name="delete-outline"
                      size={24}
                      color="black"
                    />
                  </TouchableOpacity>
                )}
              </View>
            </TouchableOpacity>
          ))
        )}

        {canClose && voteData && voteData.places_voting.length > 0 && (
          <CustomButton classname="mx-0" title="Close Vote" onPress={() => handleCloseVote()} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResultVotePlace;
