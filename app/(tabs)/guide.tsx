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

const GuideBookmarkScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  
  const bookmarkedGuides = [
    {
      id: 1,
      title: "Trip to Paris",
      image: "https://images2.alphacoders.com/546/546391.jpg",
      copies: "555 Copy",
      duration: "5 Days",
      agent: "Agent : Keen_Kung",
      agentAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
      isBookmarked: true
    },
    {
      id: 2,
      title: "Pattaya Guide",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop&crop=center",
      copies: "555 Copy",
      duration: "7 Days",
      agent: "Agent : Keen_Kung",
      agentAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
      isBookmarked: true
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
    return 
  }

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar barStyle="light-content" backgroundColor="#075952" />
      
      {/* Header */}
      <View className="bg-teal-700 pt-12 pb-6 px-4 rounded-b-3xl">
        <Text className="text-white text-2xl py-3 font-bold text-center">Guide Bookmark</Text>
      </View>

      {/* Search Bar */}
      <View className="px-4 -mt-6 mb-6">
        <View className="bg-white rounded-full px-4 py-3 shadow-2xl border border-gray-200 flex-row items-center">
          <Feather name="search" size={20} color="#666" className="mr-3" />
          <TextInput
            placeholder="Search ..."
            value={searchText}
            onChangeText={setSearchText}
            className="flex-1 text-gray-700 ml-3"
            placeholderTextColor="#999"
          />
        </View>
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
                className="w-20 h-16 rounded-xl mr-4"
              />
              
              {/* Guide Info */}
              <View className="flex-1">
                <View className="flex-row justify-between items-start mb-2">
                  <Text className="text-lg font-semibold text-gray-800 flex-1">
                    {guide.title}
                  </Text>
                  <TouchableOpacity className="ml-2" onPress={handleUnbookmark}>
                    <Ionicons 
                      name={guide.isBookmarked ? "bookmark" : "bookmark-outline"} 
                      size={24} 
                      color={guide.isBookmarked ? "#004D40" : "gray"} 
                    />
                  </TouchableOpacity>
                </View>

                {/* Stats Row */}
                <View className="flex-row items-center mb-2">
                  <View className="flex-row items-center mr-4">
                    <Feather name="copy" size={14} color="#666" />
                    <Text className="text-sm text-gray-600 ml-1">{guide.copies}</Text>
                  </View>
                  <View className="flex-row items-center">
                    <Feather name="calendar" size={14} color="#666" />
                    <Text className="text-sm text-gray-600 ml-1">{guide.duration}</Text>
                  </View>
                </View>

                {/* Agent Info */}
                <View className="flex-row items-center">
                  <Image
                    source={{ uri: guide.agentAvatar }}
                    className="w-5 h-5 rounded-full mr-2"
                  />
                  <Text className="text-sm text-gray-600">{guide.agent}</Text>
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