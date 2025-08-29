import React, { useState , useCallback} from 'react';
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  StatusBar,
  RefreshControl,
  Alert
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const PlaceScreen = () => {
  const route = useRouter()
  const [refreshing, setRefreshing] = useState(false);
  
  const bookmarkedPlaces = [
    {
      id: 1,
      title: "Nut burito club",
      rating: 2,
      total_rating: 437,
      location: "Paris, France",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvCsa70MIJzwtmqjWS5XubF-LQbZAE4Z4SFQ&s",
    },
    {
      id: 2,
      title: "Oshi's mom cafe",
      rating: 4.5,
      total_rating: 1792,
      location: "Pattaya, Thailand",
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/84/16/3a/caption.jpg?w=900&h=500&s=1",
    }
  ];

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    // await fetch ข้อมูลใหม่
    setRefreshing(false);
  }, []);

  const handleUnbookmark = () => {
    // fetch API ลบ bookmark ทิ้ง
    onRefresh()
    Alert.alert('unbookmark แล้วไอโง่');
    return 
  }

  const handleSearch = () => {
      route.push('/(tabs)/place/search_place')
  }

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
  
  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar barStyle="light-content" backgroundColor="#075952" />
      
      {/* Header */}
      <View className="bg-teal-700 pt-12 pb-6 px-4 rounded-b-3xl">
        <Text className="text-white text-2xl py-3 font-bold text-center">Place Bookmark</Text>
      </View>

      {/* Search Bar */}
      <View className="px-4 -mt-6 mb-6">
        <View className="bg-white rounded-full p-7 shadow-sm border border-gray-200">
          <TouchableOpacity 
            onPress={handleSearch}
            className="bg-white flex-row items-center"
          >
            <Feather name="search" size={20} color="#666" className="mr-3" />
            <Text className='text-gray-400'> Search...</Text>
          </TouchableOpacity>
        </View>
        <View
          className='mt-4 w-10/16 border-hairline border-s border-gray-300'
        />
      </View>
      
      {/* Bookmarked Places List */}
      <ScrollView 
        className="flex-1 px-4" 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      > 
        {bookmarkedPlaces.map((place) => (
          <TouchableOpacity 
            key={place.id}
            className="bg-white rounded-2xl p-3 mb-3 shadow-sm border border-gray-100"
          >
            <View className="flex-row">
              {/* Place Image */}
              <Image
                source={{ uri: place.image }}
                className="w-20 h-20 rounded-xl mr-4"
              />
              
              {/* Place Info */}
              <View className="flex-1">
                <View className="flex-row justify-between items-start mb-2">
                  <Text className="text-lg font-semibold text-gray-800 flex-1">
                    {place.title}
                  </Text>
                  <TouchableOpacity className="ml-2" onPress={handleUnbookmark}>
                    <Ionicons 
                      name={"bookmark"} 
                      size={24} 
                      color={"#004D40"} 
                    />
                  </TouchableOpacity>
                </View>

                {/* Rating Row */}
                <View className="flex-row items-center mb-2">
                  <View className="flex-row items-center mr-2">
                    {renderStars(place.rating)}
                  </View>
                  <Text className="text-sm text-gray-600 ml-1">
                    {place.rating} ({place.total_rating})
                  </Text>
                </View>

                {/* Location Info */}
                <View className="flex-row items-center">
                  <Feather name="map-pin" size={14} color="#666" />
                  <Text className="text-sm text-gray-600 ml-1">{place.location}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {/* Empty State or Load More */}
        <View className="items-center py-8">
          <Text className="text-gray-400 text-sm">No more bookmarks</Text>
        </View>

        {/* Bottom spacing for tab bar */}
        <View className="h-20" />
      </ScrollView>
    </View>
  );
};

export default PlaceScreen;