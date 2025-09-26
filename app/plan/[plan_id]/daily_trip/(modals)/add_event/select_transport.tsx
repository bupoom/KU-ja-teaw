import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

type TransportKey = "car" | "train" | "bus" | "walk" | "flight" | "boat";

const Tile: React.FC<{
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  selected?: boolean;
  onPress?: () => void;
}> = ({ label, icon, selected, onPress }) => (
  <TouchableOpacity
    activeOpacity={0.9}
    onPress={onPress}
    className={`h-24 w-[31%] rounded-xl border items-center justify-center mb-4
      ${selected ? "bg-[#294C43] border-[#294C43]" : "bg-white border-[#D9D9D9]"}`}
  >
    <Ionicons name={icon} size={24} color={selected ? "#FFFFFF" : "#0E1820"} />
    <Text className={`mt-2 text-[15px] font-semibold ${selected ? "text-white" : "text-[#0E1820]"}`}>
      {label}
    </Text>
  </TouchableOpacity>
);

export default function SelectTransport() {
  const { plan_id, date, start, end } = useLocalSearchParams<{
    plan_id: string;
    date?: string;   // "YYYY-MM-DD"
    start?: string;  // "HH:mm"
    end?: string;    // "HH:mm"
  }>();

  const [title, setTitle] = useState<string>("");
  const [transport, setTransport] = useState<TransportKey | null>(null);

  const options = useMemo(
    () =>
      ([
        { key: "car",    label: "Car",    icon: "car-outline" },
        { key: "train",  label: "Train",  icon: "train-outline" },
        { key: "bus",    label: "Bus",    icon: "bus-outline" },
        { key: "walk",   label: "Walk",   icon: "walk-outline" },
        { key: "flight", label: "Flight", icon: "airplane-outline" },
        { key: "boat",   label: "Boat",   icon: "boat-outline" },
      ] as const),
    []
  );

  const canAdd = Boolean(title.trim() && transport && plan_id && date && start && end);

  const onBack = () => router.back();

  const onAdd = () => {
    if (!canAdd) return;

    const payload = {
      plan_id: String(plan_id),
      date: String(date),
      start: String(start),
      end: String(end),
      transport: String(transport),
      title: title.trim(),
    };

    console.log("Add Event payload:", payload);

    router.push({
      pathname: "/plan/[plan_id]/daily_trip",
      params: payload,
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View className="flex-row items-center justify-center py-3 border-b border-gray-200">
        <TouchableOpacity onPress={onBack} className="absolute left-4 px-2 py-1">
          <Ionicons name="chevron-back" size={22} color="#0E1820" />
        </TouchableOpacity>
        <Text className="text-[18px] font-semibold text-[#0E1820]">Add Event</Text>
      </View>

      {/* Body */}
      <View className="flex-1 px-6 pt-4">
        {/* Title at top */}
        <Text className="text-sm text-[#0E1820] mb-2">Event title</Text>
        <TextInput
          placeholder="e.g., Taxi to hotel, Morning commute"
          value={title}
          onChangeText={setTitle}
          className="border border-gray-300 rounded-lg px-4 py-3 text-base mb-5"
          maxLength={80}
        />

        <Text className="text-[14px] text-[#0E1820] leading-5 mb-5">
          Please select your preferred travel method for{"\n"}this itinerary segment
        </Text>

        {/* Transport tiles */}
        <View className="flex-row justify-between flex-wrap">
          {options.map(o => (
            <Tile
              key={o.key}
              label={o.label}
              icon={o.icon as any}
              selected={transport === o.key}
              onPress={() => setTransport(o.key as TransportKey)}
            />
          ))}
        </View>

        {/* Date & Time */}
        {(date || start || end) && (
          <View className="mt-2">
            <Text className="text-xs text-gray-500">
              {date ? `Date: ${date}` : ""}{date && (start || end) ? "   •   " : ""}
              {start ? `Start: ${start}` : ""}{start && end ? "   •   " : ""}
              {end ? `End: ${end}` : ""}
            </Text>
          </View>
        )}

        <View className="flex-1" />

        {/* Add */}
        <TouchableOpacity
          onPress={onAdd}
          disabled={!canAdd}
          activeOpacity={0.92}
          className={`mb-8 py-4 rounded-xl items-center ${canAdd ? "bg-[#294C43]" : "bg-gray-300"}`}
        >
          <Text className="text-white text-lg font-semibold">Add</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
