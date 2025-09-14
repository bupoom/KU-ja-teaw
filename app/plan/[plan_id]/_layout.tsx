// app/(tabs)/plan/[plan_id]/_layout.tsx
import { Stack } from "expo-router";

export default function PlanLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="setting_plan" />
      <Stack.Screen name="daily_trip" />
      <Stack.Screen name="group" />
    </Stack>
  );
}