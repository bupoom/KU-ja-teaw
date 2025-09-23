import React from "react";
import { Stack } from "expo-router";

export default function Layout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="index" options={{}} />
            <Stack.Screen name="search_guide" />
            <Stack.Screen name="[guide_id]" />
        </Stack>
    );
}
