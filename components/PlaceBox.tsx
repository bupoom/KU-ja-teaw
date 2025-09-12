import { useRouter, usePathname } from "expo-router";
import { View, Image, Text, TouchableOpacity, Alert } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";

// Interface matching your latest mockData
interface PlaceBoxProps {
  id: number;
  title: string;
  rating?: number;
  review_count?: number;
  location: string;
  place_image?: string;
  place_id?: number;
}

const PlaceBox: React.FC<PlaceBoxProps> = ({
  id,
  title,
  rating = 0,
  review_count = 0,
  location,
  place_image,
  place_id,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const give_bookmark = pathname === "/tabs/place";

  const handleUnbookmark = () => {
    // fetch API ลบ bookmark ทิ้ง
    Alert.alert("Unbookmark", "Place removed from bookmarks");
    return;
  };

  const handlePlaceBoxPress = (): void => {
    // Navigate to place details using place_id or id
    const placeId = place_id || id;
    router.push(`/places/${placeId}`);
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
          <Image 
            source={{ uri: imageUri }} 
            className="w-20 h-20 rounded-xl" 
          />

          {/* Place Info */}
          <View className="flex-1 ml-5">
            <View className="flex-row justify-between items-start">
              <Text className="text-[16px] font-sf-semibold text-black leading-6">
                {title}
              </Text>
              <TouchableOpacity className="ml-2" onPress={handleUnbookmark}>
                {give_bookmark && (
                  <Ionicons name="bookmark" size={24} color="#000000" />
                )}
              </TouchableOpacity>
            </View>

            {/* Rating Row */}
            <View className="flex-row items-center">
              <View className="flex-row items-center">
                <Ionicons name="star" size={15} color="#FFD700" />
              </View>
              <Text className="text-[11px] text-dark_gray ml-2 font-sf-semibold">
                {rating} ({review_count?.toLocaleString() || 0} Review)
              </Text>
            </View>

            {/* Location Info */}
            <View className="flex-row items-center">
              <Feather name="map-pin" size={15} color="#666" />
              <Text className="text-[11px] text-dark_gray ml-2 font-sf-semibold">
                {location}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  // Home page horizontal scroll layout
  else if (pathname === "/tabs") {
    return (
      <TouchableOpacity
        className="mr-4 w-48 bg-white rounded-xl shadow-sm overflow-hidden"
        onPress={handlePlaceBoxPress}
        activeOpacity={0.8}
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 6,
          elevation: 2,
        }}
      >
        <Image
          source={{ uri: imageUri }}
          className="w-full h-32 rounded-xl"
          resizeMode="cover"
        />

        <View className="p-3">
          <Text
            className="text-base font-bold text-gray-900 mb-1"
            numberOfLines={2}
            style={{ lineHeight: 20 }}
          >
            {title}
          </Text>

          <Text className="text-sm text-gray-500 mb-2" numberOfLines={1}>
            {location}
          </Text>

          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Feather name="star" size={14} color="#FFA500" />
              <Text className="text-sm font-semibold text-gray-700 ml-1">
                {rating > 0 ? rating.toFixed(1) : "N/A"}
              </Text>
            </View>

            <Text className="text-xs text-gray-400 font-medium">
              {review_count > 0
                ? `${review_count.toLocaleString()} reviews`
                : "No reviews"}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return null;
};

export default PlaceBox;
