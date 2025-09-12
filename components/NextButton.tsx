// components/NextButton.tsx
import React from "react";
import { Text, TouchableOpacity, ActivityIndicator, View } from "react-native";

type NextButtonProps = {
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
};

export default function NextButton({ onPress, disabled, loading }: NextButtonProps) {
  const isDisabled = disabled || loading;
  
  return (
    <View className="mt-12">
      <TouchableOpacity
        className={`py-4 rounded-lg w-full items-center ${
          isDisabled ? "bg-gray-300" : "bg-green_2"
        }`}
        onPress={onPress}
        disabled={isDisabled}
      >
        {loading ? (
          <ActivityIndicator color={isDisabled ? "#6B7280" : "#fff"} />
        ) : (
          <Text
            className={`text-lg font-semibold ${
              isDisabled ? "text-gray-500" : "text-white"
            }`}
          >
            Next
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}