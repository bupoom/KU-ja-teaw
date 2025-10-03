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
      <Stack.Screen name="auth" />
      <Stack.Screen name="tabs" />
      <Stack.Screen name="dynamicPage/guides/[guide_id]" />
      <Stack.Screen name="dynamicPage/places/[place_id]" />
      <Stack.Screen name="dynamicPage/trips/[trip_id]" />
      <Stack.Screen name="plan/[plan_id]" />
      <Stack.Screen name="plan/set_plan_details" />
      <Stack.Screen name="plan/set_plan_code" />
    </Stack>
  );
}
