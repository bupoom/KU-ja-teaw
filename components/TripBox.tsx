import { useRouter, usePathname } from "expo-router";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons';

const get_status_color = (status: string) => {
  switch (status) {
    case "Coming":
      return "green_2";
    case "Now":
      return "blue_button";
    default:
      return "#000000";
  }
}

const TripBox = ({
  // Component ของ guide ใน Guide Book mark
  id,
  title,
  image,
  dateRange,
  participantsCount,
  status,
}: TripDetails) => {
  const pathname = usePathname();
  const router = useRouter()

  const handleTripPress = (trip_id: number): void => {
    router.push(`/trips/${trip_id}`)
  };

  if (pathname === '/tabs' || pathname === '/tabs/profile') {
    return (
      <TouchableOpacity
        key={id}
        onPress={() => handleTripPress(id)}
        className="bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray-100"
        activeOpacity={0.7}
      >
        <View className="flex-row">
          <Image 
            source={{ uri: image }} 
            className="w-24 h-24 rounded-xl" 
          />
          
          <View className="flex-1 ml-4 justify-between py-0">
            {/* Header row - Title and Status */}
            <View className="flex-row items-start justify-between">
              <Text 
                className="text-[20px] font-sf-semibold text-black flex-1 mr-2 leading-6"
                numberOfLines={2}
              >
                {title}
              </Text>
              <View 
                className="px-3 py-1 rounded-full ml-2" 
                style={{ backgroundColor: get_status_color(status) }}
              >
                <Text className="text-white text-sm font-medium">
                  {status}
                </Text>
              </View>
            </View>

            {/* Date row */}
            <View className="flex-row items-center mt-2">
              <Feather name="calendar" size={16} color="dark_gray" />
              <Text className="text-dark_gray text-[12px] ml-2 font-sf-semibold">{dateRange}</Text>
            </View>

            {/* Participants row */}
            <View className="flex-row items-center mt-1">
              <Feather name="users" size={16} color="dark_gray" />
              <Text className="text-dark_gray text-[12px] ml-2 font-sf-semibold">{participantsCount} person joined</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

export default TripBox;

export const CurrentTripData: TripDetails = {
  id: 1,
  title: "Trip to Paris",
  dateRange: "25/06/65-01/07/65",
  image: "https://wallpaperbat.com/img/172005-4k-paris-wallpaper-top-free-4k-paris-background.jpg",
  participantsCount: 4,
  status: 'Traveling',
  creator: "Keenkung",
  creator_image: "https://i.pinimg.com/474x/fa/d5/e7/fad5e79954583ad50ccb3f16ee64f66d.jpg",
};