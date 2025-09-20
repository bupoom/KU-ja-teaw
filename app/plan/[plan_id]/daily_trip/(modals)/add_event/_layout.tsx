import { Stack } from "expo-router";
export default function AddEventModalLayout() {
    return (
        <Stack screenOptions={{ presentation: "modal" }}>
            <Stack.Screen
                name="select_time"
                options={{ title: "Select Time" }}
            />
            <Stack.Screen
                name="select_transport"
                options={{ title: "Transport" }}
            />
        </Stack>
    );
}
