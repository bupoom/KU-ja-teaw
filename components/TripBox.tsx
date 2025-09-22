// components/TripBox.tsx
import { formatDateRange } from "@/util/formatFucntion/formatDate&TimeRange";
import { truncateText } from "@/util/truncateText";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import CountdownTag from "./common/CountdownTag";
import StatusTag from "./common/StatusTag";

// ใช้ interface ซ้ำ
interface TripBoxProps {
    tripData: TripBox; // รับข้อมูล trip ทั้งหมด
    onPress?: (trip_id: number) => void; // Optional custom navigation function
}

const TripBox: React.FC<TripBoxProps> = ({
    tripData,
    onPress, // Receive custom navigation function
}) => {
    const {
        trip_id,
        trip_name,
        trip_image,
        start_date,
        end_date,
        member_count,
        status_planning,
    } = tripData;

    const router = useRouter();
    const handleTripPress = (): void => {
        console.log(`trip_id: ${trip_id}`);
        // If custom onPress function is provided, use it
        if (onPress) {
            onPress(trip_id);
        } else {
            // Default navigation behavior
            router.push(`/plan/${trip_id}`);
        }
    };

    return (
        <TouchableOpacity
            onPress={handleTripPress}
            className="bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray_border"
            activeOpacity={0.7}
        >
            <View className="flex-row">
                <Image
                    source={{ uri: trip_image }}
                    className="w-20 h-20 rounded-xl"
                />
                <View className="flex-1 ml-4 justify-between py-0">
                    {/* Header row - Title and Countdown Tag */}
                    <View className="flex-row items-start justify-between">
                        <Text
                            className="text-lg font-sf-semibold text-black flex-1 mr-5 leading-6"
                            numberOfLines={1}
                        >
                            {truncateText(trip_name, 20)}
                        </Text>
                        <CountdownTag
                            startDate={start_date}
                            endDate={end_date}
                        />
                    </View>

                    {/* Date row */}
                    <View className="flex-row items-center">
                        <Feather name="calendar" size={16} color="#6B7280" />
                        <Text className="text-dark_gray text-sm ml-2 font-sf-semibold">
                            {formatDateRange(start_date, end_date)}
                        </Text>
                    </View>

                    {/* Participants and Status row */}
                    <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center">
                            <Feather name="users" size={16} color="#6B7280" />
                            <Text className="text-dark_gray text-sm ml-2 font-sf-semibold">
                                {member_count} Person Joined
                            </Text>
                        </View>

                        <StatusTag
                            text={
                                status_planning === "planning"
                                    ? "Planning"
                                    : "Complete"
                            }
                            bg={
                                status_planning === "planning"
                                    ? "#F59E0B"
                                    : "#10B981"
                            } // amber-500 : green-500
                            className="ml-2"
                        />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default TripBox;
