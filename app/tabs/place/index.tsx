import React, { useState , useCallback} from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  ScrollView, 
  TouchableOpacity, 
  StatusBar,
  RefreshControl,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import PlaceBox , { MockDataPlace } from '@/components/PlaceBox';

const PlaceScreen = () => {
  const route = useRouter()
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    // await fetch ข้อมูลใหม่
    setRefreshing(false);
  }, []);

  const handleSearch = () => {
      route.push('/tabs/place/search_place')
  }
  
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
        <View  className='mt-4 w-10/16 border-hairline border-s border-gray-300'/>
      </View>
      
      {/* Bookmarked Places List */}
      <ScrollView 
        className="flex-1 px-4" 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      > 
        <FlatList
          data={MockDataPlace}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <PlaceBox {...item} />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
          className="pb-5"
          scrollEnabled={false}
        />

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