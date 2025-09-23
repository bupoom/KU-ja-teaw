import React from "react";
import { Feather } from "@expo/vector-icons";
import { mockWeathers } from "@/mock/mockDataComplete";

interface WeatherIconProps {
    trip_id: number;
    date: string; // format: "YYYY-MM-DD"
    size?: number;
    color?: string;
}

const weatherIconMap: Record<number, keyof typeof Feather.glyphMap> = {
    0: "sun", // Clear
    1: "cloud", // Clouds
    2: "wind", // Fog/Mist
    3: "cloud-drizzle", // Drizzle
    4: "cloud-rain", // Rain
    5: "cloud-snow", // Snow
    6: "cloud-snow", // Ice/Sleet → ใช้ snow แทน
    7: "cloud-lightning", // Thunderstorm
};

const WeatherIcon: React.FC<WeatherIconProps> = (weatherData) => {
    // หา weather ของ trip + date
    const weather = mockWeathers.find(
        w => w.trip_id === weatherData.trip_id && w.date === weatherData.date
    );

    if (!weather) {
        return <Feather name="help-circle" size={weatherData.size} color="gray" />;
    }

    const iconName = weatherIconMap[weather.weather_code as number];

    return <Feather name={iconName} size={weatherData.size} color={weatherData.color} />;
};

export default WeatherIcon;
