// components/NextButton.tsx
import React from "react";
import { Text, TouchableOpacity, ActivityIndicator } from "react-native";

type NextButtonProps = {
    onPress: () => void;
    disabled?: boolean;
    loading?: boolean;
    classname?: string;
};

export default function NextButton({
    onPress,
    disabled,
    loading,
    classname,
}: NextButtonProps) {
    const isDisabled = disabled || loading;
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={isDisabled}
            className={`bg-green_2 rounded-lg items-center justify-center h-[50px] ${
                isDisabled ? "opacity-60" : ""
            } ${classname}`}
            activeOpacity={0.85}
        >
            {loading ? (
                <ActivityIndicator color="#fff" />
            ) : (
                <Text className="text-white font-semibold text-lg">Next</Text>
            )}
        </TouchableOpacity>
    );
}
