import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";

import Header from "@/components/common/Header";
import CustomButton from "@/components/common/CustomButton";

import TransportationIcon from "@/components/common/TransportIcon";

const transportOptions = [
  { id: "car", label: "Car" },
  { id: "train", label: "Train" },
  { id: "bus", label: "Bus" },
  { id: "walk", label: "Walk" },
  { id: "flight", label: "Flight" },
  { id: "boat", label: "Boat" },
];

const SelectTransport = () => {
  const router = useRouter();
  const { plan_id, selectDate, start, end } = useLocalSearchParams<{
    plan_id: string;
    selectDate: string;
    start: string;
    end: string;
  }>();
  const [selected, setSelected] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header title="Add Event" onBackPress={handleBack} />

      {/* Title Input */}
      <View className="mt-6 mb-2 bg-white rounded-lg px-6">
        <Text className="text-xl font-bold text-black mb-3 ml-2">Title</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          multiline
          className="border border-gray-300 rounded-lg p-3 text-gray-700 min-h-[60px]"
          style={{ textAlignVertical: "top" }}
          placeholder="Enter event title..."
        />
      </View>

      {/* Helper text */}
      <View className="px-6 mt-4 mb-6">
        <Text className="text-start text-gray-600 text-base ml-2">
          Please select your preferred travel method for{"\n"}this itinerary
          segment
        </Text>
      </View>

      {/* Transport grid */}
      <View className="flex-row flex-wrap justify-center gap-4 px-6">
        {transportOptions.map((opt) => {
          const isSelected = selected === opt.id;
          return (
            <TouchableOpacity
              key={opt.id}
              onPress={() => setSelected(opt.id)}
              activeOpacity={0.85}
              className={`w-[30%] py-4 rounded-lg border items-center justify-center 
                ${isSelected ? "bg-[#294C43] border-[#294C43]" : "bg-white border-gray_border"}`}
            >
              <TransportationIcon
                transportation={opt.id}
                color={isSelected ? "#fff" : "#000"}
                size={28}
              />
              <Text
                className={`mt-2 font-medium ${isSelected ? "text-white" : "text-black"}`}
              >
                {opt.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Add button */}
      <View className="absolute bottom-10 left-4 right-4">
        <CustomButton
          title="Add Event"
          onPress={() => {
            console.log("Event title:", title);
            console.log("Selected transport:", selected);

            router.replace({
              pathname: `/plan/[plan_id]/daily_trip`,
              params: {
                plan_id: plan_id,
                date: selectDate,
              },
            });
          }}
          disabled={!selected}
        />
      </View>
    </SafeAreaView>
  );
};

export default SelectTransport;
