import { Stack } from "expo-router";
export default function DailyTripsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="eventDetails/[event_detail_id]" />
      <Stack.Screen name="placeDetails/[place_detail_id]" />
      <Stack.Screen name="map"/>
      <Stack.Screen name="notification" />
    </Stack>
  );
}
