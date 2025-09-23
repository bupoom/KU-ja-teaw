interface Weather {
    id: number;
    trip_id: number;
    date: string;
    weather_code: keyof typeof weatherCode; // 0–7
}
