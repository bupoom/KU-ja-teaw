import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  Image,
} from "react-native";
import { useState, useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";

import { mockTripDetails, mockTripMembers } from "@/mock/mockDataComplete";
import Header from "@/components/common/Header";

const PlanSetting = () => {
  const router = useRouter();
  const { plan_id } = useLocalSearchParams<{ plan_id: string }>();
  const user_id = 1;

  // State
  const [planningStatus, setPlanningStatus] = useState<string>("");
  const [tripBudget, setTripBudget] = useState<string>("");
  const [tripCode, setTripCode] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("");

  // Date
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  // Poster
  const [posterUri, setPosterUri] = useState<string | null>(null);

  const canEdit = userRole === "owner";

  useEffect(() => {
    if (plan_id) {
      const trip = mockTripDetails.find(
        (plan) => plan.trip_id === parseInt(plan_id)
      );
      if (trip) {
        const memberData = mockTripMembers.find(
          (member) =>
            member.trip_id === parseInt(plan_id) && member.id === user_id
        );
        if (memberData) setUserRole(memberData.role);

        setPlanningStatus(trip.status_plan || "planning");
        setTripBudget(trip.budget?.toString() || "0");
        setTripCode(trip.trip_code);
        setPassword(trip.trip_password);

        setStartDate(new Date(trip.start_date));
        setEndDate(new Date(trip.end_date));
        setPosterUri(trip.trip_image);
      }
    }
  }, [plan_id]);

  // Handle Date
  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined,
    type: "start" | "end"
  ) => {
    if (selectedDate) {
      if (type === "start") setStartDate(selectedDate);
      else setEndDate(selectedDate);
    }
  };

  // Handle Poster
  const pickPosterImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setPosterUri(result.assets[0].uri);
    }
  };

  const handleBack = () => router.back();

  const handleStatusChange = (status: string) => {
    setPlanningStatus(status);
    console.log(`Updating plan ${plan_id} status to: ${status}`);
  };

  const handleConfirmPassword = () => {
    console.log(`Update password for plan: ${plan_id}`);
  };

  const handleLeaveTrip = () => {
    Alert.alert("Leave Trip", "Are you sure you want to leave this trip?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Leave",
        style: "destructive",
        onPress: () => {
          console.log(`Leaving trip: ${plan_id}`);
          router.back();
        },
      },
    ]);
  };

  const handleDeleteTrip = () => {
    Alert.alert(
      "Delete Trip",
      "Are you sure you want to delete this trip? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            console.log(`Deleting trip: ${plan_id}`);
            router.back();
          },
        },
      ]
    );
  };

  return (
    <View className="flex-1 bg-gray-50">
      <Header title="Setting" onBackPress={handleBack} />

      <ScrollView
        className="flex-1 p-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 50,
        }}
      >
        {/* Set Planning Status */}
        <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <Text className="text-base font-medium mb-3">
            Set Planning Status
          </Text>
          <View className="flex-row">
            <TouchableOpacity
              onPress={() => handleStatusChange("planning")}
              className={`flex-1 py-2 px-4 rounded-l-md ${
                planningStatus === "planning" ? "bg-green_2" : "bg-gray-200"
              }`}
            >
              <Text
                className={`text-center font-medium ${
                  planningStatus === "planning" ? "text-white" : "text-gray-600"
                }`}
              >
                Planning
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleStatusChange("complete")}
              className={`flex-1 py-2 px-4 rounded-r-md ${
                planningStatus === "complete" ? "bg-green_2" : "bg-gray-200"
              }`}
            >
              <Text
                className={`text-center font-medium ${
                  planningStatus === "complete" ? "text-white" : "text-gray-600"
                }`}
              >
                Complete
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Set Trip Budget */}
        <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-base font-medium">Set Trip Budget :</Text>
            <Text className="text-gray-600">Baht</Text>
          </View>
          <TextInput
            value={tripBudget}
            onChangeText={setTripBudget}
            className="border border-gray-300 rounded-md px-3 py-2 text-right"
            keyboardType="numeric"
            placeholder="Enter budget"
          />
        </View>

        {/* Change Date Duration */}
        <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <Text className="text-base font-medium mb-3">
            Change Date Duration
          </Text>
          <TouchableOpacity
            onPress={() => setShowStartPicker(true)}
            className="flex-row items-center mb-3"
          >
            <Ionicons name="calendar-outline" size={20} color="#6B7280" />
            <Text className="ml-2 text-gray-700">
              Start: {startDate ? startDate.toDateString() : "Not set"}
            </Text>
          </TouchableOpacity>
          {showStartPicker && (
            <DateTimePicker
              value={startDate || new Date()}
              mode="date"
              display="default"
              onChange={(e, date) => {
                setShowStartPicker(false);
                handleDateChange(e, date, "start");
              }}
            />
          )}

          <TouchableOpacity
            onPress={() => setShowEndPicker(true)}
            className="flex-row items-center mb-3"
          >
            <Ionicons name="calendar-outline" size={20} color="#6B7280" />
            <Text className="ml-2 text-gray-700">
              End: {endDate ? endDate.toDateString() : "Not set"}
            </Text>
          </TouchableOpacity>
          {showEndPicker && (
            <DateTimePicker
              value={endDate || new Date()}
              mode="date"
              display="default"
              onChange={(e, date) => {
                setShowEndPicker(false);
                handleDateChange(e, date, "end");
              }}
            />
          )}
        </View>

        {/* Change Poster Trip */}
        <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <Text className="text-base font-medium mb-3">Change Poster Trip</Text>
          <TouchableOpacity
            onPress={pickPosterImage}
            className="border-2 border-dashed border-gray-300 rounded-lg p-4 items-center mb-3"
          >
            {posterUri ? (
              <Image
                source={{ uri: posterUri }}
                className="w-full h-40 rounded-lg"
                resizeMode="cover"
              />
            ) : (
              <>
                <Ionicons name="image-outline" size={40} color="#9CA3AF" />
                <Text className="text-gray-400 text-sm mt-2">
                  Upload Pictures to Change Trip Poster
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Trip Code & Password */}
        <View className="bg-white rounded-lg p-4 mb-6 shadow-sm">
          <Text className="text-base font-medium mb-3">
            Trip Code & Password
          </Text>
          <View className="mb-3">
            <Text className="text-sm text-gray-600 mb-1">Code :</Text>
            <Text className="text-base font-mono">{tripCode}</Text>
          </View>
          <View className="mb-3">
            <Text className="text-sm text-gray-600 mb-1">Password :</Text>
            <Text className="text-base">{password}</Text>
          </View>
          <TouchableOpacity
            onPress={handleConfirmPassword}
            className="bg-green_2 py-3 rounded-md"
          >
            <Text className="text-white text-center font-medium">
              Confirm Password
            </Text>
          </TouchableOpacity>
        </View>

        {/* Leave Trip */}
        <TouchableOpacity onPress={handleLeaveTrip} className="mb-3">
          <Text className="text-red-500 text-center font-medium text-base">
            Leave Trip
          </Text>
        </TouchableOpacity>

        {/* Delete Trip */}
        {canEdit && (
          <TouchableOpacity
            onPress={handleDeleteTrip}
            className="bg-red-500 py-4 rounded-md mb-4"
          >
            <Text className="text-white text-center font-medium text-base">
              Delete Trip
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

export default PlanSetting;
