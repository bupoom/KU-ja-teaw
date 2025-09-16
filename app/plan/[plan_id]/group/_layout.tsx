import { Stack } from "expo-router";
export default function GroupLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Group" }} />
      <Stack.Screen name="search_friend" options={{ title: "Invite friend" }} />
    </Stack>
  );
}
