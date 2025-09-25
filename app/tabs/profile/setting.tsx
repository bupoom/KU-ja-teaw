// app/(tabs)/profile/setting.tsx
import Header from "@/components/common/Header";
import { AuthService } from "@/service/authService";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  StatusBar,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const SettingsScreen: React.FC = () => {
  const router = useRouter();

  // Original saved values
  const [savedNotificationEnabled, setSavedNotificationEnabled] =
    useState<boolean>(true);
  const [savedNotificationDays, setSavedNotificationDays] = useState<number>(1);

  // Current editing values
  const [notificationEnabled, setNotificationEnabled] = useState<boolean>(true);
  const [notificationDays, setNotificationDays] = useState<string>("1");
  const [hasChanges, setHasChanges] = useState<boolean>(false);

  // Initialize values on component mount
  useEffect(() => {
    // Here you would typically load saved settings from storage/API
    const initialNotificationEnabled = true;
    const initialNotificationDays = 1;
    // เดี๋ยวตอนเชื่อมกับ backend น่าจะดึงค่ามาด้วย

    // set ค่าทุกอย่างเป็นค่าที่ดึงมาก่อน
    setSavedNotificationEnabled(initialNotificationEnabled);
    setSavedNotificationDays(initialNotificationDays);
    setNotificationEnabled(initialNotificationEnabled);
    setNotificationDays(initialNotificationDays.toString());
  }, []);

  const handleBackPress = () => {
    router.back();
  };

  const handleNotificationToggle = (value: boolean) => {
    setNotificationEnabled(value);

    // If disabling notifications while editing, reset to saved values and clear changes
    if (!value && hasChanges) {
      setNotificationDays(savedNotificationDays.toString());
      setHasChanges(false);
    }
  };

  const handleDaysChange = (text: string) => {
    // Allow any input while typing, including empty string
    const numericValue = text.replace(/[^0-9]/g, "");
    setNotificationDays(numericValue);

    // เช็ค changes เฉพาะการแก้ไขวันเท่านั้น
    checkForDaysChanges(numericValue);
  };

  const checkForDaysChanges = (currentDays: string) => {
    const daysAsNumber = currentDays === "" ? 0 : parseInt(currentDays);
    const hasDaysChange = daysAsNumber !== savedNotificationDays;

    // ปุ่ม Save จะขึ้นเฉพาะตอนแก้ไขวันเท่านั้น
    setHasChanges(hasDaysChange);
  };

  const validateAndSubmit = () => {
    const daysAsNumber =
      notificationDays === "" ? 0 : parseInt(notificationDays);

    if (daysAsNumber < 1 || daysAsNumber > 30) {
      Alert.alert(
        "Invalid Input",
        "Please enter a number between 1 and 30 days"
      );
      return;
    }

    Alert.alert(
      "Save Settings",
      `Save notification settings?\n• Notifications: ${notificationEnabled ? "Enabled" : "Disabled"}\n• Notify ${daysAsNumber} day${daysAsNumber > 1 ? "s" : ""} before trip`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Save",
          onPress: () => {
            // Update saved values - บันทึกทั้ง notification enabled และ days
            setSavedNotificationEnabled(notificationEnabled);
            setSavedNotificationDays(daysAsNumber);
            setNotificationDays(daysAsNumber.toString()); // Ensure clean display
            setHasChanges(false);

            console.log("Settings saved:", {
              notificationEnabled,
              notificationDays: daysAsNumber,
            });

            Alert.alert("Success", "Settings saved successfully");
          },
        },
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            console.log("User logged out");
            await AuthService.logout();
            router.replace("/auth");
          } catch (error) {
            console.error("Logout error:", error);
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      <Header title="Setting" onBackPress={handleBackPress} />

      <View className="flex-1 px-4 py-6">
        {/* Notification Section */}
        <View className="bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-sm">
          {/* Notification Toggle */}
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-black font-medium text-xl">Notification</Text>
            <Switch
              value={notificationEnabled}
              onValueChange={handleNotificationToggle}
              trackColor={{ false: "#D1D5DB", true: "#284D44" }}
              thumbColor={notificationEnabled ? "#FFFFFF" : "#FFFFFF"}
            />
          </View>

          {/* Notification Before Settings */}
          <View className="flex-row items-center">
            <View className="flex-row items-center mr-4">
              <Feather
                name="clock"
                size={16}
                color={notificationEnabled ? "#374151" : "#9CA3AF"}
              />
              <Text
                className={`ml-2 text-base ${
                  notificationEnabled ? "text-gray-700" : "text-gray-400"
                }`}
              >
                Notification Before :
              </Text>
            </View>

            <View className="flex-row items-center">
              {/* Days Input */}
              <TextInput
                value={notificationDays}
                onChangeText={handleDaysChange}
                placeholder="1"
                placeholderTextColor="#9CA3AF"
                editable={notificationEnabled}
                keyboardType="numeric"
                textAlign="center"
                textAlignVertical="center"
                maxLength={2}
                className={`w-12 h-10 text-center border rounded text-sm font-medium ${
                  notificationEnabled
                    ? "border-gray-300 bg-white text-black"
                    : "border-gray-200 bg-gray-50 text-gray-400"
                }`}
              />

              {/* Day Label */}
              <Text
                className={`ml-2 text-base ${
                  notificationEnabled ? "text-gray-700" : "text-gray-400"
                }`}
              >
                Day
              </Text>
            </View>
          </View>

          {/* Save Button - แสดงเฉพาะตอนแก้ไขวัน */}
          {hasChanges && (
            <TouchableOpacity
              onPress={validateAndSubmit}
              className="bg-green_2 py-3 px-4 rounded-lg mt-5"
            >
              <Text className="text-white font-semibold text-center">
                Save Changes
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Logout Section */}
        <TouchableOpacity
          onPress={handleLogout}
          className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
        >
          <View className="flex-row items-center justify-between">
            <Text className="text-black font-medium text-xl">Logout</Text>
            <Feather name="log-out" size={20} color="#374151" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            AuthService.refreshAccessToken()
          }}
          className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
        >
          <View className="flex-row items-center justify-between">
            <Text className="text-black font-medium text-xl">test_refresh_token</Text>
            <Feather name="log-out" size={20} color="#374151" />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;
