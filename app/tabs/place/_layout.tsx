import React from "react";
import { Stack } from "expo-router";

export default function Layout() {
    // useFocusEffect(
    //   React.useCallback(() => {
    //     // Reset กลับไปหน้า index เมื่อ tab ถูกเลือก
    //     router.replace('/tabs/place');
    //   }, [])
    // );

    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="index" />
            <Stack.Screen name="search_place" />
            <Stack.Screen name="[place_id]" />
        </Stack>
    );
}
