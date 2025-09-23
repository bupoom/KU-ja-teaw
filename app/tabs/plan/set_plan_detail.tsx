import Header from "@/components/common/Header";
import NextButton from "@/components/common/NextButton";
import generateTripCode from "@/util/generateTripCode";
import { Feather } from "@expo/vector-icons";
import DateTimePicker, {
    DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
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
} from "react-native";

const MAX_NAME = 20;

export default function SetPlanDetail() {
    const [name, setName] = useState("");
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [showStart, setShowStart] = useState(false);
    const [showEnd, setShowEnd] = useState(false);
    const [posterUri, setPosterUri] = useState<string | null>(null);

    const fmt = (d?: Date | null) =>
        d
            ? d.toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
              })
            : "Select Date";

    const onPickStart = (_: DateTimePickerEvent, d?: Date) => {
        setShowStart(false);
        if (!d) return;
        // 1) เซ็ต startDate ก่อน
        setStartDate(d);
        // 2) ถ้า endDate มีค่า → เช็ค logic
        if (endDate && d > endDate) {
            Alert.alert(
                "Invalid date range",
                "Start date cannot be after end date."
            );
        }
    };
    const onPickEnd = (_: DateTimePickerEvent, d?: Date) => {
        setShowEnd(false);
        if (!d) return;
        // 1) เซ็ต endDate ก่อน
        setEndDate(d);
        // 2) ถ้า startDate มีค่า → เช็ค logic
        if (startDate && startDate > d) {
            Alert.alert(
                "Invalid date range",
                "End date must be after start date."
            );
        }
    };

    const pickPoster = async () => {
        const { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Permission needed", "Please allow photo permissions.");
            return;
        }
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
        if (name.trim().length > MAX_NAME)
            return `Trip name must be ≤ ${MAX_NAME} characters.`;
        if (!startDate || !endDate) return "Please select start and end dates.";
        if (startDate > endDate) return "End date must be after start date.";
        return null;
    };

    // ฟังก์ชันสำหรับเช็คว่าควร disable button หรือไม่
    const isNextDisabled = () => {
        return validate() !== null;
    };

    const onNext = () => {
        const validationError = validate();
        if (validationError) {
            Alert.alert("Invalid input", validationError);
            return;
        }

        router.push({
            pathname: "/tabs/plan/set_plan_code",
            params: {
                name: name ?? "",
                start: startDate?.toISOString() ?? "",
                end: endDate?.toISOString() ?? "",
                posterUri: posterUri ?? "", // ส่ง URI ของรูป (string) ก็พอ แล้วหน้า set_plan_code เอา URI นั้นไปส่งต่อให้ backend ทีเดียว
                tripCode: generateTripCode(),
            },
        });
    };

    return (
        <View className="flex-1 bg-white">
            {/* Header */}
            <Header title="Create Trip" onBackPress={() => router.back()} />

            <View className="flex-1 px-6 py-6">
                {/* Title + subtitle */}
                <Text className="text-[20px] font-sf-bold text-black mb-1">
                    Plan a new trip
                </Text>
                <Text className="text-dark_gray text-base">
                    It&apos;s a beginning of your journey
                </Text>

                {/* Trip Name */}
                <View className="bg-white border border-gray_border rounded-2xl p-4 mt-5 mb-4">
                    <Text className="text-black font-sf-semibold mb-2 text-[16px]">
                        Trip Name
                    </Text>

                    {/* ทำให้ขนาด/ขอบเหมือนปุ่มเลือกวัน: border + rounded-2xl + px-4 py-3 */}
                    <View className="border border-gray_border rounded-2xl px-4">
                        <TextInput
                            value={name}
                            onChangeText={setName}
                            placeholder="Enter Your Trip Name"
                            maxLength={MAX_NAME}
                            className="text-black"
                        />
                    </View>

                    <Text className="text-right text-dark_gray text-xs mt-2">
                        {name.length}/{MAX_NAME} characters
                    </Text>
                </View>

                {/* Date Duration */}
                <View className="bg-white border border-gray_border rounded-2xl p-4 mb-4">
                    <Text className="text-black font-sf-semibold mb-2 text-[16px]">
                        Date Duration
                    </Text>

                    <View className="flex-row gap-3">
                        {/* Start */}
                        <TouchableOpacity
                            onPress={() => setShowStart(true)}
                            className="flex-1 border border-gray_border rounded-2xl px-4 py-3 flex-row items-center"
                            activeOpacity={0.8}
                        >
                            <Feather
                                name="calendar"
                                size={16}
                                color="#9CA3AF"
                            />
                            <Text
                                className={`ml-2 ${startDate ? "text-black" : "text-gray-400"}`}
                            >
                                {fmt(startDate)}
                            </Text>
                        </TouchableOpacity>

                        {/* End */}
                        <TouchableOpacity
                            onPress={() => setShowEnd(true)}
                            className="flex-1 border border-gray_border rounded-2xl px-4 py-3 flex-row items-center"
                            activeOpacity={0.8}
                        >
                            <Feather
                                name="calendar"
                                size={16}
                                color="#9CA3AF"
                            />
                            <Text
                                className={`ml-2 ${endDate ? "text-black" : "text-gray-400"}`}
                            >
                                {fmt(endDate)}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Date pickers */}
                    {showStart && (
                        <DateTimePicker
                            value={startDate ?? new Date()}
                            mode="date"
                            display={Platform.select({
                                ios: "spinner",
                                android: "default",
                            })}
                            onChange={onPickStart}
                        />
                    )}
                    {showEnd && (
                        <DateTimePicker
                            value={endDate ?? new Date()}
                            mode="date"
                            display={Platform.select({
                                ios: "spinner",
                                android: "default",
                            })}
                            onChange={onPickEnd}
                        />
                    )}
                </View>

                {/* Poster Trip */}
                <View className="bg-white border border-gray_border rounded-2xl p-4 mb-5">
                    <Text className="text-black font-sf-semibold text-[16px] mb-2">
                        Poster Trip
                    </Text>

                    <TouchableOpacity
                        onPress={pickPoster}
                        className="rounded-2xl border border-dashed border-gray_border p-5 items-center justify-center"
                        activeOpacity={0.8}
                    >
                        {posterUri ? (
                            <Image
                                source={{ uri: posterUri }}
                                className="w-full h-40 rounded-xl"
                                resizeMode="cover"
                            />
                        ) : (
                            <View className="items-center">
                                <Feather
                                    name="image"
                                    size={28}
                                    color="#9CA3AF"
                                />
                                <Text className="text-gray-400 mt-2 text-center">
                                    Upload Picture to be your Trip Poster
                                </Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>

                {/* Next Button */}
                <NextButton onPress={onNext} disabled={isNextDisabled()} />
            </View>
        </View>
    );
}
