import { mockTripBoxes } from "@/mock/mockDataComplete";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker, {
    DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
    Platform,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

// --- helpers ---
const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
const hhmm = (d: Date) => `${pad(d.getHours())}:${pad(d.getMinutes())}`;
const ymd = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const ymdNum = (d: Date) => d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();

export default function SelectTime() {
  const { plan_id } = useLocalSearchParams<{ plan_id: string }>();

  // --- look up trip window by plan_id ---
  const trip = useMemo(
    () => mockTripBoxes.find(t => String(t.trip_id) === String(plan_id)),
    [plan_id]
  );

  // parse trip window as Date (local)
  const tripStart = useMemo(
    () => (trip ? new Date(`${trip.start_date}T00:00:00`) : null),
    [trip]
  );
  const tripEnd = useMemo(
    () => (trip ? new Date(`${trip.end_date}T00:00:00`) : null),
    [trip]
  );

  // --- date state (defaults to trip start if available) ---
  const [date, setDate] = useState<Date>(new Date());
  useEffect(() => {
    if (tripStart) setDate(new Date(tripStart));
  }, [tripStart]);

  // --- time states 00:00 → 12:00 ---
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

  // pickers visibility
  const [showDate, setShowDate] = useState(false);
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  // --- validation ---
  const isRangeValid = useMemo(() => end > start, [start, end]);
  const isDateInTrip = useMemo(() => {
    if (!tripStart || !tripEnd) return false; // if trip not found, block Next
    return ymdNum(date) >= ymdNum(tripStart) && ymdNum(date) <= ymdNum(tripEnd);
  }, [date, tripStart, tripEnd]);

  const isFormValid = isRangeValid && isDateInTrip;

  // --- pick handlers ---
  const onPickTime =
    (which: "start" | "end") =>
    (_: DateTimePickerEvent, selected?: Date) => {
      if (Platform.OS !== "ios") {
        which === "start" ? setShowStart(false) : setShowEnd(false);
      }
      if (!selected) return;
      const base = new Date(which === "start" ? start : end);
      base.setHours(selected.getHours(), selected.getMinutes(), 0, 0);
      which === "start" ? setStart(base) : setEnd(base);
    };

  const onPickDate = (_: DateTimePickerEvent, selected?: Date) => {
    if (Platform.OS !== "ios") setShowDate(false);
    if (!selected) return;
    // keep only Y-M-D
    setDate(new Date(selected.getFullYear(), selected.getMonth(), selected.getDate()));
  };

  // --- next ---
  const goNext = () => {
    if (!isFormValid) return;
    router.push({
      pathname: "/plan/[plan_id]/daily_trip/(modals)/add_event/select_transport", 
      params: {
        plan_id: String(plan_id),
        date: ymd(date),        // "YYYY-MM-DD"
        start: hhmm(start),     // "HH:mm"
        end: hhmm(end),         // "HH:mm"
      },
    });
  };

  // --- UI ---
  const chip = "px-4 py-1.5 rounded-full bg-[#294C43]";
  const chipText = "text-white font-bold text-[13px]";
  const box = "mt-2 h-16 w-full rounded-2xl border border-[#D9D9D9] bg-white items-center justify-center";
  const timeText = "text-[20px] font-semibold text-[#0E1820]";

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center px-6 pt-10">
        {/* Clock */}
        <View className="w-16 h-16 rounded-full border border-gray-300 items-center justify-center mb-6">
          <Ionicons name="time-outline" size={28} color="#294C43" />
        </View>

        {/* === DATE (chip + box) === */}
        <View className="w-full px-4 mb-4 items-center">
          <View className={chip}>
            <Text className={chipText}>DATE</Text>
          </View>
          <TouchableOpacity
            onPress={() => setShowDate(true)}
            activeOpacity={0.85}
            className={box}
          >
            <Text className="text-[18px] font-semibold text-[#0E1820]">
              {ymd(date)}
            </Text>
          </TouchableOpacity>

          {/* trip window helper */}
          {trip && (
            <Text className="text-xs text-gray-500 mt-2">
              Trip window: {trip.start_date} → {trip.end_date}
            </Text>
          )}
        </View>

        {/* === START / END columns (chip + box) === */}
        <View className="w-full px-4">
          <View className="flex-row justify-between">
            {/* START */}
            <View className="w-[47%] items-center">
              <View className={chip}>
                <Text className={chipText}>START</Text>
              </View>
              <TouchableOpacity
                onPress={() => setShowStart(true)}
                activeOpacity={0.85}
                className={box}
              >
                <Text className={timeText}>{hhmm(start)}</Text>
              </TouchableOpacity>
            </View>

            {/* END */}
            <View className="w-[47%] items-center">
              <View className={chip}>
                <Text className={chipText}>END</Text>
              </View>
              <TouchableOpacity
                onPress={() => setShowEnd(true)}
                activeOpacity={0.85}
                className={box}
              >
                <Text className={timeText}>{hhmm(end)}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* helper text */}
          <Text className="text-center text-[#6B7280] mt-5 leading-5">
            Please select the date and time period you plan{"\n"}to add Event
          </Text>

          {/* validation errors */}
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
        </View>

        <View className="flex-1" />

        {/* Next */}
        <TouchableOpacity
          className={`w-full mb-8 py-4 rounded-xl items-center ${
            isFormValid ? "bg-[#294C43]" : "bg-gray-300"
          }`}
          disabled={!isFormValid}
          onPress={goNext}
          activeOpacity={0.9}
        >
          <Text className="text-white text-lg font-semibold">Next</Text>
        </TouchableOpacity>
      </View>

      {/* Native pickers */}
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
