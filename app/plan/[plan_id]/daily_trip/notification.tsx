import { View, Text, SafeAreaView, StatusBar } from "react-native";
import Header from "@/components/common/Header";
import { useRouter } from "expo-router";

const notification = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="light-content" backgroundColor="#ffffff" />
      <Header title="Notifications" onBackPress={handleBack} />
      <View className="flex-1 items-center justify-center">
        <Text>Notification Screen</Text>
      </View>
    </SafeAreaView>
  );
};
export default notification;
