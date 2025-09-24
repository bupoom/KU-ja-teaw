// app/plan/[plan_id]/daily_trip/(modals)/add_vote/[vote_id]/vote_event/select_time.tsx
import { mockTripBoxes } from "@/mock/mockDataComplete";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { Platform, SafeAreaView, Text, TouchableOpacity, View } from "react-native";

// helpers
const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
const hhmm = (d: Date) => `${pad(d.getHours())}:${pad(d.getMinutes())}`;
const ymd = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const ymdNum = (d: Date) => d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();

export default function VoteEventSelectTime() {
  const { plan_id, vote_id } = useLocalSearchParams<{ plan_id: string; vote_id: string }>();

  // look up trip window (adjust if your mock is keyed differently)
  const trip = useMemo(
    () => mockTripBoxes.find((t) => String(t.trip_id) === String(plan_id)),
    [plan_id]
  );
  const tripStart = useMemo(() => (trip ? new Date(`${trip.start_date}T00:00:00`) : null), [trip]);
  const tripEnd = useMemo(() => (trip ? new Date(`${trip.end_date}T00:00:00`) : null), [trip]);

  const [date, setDate] = useState(new Date());
  useEffect(() => {
    if (tripStart) setDate(new Date(tripStart));
  }, [tripStart]);

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

  const [showDate, setShowDate] = useState(false);
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  const isRangeValid = useMemo(() => end > start, [start, end]);
  const isDateInTrip = useMemo(() => {
    if (!tripStart || !tripEnd) return false;
    return ymdNum(date) >= ymdNum(tripStart) && ymdNum(date) <= ymdNum(tripEnd);
  }, [date, tripStart, tripEnd]);
  const isFormValid = isRangeValid && isDateInTrip && !!vote_id;

  const onPickTime =
    (which: "start" | "end") =>
    (_: DateTimePickerEvent, selected?: Date) => {
      if (Platform.OS !== "ios") (which === "start" ? setShowStart : setShowEnd)(false);
      if (!selected) return;
      const base = new Date(which === "start" ? start : end);
      base.setHours(selected.getHours(), selected.getMinutes(), 0, 0);
      which === "start" ? setStart(base) : setEnd(base);
    };

  const onPickDate = (_: DateTimePickerEvent, selected?: Date) => {
    if (Platform.OS !== "ios") setShowDate(false);
    if (!selected) return;
    setDate(new Date(selected.getFullYear(), selected.getMonth(), selected.getDate()));
  };

  const goNext = () => {
    if (!isFormValid) return;
    router.push({
      pathname:
        `/plan/${plan_id}/daily_trip/(modals)/add_vote/${vote_id}/` +
        `vote_event/select_transport`,
      params: {
        plan_id: String(plan_id),
        vote_id: String(vote_id),
        date: ymd(date),
        start: hhmm(start),
        end: hhmm(end),
      },
    });
  };

  const chip = "px-4 py-1.5 rounded-full bg-[#294C43]";
  const chipText = "text-white font-bold text-[13px]";
  const box = "mt-2 h-16 w-full rounded-2xl border border-[#D9D9D9] bg-white items-center justify-center";
  const timeText = "text-[20px] font-semibold text-[#0E1820]";

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center px-6 pt-10">
        <View className="w-16 h-16 rounded-full border border-gray-300 items-center justify-center mb-6">
          <Ionicons name="time-outline" size={28} color="#294C43" />
        </View>

        {/* Date */}
        <View className="w-full px-4 mb-4 items-center">
          <View className={chip}><Text className={chipText}>DATE</Text></View>
          <TouchableOpacity onPress={() => setShowDate(true)} activeOpacity={0.85} className={box}>
            <Text className="text-[18px] font-semibold text-[#0E1820]">{ymd(date)}</Text>
          </TouchableOpacity>
          {trip && (
            <Text className="text-xs text-gray-500 mt-2">
              Trip window: {trip.start_date} → {trip.end_date}
            </Text>
          )}
        </View>

        {/* Start / End */}
        <View className="w-full px-4">
          <View className="flex-row justify-between">
            <View className="w-[47%] items-center">
              <View className={chip}><Text className={chipText}>START</Text></View>
              <TouchableOpacity onPress={() => setShowStart(true)} activeOpacity={0.85} className={box}>
                <Text className={timeText}>{hhmm(start)}</Text>
              </TouchableOpacity>
            </View>

            <View className="w-[47%] items-center">
              <View className={chip}><Text className={chipText}>END</Text></View>
              <TouchableOpacity onPress={() => setShowEnd(true)} activeOpacity={0.85} className={box}>
                <Text className={timeText}>{hhmm(end)}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text className="text-center text-[#6B7280] mt-5 leading-5">
            Please select the date and time period you plan{"\n"}to add Event
          </Text>

          {!isDateInTrip && trip && (
            <Text className="text-red-500 text-center mt-2">
              Date must be between {trip.start_date} and {trip.end_date}
            </Text>
          )}
          {!isRangeValid && (
            <Text className="text-red-500 text-center mt-1">
              End time must be after Start time
            </Text>
          )}
          {!trip && (
            <Text className="text-red-500 text-center mt-2">
              Trip not found for this plan.
            </Text>
          )}
          {!vote_id && (
            <Text className="text-red-500 text-center mt-2">
              Missing vote_id in route params.
            </Text>
          )}
        </View>

        <View className="flex-1" />

        <TouchableOpacity
          className={`w-full mb-8 py-4 rounded-xl items-center ${isFormValid ? "bg-[#294C43]" : "bg-gray-300"}`}
          disabled={!isFormValid}
          onPress={goNext}
          activeOpacity={0.9}
        >
          <Text className="text-white text-lg font-semibold">Next</Text>
        </TouchableOpacity>
      </View>

      {showDate && (
        <DateTimePicker
          mode="date"
          value={date}
          onChange={onPickDate}
          display={Platform.OS === "ios" ? "spinner" : "default"}
        />
      )}
      {showStart && (
        <DateTimePicker
          mode="time"
          value={start}
          onChange={onPickTime("start")}
          is24Hour
          display={Platform.OS === "ios" ? "spinner" : "default"}
        />
      )}
      {showEnd && (
        <DateTimePicker
          mode="time"
          value={end}
          onChange={onPickTime("end")}
          is24Hour
          display={Platform.OS === "ios" ? "spinner" : "default"}
        />
      )}
    </SafeAreaView>
  );
}
