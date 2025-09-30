import Header from "@/components/common/Header";
import NextButton from "@/components/common/NextButton";
import { Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { createNewTrips } from "@/service/APIserver/tripInitApi";


const MAX_PWD = 20;

export default function SetTripCode() {
    const [submitting, setSubmitting] = useState(false);
    const [password, setPassword] = useState("");
    const [secure, setSecure] = useState(true);

    type Params = {
        name: string;
        start: string;
        end: string;
        posterUri: string;
        tripCode: string;
    };
    const { name, start, end, posterUri, tripCode } =
        useLocalSearchParams<Params>();
    const onNext = async () => {
        if (!password.trim()) {
            Alert.alert(
                "Missing password",
                "Please enter a password to continue."
            );
            return;
        }
        setSubmitting(true);
        const data = {
            trips_name: name,
            start_date: start,
            end_date:   end,
            trip_code:  tripCode,
            trip_password:password,
            uri: posterUri
        }
        const response = await createNewTrips(data) //, start , end , tripCode , password, imageFile ,)
        if (response) {
            Alert.alert("Success!");
            router.replace(`/plan/${password}`);
        } else {
            Alert.alert("Failed to Create new trips.");

        }
    };

    return (
        <View className="flex-1 bg-white">
            <Header title="Set Trip Code" onBackPress={() => router.back()} />

            <View className="flex-1 px-6 py-6">
                <Text className="text-[20px] font-sf-bold text-black mb-1">
                    Set your code
                </Text>
                <Text className="text-dark_gray text-base mb-6">
                    Create a password for your friend to join
                </Text>

                {/* Trip Code */}
                <View className="bg-white border border-gray_border rounded-lg p-4 mb-4">
                    <Text className="text-black font-sf-semibold mb-2 text-[16px]">
                        Trip Code
                    </Text>
                    <View className="border border-gray_border rounded-lg px-4">
                        <TextInput
                            value={tripCode}
                            editable={false}
                            selectTextOnFocus={false}
                            className="text-black"
                        />
                    </View>
                </View>

                {/* Password */}
                <View className="bg-white border border-gray_border rounded-lg p-4 mb-6">
                    <Text className="text-black font-sf-semibold mb-2 text-[16px]">
                        Password
                    </Text>
                    <View className="border border-gray_border rounded-lg px-4 flex-row items-center">
                        <TextInput
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Enter Your Password to Join"
                            secureTextEntry={secure}
                            maxLength={MAX_PWD}
                            className="flex-1 text-black"
                        />
                        <TouchableOpacity
                            onPress={() => setSecure(s => !s)}
                            hitSlop={10}
                        >
                            <Feather
                                name={secure ? "eye-off" : "eye"}
                                size={20}
                                color="#6B7280"
                            />
                        </TouchableOpacity>
                    </View>
                    <Text className="text-right text-gray-400 text-xs mt-2">
                        {password.length}/{MAX_PWD} characters
                    </Text>
                </View>

                {/* Next button */}
                <NextButton
                    onPress={onNext}
                    loading={submitting}
                    disabled={submitting || !password.trim()}
                />
            </View>
        </View>
    );
}
