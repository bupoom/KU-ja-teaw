import { get_trip_detail } from "@/service/APIserver/tripApi";
import { formatDateRange } from "@/util/formatFucntion/formatDate&TimeRange";
import { truncateText } from "@/util/truncateText";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter, useSegments } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

function PlanHeader({ planId }: { planId: string }) {
  const router = useRouter();
  const segments = useSegments() as string[];
  const [tripData, setTripData] = useState<TripDetails | null>(null);
  const [unreadCount, setUnreadCount] = useState<number>(1);
  const trip_id = parseInt(planId);

  const fetchTrip = async () => {
    try {
      const trip = await get_trip_detail(trip_id);
      setTripData(trip);
    } catch (err) {
      console.error("Failed to fetch trip detail:", err);
    }
  };

  // const fetchNotificationStatus = async () => {
  //   try {
  //     const res = await get_notification_status(user_id, trip_id);
  //     // ตัวอย่าง response: { "unread_count": 5 }
  //     setUnreadCount(res.unread_count || 0);
  //   } catch (err) {
  //     console.error("Failed to fetch notification status:", err);
  //   }
  // };

  useEffect(() => {
    fetchTrip();
    // fetchNotificationStatus();
  }, [trip_id]);



  if (!tripData) {
    return null;
  }

  const handelHome = () => {
    router.dismissAll();
    router.replace("/tabs/(home)");
  };

  const handleSettingPlan = () => {
    router.push(`/plan/${planId}/setting_plan`);
  };

  const handleNotificationPress = () => {
    setUnreadCount(0);
    router.push({
        pathname: `/plan/[plan_id]/notification`,
        params: {
            plan_id: planId,
        }
    });
  };

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
          className="w-full h-80"
          resizeMode="cover"
        />

        {/* Top Navigation Icons */}
        <View className="absolute top-0 left-0 right-0 flex-row justify-between items-center px-5 pt-12">
          <TouchableOpacity
            className="w-12 h-12 rounded-2xl bg-black/80 backdrop-blur-sm justify-center items-center"
            onPress={handelHome}
          >
            <Feather name="home" size={24} color="white" />
          </TouchableOpacity>

          <View className="flex-row gap-3">
            <TouchableOpacity
              className="w-12 h-12 rounded-2xl bg-black/80 backdrop-blur-sm justify-center items-center relative"
              onPress={handleNotificationPress}
            >
              <Ionicons name="notifications-outline" size={24} color="white" />
              {unreadCount > 0 && (
                <View className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              className="w-12 h-12 rounded-2xl bg-black/80 backdrop-blur-sm justify-center items-center"
              onPress={handleSettingPlan}
            >
              <Ionicons name="settings-sharp" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Trip Info Overlay */}
        <View className="absolute bottom-6 right-0 left-0 px-5">
          <View className="bg-black/80 backdrop-blur-md px-5 py-4 rounded-2xl">
            <Text className="text-2xl font-bold text-white mb-3">
              {truncateText(tripData.trip_name, 30)}
            </Text>

            <View className="flex-row items-center mb-2">
              <Feather name="calendar" size={16} color="#ffffff" />
              <Text className="text-sm text-white ml-2">
                {formatDateRange(tripData.start_date, tripData.end_date)}
              </Text>
            </View>

            <View className="flex-row items-center">
              <Feather name="users" size={16} color="#ffffff" />
              <Text className="text-sm text-white ml-2">
                {tripData.group_members} Persons
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Tabs */}
      <View className="flex-row bg-white px-5 py-4 border-b border-gray-100">
        {["overview", "daily_trip", "group"].map((tab) => (
          <TouchableOpacity
            key={tab}
            className={`flex-1 py-3 px-5 rounded-full items-center mx-1 ${
              activeTab === tab ? "bg-green_2" : ""
            }`}
            onPress={() => navigateToTab(tab)}
          >
            <Text
              className={`text-base font-medium ${
                activeTab === tab ? "text-white" : "text-gray-600"
              }`}
            >
              {tab === "overview"
                ? "Overview"
                : tab === "daily_trip"
                  ? "Daily Trip"
                  : "Group"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

export default PlanHeader;
