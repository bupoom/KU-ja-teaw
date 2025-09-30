import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import Feather from "@expo/vector-icons/Feather";

import { mockActivityVoteEvents } from "@/mock/mockDataComplete";
import { mockTransportationOptions } from "@/mock/mockDataComplete";
import { mockTripMembers } from "@/mock/mockDataComplete";
import { mockTripDetails } from "@/mock/mockDataComplete";

import TransportationIcon from "@/components/common/TransportIcon";
import Header from "@/components/common/Header";
import CustomButton from "@/components/common/CustomButton";
import { formatDate } from "@/util/formatFucntion/formatDate";

const ResultVoteEvent = () => {
  const { plan_id, vote_id } = useLocalSearchParams<{
    plan_id: string;
    vote_id: string;
  }>();
  const router = useRouter();
  const user_id = 1; // Current user ID
    // State variables
  const [date, setDate] = useState<string>("");
  const [timeBegin, setTimeBegin] = useState<string>("");
  const [timeEnd, setTimeEnd] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [voteDetail, setVoteDetail] = useState<ActivityVoteEvent>();
  const [votes, setVotes] = useState<Vote[]>([]);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [role, setRole] = useState<string>("viewer");
  const [numMember, setNumMember] = useState<Number>(1);

  const canClose = role === "owner";

  const handleBack = () => {
    router.replace({
      pathname: `/plan/[plan_id]/daily_trip`,
      params: { plan_id, date },
    });
  };

  const handleCloseVote = () => {
    const mostVoted = getMostVotedOptions(); // คำนวณสดตอนปิดโหวต
    // send notification
    if (mostVoted.length === 0) {
      // ไม่มีโหวตเลย → กลับ daily trip
      router.replace({
        pathname: `/plan/[plan_id]/daily_trip`,
        params: { plan_id, date },
      });
    } else if (mostVoted.length === 1) {
      // มีผู้ชนะชัดเจน → กลับ daily trip
      router.replace({
        pathname: `/plan/[plan_id]/daily_trip`,
        params: { plan_id, date },
      });
    } else {
      // tie → ไปหน้า owner_decision
      router.push({
        pathname: `/plan/[plan_id]/daily_trip/(modals)/add_vote/vote_event/[vote_id]/owner_decision`,
        params: {
          plan_id,
          vote_id,
          title,
          date,
          time_begin: timeBegin,
          time_end: timeEnd,
          options: JSON.stringify(mostVoted), // serialize array
        },
      });
    }
  };

  const fetchVoteDetail = (vote_id: string, plan_id: string) => {
    const result = mockActivityVoteEvents.find(
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
      setTitle(result.title);
      setEditTitle(result.title);
    }
  };

  // Get vote counts for each option
  const getVoteCounts = () => {
    const voteCounts: { [key: number]: number } = {};
    votes.forEach((vote) => {
      if (vote.event_id) {
        voteCounts[vote.event_id] = (voteCounts[vote.event_id] || 0) + 1;
      }
    });
    return voteCounts;
  };

  // Get user's selected option
  const getUserVote = () => {
    return votes.find((vote) => vote.user_id === user_id)?.event_id;
  };

  // Get option(s) with most votes (รองรับหลายตัว)
  const getMostVotedOptions = (): number[] => {
    const voteCounts = getVoteCounts();
    let maxVotes = 0;

    Object.values(voteCounts).forEach((count) => {
      if (count > maxVotes) {
        maxVotes = count;
      }
    });

    return Object.entries(voteCounts)
      .filter(([_, count]) => count === maxVotes)
      .map(([optionId]) => parseInt(optionId));
  };

  // เมื่อ user โหวต (กดซ้ำ = ยกเลิกโหวต)
  const handleVoteSelect = (optionId: number) => {
    setVotes((prevVotes) => {
      const existingVote = prevVotes.find((v) => v.user_id === user_id);

      // ถ้า user กดซ้ำที่ตัวเดิม → ลบออก (ยกเลิกโหวต)
      if (existingVote?.event_id === optionId) {
        return prevVotes.filter((v) => v.user_id !== user_id);
      }

      // ถ้าเลือกใหม่ → ลบเก่าแล้วเพิ่มใหม่
      const updatedVotes = prevVotes.filter((v) => v.user_id !== user_id);
      return [
        ...updatedVotes,
        {
          id: prevVotes.length + 1,
          user_id,
          activity_id: parseInt(vote_id),
          vote_type: "event",
          event_id: optionId,
          username: "Current User", // mock username
          trip_id: parseInt(plan_id),
        },
      ];
    });
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
      <Header title="Vote Event" onBackPress={handleBack} />

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
          Voting: {votes.length}/{String(numMember)}
        </Text>

        {/* Transportation Options Grid */}
        <View className="flex-row flex-wrap justify-between mb-6">
          {mockTransportationOptions.map((option) => {
            const voteCount = voteCounts[option.id] || 0;
            const isUserSelected = userVote === option.id;
            const isMostVoted = mostVotedOptions.includes(option.id);

            return (
              <TouchableOpacity
                key={option.id}
                onPress={() => handleVoteSelect(option.id)}
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
