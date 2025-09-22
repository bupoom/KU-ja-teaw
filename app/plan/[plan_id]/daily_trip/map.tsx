import { View, Text, SafeAreaView, StatusBar } from "react-native";
import Header from "@/components/common/Header";
import { useRouter } from "expo-router";

const map = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="light-content" backgroundColor="#ffffff" />
      <Header title="Map" onBackPress={handleBack} />
      <View className="flex-1 items-center justify-center">
        <Text>Map Screen</Text>
      </View>
    </SafeAreaView>
  );
};
export default map;
