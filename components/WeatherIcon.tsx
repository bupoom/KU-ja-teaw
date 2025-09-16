import React from "react";
import { View, Text } from "react-native";
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

const WeatherIcon: React.FC<WeatherIconProps> = ({
  trip_id,
  date,
  size = 22,
  color = "#000",
}) => {
  // หา weather ของ trip + date
  const weather = mockWeathers.find(
    (w) => w.trip_id === trip_id && w.date === date
  );

  if (!weather) {
    return <Feather name="help-circle" size={size} color="gray" />;
  }

  const iconName = weatherIconMap[weather.weather_code as number];

  return <Feather name={iconName} size={size} color={color} />;
};

export default WeatherIcon;
