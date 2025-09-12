import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function IntroLayout() {
  const [loaded] = useFonts({
    "SFPro-Regular": require("../assets/fonts/SF_PRO/SF-Pro-Text-Regular.otf"),
    "SFPro-Bold": require("../assets/fonts/SF_PRO/SF-Pro-Text-Bold.otf"),
    "SFPro-Black": require("../assets/fonts/SF_PRO/SF-Pro-Text-Black.otf"),
    "SFPro-Semibold": require("../assets/fonts/SF_PRO/SF-Pro-Text-Semibold.otf"),
    "SFPro-Light": require("../assets/fonts/SF_PRO/SF-Pro-Text-Light.otf"),
  });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);
  if (!loaded) return null;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="auth/sign_in.tsx" />
      <Stack.Screen name="auth/set_profile.tsx" />
      <Stack.Screen name="tabs" />
      <Stack.Screen
        name="guides/[guide_id]"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="places/[place_id]"
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="trips/[trip_id]"
        options={{
          headerShown: true,
        }}
      />
    </Stack>
  );
}
