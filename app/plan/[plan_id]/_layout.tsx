import { Tabs } from "expo-router";

export default function PlanLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: { display: "none" },
            }}
        >
            <Tabs.Screen name="index" />
            <Tabs.Screen name="daily_trip" />
            <Tabs.Screen name="group" />
            <Tabs.Screen name="setting_plan" />
        </Tabs>
    );
}
