// app/(tabs)/profile/profile_setting.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  StatusBar,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import Header from "@/components/Header";
import { mockUserDetails } from "@/mock/mockDataComplete";
import { Foundation } from "@expo/vector-icons";

interface UserDetails {
  id: number;
  name: string;
  phone: string;
  user_image: string;
  email: string;
}

const AccountScreen: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<UserDetails | null>(null);
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);

  // Load user data
  const loadUserData = async () => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Use mock data
      const userData = {
        id: 1,
        name: "Mr.Terrific",
        phone: "0654105555",
        email: "terrific@example.com",
        user_image: mockUserDetails[0].user_image,
      };

      setUser(userData);
      setName(userData.name);
      setPhone(userData.phone);
      setProfileImage(userData.user_image);
    } catch (error) {
      Alert.alert("Error", "Failed to load user data");
      console.error("Error loading user data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Request permissions
  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Sorry, we need camera roll permissions to change your profile picture."
      );
      return false;
    }
    return true;
  };

  // Pick image from gallery only
  const pickImage = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick image");
      console.error("Error picking image:", error);
    }
  };

  // Format phone number to keep only digits and limit to 10
  const handlePhoneChange = (text: string) => {
    // Remove all non-digit characters
    const cleanedText = text.replace(/\D/g, "");

    // Limit to 10 digits
    const limitedText = cleanedText.slice(0, 10);

    setPhone(limitedText);
  };

  // Validate phone number
  const validatePhone = (phoneNumber: string): boolean => {
    return phoneNumber.length === 10 && /^\d{10}$/.test(phoneNumber);
  };

  // Save user data
  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert("Error", "Name cannot be empty");
      return;
    }

    if (!phone.trim()) {
      Alert.alert("Error", "Phone number cannot be empty");
      return;
    }

    if (!validatePhone(phone)) {
      Alert.alert("Error", "Phone number must be exactly 10 digits");
      return;
    }

    setSaving(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Saving user data:", {
        name: name.trim(),
        phone: phone.trim(),
        profileImage,
      });

      Alert.alert("Success", "Profile updated successfully", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error) {
      Alert.alert("Error", "Failed to save profile");
      console.error("Error saving profile:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleBackPress = () => {
    router.back();
  };

  useEffect(() => {
    loadUserData();
  }, []);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <StatusBar barStyle="dark-content" />
        <Header title="Account" onBackPress={handleBackPress} />
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#059669" />
          <Text className="mt-4 text-gray-600">Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      <Header title="Account" onBackPress={handleBackPress} />

      <View className="flex-1">
        {/* Profile Image Section with Gradient Background */}
          <View className="items-center px-4 justify-center mt-10">
            <View className="relative mb-4 w-40 h-40">
              {profileImage ? (
                <Image
                  source={{ uri: profileImage }}
                  className="w-40 h-40 rounded-full border-4 border-white shadow-lg"
                />
              ) : (
                <Feather name="user" size={48} color="white" />
              )}
              <TouchableOpacity
                onPress={pickImage}
                className="absolute -bottom-0 -right-2 w-9 h-9 bg-white rounded-full border-2 border-white items-center justify-center shadow-lg"
              >
                <Foundation name="pencil" size={18} color="#374151" />
              </TouchableOpacity>
            </View>
          </View>

        {/* Form Section with White Background */}
        <View className="flex-1 px-6 bg-white mt-6">
          {/* Form Fields */}
          <View className="space-y-6 mt-8">
            {/* Name Field */}
            <View>
              <Text className="text-black font-medium text-base mb-3">
                Name
              </Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Enter your name"
                placeholderTextColor="#9CA3AF"
                className="w-full px-4 py-4 border border-gray-300 rounded-lg text-gray-500 text-base bg-white"
                autoCapitalize="words"
                returnKeyType="next"
              />
            </View>

            {/* Phone Number Field */}
            <View>
              <Text className="text-black font-medium text-base mb-3">
                Phone Number
              </Text>
              <TextInput
                value={phone}
                onChangeText={handlePhoneChange}
                placeholder="Enter your phone number"
                placeholderTextColor="#9CA3AF"
                className="w-full px-4 py-4 border border-gray-300 rounded-lg text-gray-500 text-base bg-white"
                keyboardType="numeric"
                returnKeyType="done"
                maxLength={10}
              />
              <Text className="text-gray-500 text-sm mt-2 text-right">
                {phone.length}/10 digits
              </Text>
            </View>
          </View>

          {/* Save Button */}
          <TouchableOpacity
            onPress={handleSave}
            disabled={saving}
            className={`w-full py-4 rounded-lg mt-8 mb-8 ${
              saving ? "bg-gray-300" : "bg-green_2"
            }`}
          >
              <Text className="text-white font-semibold text-base text-center">
                Save
              </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AccountScreen;
