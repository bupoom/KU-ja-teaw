import { Stack } from "expo-router";

export default function PlanStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />

      <Stack.Screen name="join" />

      <Stack.Screen name="set_plan_detail" />

      <Stack.Screen name="set_plan_code" />

    </Stack>
  );
}
