import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
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

// ✅ เพิ่ม interface สำหรับรูปภาพ
interface ImageFile {
    uri: string;
    type: string;
    name: string;
}

const ProfileSetupScreen = () => {
    const router = useRouter();
    const { userName, userEmail, userPhoto } = useLocalSearchParams<{
        userName?: string;
        userEmail?: string;
        userPhoto?: string;
    }>();

    const [username, setUsername] = useState(userName || ""); // ✅ ใช้ค่าจาก Google เป็นค่าเริ่มต้น
    const [phoneNumber, setPhoneNumber] = useState("");
    const [agreedToPolicies, setAgreedToPolicies] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [profileImage, setProfileImage] = useState<string>(userPhoto || ""); // ✅ ใช้รูปจาก Google
    const [selectedImageFile, setSelectedImageFile] =
        useState<ImageFile | null>(null); // ✅ เพิ่ม state สำหรับไฟล์

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

                // ✅ สร้าง object ก่อน
                const newImageFile = {
                    uri: asset.uri,
                    type: "image/jpeg",
                    name: `profile_${Date.now()}.jpg`,
                };

                // ✅ ตั้งค่าและ log object เดียวกัน
                setSelectedImageFile(newImageFile);
                console.log("Selected image:", newImageFile); // ← ตรงนี้จะแสดงค่าที่ถูก
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

            // ✅ ส่งรูปภาพที่เลือกไปด้วย (ถ้ามี)
            const response = await updateUserDetails({
                username: username.trim(),
                phoneNumber: phoneNumber.trim(),
                selectedImageFile: selectedImageFile || undefined, // object ที่มี uri, type, name
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
                    selectedImageFile?.uri ?? userData.profile_picture_link ,
                // ถ้าไม่มีรูปใหม่ → เก็บรูปเดิมไว้
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

            {/* Header */}
            <View className="px-6 pt-8">
                <Text className="text-center text-4xl text-gray-900 font-semibold mt-32 mb-12">
                    Set up your profile
                </Text>

                {/* แสดงข้อมูลจาก Google */}
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

                {/* Profile Avatar */}
                <View className="items-center mb-12">
                    <View className="relative">
                        {profileImage ? (
                            <Image
                                source={{ uri: profileImage }}
                                className="w-48 h-48 rounded-full"
                                style={{ width: 192, height: 192 }}
                                // ✅ เพิ่ม fallback กรณีโหลดรูปไม่ได้
                                defaultSource={{
                                    uri: "https://via.placeholder.com/192x192/0f766e/ffffff?text=User",
                                }}
                            />
                        ) : (
                            <View className="w-48 h-48 rounded-full bg-teal-900 items-center justify-center">
                                <Feather name="user" size={120} color="white" />
                            </View>
                        )}

                        {/* Edit icon */}
                        <TouchableOpacity
                            className="absolute bottom-3 right-2 w-10 h-10 rounded-full bg-gray-600 items-center justify-center border-2 border-white"
                            onPress={pickImage}
                        >
                            <Feather name="edit-2" size={14} color="white" />
                        </TouchableOpacity>

                        {/* ✅ แสดง indicator ว่าเลือกรูปใหม่แล้ว */}
                        {selectedImageFile && (
                            <View className="absolute top-2 right-2 w-6 h-6 rounded-full bg-green-500 items-center justify-center">
                                <Feather name="check" size={12} color="white" />
                            </View>
                        )}
                    </View>
                </View>

                {/* Form Fields */}
                <View className="space-y-4">
                    {/* Username Input */}
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

                    {/* Phone Number Input */}
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

                {/* Get Start Button */}
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

                {/* Policies Checkbox */}
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

                {/* Modal for Policies - เหมือนเดิม */}
                <Modal
                    visible={modalVisible}
                    animationType="slide"
                    presentationStyle="pageSheet"
                    onRequestClose={() => setModalVisible(false)}
                >
                    {/* Modal content เหมือนเดิม... */}
                    <SafeAreaView className="flex-1 bg-white">
                        <View className="flex-1">
                            <View className="flex-row items-center justify-between px-6 py-4 border-b border-gray-200">
                                <Text className="text-xl font-bold text-gray-800">
                                    ข้อตกลงและเงื่อนไข
                                </Text>
                                <TouchableOpacity
                                    onPress={() => setModalVisible(false)}
                                    className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center"
                                >
                                    <Feather
                                        name="x"
                                        size={20}
                                        color="#374151"
                                    />
                                </TouchableOpacity>
                            </View>

                            <ScrollView className="flex-1 px-6 py-4">
                                {/* Terms content... */}
                                <Text className="text-lg font-semibold text-gray-800 mb-4">
                                    1. การยอมรับข้อตกลง
                                </Text>
                                <Text className="text-gray-600 mb-6 leading-6">
                                    การใช้แอปพลิเคชันนี้แสดงว่าคุณยอมรับข้อตกลงและเงื่อนไขทั้งหมด
                                    หากคุณไม่ยอมรับข้อตกลงเหล่านี้
                                    กรุณาหยุดการใช้งานทันที
                                </Text>

                                <Text className="text-lg font-semibold text-gray-800 mb-4">
                                    2. การใช้งานแอปพลิเคชัน
                                </Text>
                                <Text className="text-gray-600 mb-6 leading-6">
                                    คุณสามารถใช้แอปพลิเคชันนี้เพื่อวัตถุประสงค์ที่ถูกต้องตามกฎหมายเท่านั้น
                                    ห้ามใช้เพื่อการกระทำที่ผิดกฎหมายหรือเป็นอันตราย
                                </Text>

                                <Text className="text-lg font-semibold text-gray-800 mb-4">
                                    3. ความเป็นส่วนตัวของข้อมูล
                                </Text>
                                <Text className="text-gray-600 mb-6 leading-6">
                                    เราจะเก็บรักษาข้อมูลส่วนบุคคลของคุณอย่างปลอดภัย
                                    และจะไม่เปิดเผยให้กับบุคคลที่สามโดยไม่ได้รับความยินยอมจากคุณ
                                    ยกเว้นกรณีที่กฎหมายกำหนด
                                </Text>

                                <Text className="text-lg font-semibold text-gray-800 mb-4">
                                    4. ความรับผิดชอบ
                                </Text>
                                <Text className="text-gray-600 mb-6 leading-6">
                                    คุณมีความรับผิดชอบในการรักษาความปลอดภัยของบัญชีและรหัสผ่านของคุณ
                                    หากมีการใช้งานโดยไม่ได้รับอนุญาต
                                    กรุณาแจ้งให้เราทราบทันที
                                </Text>

                                <Text className="text-lg font-semibold text-gray-800 mb-4">
                                    5. การเปลี่ยนแปลงข้อตกลง
                                </Text>
                                <Text className="text-gray-600 mb-6 leading-6">
                                    เราสงวนสิทธิ์ในการเปลี่ยนแปลงข้อตกลงและเงื่อนไขนี้ได้ตลอดเวลา
                                    การเปลี่ยนแปลงจะมีผลทันทีเมื่อได้รับการประกาศ
                                </Text>

                                <Text className="text-lg font-semibold text-gray-800 mb-4">
                                    6. การติดต่อ
                                </Text>
                                <Text className="text-gray-600 mb-8 leading-6">
                                    หากคุณมีคำถามเกี่ยวกับข้อตกลงและเงื่อนไขนี้
                                    กรุณาติดต่อเราที่ support@example.com
                                </Text>

                                <Text className="text-sm text-gray-500 text-center mb-6">
                                    อัปเดตล่าสุด: 4 กันยายน 2568
                                </Text>
                                {/* ... rest of terms ... */}
                            </ScrollView>

                            <View className="px-6 pb-8 pt-4 border-t border-gray-200">
                                <TouchableOpacity
                                    className="w-full py-4 bg-blue-500 rounded-xl"
                                    onPress={() => {
                                        setModalVisible(false);
                                        setAgreedToPolicies(true);
                                    }}
                                >
                                    <Text className="text-center text-white text-lg font-semibold">
                                        ยอมรับ
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </SafeAreaView>
                </Modal>
            </View>
        </SafeAreaView>
    );
};

export default ProfileSetupScreen;
