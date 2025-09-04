import { Stack } from "expo-router";

export default function PlanStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Select Plan Option",
        }}
      />

      <Stack.Screen
        name="join"
        options={{
          title: "Jojn Plan",
        }}
      />

      <Stack.Screen
        name="set_plan_detail"
        options={{
          title: "Set Plan Detail",
        }}
      />

      <Stack.Screen
        name="set_plan_code"
        options={{
          title: "Set Plan Code",
        }}
      />
    </Stack>
  );
}
