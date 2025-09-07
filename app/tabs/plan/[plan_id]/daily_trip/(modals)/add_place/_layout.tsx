import { Stack } from "expo-router";
export default function AddPlaceModalLayout() {
  return (
    <Stack screenOptions={{ presentation: "modal" }}>
      <Stack.Screen name="select_time" options={{ title: "Select Time" }} />
      <Stack.Screen name="search_place" options={{ title: "Search Place" }} />
      <Stack.Screen name="place_detail" options={{ title: "Confirm Place" }} />
    </Stack>
  );
}
