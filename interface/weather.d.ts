// export const weatherCode: Record<number, string> = {
//   0: "Clear",
//   1: "Clouds",
//   2: "Fog/Mist",
//   3: "Drizzle",
//   4: "Rain",
//   5: "Snow",
//   6: "Ice/Sleet",
//   7: "Thunderstorm"
// };

interface Weather {
    id: number;
    trip_id: number;
    date: string;
    weather_code: keyof typeof weatherCode; // 0–7
}
