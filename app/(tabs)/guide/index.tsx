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
import { useRouter } from 'expo-router';

const GuideBookmarkScreen = () => {
  const route = useRouter()
  const [searchText, setSearchText] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  
  const bookmarkedGuides = [
    {
      id: 1,
      title: "Trip to Paris",
      image: "https://images2.alphacoders.com/546/546391.jpg",
      copies: 473,
      duration: 5,
      user: "Keen_Kung",
      userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
    },
    {
      id: 2,
      title: "Pattaya Guide",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop&crop=center",
      copies: 1976,
      duration: 7,
      user: "Keen_Kung",
      userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
    }
  ];

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    // awiat fetch ข้อมูลใหม่
    Alert.alert('รีเฟรซแล้ว');
    setRefreshing(false);
  }, []);

  const  handleUnbookmark  = () => {
    // fetch API ลบ bookmark ทิ้ง
    onRefresh()
    Alert.alert('unbookmark แล้วไอโง่');
    return 
  }

  const handleSearch = () => {
    route.push('/(tabs)/guide/search_place')
  }
  
  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#075952" />
      
      {/* Header */}
      <View className="bg-teal-700 pt-12 pb-6 px-4 rounded-b-3xl">
        <Text className="text-white text-2xl py-3 font-bold text-center">Guide Bookmark</Text>
      </View>

      {/* Search Bar */}
      <View className="px-4 -mt-6 mb-6">
        < View 
          className="bg-white rounded-full p-7 shadow-sm border border-gray-200"
        >
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
      
      {/* Bookmarked Guides List */}
      <ScrollView 
        className="flex-1 px-4" 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      > 
        {bookmarkedGuides.map((guide) => (
          <TouchableOpacity 
            key={guide.id}
            className="bg-white rounded-2xl p-3 mb-3 shadow-sm border border-gray-100"
          >
            <View className="flex-row">
              {/* Guide Image */}
              <Image
                source={{ uri: guide.image }}
                className="w-20 h-20 rounded-xl mr-4"
              />
              
              {/* Guide Info */}
              <View className="flex-1">
                <View className="flex-row justify-between items-start mb-2">
                  <Text className="text-lg font-semibold text-gray-800 flex-1">
                    {guide.title}
                  </Text>
                  <TouchableOpacity className="ml-2" onPress={handleUnbookmark}>
                    <Ionicons 
                      name= {"bookmark"}
                      size={24} 
                      color={"#004D40"} 
                    />
                  </TouchableOpacity>
                </View>

                {/* Stats Row */}
                <View className="flex-row items-center mb-2">
                  <View className="flex-row items-center mr-4">
                    <Feather name="copy" size={14} color="#666" />
                    <Text className="text-sm text-gray-600 ml-1">{guide.copies} copied</Text>
                  </View>
                  <View className="flex-row items-center">
                    <Feather name="calendar" size={14} color="#666" />
                    <Text className="text-sm text-gray-600 ml-1">{guide.duration} days</Text>
                  </View>
                </View>

                {/* user Info */}
                <View className="flex-row items-center">
                  <Image
                    source={{ uri: guide.userAvatar }}
                    className="w-5 h-5 rounded-full mr-2"
                  />
                  <Text className="text-sm text-gray-600">{guide.user}</Text>
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

export default GuideBookmarkScreen;