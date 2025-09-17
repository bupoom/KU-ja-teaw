import React from "react";
import { View, Text, Image } from "react-native";
import RoleTag from "./RoleTag";

interface MemberBoxEndProps {
  user_name: string;
  user_image: string;
  role: 'owner' | 'editer' | 'viewer'; // เพิ่ม type safety
  phone?: string;
  email: string;
}

const MemberBoxEnd = ({
  user_name,
  user_image,
  role,
  phone,
  email,
}: MemberBoxEndProps) => {
  return (
    <View className="flex-row items-center p-3 mb-3 bg-white border border-gray_border rounded-lg">
      <Image
        source={{ uri: user_image }}
        className="w-12 h-12 rounded-full mr-4"
        resizeMode="cover"
      />
      <View className="flex-1">
        <View className="flex-row items-center justify-between mb-1">
          <Text className="text-sm font-semibold text-black">
            Name: {user_name}
          </Text>
          <RoleTag role={role} />
        </View>
        {phone && (
          <Text className="text-xs text-gray-600 mb-1 font-medium">Phone: {phone}</Text>
        )}
        <Text className="text-xs text-gray-600 font-medium">Email: {email}</Text>
      </View>
    </View>
  );
};

export default MemberBoxEnd;