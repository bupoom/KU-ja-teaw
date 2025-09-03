import { useRouter, usePathname } from "expo-router";
import { View, Image, Text, TouchableOpacity , Alert} from "react-native";
import { Feather, Ionicons } from '@expo/vector-icons';


const renderStars = (rating:number) => { // function คิดรูปดาว
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Ionicons key={i} name="star" size={14} color="#FFD700" />
      );
    }
    if (hasHalfStar) {
      stars.push(
        <Ionicons key="half" name="star-half" size={14} color="#FFD700" />
      );
    }
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Ionicons key={`empty-${i}`} name="star-outline" size={14} color="#E0E0E0" />
      );
    }
    return stars;
};

const PlaceBox = ({ // Component ของ guide ใน Guide Book mark
  id,
  title,
  rating,
  reviewCount,
  location,
  image,
}: PlaceDetails) =>  {
  const pathname = usePathname();
  const give_bookmark  = pathname === '/tabs/place'
  const router = useRouter()
  const  handleUnbookmark  = () => {
    // fetch API ลบ bookmark ทิ้ง
    Alert.alert('unbookmark แล้วไอโง่');
    return 
  }
  
  const handlePlaceBoxPress = (guide_title: string): void => {
    router.push('/places/[place_id]')
    // Alert.alert("Navigate to Guide Plan", `Going to ${guide_title}`)
  };

  if (pathname === '/tabs/place' || pathname === '/tabs/place/search_place') {
    return (
      <TouchableOpacity 
        key={id}
        className="bg-white w-full rounded-lg p-3 mb-3 shadow-sm border border-gray-100"
        onPress={() => handlePlaceBoxPress(title)}
      >
        <View className="flex-row">
          {/* Place Image */}
          <Image source={{ uri: image }} className="w-20 h-20 rounded-xl"/>
          {/* Place Info */}
          <View className="flex-1 ml-5">
            <View className="flex-row justify-between items-start mb-2">
              <Text className="text-lg font-semibold text-gray-800 flex-1">{title}</Text>
              <TouchableOpacity className="ml-2" onPress={handleUnbookmark}>
              {give_bookmark && (
                <Ionicons name={"bookmark"} size={24} color={"#004D40"} />
              )}
              </TouchableOpacity>
            </View>
            {/* Rating Row */}
            <View className="flex-row items-center mb-2">
              <View className="flex-row items-center mr-2">{renderStars(rating)}</View>
              <Text className="text-sm text-gray-600 ml-1">{rating} ({reviewCount})</Text>
            </View>
            {/* Location Info */}
            <View className="flex-row items-center">
              <Feather name="map-pin" size={14} color="#666" />
              <Text className="text-sm text-gray-600 ml-1">{location}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  } else if (pathname === '/tabs') {
    return (
      <TouchableOpacity 
        className="mr-4 w-48 bg-white rounded-xl shadow-sm overflow-hidden"
        onPress={() => handlePlaceBoxPress(title)}
        activeOpacity={0.8}
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 6,
          elevation: 2,
        }}
      >
        <Image 
          source={{ uri: image }} 
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
          
          <Text 
            className="text-sm text-gray-500 mb-2" 
            numberOfLines={1}
          >
            {location}
          </Text>
          
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Feather name="star" size={14} color="#FFA500" />
              <Text className="text-sm font-semibold text-gray-700 ml-1">
                {rating}
              </Text>
            </View>
            
            <Text className="text-xs text-gray-400 font-medium">
              {reviewCount.toLocaleString()} reviews
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

export default PlaceBox;


export const MockDataPlace: PlaceDetails[] = [
  {
    id: 1,
    title: "Nut burito club",
    rating: 2,
    reviewCount: 437,
    location: "Paris, France",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/84/16/3a/caption.jpg?w=900&h=500&s=1",
  },
  {
    id: 2,
    title: "Oshi's mom cafe",
    rating: 4.5,
    reviewCount: 1792,
    location: "Pattaya, Thailand",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/84/16/3a/caption.jpg?w=900&h=500&s=1",
  },
  {
    id: 3,
    title: "Sakura Sushi Bar",
    rating: 4.7,
    reviewCount: 2150,
    location: "Tokyo, Japan",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/84/16/3a/caption.jpg?w=900&h=500&s=1",
  },
  {
    id: 4,
    title: "Brooklyn Pizza House",
    rating: 4.3,
    reviewCount: 1289,
    location: "New York, USA",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/84/16/3a/caption.jpg?w=900&h=500&s=1",
  },
  {
    id: 5,
    title: "La Dolce Vita",
    rating: 4.8,
    reviewCount: 982,
    location: "Rome, Italy",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/84/16/3a/caption.jpg?w=900&h=500&s=1",
  },
  {
    id: 6,
    title: "Spicy Dragon Hotpot",
    rating: 4.6,
    reviewCount: 1433,
    location: "Chengdu, China",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/84/16/3a/caption.jpg?w=900&h=500&s=1",
  },
  {
    id: 7,
    title: "Bondi Beach Grill",
    rating: 4.4,
    reviewCount: 764,
    location: "Sydney, Australia",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/84/16/3a/caption.jpg?w=900&h=500&s=1",
  },
  {
    id: 8,
    title: "El Mariachi Cantina",
    rating: 4.2,
    reviewCount: 521,
    location: "Mexico City, Mexico",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/84/16/3a/caption.jpg?w=900&h=500&s=1",
  }
];