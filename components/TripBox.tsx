import { useRouter, usePathname } from "expo-router";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons';

const get_status_color = (status:string) => {
  switch (status) {
    case "Complete":
      return "#6B7280"; 
    case "Coming":
      return "#3B82F6"; 
    case "Now":
      return "#10B981"; 
    default:
      return "#6B7280"; 
  }
}

const TripBox = ({ // Component ของ guide ใน Guide Book mark
  id,
  title,
  image,
  dateRange,
  participantsCount,
  status,
  creator,
  creator_image,
}: TripDetails) =>  {
  const pathname = usePathname();
  const router = useRouter()
  
  const handleTripPress = (trip_id: number): void => {
    router.push(`/trips/${trip_id}`)
    // Alert.alert("Navigate to Guide Plan", `Going to ${guide_title}`)
  };

  if (pathname === '/tabs' || pathname === '/tabs/profile') {
    return (
      <TouchableOpacity 
        key={id}
        onPress={() => handleTripPress(id)}
        className="bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray-100"
        activeOpacity={0.7}
      >
        <View className="flex-row items-center">
          <Image
            source={{ uri: image }}
            className="w-24 h-24 rounded-xl mr-4"
          />

          <View className="flex-1 ml-5">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-lg font-semibold text-gray-800 flex-1 mr-2">{title}</Text>
              <View 
                className="px-3 py-1 rounded-full"
                style={{ backgroundColor: get_status_color(status) }}
              >
                <Text className="text-white text-sm font-medium">
                  {status}
                </Text>
              </View>
            </View>

            <View className="flex-row items-center mb-1">
              <Feather name="calendar" size={14} color="#6B7280" />
              <Text className="text-gray-600 text-sm ml-2">{dateRange}</Text>
            </View>

            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Feather name="users" size={14} color="#6B7280" />
                <Text className="text-gray-600 text-sm ml-2">{participantsCount} person joined</Text>
              </View>
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

export const MockTripsData: TripDetails[] = [
  {
    id: 1,
    title: "Trip to Thailand",
    dateRange: "25/08/65-01/08/65",
    image: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=300&h=200&fit=crop",
    creator: "Keen_Kung",
    creator_image: "https://i.pinimg.com/474x/fa/d5/e7/fad5e79954583ad50ccb3f16ee64f66d.jpg",
    participantsCount: 5,
    status: 'Completed',
  },
  {
    id: 2,
    title: "Trip of Osaka",
    dateRange: "15/09/65-22/09/65",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=300&h=200&fit=crop",
    creator: "Oshi_Kung",
    creator_image: "https://i.pinimg.com/474x/fa/d5/e7/fad5e79954583ad50ccb3f16ee64f66d.jpg",
    participantsCount: 3,
    status: "Completed",
  },
  {
    id: 3,
    title: "Trip to Tokyo",
    dateRange: "10/10/65-17/10/65",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=300&h=200&fit=crop",
    creator: "Travel_Pro",
    creator_image: "https://i.pinimg.com/474x/fa/d5/e7/fad5e79954583ad50ccb3f16ee64f66d.jpg",
    participantsCount: 7,
    status: "Planning",
  },
  {
    id: 4,
    title: 'Tokyo Adventure',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=80&h=80&fit=crop',
    dateRange: 'Dec 15-22, 2024',
    participantsCount: 4,
    status: 'Traveling',
    creator:"keen_kung",
    creator_image: "#",
  },
  {
    id: 5,
    title: 'Bali Retreat',
    image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=80&h=80&fit=crop',
    dateRange: 'Jan 10-17, 2025',
    participantsCount: 2,
    status: 'Coming',
    creator:"keen_kung",
    creator_image: "#",
  },
  {
    id: 6,
    title: 'Paris Getaway',
    image: 'https://images2.alphacoders.com/546/546391.jpg',
    dateRange: 'Nov 5-12, 2024',
    participantsCount: 3,
    status: 'Completed',
    creator:"keen_kung",
    creator_image: "#",
  },
  {
    id: 7,
    title: 'Swiss Alps',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=80&h=80&fit=crop',
    dateRange: 'Sep 20-27, 2024',
    participantsCount: 5,
    status: 'Completed',
    creator:"keen_kung",
    creator_image: "#",
  }
];

{/* Stats Section */}
        
{/* <View className="mx-4 -mt-6 mb-6">
  <View className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
    <View className="flex-row justify-around">
      <View className="items-center">
        <Text className="text-2xl font-bold text-gray-800">
          {tripSections.reduce((acc, section) => acc + section.trips.length, 0)}
        </Text>
        <Text className="text-gray-500 text-sm">Total Trips</Text>
      </View>
      <View className="w-px bg-gray-200" />
      <View className="items-center">
        <Text className="text-2xl font-bold text-green-600">
          {tripSections.find(s => s.title === 'Current Trip')?.trips.length || 0}
        </Text>
        <Text className="text-gray-500 text-sm">Active</Text>
      </View>
      <View className="w-px bg-gray-200" />
      <View className="items-center">
        <Text className="text-2xl font-bold text-blue-600">
          {tripSections.find(s => s.title === 'Upcoming Trips')?.trips.length || 0}
        </Text>
        <Text className="text-gray-500 text-sm">Upcoming</Text>
      </View>
    </View>
  </View>
</View> */}