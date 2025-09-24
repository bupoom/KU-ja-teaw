import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  Image,
  Modal,
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
import { Feather } from "@expo/vector-icons";

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
  const [newOwner, setNewOwner] = useState<number>(user_id);
  const [otherMembers, setOtherMembers] = useState<TripMember[]>([]);
  const [showLeaveModal, setShowLeaveModal] = useState(false);

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

        const otherMemberData = mockTripMembers.filter(
          (member) =>
            member.trip_id === parseInt(plan_id) && member.id !== user_id
        );
        setOtherMembers(otherMemberData);

        setPlanningStatus(trip.trip_status || "planning");
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

  const handleConfirmBudget = () => {
    console.log(`Update budget for plan: ${plan_id} : ${tripBudget} Baht`);
    Alert.alert("Success", "Budget updated successfully!");
  };

  const handleConfirmDate = () => {
    if (!startDate || !endDate) {
      Alert.alert("Error", "Please select both start and end dates");
      return;
    }
    if (startDate >= endDate) {
      Alert.alert("Error", "End date must be after start date");
      return;
    }
    console.log(
      `Update dates for plan: ${plan_id} - Start: ${startDate}, End: ${endDate}`
    );
    Alert.alert("Success", "Date duration updated successfully!");
  };

  const handleConfirmPoster = () => {
    if (!posterUri) {
      Alert.alert("Error", "Please select a poster image first");
      return;
    }
    console.log(`Update poster for plan: ${plan_id} : ${posterUri}`);
    Alert.alert("Success", "Trip poster updated successfully!");
  };

  const handleConfirmPassword = () => {
    console.log(`Update password for plan: ${plan_id} : ${password}`);
    Alert.alert("Success", "Password updated successfully!");
  };

  const handleLeaveTrip = () => {
    if (canEdit) {
      setShowLeaveModal(true);
    } else {
      Alert.alert("Leave Trip", "Are you sure you want to leave this trip?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Leave",
          style: "destructive",
          onPress: () => {
            console.log(`Leaving trip: ${plan_id}`);
            router.replace("/tabs/(home)");
          },
        },
      ]);
    }
  };

  const handleConfirmLeave = () => {
    console.log(
      `Transferring ownership to user ${newOwner} and leaving trip: ${plan_id}`
    );
    setShowLeaveModal(false);
    router.replace("/tabs/(home)");
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
            router.replace("/tabs/(home)");
          },
        },
      ]
    );
  };

  return (
    <View className="flex-1 bg-white">
      <Header title="Setting" onBackPress={handleBack} />

      <ScrollView
        className="flex-1 p-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 50,
        }}
      >
        {/* Set Planning Status */}
        <View className="bg-white rounded-lg p-4 mb-4 border border-gray_border">
          <Text className="text-lg font-medium mb-3 ml-2">
            Set Planning Status
          </Text>
          <View className="flex-row">
            <TouchableOpacity
              onPress={() => handleStatusChange("planning")}
              disabled={!canEdit}
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
              disabled={!canEdit}
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
        <View className="bg-white rounded-lg p-4 mb-4 border border-gray_border flex-col">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-black text-lg font-medium ml-2">
              Set Trip Budget :
            </Text>
            <TextInput
              value={tripBudget}
              onChangeText={(text) => {
                const numericText = text.replace(/[^0-9]/g, "");
                setTripBudget(numericText);
              }}
              className="border border-gray_border rounded-lg text-center self-center flex-1 ml-2 mr-2 h-[30px] mb-2"
              keyboardType="numeric"
              placeholder="Enter budget"
              textAlign="center"
              textAlignVertical="center"
              editable={canEdit}
            />
            <Text className="text-black text-lg">Baht</Text>
          </View>

          <TouchableOpacity
            onPress={handleConfirmBudget}
            disabled={!canEdit}
            className="bg-green_2 py-3 rounded-md"
          >
            <Text className="text-white text-center font-medium">
              Confirm Change Budget
            </Text>
          </TouchableOpacity>
        </View>

        {/* Change Date Duration */}
        <View className="bg-white rounded-lg p-4 mb-4 border border-gray_border flex-col">
          <Text className="text-lg font-medium mb-3 ml-2">
            Change Date Duration
          </Text>
          <View className="flex-row mb-3 gap-3">
            <TouchableOpacity
              onPress={() => setShowStartPicker(true)}
              disabled={!canEdit}
              className="flex-1 flex-row items-center border border-gray_border p-3 rounded-lg"
            >
              <Feather name="calendar" size={20} color="#6B7280" />
              <Text className="ml-2 text-gray-700">
                {startDate ? startDate.toDateString() : "Not set"}
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
              disabled={!canEdit}
              className="flex-1 flex-row items-center border border-gray_border p-3 rounded-lg"
            >
              <Feather name="calendar" size={20} color="#6B7280" />
              <Text className="ml-2 text-gray-700">
                {endDate ? endDate.toDateString() : "Not Set"}
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

          <TouchableOpacity
            onPress={handleConfirmDate}
            disabled={!canEdit}
            className="bg-green_2 py-3 rounded-md mb-3"
          >
            <Text className="text-white text-center font-medium">
              Confirm Change Date
            </Text>
          </TouchableOpacity>

          <View className="flex-col items-center justify-center">
            <Text className="text-gray-500 text-xs">
              The new schedule will follow the original date order
            </Text>
            <Text className="text-gray-500 text-xs">
              Dates falling before the original range will be removed
            </Text>
          </View>
        </View>

        {/* Change Poster Trip */}
        <View className="bg-white rounded-lg p-4 mb-4 border border-gray_border">
          <Text className="text-lg font-medium mb-3 ml-2">
            Change Poster Trip
          </Text>
          <TouchableOpacity
            onPress={pickPosterImage}
            disabled={!canEdit}
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
          <TouchableOpacity
            onPress={handleConfirmPoster}
            disabled={!canEdit}
            className="bg-green_2 py-3 rounded-md"
          >
            <Text className="text-white text-center font-medium">
              Confirm Change Poster
            </Text>
          </TouchableOpacity>
        </View>

        {/* Trip Code & Password */}
        {canEdit && (
          <View className="bg-white rounded-lg p-4 mb-4 border border-gray_border">
            <Text className="text-lg font-medium mb-3 ml-2">
              Trip Code & Password
            </Text>
            <View className="mb-3 flex-row items-center">
              <Text className="text-sm text-gray-600 mb-1 font-medium">
                Code :
              </Text>
              <Text className="text-base font-normal ml-2">{tripCode}</Text>
            </View>
            <View className="mb-3">
              <Text className="text-sm text-gray-600 mb-1 font-medium">
                Password :
              </Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                className="border border-gray-300 rounded-lg text-left p-2 font-normal"
                placeholder={password}
                maxLength={20}
              />
            </View>
            <Text className="text-right text-dark_gray text-sm font-sf mb-2">
              {password.length}/20 characters
            </Text>
            <TouchableOpacity
              onPress={handleConfirmPassword}
              className="bg-green_2 py-3 rounded-md"
            >
              <Text className="text-white text-center font-medium">
                Confirm Password
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Leave Trip */}
        <TouchableOpacity
          onPress={handleLeaveTrip}
          className="mb-4 border border-gray_border rounded-lg p-4"
        >
          <Text className="text-red-500 text-center font-medium">
            Leave Trip
          </Text>
        </TouchableOpacity>

        {/* Delete Trip */}
        {canEdit && (
          <TouchableOpacity
            onPress={handleDeleteTrip}
            className="bg-red-500 border border-gray_border rounded-lg p-4"
          >
            <Text className="text-white text-center font-medium">
              Delete Trip
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* Leave Trip Modal */}
      <Modal
        visible={showLeaveModal}
        animationType="slide"
        onRequestClose={() => setShowLeaveModal(false)}
      >
        <View
          className={`flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray_border`}
        >
          <TouchableOpacity onPress={handleBack} className="p-2">
            <Ionicons name="chevron-back" size={24} color="#333" />
          </TouchableOpacity>

          <Text className={`text-lg font-semibold text-black`}>Leave Trip</Text>

          <View className="w-10" />
        </View>

        <View className="flex-col bg-white p-4">
          <View className="flex-col items-start mb-2 mt-2">
            <Text className="text-gray-600">
              Leaving this trip will remove your access.
            </Text>
            <Text className="text-gray-600">
              You&apos;re the trip Owner, Please assign your role before leaving
            </Text>
          </View>

          {/* Select New Owner */}
          <Text className="text-lg font-medium mb-3 ml-2">
            Select New Owner
          </Text>

          <ScrollView className="max-h-60 mb-4">
            {otherMembers.map((member) => (
              <TouchableOpacity
                key={member.id}
                onPress={() => setNewOwner(member.id)}
                className={`flex-row items-center p-3 rounded-lg mb-2 border ${
                  newOwner === member.id
                    ? "border-green_2 bg-green-50"
                    : "border-gray-200"
                }`}
              >
                <Image
                  source={{ uri: member.user_image }}
                  className="w-10 h-10 rounded-full"
                />
                <Text className="text-base font-medium">{member.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Confirm Button */}
          <TouchableOpacity
            onPress={handleConfirmLeave}
            className="bg-red-500 py-4 rounded-lg"
          >
            <Text className="text-white text-center font-medium text-lg">
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default PlanSetting;
