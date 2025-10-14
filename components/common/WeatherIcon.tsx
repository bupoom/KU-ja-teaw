import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { getWeatherByDate } from "@/service/APIserver/weather";
import { Weather } from "@/interface/weather";

interface WeatherIconProps {
    trip_id: number;
    date: string; // format: "YYYY-MM-DD"
    size?: number;
    color?: string;
    showText?: boolean;
}

const weatherIconMap: Record<number, keyof typeof Feather.glyphMap> = {
    0: "sun", // Clear
    1: "cloud", // Clouds
    2: "wind", // Fog/Mist
    3: "cloud-drizzle", // Drizzle
    4: "cloud-rain", // Rain
    5: "cloud-snow", // Snow
    6: "cloud-snow", // Ice/Sleet
    7: "cloud-lightning", // Thunderstorm
};

const weatherNameMap: Record<number, string> = {
    0: "Sunny",
    1: "Cloudy",
    2: "Foggy",
    3: "Drizzle",
    4: "Rainy",
    5: "Snowy",
    6: "Icy",
    7: "Thunderstorm",
};

const WeatherIcon: React.FC<WeatherIconProps> = ({
    trip_id,
    date,
    size = 30,
    color = "black",
    showText = false,
}) => {
    const [weather, setWeather] = useState<Weather | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        if (!trip_id || !date) return;

        const fetchWeather = async () => {
            try {
                setLoading(true);
                const data = await getWeatherByDate(trip_id, date);
                if (data && data.length > 0) setWeather(data[0]);
                else setWeather(null);
                setError(false);
            } catch (err) {
                console.error("Weather fetch failed:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [trip_id, date]);

    if (loading)
        return (
            <MaterialCommunityIcons name="loading" size={size} color={color} />
        );

    if (error || !weather)
        return (
            <MaterialCommunityIcons
                name="cloud-question"
                size={size}
                color={color}
            />
        );

    const iconName =
        weatherIconMap[weather.weather_code as number] || "cloud-question";
    const weatherText =
        weatherNameMap[weather.weather_code as number] || "Unknown";

    return (
        <View className="flex-row items-center">
            <Feather name={iconName} size={size} color={color} />
            {showText && (
                <Text className="text-black font-semibold text-xl ml-3">
                    {weatherText}
                </Text>
            )}
        </View>
    );
};

export default WeatherIcon;
