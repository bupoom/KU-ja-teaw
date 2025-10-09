import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { getWeatherByDate } from "@/service/APIserver/weather";
import { Weather } from "@/interface/weather";

interface WeatherIconProps {
    trip_id: number;
    date: string; // format: "YYYY-MM-DD"
    size?: number;
    color?: string;
}

// Map weather_code → Feather icon
const weatherIconMap: Record<number, keyof typeof Feather.glyphMap> = {
    0: "sun",              // Clear
    1: "cloud",            // Clouds
    2: "wind",             // Fog/Mist
    3: "cloud-drizzle",    // Drizzle
    4: "cloud-rain",       // Rain
    5: "cloud-snow",       // Snow
    6: "cloud-snow",       // Ice/Sleet
    7: "cloud-lightning",  // Thunderstorm
};

const WeatherIcon: React.FC<WeatherIconProps> = ({
    trip_id,
    date,
    size = 30,
    color = "black",
    }) => {
    // ✅ 1. เพิ่ม state เก็บ weather และสถานะโหลด/error
    const [weather, setWeather] = useState<Weather | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    // ✅ 2. ดึงข้อมูล weather จาก API
    useEffect(() => {
        if (!trip_id || !date) {
            console.log("⏸️ Skip fetch: date or trip_id not ready");
            return;
        }

        const fetchWeather = async () => {
        try {
            setLoading(true);
            const data = await getWeatherByDate(trip_id, date);
            console.log("Weather data:", data); // debug
            setError(false);
            // ถ้ามีข้อมูล → เอาแถวแรก
            if (data && data.length > 0) {
            setWeather(data[0]);
            console.log(weather)
            } else {
            setWeather(null);
            }
        } catch (err) {
            console.error("Weather fetch failed:", err);
            setError(true);
        } finally {
            setLoading(false);
        }
        };

        // เรียกทุกครั้งที่ trip_id หรือ date เปลี่ยน
        fetchWeather();
    }, [trip_id, date]);

    // ✅ 3. render icon ตามสถานะ
    if (loading) {
        console.log("Render phase:", { loading, error, weather });

        return (
        <MaterialCommunityIcons
            name="loading"
            size={size}
            color={color}
        />
        );
    }

    if (error || !weather) {

        return (
        <MaterialCommunityIcons
            name="cloud-question"
            size={size}
            color={color}
        />
        );
    }

    const iconName = weatherIconMap[weather.weather_code as number] || "cloud-question";
    return <Feather name={iconName} size={size} color={color} />;
};

export default WeatherIcon;