import React, { useEffect, useMemo, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  TextInput,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const GREEN = "#294C43";
const LIGHT_BORDER = "#E5E7EB";

type TransportKey = "car" | "train" | "bus" | "walk" | "flight" | "boat";
type UserRole = "owner" | "editor" | "viewer";

/* ----------------------- STUBBED API ----------------------- */
async function apiFetchVoteState(
  vote_id: string,
  user_id: string
): Promise<{
  hasVoted: boolean;
  myChoice?: TransportKey;
  counts: Record<TransportKey, number>;
  totalVoters: number;
  isClosed: boolean;
}> {
  return {
    hasVoted: false,
    myChoice: "car",
    counts: { car: 1, train: 0, bus: 0, walk: 0, flight: 0, boat: 0 },
    totalVoters: 5,
    isClosed: false,
  };
}

async function apiSubmitVote(params: {
  vote_id: string;
  user_id: string;
  choice: TransportKey;
}): Promise<{ ok: boolean }> {
  return { ok: true };
}

async function apiFetchUserRole(plan_id: string, user_id: string): Promise<UserRole> {
  // TODO: replace with real call
  return "owner"; // change to 'viewer' or 'editor' to test permissions
}

async function apiCloseVote(params: {
  vote_id: string;
  user_id: string;
}): Promise<{ ok: boolean }> {
  // TODO: server marks vote closed
  return { ok: true };
}
/* ----------------------------------------------------------- */

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

  // title box (required)
  const [title, setTitle] = useState("");

  // voting state
  const [selected, setSelected] = useState<TransportKey>("car");
  const [votes, setVotes] = useState<Record<TransportKey, number>>({
    car: 1, train: 0, bus: 0, walk: 0, flight: 0, boat: 0,
  });
  const [totalVoters, setTotalVoters] = useState(5);
  const [hasVoted, setHasVoted] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  // role/permissions
  const [userRole, setUserRole] = useState<UserRole>("viewer");
  const canClose = userRole === "owner";

  const [loading, setLoading] = useState(true);

  // fetch vote status + role on mount
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const [state, role] = await Promise.all([
          apiFetchVoteState(String(vote_id), uid),
          apiFetchUserRole(String(plan_id), uid),
        ]);
        setUserRole(role);
        setHasVoted(state.hasVoted);
        setVotes(state.counts);
        setTotalVoters(state.totalVoters);
        setIsClosed(state.isClosed);
        if (state.hasVoted && state.myChoice) setSelected(state.myChoice);
      } finally {
        setLoading(false);
      }
    })();
  }, [vote_id, uid, plan_id]);

  const currentVotes = useMemo(
    () => Object.values(votes).reduce((a, b) => a + b, 0),
    [votes]
  );

  const onSelect = (k: TransportKey) => {
    if (hasVoted || isClosed) return; // block change if already voted or closed
    if (k === selected) return;
    setVotes((prev) => {
      const next = { ...prev };
      next[selected] = Math.max(0, next[selected] - 1);
      next[k] = (next[k] ?? 0) + 1;
      return next;
    });
    setSelected(k);
  };

  const canConfirm = Boolean(!loading && !hasVoted && !isClosed && title.trim());

  const confirmVote = async () => {
    if (isClosed) {
      Alert.alert("Voting closed", "This poll has been closed by the owner.");
      return;
    }
    if (hasVoted) {
      Alert.alert("Already voted", "You have already submitted a vote for this poll.");
      return;
    }
    if (!title.trim()) {
      Alert.alert("Title required", "Please give this event a name.");
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
      title: title.trim(),
      isClosed: String(isClosed),
    };
    router.push({ pathname: "/plan/[plan_id]/daily_trip", params: payload });
  };

  const onCloseVote = async () => {
    if (!canClose) return;
    Alert.alert("Close vote?", "No one will be able to vote after closing.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Close",
        style: "destructive",
        onPress: async () => {
          setLoading(true);
          const resp = await apiCloseVote({ vote_id: String(vote_id), user_id: uid });
          setLoading(false);
          if (!resp.ok) {
            Alert.alert("Error", "Failed to close the vote.");
            return;
          }
          setIsClosed(true);
          Alert.alert("Closed", "Voting has been closed.");
        },
      },
    ]);
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
    const lock = (hasVoted || isClosed) && !isActive;
    return (
      <TouchableOpacity
        onPress={() => onSelect(item.key)}
        activeOpacity={0.9}
        disabled={hasVoted || isClosed}
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
      {/* Header */}
      <View className="px-5 py-3 items-center">
        <Text className="text-[17px] font-semibold">Vote Event</Text>
      </View>

      {/* Title box at top */}
      <View className="px-5">
        <Text className="text-sm text-[#0E1820] mb-2">Event title</Text>
        <TextInput
          placeholder="e.g., Taxi to hotel, Morning commute"
          value={title}
          onChangeText={setTitle}
          editable={!hasVoted && !isClosed}
          className="border border-gray-300 rounded-xl px-4 py-3 text-base"
          maxLength={80}
        />
        {!title.trim() && !hasVoted && !isClosed ? (
          <Text className="mt-1 text-xs text-red-500">Required</Text>
        ) : null}
      </View>

      {/* Time card */}
      <View className="mx-5 mt-4 rounded-2xl border bg-white" style={{ borderColor: LIGHT_BORDER }}>
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
        <Text className="text-gray-500">
          {isClosed ? "Voting closed" : `Voting: ${currentVotes}/${totalVoters}`}
        </Text>
      </View>

      {(hasVoted || isClosed) && (
        <View className="mx-5 mt-2 rounded-xl bg-gray-100 px-4 py-2">
          <Text className="text-gray-700">
            {isClosed ? (
              <>This poll has been <Text className="font-semibold">closed</Text> by the owner.</>
            ) : (
              <>You already voted (<Text className="font-semibold">{selected}</Text>). Voting is locked.</>
            )}
          </Text>
        </View>
      )}

      {/* Transport grid */}
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

      {/* Footer actions */}
      <View className="px-5 pb-7 gap-3">
        {/* Confirm Vote */}
        <TouchableOpacity
          onPress={confirmVote}
          activeOpacity={0.9}
          disabled={!canConfirm}
          className={`py-4 rounded-xl items-center ${!canConfirm ? "opacity-60" : ""}`}
          style={{ backgroundColor: GREEN }}
        >
          <Text className="text-white font-semibold text-[16px]">
            {hasVoted ? "Already Voted" : isClosed ? "Voting Closed" : "Confirm Vote"}
          </Text>
        </TouchableOpacity>

        {/* Close Vote (owner only) */}
        {canClose && !isClosed && (
          <TouchableOpacity
            onPress={onCloseVote}
            activeOpacity={0.9}
            className="py-3 rounded-xl items-center border"
            style={{ borderColor: "#ef4444" }}
          >
            <Text className="font-semibold text-[16px]" style={{ color: "#ef4444" }}>
              Close Vote (Owner)
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}
