// components/NextButton.tsx
import React from "react";
import { Text, TouchableOpacity, ActivityIndicator } from "react-native";

type NextButtonProps = {
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
};

export default function NextButton({ onPress, disabled, loading }: NextButtonProps) {
  const isDisabled = disabled || loading;
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      className={`bg-green_2 rounded-2xl items-center justify-center h-[50px] ${
        isDisabled ? "opacity-60" : ""
      }`}
      activeOpacity={0.85}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text className="text-white font-sf-semibold text-[20px]">Next</Text>
      )}
    </TouchableOpacity>
  );
}
