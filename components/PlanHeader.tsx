// components/TripHeader.tsx
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRouter, useSegments } from "expo-router";
import { mockTripBoxes } from "@/mock/mockDataComplete";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { truncateText } from "@/util/truncateText";
import { formatDateRange } from "@/util/formatFucntion/formatDate&TimeRange";

function PlanHeader({ planId }: { planId: string }) {
    const router = useRouter();
    const segments = useSegments() as string[];

    // หาข้อมูล trip จาก mockTripBox โดยใช้ planId
    const tripData = mockTripBoxes.find(
        trip => trip.trip_id === parseInt(planId)
    );

    if (!tripData) {
        return null; // หรือแสดง error state
    }

    const handelHome = () => {
        router.replace("/tabs/(home)");
    };

    const handleSettingPlan = () => {
        router.push(`/plan/${planId}/setting_plan`);
    };

    // กำหนดว่า tab ไหนกำลัง active อยู่
    const getActiveTab = () => {
        if (segments.length === 2) return "overview";
        if (segments.includes("daily_trip")) return "daily_trip";
        if (segments.includes("group")) return "group";
        return "overview";
    };

    const activeTab = getActiveTab();

    const navigateToTab = (tab: string) => {
        switch (tab) {
            case "overview":
                router.push(`/plan/${planId}`);
                break;
            case "daily_trip":
                router.push(`/plan/${planId}/daily_trip`);
                break;
            case "group":
                router.push(`/plan/${planId}/group`);
                break;
        }
    };

    return (
        <View className="bg-white">
            {/* Header Image Section */}
            <View className="relative">
                <Image
                    source={{ uri: tripData.trip_image }}
                    className="w-full h-96"
                    resizeMode="cover"
                />

                {/* Overlay with trip info */}
                <View className="absolute bottom-0 left-0 right-0 bg-black/50 p-5 mr-20 mb-4 ml-4 rounded-xl">
                    <View className="flex">
                        <Text className="text-2xl font-bold text-white mb-2">
                            {truncateText(tripData.trip_name, 30)}
                        </Text>
                        <View className="flex-row items-start">
                            <Feather
                                name="calendar"
                                size={16}
                                color="#ffffff"
                            />
                            <Text className="text-sm text-white mb-2 ml-2">
                                {formatDateRange(tripData.start_date, tripData.end_date)}
                            </Text>
                        </View>
                        <View className="flex-row items-start">
                            <Feather name="users" size={16} color="#ffffff" />
                            <Text className="text-sm text-white ml-2">
                                {tripData.member_count} Persons
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Navigation Icons */}
                <View className="absolute top-16 w-full">
                    <View className="flex-row justify-between pr-6 pl-6">
                        <TouchableOpacity
                            className="w-12 h-12 rounded-full bg-black/50 justify-center items-center"
                            onPress={handelHome}
                        >
                            <Feather name="home" size={26} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="w-12 h-12 rounded-full bg-black/50 justify-center items-center"
                            onPress={handleSettingPlan}
                        >
                            <Ionicons
                                name="settings-sharp"
                                size={26}
                                color="white"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Custom Tabs */}
            <View className="flex-row bg-white px-5 py-4 border-b border-gray-100">
                <TouchableOpacity
                    className={`flex-1 py-3 px-5 rounded-full items-center mx-1 ${
                        activeTab === "overview" ? "bg-green_2" : ""
                    }`}
                    onPress={() => navigateToTab("overview")}
                >
                    <Text
                        className={`text-base font-medium ${
                            activeTab === "overview"
                                ? "text-white"
                                : "text-gray-600"
                        }`}
                    >
                        Overview
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className={`flex-1 py-3 px-5 rounded-full items-center mx-1 ${
                        activeTab === "daily_trip" ? "bg-green_2" : ""
                    }`}
                    onPress={() => navigateToTab("daily_trip")}
                >
                    <Text
                        className={`text-base font-medium ${
                            activeTab === "daily_trip"
                                ? "text-white"
                                : "text-gray-600"
                        }`}
                    >
                        Daily Trip
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className={`flex-1 py-3 px-5 rounded-full items-center mx-1 ${
                        activeTab === "group" ? "bg-green_2" : ""
                    }`}
                    onPress={() => navigateToTab("group")}
                >
                    <Text
                        className={`text-base font-medium ${
                            activeTab === "group"
                                ? "text-white"
                                : "text-gray-600"
                        }`}
                    >
                        Group
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default PlanHeader;