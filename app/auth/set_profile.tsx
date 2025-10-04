import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { JSX, useState } from "react";
import {
    Alert,
    Image,
    Modal,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { updateUserDetails } from "@/service/APIserver/userService";
import * as ImagePicker from "expo-image-picker";
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

    const requestPermissions = async () => {
        const { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            Alert.alert(
                "Permission Required",
                "Sorry, we need camera roll permissions to change your profile picture."
            );
            return false;
        }
        return true;
    };

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
                const asset = result.assets[0];
                setProfileImage(asset.uri);

                const newImageFile = {
                    uri: asset.uri,
                    type: "image/jpeg",
                    name: `profile_${Date.now()}.jpg`,
                };

                setSelectedImageFile(newImageFile);
                console.log("Selected image:", newImageFile);
            }
        } catch (error) {
            Alert.alert("Error", "Failed to pick image");
            console.error("Error picking image:", error);
        }
    };

    const handleGetStart = async () => {
        const errorPhoneNumber = validatePhone(phoneNumber);
        if (!username.trim()) {
            Alert.alert("Error", "Please enter your username");
            return;
        }
        if (errorPhoneNumber) {
            Alert.alert("Error", errorPhoneNumber);
            return;
        }
        if (!agreedToPolicies) {
            Alert.alert(
                "Error",
                "You must agree to the policies before continuing"
            );
            return;
        }

        try {
            console.log("🔄 Updating user profile...");

            const response = await updateUserDetails({
                username: username.trim(),
                phoneNumber: phoneNumber.trim(),
                selectedImageFile: selectedImageFile || undefined,
            });

            console.log("✅ Profile updated successfully:", response);
            const userData = await AuthService.getUserData();
            if (!userData) {
                throw new Error("No user data found in AuthService");
            }
            const newUserData: UserDetails = {
                user_id: userData.user_id,
                name: username,
                phone: phoneNumber,
                email: userData.email,
                profile_picture_link:
                    selectedImageFile?.uri ?? userData.profile_picture_link,
            };
            AuthService.saveUserData(newUserData);
            Alert.alert("Success", "Profile setup completed!", [
                {
                    text: "OK",
                    onPress: () => router.push("/tabs/(home)"),
                },
            ]);
        } catch (error) {
            console.error("❌ Registration error:", error);
            Alert.alert("Error", "Network error. Please try again.");
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar barStyle="dark-content" backgroundColor="white" />

            <View className="px-6 pt-8">
                <Text className="text-center text-4xl text-gray-900 font-semibold mt-32 mb-12">
                    Set up your profile
                </Text>

                {userName && (
                    <View className="mb-4 p-4 bg-gray-100 rounded-lg">
                        <Text className="text-sm text-gray-600">
                            Welcome, {userName}!
                        </Text>
                        <Text className="text-xs text-gray-500">
                            {userEmail}
                        </Text>
                    </View>
                )}

                <View className="items-center mb-12">
                    <View className="relative">
                        {profileImage ? (
                            <Image
                                source={{ uri: profileImage }}
                                className="w-48 h-48 rounded-full"
                                style={{ width: 192, height: 192 }}
                                defaultSource={{
                                    uri: "https://via.placeholder.com/192x192/0f766e/ffffff?text=User",
                                }}
                            />
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

                        {selectedImageFile && (
                            <View className="absolute top-2 right-2 w-6 h-6 rounded-full bg-green-500 items-center justify-center">
                                <Feather name="check" size={12} color="white" />
                            </View>
                        )}
                    </View>
                </View>

                <View className="space-y-4">
                    <View>
                        <TextInput
                            className="w-full px-4 py-4 border border-gray-200 rounded-xl text-xl text-gray-900"
                            placeholder="Username"
                            placeholderTextColor="#9CA3AF"
                            value={username}
                            onChangeText={setUsername}
                            autoCapitalize="none"
                        />
                        {userName && (
                            <Text className="text-xs text-gray-500 mt-1 ml-2">
                                Suggested from your Google profile
                            </Text>
                        )}
                    </View>

                    <View>
                        <TextInput
                            className="w-full px-4 py-4 border border-gray-200 rounded-xl text-xl text-gray-900 mt-6"
                            placeholder="Phone Number"
                            placeholderTextColor="#9CA3AF"
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                            keyboardType="phone-pad"
                        />
                    </View>
                </View>

                <TouchableOpacity
                    className={`w-full py-4 rounded-lg mt-8 ${
                        username.trim() &&
                        phoneNumber.trim() &&
                        agreedToPolicies
                            ? "bg-teal-900"
                            : "bg-gray-300"
                    }`}
                    onPress={handleGetStart}
                    disabled={
                        !username.trim() ||
                        !phoneNumber.trim() ||
                        !agreedToPolicies
                    }
                >
                    <Text className="text-center text-white text-2xl font-semibold">
                        Get Started
                    </Text>
                </TouchableOpacity>

                <View className="flex-row items-center mt-6 ml-48">
                    <TouchableOpacity
                        className={`w-5 h-5 rounded border-2 mr-3 items-center justify-center ${
                            agreedToPolicies
                                ? "bg-teal-900 border-teal-900"
                                : "border-gray-300 bg-white"
                        }`}
                        onPress={() => {
                            if (agreedToPolicies) {
                                setAgreedToPolicies(false);
                            } else {
                                setModalVisible(true);
                            }
                        }}
                    >
                        {agreedToPolicies && (
                            <Feather name="check" size={12} color="white" />
                        )}
                    </TouchableOpacity>
                    <Text className="text-gray-600 text-sm">
                        you have agree to our{" "}
                        <Text
                            className="text-blue-500 underline"
                            onPress={() => setModalVisible(true)}
                        >
                            policies
                        </Text>
                    </Text>
                </View>

                <PoliciesModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    onAccept={() => setAgreedToPolicies(true)}
                />
            </View>
        </SafeAreaView>
    );
}
