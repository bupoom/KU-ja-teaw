import { Stack } from "expo-router";

export default function IntroLayout() {
    return (
        <Stack screenOptions={{
          headerShown: false
        }}>
            <Stack.Screen name="index"/>
            <Stack.Screen name="auth"/>
            <Stack.Screen name="tabs"/>
            <Stack.Screen 
                name="guides/[guide_id]" 
                options={{ 
                    headerShown:  true,
                    headerTitle:  "-- location --",
                }}
            />
            <Stack.Screen 
                name="places/[place_id]" 
                options={{ 
                    headerShown:  true,
                    headerTitle:  "-- location --",
                }}
            />
            <Stack.Screen 
                name="trips/[trip_id]" 
                options={{ 
                    headerShown:  true,
                    headerTitle:  "-- location --",
                }}
            />
        </Stack>
    );
}