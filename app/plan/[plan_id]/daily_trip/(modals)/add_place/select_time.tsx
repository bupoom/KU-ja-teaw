import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import NextButton from "@/components/common/NextButton";
import Header from "@/components/common/Header";

// helper functions
const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
const hhmm = (d: Date) => `${pad(d.getHours())}:${pad(d.getMinutes())}`;

export default function SelectTime() {
  const { plan_id } = useLocalSearchParams<{ plan_id: string }>();

  // default times 00:00 → 12:00
  const [start, setStart] = useState(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  });

  const [end, setEnd] = useState(() => {
    const d = new Date();
    d.setHours(12, 0, 0, 0);
    return d;
  });

  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  // validation
  const isRangeValid = useMemo(() => end > start, [start, end]);

  const onPick =
    (which: "start" | "end") => (_: DateTimePickerEvent, selected?: Date) => {
      if (Platform.OS === "android") {
        which === "start" ? setShowStart(false) : setShowEnd(false);
      }
      if (!selected) return;

      const base = new Date(which === "start" ? start : end);
      base.setHours(selected.getHours(), selected.getMinutes(), 0, 0);
      which === "start" ? setStart(base) : setEnd(base);
    };

  const goNext = () => {
    if (!isRangeValid) return;
    router.push({
      pathname: `/plan/[plan_id]/daily_trip/add_place/search_place`,
      params: {
        plan_id: plan_id as string,
        start: hhmm(start),
        end: hhmm(end),
      },
    });
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header title="" onBackPress={handleBack} />

      {/* main container แบ่ง content และ footer */}
      <View className="flex-1 justify-between px-6">
        {/* ===== Content Center ===== */}
        <View className="flex-1 items-center justify-start pt-20">
          {/* Clock Icon */}
          <View className="w-20 h-20 rounded-full border border-gray-300 items-center justify-center mb-6">
            <Ionicons name="time-outline" size={30} color="#294C43" />
          </View>

          {/* START / END columns */}
          <View className="w-full px-4">
            <View className="flex-row justify-between">
              {/* START */}
              <View className="w-[47%] items-center">
                <View className="px-4 py-2 rounded-full bg-[#294C43]">
                  <Text className="text-white font-semibold text-lg">START</Text>
                </View>
                <TouchableOpacity
                  onPress={() => setShowStart(true)}
                  activeOpacity={0.85}
                  className="mt-2 h-16 w-full rounded-lg border border-gray_border bg-white items-center justify-center"
                >
                  <Text className="text-xl font-semibold text-black">
                    {hhmm(start)}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* END */}
              <View className="w-[47%] items-center">
                <View className="px-4 py-2 rounded-full bg-[#294C43]">
                  <Text className="text-white font-semibold text-lg">END</Text>
                </View>
                <TouchableOpacity
                  onPress={() => setShowEnd(true)}
                  activeOpacity={0.85}
                  className="mt-2 h-16 w-full rounded-lg border border-gray_border bg-white items-center justify-center"
                >
                  <Text className="text-xl font-semibold text-black">
                    {hhmm(end)}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* helper text */}
            <Text className="text-center text-light_gray mt-5 leading-5">
              Please select the time period you plan{"\n"}to Add Place
            </Text>

            {/* validation error */}
            {!isRangeValid && (
              <Text className="text-red-500 text-center mt-2">
                End time must be after Start time
              </Text>
            )}
          </View>
        </View>

        {/* ===== Footer Button ===== */}
        <View className="mb-20">
          <NextButton onPress={goNext} disabled={!isRangeValid} />
        </View>
      </View>

      {/* Native Pickers */}
      {showStart && (
        <DateTimePicker
          mode="time"
          value={start}
          onChange={onPick("start")}
          is24Hour
          display={Platform.OS === "ios" ? "spinner" : "default"}
        />
      )}
      {showEnd && (
        <DateTimePicker
          mode="time"
          value={end}
          onChange={onPick("end")}
          is24Hour
          display={Platform.OS === "ios" ? "spinner" : "default"}
        />
      )}
    </SafeAreaView>
  );
}
