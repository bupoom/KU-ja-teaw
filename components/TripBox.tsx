// components/TripBox.tsx
import { useRouter, usePathname } from "expo-router";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import StatusTag from "./StatusTag";
import CountdownTag from "./CountdownTag";
import { formatDateRange } from "@/util/formatDateRange";

// Interface matching your latest mockData
interface TripBoxProps {
  trip_id: number;
  trip_name: string;
  trip_image: string;
  start_date: string; // YYYY-MM-DD format
  end_date: string; // YYYY-MM-DD format
  member_count: number;
  status_planning: "planning" | "completed";
  owner_name: string;
  owner_image: string;
}

const TripBox: React.FC<TripBoxProps> = ({
  trip_id,
  trip_name,
  trip_image,
  start_date,
  end_date,
  member_count,
  status_planning,
  owner_name,
  owner_image,
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleTripPress = (): void => {
    router.push(`/trips/${trip_id}`);
  };

  // Only render for profile and tabs pages
  if (pathname === "/tabs" || pathname === "/tabs/profile") {
    return (
      <TouchableOpacity
        key={trip_id}
        onPress={handleTripPress}
        className="bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray_border"
        activeOpacity={0.7}
      >
        <View className="flex-row">
          <Image
            source={{ uri: trip_image }}
            className="w-24 h-24 rounded-xl"
          />

          <View className="flex-1 ml-4 justify-between py-0">
            {/* Header row - Title and Countdown Tag */}
            <View className="flex-row items-start justify-between">
              <Text
                className="text-[20px] font-sf-semibold text-black flex-1 mr-5 leading-6"
                numberOfLines={1}
              >
                {trip_name}
              </Text>
              <CountdownTag startDate={start_date} endDate={end_date} />
            </View>

            {/* Date row */}
            <View className="flex-row items-center mt-1">
              <Feather name="calendar" size={16} color="#6B7280" />
              <Text className="text-dark_gray text-[12px] ml-2 font-sf-semibold">
                {formatDateRange(start_date, end_date)}
              </Text>
            </View>

            {/* Participants and Status row */}
            <View className="flex-row items-center justify-between mt-1">
              <View className="flex-row items-center">
                <Feather name="users" size={16} color="#6B7280" />
                <Text className="text-dark_gray text-[12px] ml-2 font-sf-semibold">
                  {member_count} Person Joined
                </Text>
              </View>

              <StatusTag
                text={status_planning === "planning" ? "Planning" : "Complete"}
                bg={status_planning === "planning" ? "#F59E0B" : "#10B981"} // amber-500 : green-500
                className="ml-2"
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return null;
};

export default TripBox;
