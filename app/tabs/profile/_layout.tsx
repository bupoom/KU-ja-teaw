import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
        screenOptions={{
        headerShown:false,
      }}>
      <Stack.Screen name="index" options={{}} />
      <Stack.Screen name="setting" options={{
        headerShown:false,

      }} />
      <Stack.Screen name="profile_setting" options={{
        headerShown:false,
      }} />
      <Stack.Screen name="all_end_trip" options={{
        headerShown:false,
      }} />

    </Stack>
  );
}