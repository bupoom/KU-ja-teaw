import React, { useEffect, useMemo, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const GREEN = "#294C43";
const LIGHT_BORDER = "#E5E7EB";

type TransportKey = "car" | "train" | "bus" | "walk" | "flight" | "boat";

const TRANSPORTS: Array<{
  key: TransportKey;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}> = [
  { key: "car", label: "Car", icon: "car-outline" },
  { key: "train", label: "Train", icon: "train-outline" },
  { key: "bus", label: "Bus", icon: "bus-outline" },
  { key: "walk", label: "Walk", icon: "walk-outline" },
  { key: "flight", label: "Flight", icon: "airplane-outline" },
  { key: "boat", label: "Boat", icon: "boat-outline" },
];

/* ----------------------- STUBBED API -----------------------
   Replace these with your real calls.
---------------------------------------------------------------- */
async function apiFetchVoteState(vote_id: string, user_id: string): Promise<{
  hasVoted: boolean;
  myChoice?: TransportKey;
  counts: Record<TransportKey, number>;
  totalVoters: number;
}> {
  // TODO: fetch(`/votes/${vote_id}?user=${user_id}`)
  // Demo defaults:
  return {
    hasVoted: false, // set true to test the lock
    myChoice: "car",
    counts: { car: 1, train: 0, bus: 0, walk: 0, flight: 0, boat: 0 },
    totalVoters: 5,
  };
}

async function apiSubmitVote(params: {
  vote_id: string;
  user_id: string;
  choice: TransportKey;
}): Promise<{ ok: boolean }> {
  // TODO: await fetch(`/votes/${params.vote_id}`, { method:'POST', body: JSON.stringify({user_id, choice}) })
  return { ok: true };
}
/* ----------------------------------------------------------- */

export default function SelectTransport() {
  const router = useRouter();
  const { plan_id, vote_id, start, end, date, user_id } = useLocalSearchParams<{
    plan_id: string;
    vote_id: string;
    start?: string; // "HH:mm"
    end?: string;   // "HH:mm"
    date?: string;  // "YYYY-MM-DD"
    user_id?: string;
  }>();
  const uid = String(user_id ?? "me-guest");

  // voting state
  const [selected, setSelected] = useState<TransportKey>("car");
  const [votes, setVotes] = useState<Record<TransportKey, number>>({
    car: 1, train: 0, bus: 0, walk: 0, flight: 0, boat: 0,
  });
  const [totalVoters, setTotalVoters] = useState(5);
  const [hasVoted, setHasVoted] = useState(false);
  const [loading, setLoading] = useState(true);

  // fetch vote status on mount
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await apiFetchVoteState(String(vote_id), uid);
        setHasVoted(res.hasVoted);
        setVotes(res.counts);
        setTotalVoters(res.totalVoters);
        // if user already voted, lock to their choice and do not allow change
        if (res.hasVoted && res.myChoice) setSelected(res.myChoice);
      } finally {
        setLoading(false);
      }
    })();
  }, [vote_id, uid]);

  const currentVotes = useMemo(
    () => Object.values(votes).reduce((a, b) => a + b, 0),
    [votes]
  );

  const onSelect = (k: TransportKey) => {
    if (hasVoted) return; // block change if already voted
    if (k === selected) return;
    // Local visual move: shift "my" single vote
    setVotes((prev) => {
      const next = { ...prev };
      next[selected] = Math.max(0, next[selected] - 1);
      next[k] = (next[k] ?? 0) + 1;
      return next;
    });
    setSelected(k);
  };

  const confirmVote = async () => {
    if (hasVoted) {
      Alert.alert("Already voted", "You have already submitted a vote for this poll.");
      return;
    }
    setLoading(true);
    const resp = await apiSubmitVote({ vote_id: String(vote_id), user_id: uid, choice: selected });
    setLoading(false);
    if (!resp.ok) {
      Alert.alert("Error", "Could not submit your vote. Please try again.");
      return;
    }
    setHasVoted(true);
    // navigate out with all params
    const payload = {
      plan_id: String(plan_id),
      vote_id: String(vote_id),
      user_id: uid,
      date: String(date ?? ""),
      start: String(start ?? ""),
      end: String(end ?? ""),
      selected,
      votes: JSON.stringify(votes),
      hasVoted: "true",
    };
    router.push({ pathname: "/plan/[plan_id]/daily_trip", params: payload });
  };

  // small UI atoms
  const Pill = ({ children, isActive }: { children: React.ReactNode; isActive: boolean }) => (
    <View
      className="mt-2 rounded-full border px-3 py-1 items-center"
      style={{ borderColor: isActive ? "white" : LIGHT_BORDER }}
    >
      <Text className="text-[12px]" style={{ color: isActive ? "white" : "#4B5563" }}>
        {children}
      </Text>
    </View>
  );

  const TransportCard = ({ item }: { item: (typeof TRANSPORTS)[number] }) => {
    const isActive = selected === item.key;
    const lock = hasVoted && !isActive; // dim other options if locked
    return (
      <TouchableOpacity
        onPress={() => onSelect(item.key)}
        activeOpacity={0.9}
        disabled={hasVoted} // block all when already voted
        className={`h-28 w-[31%] mb-4 rounded-2xl items-center justify-center ${
          isActive ? "" : "border"
        }`}
        style={{
          backgroundColor: isActive ? GREEN : "white",
          borderColor: LIGHT_BORDER,
          opacity: lock ? 0.5 : 1,
        }}
      >
        <Ionicons name={item.icon} size={28} color={isActive ? "white" : "#374151"} />
        <Text className="mt-2 text-[16px] font-medium" style={{ color: isActive ? "white" : "#111827" }}>
          {item.label}
        </Text>
        <Pill isActive={isActive}>{votes[item.key]} Votes</Pill>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-5 py-3 items-center">
        <Text className="text-[17px] font-semibold">Vote Event</Text>
      </View>

      <View className="mx-5 mt-1 rounded-2xl border bg-white" style={{ borderColor: LIGHT_BORDER }}>
        <View className="flex-row items-center justify-between px-5 py-4">
          <View className="items-center">
            <Text className="text-gray-500 mb-1">Start</Text>
            <Text className="text-[28px] font-semibold text-gray-900">{start ?? "--:--"}</Text>
          </View>
          <View className="items-center">
            <View className="w-10 h-10 rounded-full border items-center justify-center" style={{ borderColor: LIGHT_BORDER }}>
              <Ionicons name="time-outline" size={20} color="#6B7280" />
            </View>
          </View>
          <View className="items-center">
            <Text className="text-gray-500 mb-1">End</Text>
            <Text className="text-[28px] font-semibold text-gray-900">{end ?? "--:--"}</Text>
          </View>
        </View>
      </View>

      <View className="px-6 mt-3 items-end">
        <Text className="text-gray-500">Voting: {currentVotes}/{totalVoters}</Text>
      </View>

      {hasVoted && (
        <View className="mx-5 mt-2 rounded-xl bg-gray-100 px-4 py-2">
          <Text className="text-gray-700">
            You already voted (<Text className="font-semibold">{selected}</Text>). Voting is locked.
          </Text>
        </View>
      )}

      <View className="px-4 mt-3">
        <FlatList
          data={TRANSPORTS}
          keyExtractor={(it) => it.key}
          renderItem={TransportCard}
          numColumns={3}
          scrollEnabled={false}
          columnWrapperStyle={{ justifyContent: "space-between" }}
        />
      </View>

      <View className="flex-1" />

      <View className="px-5 pb-7">
        <TouchableOpacity
          onPress={confirmVote}
          activeOpacity={0.9}
          disabled={loading || hasVoted}
          className={`py-4 rounded-xl items-center ${loading || hasVoted ? "opacity-60" : ""}`}
          style={{ backgroundColor: GREEN }}
        >
          <Text className="text-white font-semibold text-[16px]">
            {hasVoted ? "Already Voted" : "Confirm Vote"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
