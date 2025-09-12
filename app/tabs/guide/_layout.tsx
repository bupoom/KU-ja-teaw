import React from "react";
import { Stack } from "expo-router";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";

export default function Layout() {
  const router = useRouter();

  // useFocusEffect(
  //   React.useCallback(() => {
  //     // Reset กลับไปหน้า index เมื่อ tab ถูกเลือก
  //     router.replace("/tabs/guide");
  //   }, [])
  // );
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{}} />
      <Stack.Screen name="search_guide" />
      <Stack.Screen name="[guide_id]" />
    </Stack>
  );
}
