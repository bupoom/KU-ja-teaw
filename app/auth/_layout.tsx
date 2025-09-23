import React from "react";
import { Stack } from "expo-router";
import { useRouter } from "expo-router";

export default function Layout() {
    const router = useRouter();

    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="index" options={{}} />
            <Stack.Screen name="set_profile" options={{}} />
        </Stack>
    );
}
