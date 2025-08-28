import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
        screenOptions={{
        headerShown:false,
      }}>
      <Stack.Screen name="index" options={{}} />
      <Stack.Screen name="setting" options={{
        headerShown:true,
        headerTitle: "Setting",
        headerTitleAlign: "center",

      }} />
      <Stack.Screen name="profile_setting" options={{
        headerShown:true,
        headerTitle: "Account",
        headerTitleAlign: "center",
      }} />
    </Stack>
  );
}