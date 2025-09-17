import React, { useState} from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import Header from "@/components/Header";
import NextButton from "@/components/NextButton";

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
      Alert.alert("Missing password", "Please enter a password to continue.");
      return;
    }

    setSubmitting(true);
    // try {
    //   const formData = new FormData();
    //   formData.append("name", name);
    //   formData.append("startDate", start ?? "");
    //   formData.append("endDate", end ?? "");
    //   formData.append("password", password);
    //   formData.append("tripCode", tripCode);

    //   if (posterUri) {
    //     const ext = posterUri.split(".").pop()?.toLowerCase() || "jpg";
    //     const mimeType = ext === "png" ? "image/png" : "image/jpeg";
    //     formData.append("poster", {
    //       uri: posterUri,
    //       name: `poster.${ext}`,
    //       type: mimeType,
    //     } as any);
    //   }

    //   const res = await fetch("https://api.example.com/plans", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //     body: formData,
    //   });

    //   if (!res.ok) throw new Error("Failed to create plan");

    //   const data = await res.json();
    //   const planId = String(data.plan_id);

      router.replace(`/plan/${password}`);
    // } catch (e) {
    //   Alert.alert("Error", (e as Error).message);
    // } finally {
    //   setSubmitting(false);
    // }
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
        <View className="bg-white border border-gray_border rounded-2xl p-4 mb-4">
          <Text className="text-black font-sf-semibold mb-2 text-[16px]">
            Trip Code
          </Text>
          <View className="border border-gray_border rounded-2xl px-4">
            <TextInput
              value={tripCode}
              editable={false}
              selectTextOnFocus={false}
              className="text-black"
            />
          </View>
        </View>

        {/* Password */}
        <View className="bg-white border border-gray_border rounded-2xl p-4 mb-6">
          <Text className="text-black font-sf-semibold mb-2 text-[16px]">
            Password
          </Text>
          <View className="border border-gray_border rounded-2xl px-4 flex-row items-center">
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Enter Your Password to Join"
              secureTextEntry={secure}
              maxLength={MAX_PWD}
              className="flex-1 text-black"
            />
            <TouchableOpacity onPress={() => setSecure((s) => !s)} hitSlop={10}>
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
