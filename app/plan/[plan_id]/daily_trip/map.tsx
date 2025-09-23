import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Platform,
} from "react-native";
import Header from "@/components/common/Header";
import { useRouter } from "expo-router";
import { useEffect } from "react";

const map = () => {
  useEffect(() => {
    console.log(`I am in map.tsx`);
  }, []);
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="light-content" backgroundColor="#ffffff" />
      <Header title="Map" onBackPress={handleBack} />
    </SafeAreaView>
  );
};
export default map;
