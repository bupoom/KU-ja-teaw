import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function IntroLayout() {
    return (
        <Stack screenOptions={{
          headerShown: false
        }}>
            <Stack.Screen name="index"/>
            <Stack.Screen name="auth"/>
            <Stack.Screen name="(tabs)"/>
        </Stack>
    );
}