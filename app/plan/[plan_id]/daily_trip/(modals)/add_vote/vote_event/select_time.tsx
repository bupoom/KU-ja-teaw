import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo, useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Modal,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import { mockTripDetails } from "@/mock/mockDataComplete";

import Header from "@/components/common/Header";
import CustomButton from "@/components/common/CustomButton";

import { formatDate } from "@/util/formatFucntion/formatDate";
import { extractDates } from "@/util/extractDates";

// helper functions
const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
const hhmm = (d: Date) => `${pad(d.getHours())}:${pad(d.getMinutes())}`;

const SelectTimeVoteEvent = () => {
  const { plan_id } = useLocalSearchParams<{ plan_id: string }>();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [dates, setDates] = useState<string[]>([]);
  const [showDateModal, setShowDateModal] = useState(false);

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

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setShowDateModal(false);
  };

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
      pathname: `/plan/[plan_id]/daily_trip/add_vote/vote_event/[vote_id]/result_vote`,
      params: {
        plan_id: plan_id as string,
        vote_id: 105 as number,
        // date: selectedDate,
        // start: hhmm(start),
        // end: hhmm(end),
        // เราน่าจะสร้างเลยตอนเลือกวันเเละเวลา
      },
    });
  };

  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    const datesData = mockTripDetails.find(
      (trip) => trip.trip_id === parseInt(plan_id)
    );
    if (datesData) {
      const extractedDates = extractDates(
        datesData?.start_date,
        datesData.end_date
      );
      setDates(extractedDates);
      // Set first date as default
      if (extractedDates.length > 0) {
        setSelectedDate(extractedDates[0]);
      }
    }
  }, [plan_id]);

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

          {/* DATE SELECTION */}
          <View className="w-full px-4 mb-6">
            <View className="items-center">
              <View className="px-4 py-2 rounded-full bg-[#294C43] mb-2">
                <Text className="text-white font-semibold text-lg">DATE</Text>
              </View>
              <TouchableOpacity
                onPress={() => setShowDateModal(true)}
                activeOpacity={0.85}
                className="w-full h-16 rounded-lg border border-gray_border bg-white items-center justify-center flex-row"
              >
                <Ionicons
                  name="calendar-outline"
                  size={20}
                  color="#666"
                  style={{ marginRight: 8 }}
                />
                <Text className="text-xl font-semibold text-black">
                  {selectedDate ? formatDate(selectedDate) : "Select Date"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* START / END columns */}
          <View className="w-full px-4">
            <View className="flex-row justify-between">
              {/* START */}
              <View className="w-[47%] items-center">
                <View className="px-4 py-2 rounded-full bg-[#294C43]">
                  <Text className="text-white font-semibold text-lg">
                    START
                  </Text>
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
        <View className="mb-16">
          <CustomButton title="Create Vote" onPress={goNext} disabled={!isRangeValid} />
        </View>
      </View>

      {/* Date Selection Modal */}
      <Modal
        visible={showDateModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowDateModal(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-3xl">
            {/* Modal Header */}
            <View className="flex-row items-center justify-center px-6 py-4 border-b border-gray-200">
              <Text className="text-lg font-semibold text-black">
                Select Date
              </Text>
            </View>

            {/* Date List */}
            <ScrollView className="max-h-80">
              {dates.map((date, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleDateSelect(date)}
                  className={`px-6 py-4 border-b border-gray-100 ${
                    selectedDate === date ? "bg-green-50" : "bg-white"
                  }`}
                  activeOpacity={0.7}
                >
                  <View className="flex-row items-center justify-between">
                    <Text
                      className={`text-lg font-medium ${
                        selectedDate === date ? "text-green_2" : "text-black"
                      }`}
                    >
                      {formatDate(date)}
                    </Text>
                    {selectedDate === date && (
                      <Ionicons name="checkmark" size={20} color="#284D44" />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Modal Footer */}
            <View className="px-6 py-4">
              <TouchableOpacity
                onPress={() => setShowDateModal(false)}
                className="bg-green_2 rounded-lg py-3"
              >
                <Text className="text-center text-white font-medium text-lg">
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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
};
export default SelectTimeVoteEvent;
