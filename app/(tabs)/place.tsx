import React, { useState , useCallback} from 'react';
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  StatusBar,
  TextInput,
  RefreshControl,
  Alert
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';

const PlaceScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  
  const bookmarkedPlaces = [
    {
      id: 1,
      title: "Trip to Paris",
      rating: 3,
      total_rating: 437,
      location: "Paris, France",
      image: "https://images2.alphacoders.com/546/546391.jpg",
      isBookmarked: true
    },
    {
      id: 2,
      title: "Pattaya Guide",
      rating: 4.5,
      total_rating: 1792,
      location: "Pattaya, Thailand",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop&crop=center",
      isBookmarked: true
    }
  ];

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    // await fetch ข้อมูลใหม่
    Alert.alert('รีเฟรชแล้ว');
    setRefreshing(false);
  }, []);

  const handleUnbookmark = () => {
    // fetch API ลบ bookmark ทิ้ง
    onRefresh()
    Alert.alert('unbookmark แล้วไอโง่');
    return 
  }

  const handleSearch = () => {
    // redirect ไป dynamic page
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
        <View className="bg-white rounded-full px-4 py-3 shadow-sm border border-gray-200 flex-row items-center">
          <Feather name="search" size={20} color="#666" className="mr-3" />
          <TextInput 
            placeholder="Search ..."
            value={searchText}
            onChangeText={setSearchText}
            className="flex-1 text-gray-700 ml-3"
            placeholderTextColor="#999"
            onPress={handleSearch}
          />
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
                className="w-20 h-16 rounded-xl mr-4"
              />
              
              {/* Place Info */}
              <View className="flex-1">
                <View className="flex-row justify-between items-start mb-2">
                  <Text className="text-lg font-semibold text-gray-800 flex-1">
                    {place.title}
                  </Text>
                  <TouchableOpacity className="ml-2" onPress={handleUnbookmark}>
                    <Ionicons 
                      name={place.isBookmarked ? "bookmark" : "bookmark-outline"} 
                      size={24} 
                      color={place.isBookmarked ? "#004D40" : "gray"} 
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