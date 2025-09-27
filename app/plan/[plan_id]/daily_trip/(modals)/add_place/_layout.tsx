import { Stack } from "expo-router";
export default function AddPlaceModalLayout() {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerShown: false,
        presentation: "modal",
      }}
    >
      <Stack.Screen name="select_time" />
      <Stack.Screen name="search_place" />
      <Stack.Screen name="[place_id]" />
    </Stack>
  );
}
