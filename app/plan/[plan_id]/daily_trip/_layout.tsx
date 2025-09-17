import { Stack } from "expo-router";
export default () => (
  <Stack
    screenOptions={{
        headerShadowVisible: false,
        headerShown: false,
      }}
  >
    <Stack.Screen name="index" options={{ title: "Daily Trip" }}/>
    <Stack.Screen name="[event_detail_id]" options={{ title: "Event" }}/>
    <Stack.Screen name="[place_detail_id]" options={{ title: "Place" }}/>
    <Stack.Screen name="map" options={{ title: "Map" }}/>
    <Stack.Screen name="notification" options={{ title: "Notifications" }}/>
    <Stack.Screen name="select_add_type" options={{ title: "Add to Trip" }}/>
  </Stack>
);
