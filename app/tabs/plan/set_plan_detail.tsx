import Header from "@/components/common/Header";
import NextButton from "@/components/common/NextButton";
import generateTripCode from "@/util/generateTripCode";
import { Feather } from "@expo/vector-icons";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";

const MAX_NAME = 20;

export default function SetPlanDetail() {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);
  const [posterUri, setPosterUri] = useState<string | null>(null);

  const fmt_start = (d?: Date | null) =>
    d ? `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}` : "Select Start Date";

  const fmt_end = (d?: Date | null) =>
    d ? `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}` : "Select End Date";

  const pickPoster = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") return Alert.alert("Permission needed", "Please allow photo permissions.");
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.9,
      mediaTypes: ["images"],
    });
    if (!result.canceled) setPosterUri(result.assets[0].uri);
  };

  const validate = () => {
    if (!name.trim()) return "Please enter trip name.";
    if (name.trim().length > MAX_NAME) return `Trip name must be ≤ ${MAX_NAME} characters.`;
    if (!startDate || !endDate) return "Please select start and end dates.";
    if (startDate > endDate) return "End date must be after start date.";
    const diff = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    if (diff > 30) return "Trip duration cannot be more than 30 days.";
    return null;
  };

  const onNext = () => {
    const validationError = validate();
    if (validationError) return Alert.alert("Invalid input", validationError);

    router.push({
      pathname: "/tabs/plan/set_plan_code",
      params: {
        name,
        start: startDate?.toISOString() ?? "",
        end: endDate?.toISOString() ?? "",
        posterUri: posterUri ?? "",
        tripCode: generateTripCode(),
      },
    });
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Header title="Create Trip" onBackPress={() => router.back()} />

      <ScrollView
        className="flex-1 px-6 py-6"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-[20px] font-sf-bold text-black mb-1">Plan a new trip</Text>
        <Text className="text-dark_gray text-base">It's a beginning of your journey</Text>

        {/* Trip Name */}
        <View className="bg-white border border-gray_border rounded-lg p-4 mt-5 mb-4">
          <Text className="text-black font-sf-semibold mb-2 text-[16px]">Trip Name</Text>
          <View className="border border-gray_border rounded-lg px-4">
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Enter Your Trip Name"
              placeholderTextColor="#9CA3AF"
              maxLength={MAX_NAME}
              className="text-black font-medium py-2"
            />
          </View>
          <Text className="text-right text-dark_gray text-xs mt-2">{name.length}/{MAX_NAME} characters</Text>
        </View>

        {/* Date Duration */}
        <View className="bg-white border border-gray_border rounded-lg p-4 mb-4">
          <Text className="text-black font-sf-semibold mb-2 text-[16px]">Date Duration</Text>
          <View className="flex-row gap-3">
            <TouchableOpacity onPress={() => setShowStart(true)} className="flex-1 border border-gray_border rounded-lg px-4 py-3 flex-row items-center">
              <Feather name="calendar" size={16} color="#9CA3AF" />
              <Text className={`ml-2 ${startDate ? "text-black" : "text-gray-400"} font-medium`}>
                {fmt_start(startDate)}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setShowEnd(true)} className="flex-1 border border-gray_border rounded-lg px-4 py-3 flex-row items-center">
              <Feather name="calendar" size={16} color="#9CA3AF" />
              <Text className={`ml-2 ${endDate ? "text-black" : "text-gray-400"} font-medium`}>
                {fmt_end(endDate)}
              </Text>
            </TouchableOpacity>
          </View>

          {showStart && <DateTimePicker value={startDate ?? new Date()} mode="date" onChange={(_, d) => { setShowStart(false); d && setStartDate(d); }} />}
          {showEnd && <DateTimePicker value={endDate ?? new Date()} mode="date" onChange={(_, d) => { setShowEnd(false); d && setEndDate(d); }} />}
        </View>

        {/* Poster */}
        <View className="bg-white border border-gray_border rounded-lg p-4 mb-5">
          <Text className="text-black font-sf-semibold text-[16px] mb-2">Poster Trip</Text>
          <TouchableOpacity onPress={pickPoster} className="rounded-2xl border border-dashed border-gray_border p-5 items-center">
            {posterUri ? (
              <Image source={{ uri: posterUri }} className="w-full h-40 rounded-xl" resizeMode="cover" />
            ) : (
              <View className="items-center">
                <Feather name="image" size={28} color="#9CA3AF" />
                <Text className="text-gray-400 mt-2 text-center">Upload Picture to be your Trip Poster</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <NextButton onPress={onNext} disabled={!!validate()} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
