import { Stack } from "expo-router";
export default function GroupLayout() {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="search_friend" />
    </Stack>
  );
}
