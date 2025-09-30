// components/NextButton.tsx
import React from "react";
import { Text, TouchableOpacity, ActivityIndicator, View } from "react-native";

type CustomButtonProps = {
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  title: string;
  isShared?: boolean;
  classname?: string;
};

export default function CustomButton({
  onPress,
  disabled,
  loading,
  title,
  isShared,
  classname,
}: CustomButtonProps) {
  const isDisabled = disabled || loading;

  // ถ้ามีส่ง classname มา → ใช้อันนั้นแทน default
  const buttonClassName =
    classname ||
    `mx-5 py-4 rounded-lg items-center justify-center ${
      isDisabled ? "bg-gray-300" : isShared ? "bg-blue_button" : "bg-green_2"
    }`;

  const textClassName = isDisabled
    ? "text-center text-lg font-semibold text-gray-500"
    : "text-center text-lg font-semibold text-white";

  return (
    <TouchableOpacity
      className={buttonClassName}
      onPress={onPress}
      disabled={isDisabled}
    >
      {loading ? (
        <ActivityIndicator color={isDisabled ? "#6B7280" : "#fff"} />
      ) : (
        <Text className={textClassName}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}
