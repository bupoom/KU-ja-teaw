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
import { GoogleMaps } from "expo-maps";
import Constants from "expo-constants";

const map = () => {
  useEffect(() => {
    console.log(`I am in map.tsx`);
    console.log(Platform.OS);
    console.log('Google Maps API Key:', Constants.expoConfig?.android?.config?.googleMaps?.apiKey);
    console.log('Full Expo Config:', JSON.stringify(Constants.expoConfig, null, 2));
  }, []);
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="light-content" backgroundColor="#ffffff" />
      <Header title="Map" onBackPress={handleBack} />
      {Platform.OS === "android" ? (
        <GoogleMaps.View style={{ flex: 1 }} />
      ) : (
        <Text>Maps are only available on Android and iOS</Text>
      )}
    </SafeAreaView>
  );
};
export default map;
