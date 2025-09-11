import { View, Text } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function SimpleMessage() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-base text-gray-600 mt-2">
        Guide_ID Test
      </Text>
    </View>
  );
}
