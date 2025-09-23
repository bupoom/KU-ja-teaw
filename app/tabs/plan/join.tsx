import NextButton from "@/components/common/NextButton";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    SafeAreaView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Header from "../../../components/common/Header";

const JoinTripScreen = () => {
    const router = useRouter();
    const [tripCode, setTripCode] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleBack = () => {
        router.back();
    };

    const handleNext = () => {
        // Handle join trip logic here
        console.log("Trip Code:", tripCode);
        console.log("Password:", password);
        router.push(`/plan/${password}`);
    };

    const isNextDisabled = !tripCode.trim() || !password.trim();

    return (
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            {/* Header */}
            <Header title="Join Trip" onBackPress={handleBack} />

            {/* Content */}
            <View className="flex-1 px-6 py-6">
                {/* Title Section */}
                <View className="mb-8">
                    <Text className="text-2xl font-sf-bold text-black mb-2">
                        Join Trip
                    </Text>
                    <Text className="text-dark_gray text-base ml-2">
                        Enter the trip code & password
                    </Text>
                </View>

                {/* Form Section */}
                <View className="space-y-6">
                    {/* Trip Code Input */}
                    <View>
                        <Text className="text-black font-sf-semibold mb-3 text-base">
                            Trip Code
                        </Text>
                        <TextInput
                            className="border border-gray_border rounded-lg px-4 py-4 text-base bg-white font-sf"
                            placeholder="Enter The Trip Code"
                            value={tripCode}
                            onChangeText={setTripCode}
                            autoCapitalize="characters"
                            placeholderTextColor="dark_gray"
                            maxLength={8}
                        />
                        <Text className="text-right text-dark_gray text-sm font-sf mt-2">
                            {tripCode.length}/8 characters
                        </Text>
                    </View>

                    {/* Password Input */}
                    <View>
                        <Text className="text-black font-sf-semibold mb-3 text-base">
                            Password
                        </Text>
                        <View className="relative">
                            <TextInput
                                className="border border-gray_border rounded-lg px-4 py-4 pr-12 text-base bg-white font-sf"
                                placeholder="Enter The Password to Join"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                                placeholderTextColor="dark_gray"
                                maxLength={20}
                            />
                            <TouchableOpacity
                                className="absolute right-4 top-4"
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                <Text className="text-dark_gray text-lg mr-4">
                                    {showPassword ? (
                                        <Feather
                                            name="eye"
                                            size={20}
                                            color="black"
                                        />
                                    ) : (
                                        <Feather
                                            name="eye-off"
                                            size={20}
                                            color="black"
                                        />
                                    )}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <Text className="text-right text-dark_gray text-sm font-sf mt-2">
                            {password.length}/20 characters
                        </Text>
                    </View>
                </View>

                {/* Next Button */}
                <NextButton
                    onPress={handleNext}
                    disabled={isNextDisabled}
                    classname="mt-4"
                />
            </View>
        </SafeAreaView>
    );
};

export default JoinTripScreen;
