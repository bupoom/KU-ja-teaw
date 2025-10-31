import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Header = ({
    title = "Header",
    onBackPress = () => {},
    showBackButton = true,
    backgroundColor = "bg-white",
    textColor = "text-gray-800",
    borderColor = "border-gray-200",
}) => {
    return (
        <View
            className={`flex-row items-center justify-between py-3 px-4 ${backgroundColor} border-b ${borderColor} mt-10`}
        >
            {showBackButton ? (
                <TouchableOpacity onPress={onBackPress} className="p-2">
                    <Ionicons name="chevron-back" size={24} color="#333" />
                </TouchableOpacity>
            ) : (
                <View className="w-10" />
            )}

            <Text className={`text-lg font-semibold ${textColor}`}>
                {title}
            </Text>

            <View className="w-10" />
        </View>
    );
};

export default Header;
