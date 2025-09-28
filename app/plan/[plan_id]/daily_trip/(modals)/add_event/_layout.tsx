import { Stack } from "expo-router";
export default function AddEventModalLayout() {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerShown: false,
        presentation: "modal",
      }}
    >
      <Stack.Screen name="select_time" />
      <Stack.Screen name="select_transport" />
    </Stack>
  );
}
