import { View, Text, SafeAreaView } from "react-native";
import Header from "@/components/Header";
import { useRouter } from "expo-router";
const index = () => {
  const router = useRouter();

  const handleBackPress = () => {
    // router.push(`/tabs/(home)`);
    router.back();
  };

  return (
    <SafeAreaView>
      <Header title="plan wtf" onBackPress={handleBackPress}></Header>
      <View className="flex items-center justify-center">
        <Text>index</Text>
      </View>
    </SafeAreaView>
  );
};
export default index;
