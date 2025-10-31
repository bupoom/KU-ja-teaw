import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { JSX, useState, useEffect } from "react";
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import { updateUserDetails } from "@/service/APIserver/userService";
import { AuthService } from "@/service/authService";
import PoliciesModal from "@/components/modals/PoliciesModals";

export default function ProfileSetupScreen(): JSX.Element {
  const router = useRouter();
  const { userName, userEmail, userPhoto } = useLocalSearchParams<{
    userName?: string;
    userEmail?: string;
    userPhoto?: string;
  }>();

  const [username, setUsername] = useState(userName || "");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [agreedToPolicies, setAgreedToPolicies] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [profileImage, setProfileImage] = useState<string>(userPhoto || "");
  const [selectedImageFile, setSelectedImageFile] =
    useState<ImageFile | null>(null);

  const validatePhone = (text: string) => {
    const cleaned = text.replace(/[\s-\.]/g, "");
    const thaiPhoneRegex = /^(0\d{9}|\+66\d{9})$/;
    if (!thaiPhoneRegex.test(cleaned)) {
      return "Phone number is invalid. Example: 0812345678 or +66812345678";
    }
    return "";
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "We need media library access to select your profile picture."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.9,
    });

    if (!result.canceled && result.assets[0]) {
      const asset = result.assets[0];
      setProfileImage(asset.uri);
      setSelectedImageFile({
        uri: asset.uri,
        type: "image/jpeg",
        name: `profile_${Date.now()}.jpg`,
      });
    }
  };

  const handleGetStart = async () => {
    if (!username.trim()) return Alert.alert("Error", "Please enter username");

    const phoneError = validatePhone(phoneNumber);
    if (phoneError) return Alert.alert("Error", phoneError);

    if (!agreedToPolicies)
      return Alert.alert("Error", "You must agree to our policies");

    try {
      await updateUserDetails({
        username: username.trim(),
        phoneNumber: phoneNumber.trim(),
        selectedImageFile: selectedImageFile || undefined,
      });

      const userData = await AuthService.getUserData();
      if (!userData) throw new Error("No user data found");

      AuthService.saveUserData({
        user_id: userData.user_id,
        name: username,
        phone: phoneNumber,
        email: userData.email,
        profile_picture_link:
          selectedImageFile?.uri ?? userData.profile_picture_link,
      });

      Alert.alert("Success", "Profile setup completed!", [
        { text: "OK", onPress: () => router.push("/tabs/(home)") },
      ]);
    } catch (e) {
      console.error(e);
      Alert.alert("Error", "Network error. Please try again.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingBottom: 60 }}>
        <SafeAreaView className="flex-1 bg-white px-6 pt-8">

          <StatusBar barStyle="dark-content" backgroundColor="white" />

          <Text className="text-center text-4xl text-gray-900 font-semibold mt-24 mb-10">
            Set up your profile
          </Text>

          {/* Profile Image */}
          <View className="items-center mb-12">
            <View className="relative">
              {profileImage ? (
                <Image source={{ uri: profileImage }} className="w-48 h-48 rounded-full" />
              ) : (
                <View className="w-48 h-48 rounded-full bg-teal-900 items-center justify-center">
                  <Feather name="user" size={120} color="white" />
                </View>
              )}

              <TouchableOpacity
                className="absolute bottom-3 right-2 w-10 h-10 rounded-full bg-gray-600 items-center justify-center border-2 border-white"
                onPress={pickImage}
              >
                <Feather name="edit-2" size={14} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Username + Phone */}
          <TextInput
            className="w-full px-4 py-4 border border-gray-200 rounded-xl text-xl text-gray-900"
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />

          <TextInput
            className="w-full px-4 py-4 border border-gray-200 rounded-xl text-xl text-gray-900 mt-6"
            placeholder="Phone Number"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />

          {/* Get Started Button */}
          <TouchableOpacity
            className={`w-full py-4 rounded-lg mt-8 ${
              username.trim() && phoneNumber.trim() && agreedToPolicies
                ? "bg-teal-900"
                : "bg-gray-300"
            }`}
            disabled={!username.trim() || !phoneNumber.trim() || !agreedToPolicies}
            onPress={handleGetStart}
          >
            <Text className="text-center text-white text-2xl font-semibold">
              Get Started
            </Text>
          </TouchableOpacity>

          {/* Policy Checkbox */}
          <View className="flex-row items-center mt-6">
            <TouchableOpacity
              className={`w-5 h-5 rounded border-2 mr-3 items-center justify-center ${
                agreedToPolicies ? "bg-teal-900 border-teal-900" : "border-gray-300 bg-white"
              }`}
              onPress={() =>
                agreedToPolicies ? setAgreedToPolicies(false) : setModalVisible(true)
              }
            >
              {agreedToPolicies && <Feather name="check" size={12} color="white" />}
            </TouchableOpacity>

            <Text className="text-gray-600 text-sm">
              You agree to our{" "}
              <Text className="text-blue-500 underline" onPress={() => setModalVisible(true)}>
                policies
              </Text>
            </Text>
          </View>

          <PoliciesModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            onAccept={() => setAgreedToPolicies(true)}
          />
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
