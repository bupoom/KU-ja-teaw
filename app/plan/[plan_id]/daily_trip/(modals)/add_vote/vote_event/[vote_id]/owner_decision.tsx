import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import Feather from "@expo/vector-icons/Feather";

import { mockTransportationOptions } from "@/mock/mockDataComplete";
import TransportationIcon from "@/components/common/TransportIcon";
import Header from "@/components/common/Header";
import CustomButton from "@/components/common/CustomButton";
import { formatDate } from "@/util/formatFucntion/formatDate";

const OwnerDecision = () => {
  const { plan_id, vote_id, title, date, time_begin, time_end, options } =
    useLocalSearchParams<{
      plan_id: string;
      vote_id: string;
      title: string;
      date: string;
      time_begin: string;
      time_end: string;
      options: string; // JSON string ของ array
    }>();

  const router = useRouter();
  const optionIds = JSON.parse(options || "[]") as number[];

  // state เก็บการเลือกของ owner
  const [selected, setSelected] = useState<number | null>(null);

  const handleBack = () => {
    router.back();
  };

  const handleConfirm = () => {
    if (!selected) return;
    // TODO: update backend หรือ mockData
    // เสร็จแล้วกลับไป daily_trip
    router.replace({
      pathname: `/plan/[plan_id]/daily_trip`,
      params: { plan_id, date },
    });
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <Header title="Owner Decision" onBackPress={handleBack} />

      <View className="px-6 mt-4">
        {/* Time Section */}
        <View className="bg-white rounded-lg border border-gray_border p-4 mb-4">
          <View className="flex-row items-center justify-around">
            <View className="items-center">
              <Text className="text-gray-500 text-lg font-medium mb-2">
                Start
              </Text>
              <Text className="text-black text-2xl font-bold">
                {time_begin}
              </Text>
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
              <Text className="text-black text-2xl font-bold">{time_end}</Text>
            </View>
          </View>
        </View>

        {/* Title Section (read-only) */}
        <View className="bg-white rounded-lg border border-gray_border p-4 mb-4">
          <Text className="text-xl font-bold text-black mb-3 ml-4">Title</Text>
          <View className="border border-gray_border p-3 rounded-lg bg-gray-100">
            <Text className="text-gray-700">{title}</Text>
          </View>
        </View>

        {/* Options (เฉพาะที่ tie) */}
        <Text className="text-lg font-semibold text-black mb-3 ml-6">
          Select Final Decision
        </Text>
        <View className="flex-row flex-wrap gap-4 justify-start mb-6">
          {mockTransportationOptions
            .filter((opt) => optionIds.includes(opt.id))
            .map((option) => {
              const isSelected = selected === option.id;

              return (
                <TouchableOpacity
                  key={option.id}
                  onPress={() => setSelected(option.id)}
                  activeOpacity={0.8}
                  className="w-[30%] mb-4 rounded-lg"
                >
                  <View
                    className={`px-4 py-6 rounded-lg items-center border ${
                      isSelected
                        ? "bg-green_2 border-green_2"
                        : "bg-white border-gray_border"
                    }`}
                  >
                    <TransportationIcon
                      transportation={option.type.toLowerCase()}
                      color={isSelected ? "#ffffff" : "#000000"}
                      size={30}
                    />
                    <Text
                      className={`mt-2 font-medium ${
                        isSelected ? "text-white" : "text-black"
                      }`}
                    >
                      {option.type}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
        </View>

        <CustomButton
          title="Confirm Decision"
          onPress={handleConfirm}
          disabled={!selected}
        />
      </View>
    </ScrollView>
  );
};

export default OwnerDecision;
