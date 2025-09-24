import { useRouter, usePathname } from "expo-router";
import { View, Image, Text, TouchableOpacity, Alert } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { truncateText } from "@/util/truncateText";

// Interface matching your latest mockData
interface PlaceBoxProps {
    id: number;
    title: string;
    rating?: number;
    review_count?: number;
    location: string;
    place_image?: string;
    place_id?: number;
    onRemove?: (id: number) => void; // Add onRemove prop for handling removal
}

const PlaceBox: React.FC<PlaceBoxProps> = ({
    id,
    title,
    rating = 0,
    review_count = 0,
    location,
    place_image,
    place_id,
    onRemove,
}) => {
    const pathname = usePathname();
    const router = useRouter();
    const give_bookmark = pathname === "/tabs/place";

    const handleUnbookmark = () => {
        Alert.alert(
            "Remove Bookmark",
            `remove "${title}" from bookmarks?`,
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Remove",
                    style: "destructive",
                    onPress: () => {
                        // กด Remove เเล้วจะไปใช้ function onremove ที่หน้า place bookmark
                        if (onRemove) {
                            onRemove(id);
                        }
                        // You can also add API call here for real implementation
                        // fetch API ลบ bookmark ทิ้ง
                    },
                },
            ]
        );
    };

    const handlePlaceBoxPress = (): void => {
        router.push(`/dynamicPage/places/${place_id}`);
    };

    // Default image if place_image is not provided
    const imageUri =
        place_image ||
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop";

    // Place bookmark page layout
    if (pathname === "/tabs/place" || pathname === "/tabs/place/search_place") {
        return (
            <TouchableOpacity
                key={id}
                className="bg-white rounded-xl p-3 mb-3 mr-1 ml-1 border border-gray_border"
                onPress={handlePlaceBoxPress}
            >
                <View className="flex-row">
                    {/* Place Image */}
                    <Image // ตรวจสอบ invalid url
                        source={
                            imageUri.startsWith("https://") &&
                            imageUri.endsWith("jpg")
                                ? { uri: imageUri }
                                : require("../assets/images/error.png")
                        }
                        className="w-20 h-20 rounded-xl"
                    />

                    {/* Place Info */}
                    <View className="flex-1 ml-5">
                        <View className="flex-row justify-between items-start">
                            <Text className="text-lg font-sf-semibold text-black">
                                {truncateText(title, 20)}
                            </Text>
                            <TouchableOpacity
                                className="ml-2"
                                onPress={handleUnbookmark}
                            >
                                {give_bookmark && (
                                    <Ionicons
                                        name="bookmark"
                                        size={24}
                                        color="#000000"
                                    />
                                )}
                            </TouchableOpacity>
                        </View>

                        {/* Rating Row */}
                        <View className="flex-row items-center mb-1">
                            <View className="flex-row items-center">
                                <Ionicons
                                    name="star"
                                    size={15}
                                    color="#FFD700"
                                />
                            </View>
                            <Text className="text-sm text-dark_gray ml-2 font-semibold">
                                {rating} ({review_count?.toLocaleString() || 0}{" "}
                                Review)
                            </Text>
                        </View>

                        {/* Location Info */}
                        <View className="flex-row items-center">
                            <Feather name="map-pin" size={15} color="#666" />
                            <Text className="text-sm text-dark_gray ml-2 font-semibold">
                                {location}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    return null;
};

export default PlaceBox;
