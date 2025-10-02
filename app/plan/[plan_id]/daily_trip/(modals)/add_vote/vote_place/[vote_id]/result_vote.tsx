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

// ----------------- Types -----------------
interface PlaceVoting {
  pit_id: number;
  place_id: number;
  address: string;
  place_picture_url: string;
  rating?: number;
  title: string;
  review_count?: number;
  voting_count: number;
  is_voted: boolean;
  is_most_voted: boolean;
}

interface VoteData {
  vote_id: number;
  date: string;
  time_start: string;
  time_end: string;
  places_voting: PlaceVoting[];
}

// ----------------- Component -----------------
const ResultVotePlace = () => {
  const router = useRouter();
  const { plan_id, vote_id } = useLocalSearchParams<{
    plan_id: string;
    vote_id: string;
  }>();
  const user_id = 1; // mock current user

  const [voteData, setVoteData] = useState<VoteData | null>(null);
  const [role, setRole] = useState<string>("viewer");
  const [numMember, setNumMember] = useState<number>(1);

  const canClose = role === "owner";
  const canEdit = role === "owner" || role === "editor";

  // ----------------- Handlers -----------------
  const handleBack = () => {
    router.replace({
      pathname: `/plan/[plan_id]/daily_trip`,
      params: { plan_id, date: voteData?.date },
    });
  };

  const handleSearch = () => {
    router.push(
      `/plan/${plan_id}/daily_trip/(modals)/add_vote/vote_place/${vote_id}/search_place`
    );
  };

  // ✅ Toggle Vote (เลือกได้แค่ 1 อัน)
  const handleToggleVote = (placeId: number) => {
    setVoteData((prev) => {
      if (!prev) return prev;

      const previouslyVoted = prev.places_voting.find((p) => p.is_voted);

      const updatedPlaces = prev.places_voting.map((p) => {
        if (p.place_id === placeId) {
          // กดซ้ำ = ยกเลิก
          if (p.is_voted) {
            return { ...p, is_voted: false, voting_count: p.voting_count - 1 };
          }
          // เลือกใหม่
          return { ...p, is_voted: true, voting_count: p.voting_count + 1 };
        }

        // อันที่เคยโหวตไว้ → ลบโหวต
        if (previouslyVoted?.place_id === p.place_id) {
          return { ...p, is_voted: false, voting_count: p.voting_count - 1 };
        }

        return p;
      });

      // หา max votes ใหม่
      const maxVotes = Math.max(...updatedPlaces.map((p) => p.voting_count), 0);

      const finalPlaces = updatedPlaces.map((p) => ({
        ...p,
        is_most_voted: p.voting_count === maxVotes && maxVotes > 0,
      }));

      return { ...prev, places_voting: finalPlaces };
    });
  };

  // ✅ Delete Place
  const handleDelete = (placeId: number) => {
    Alert.alert("Delete Place", "Do you want to remove this place?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setVoteData((prev) =>
            prev
              ? {
                  ...prev,
                  places_voting: prev.places_voting.filter(
                    (p) => p.place_id !== placeId
                  ),
                }
              : prev
          );
        },
      },
    ]);
  };

  // ✅ Close Vote
  const handleCloseVote = () => {
    if (!voteData) return;

    const maxVotes = Math.max(
      ...voteData.places_voting.map((p) => p.voting_count)
    );
    const mostVoted = voteData.places_voting.filter(
      (p) => p.voting_count === maxVotes
    );

    if (mostVoted.length === 1) {
      router.replace({
        pathname: `/plan/[plan_id]/daily_trip`,
        params: { plan_id, date: voteData.date },
      });
    } else {
      router.push({
        pathname: `/plan/[plan_id]/daily_trip/(modals)/add_vote/vote_place/[vote_id]/owner_decision`,
        params: {
          plan_id,
          vote_id,
          date: voteData.date,
          time_begin: voteData.time_start,
          time_end: voteData.time_end,
          options: JSON.stringify(mostVoted.map((p) => p.place_id)),
        },
      });
    }
  };

  // ----------------- Fetch Data -----------------
  useEffect(() => {
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
      const voteCounts: { [key: number]: number } = {};
      result.votes.forEach((vote) => {
        if (vote.place_id) {
          voteCounts[vote.place_id] = (voteCounts[vote.place_id] || 0) + 1;
        }
      });

      const maxVotes = Math.max(...Object.values(voteCounts), 0);

      const mappedPlaces: PlaceVoting[] = result.options.map((opt) => {
        const count = voteCounts[opt.place_id] || 0;
        const isVoted = result.votes.some(
          (v) => v.user_id === user_id && v.place_id === opt.place_id
        );
        return {
          pit_id: opt.place_id,
          place_id: opt.place_id,
          address: opt.location,
          place_picture_url:
            opt.place_image ||
            "https://via.placeholder.com/150?text=No+Image",
          rating: opt.rating,
          title: opt.title,
          review_count: opt.review_count,
          voting_count: count,
          is_voted: isVoted,
          is_most_voted: count === maxVotes && maxVotes > 0,
        };
      });

      setVoteData({
        vote_id: result.id,
        date: result.date,
        time_start: result.time_begin,
        time_end: result.time_end,
        places_voting: mappedPlaces,
      });
    }
  }, [plan_id, vote_id]);

  // ----------------- Render -----------------
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
              <Text className="text-black text-2xl font-bold">
                {voteData?.time_start}
              </Text>
            </View>
            <View className="flex-col items-center justify-center">
              <Feather name="clock" size={30} color="#6B7280" />
              <Text className="text-black text-base font-bold mt-2">
                {voteData?.date ? formatDate(voteData.date) : ""}
              </Text>
            </View>
            <View className="items-center">
              <Text className="text-gray-500 text-lg font-medium mb-2">
                End
              </Text>
              <Text className="text-black text-2xl font-bold">
                {voteData?.time_end}
              </Text>
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
          Voting:{" "}
          {voteData?.places_voting.reduce(
            (acc, p) => acc + p.voting_count,
            0
          ) ?? 0}
          /{String(numMember)}
        </Text>

        {/* Place Options */}
        {voteData?.places_voting.map((opt) => (
          <TouchableOpacity
            key={opt.place_id}
            activeOpacity={0.7}
            onPress={() => handleToggleVote(opt.place_id)}
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
                  {opt.rating} ({opt.review_count} Reviews)
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
        ))}

        {canClose && (
          <CustomButton title="Close Vote" onPress={handleCloseVote} />
        )}
      </View>
    </ScrollView>
  );
};

export default ResultVotePlace;
