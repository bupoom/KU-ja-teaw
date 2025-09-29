import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Feather, Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { mockActivityVotePlaces } from "@/mock/mockDataComplete";
import { mockTripMembers } from "@/mock/mockDataComplete";
import { mockTripDetails } from "@/mock/mockDataComplete";

import Header from "@/components/common/Header";
import CustomButton from "@/components/common/CustomButton";
import { formatDate } from "@/util/formatFucntion/formatDate";

const ResultVotePlace = () => {
  const router = useRouter();
  const { plan_id, vote_id } = useLocalSearchParams<{
    plan_id: string;
    vote_id: string;
  }>();
  const user_id = 1; // Current user ID

  // State variables
  const [date, setDate] = useState<string>("");
  const [timeBegin, setTimeBegin] = useState<string>("");
  const [timeEnd, setTimeEnd] = useState<string>("");
  const [voteDetail, setVoteDetail] = useState<ActivityVotePlace>();
  const [votes, setVotes] = useState<Vote[]>([]);
  const [role, setRole] = useState<string>("viewer");
  const [numMember, setNumMember] = useState<Number>(1);

  const canClose = role === "owner";
  const canEdit = role === "owner" || role === "editor";

  const handleBack = () => {
    router.replace({
      pathname: `/plan/[plan_id]/daily_trip`,
      params: { plan_id, date },
    });
  };

  const handleSearch = () => {
    router.push(
      `/plan/${plan_id}/daily_trip/(modals)/add_vote/vote_place/${vote_id}/search_place`
    );
  };

  const handleCloseVote = () => {
    const mostVoted = getMostVotedOptions();
    console.log("🎯 mostVoted options:", mostVoted);

    if (mostVoted.length === 0) {
      router.replace({
        pathname: `/plan/[plan_id]/daily_trip`,
        params: { plan_id, date },
      });
    } else if (mostVoted.length === 1) {
      router.replace({
        pathname: `/plan/[plan_id]/daily_trip`,
        params: { plan_id, date },
      });
    } else {
      console.log("📦 sending params:", {
        plan_id,
        vote_id,
        date,
        time_begin: timeBegin,
        time_end: timeEnd,
        options: JSON.stringify(mostVoted),
      });

      router.push({
        pathname: `/plan/[plan_id]/daily_trip/(modals)/add_vote/vote_place/[vote_id]/owner_decision`,
        params: {
          plan_id,
          vote_id,
          date,
          time_begin: timeBegin,
          time_end: timeEnd,
          options: JSON.stringify(mostVoted),
        },
      });
    }
  };

  const handleDelete = (placeId: number) => {
    Alert.alert("Delete Place", "You want to Delete This Place From Voting", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setVoteDetail((prev) =>
            prev
              ? {
                  ...prev,
                  options: prev.options.filter((o) => o.place_id !== placeId),
                }
              : prev
          );
          setVotes((prev) => prev.filter((v) => v.place_id !== placeId));
        },
      },
    ]);
  };

  const handleToggleVote = (placeId: number) => {
    const existingVote = votes.find(
      (v) => v.user_id === user_id && v.place_id === placeId
    );

    if (existingVote) {
      setVotes((prev) => prev.filter((v) => v !== existingVote));
    } else {
      setVotes((prev) => [
        ...prev.filter((v) => v.user_id !== user_id),
        {
          id: Date.now(),
          user_id,
          activity_id: parseInt(vote_id),
          vote_type: "place",
          place_id: placeId,
          username: "You",
          trip_id: parseInt(plan_id),
        },
      ]);
    }
  };

  const fetchVoteDetail = (vote_id: string, plan_id: string) => {
    const result = mockActivityVotePlaces.find(
      (vote) =>
        vote.id === parseInt(vote_id) && vote.trip_id === parseInt(plan_id)
    );

    const userData = mockTripMembers.find(
      (user) => user.trip_id === parseInt(plan_id) && user.id === user_id
    );
    setRole(userData?.role ?? "viewer");

    const member = mockTripDetails.find(
      (trip) => trip.trip_id === parseInt(plan_id)
    );
    setNumMember(member?.group_members ?? 1);

    if (result) {
      setVoteDetail(result);
      setVotes(result.votes);
      setDate(result.date);
      setTimeBegin(result.time_begin);
      setTimeEnd(result.time_end);
    }
  };

  // Get vote counts
  const getVoteCounts = () => {
    const voteCounts: { [key: number]: number } = {};
    votes.forEach((vote) => {
      if (vote.place_id) {
        voteCounts[vote.place_id] = (voteCounts[vote.place_id] || 0) + 1;
      }
    });
    return voteCounts;
  };

  const getUserVote = () => {
    return votes.find((vote) => vote.user_id === user_id)?.place_id;
  };

  const getMostVotedOptions = (): number[] => {
    const voteCounts = getVoteCounts();
    let maxVotes = 0;
    Object.values(voteCounts).forEach((count) => {
      if (count > maxVotes) maxVotes = count;
    });
    return Object.entries(voteCounts)
      .filter(([_, count]) => count === maxVotes)
      .map(([placeId]) => parseInt(placeId));
  };

  useEffect(() => {
    if (vote_id && plan_id) {
      fetchVoteDetail(vote_id, plan_id);
    }
  }, [plan_id, vote_id]);

  const voteCounts = getVoteCounts();
  const userVote = getUserVote();
  const mostVotedOptions = getMostVotedOptions();

  return (
    <ScrollView className="flex-1 bg-white">
      <Header title="Vote Place" onBackPress={handleBack} />

      <View className="px-6 mt-4">
        {/* Time Section */}
        <View className="bg-white rounded-lg border border-gray_border p-4 mb-4">
          <View className="flex-row items-center justify-around">
            <View className="items-center">
              <Text className="text-gray-500 text-lg font-medium mb-2">
                Start
              </Text>
              <Text className="text-black text-2xl font-bold">{timeBegin}</Text>
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
              <Text className="text-black text-2xl font-bold">{timeEnd}</Text>
            </View>
          </View>
        </View>

        {/* Search Bar */}
        <View className="bg-white mt-2 mb-2">
          <TouchableOpacity
            onPress={handleSearch}
            className="flex-row items-center bg-white rounded-full px-4 py-4 border border-gray_border"
          >
            <Feather name="search" size={20} color="#666" />
            <Text className="text-gray-400 ml-3 flex-1">Search...</Text>
          </TouchableOpacity>
        </View>

        {/* Voting Results */}
        <Text className="text-right text-sm text-gray-500 mb-4">
          Voting: {votes.length}/{String(numMember)}
        </Text>

        {/* Place Options */}
        {voteDetail?.options?.map((opt) => {
          const count = voteCounts[opt.place_id] || 0;
          const isUserSelected = userVote === opt.place_id;
          const isMostVoted = mostVotedOptions.includes(opt.place_id);

          return (
            <TouchableOpacity
              key={opt.place_id}
              activeOpacity={0.7}
              onPress={() => handleToggleVote(opt.place_id)}
              className={`flex-row p-3 bg-white rounded-lg mb-3 border ${
                isUserSelected ? "border-green_2" : "border-gray_border"
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

              <View className="items-end justify-between">
                <Text
                  className={`px-2 py-1 text-xs rounded-full font-medium ${
                    isMostVoted
                      ? "bg-green_2 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {count} Votes
                </Text>

                {canEdit && (
                  <TouchableOpacity
                    className="mt-4"
                    onPress={() => handleDelete(opt.place_id)}
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
          );
        })}

        {canClose && (
          <CustomButton title="Close Vote" onPress={handleCloseVote} />
        )}
      </View>
    </ScrollView>
  );
};

export default ResultVotePlace;
