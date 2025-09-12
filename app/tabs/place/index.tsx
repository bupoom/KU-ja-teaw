import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar,
  RefreshControl,
  SafeAreaView
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import PlaceBox from '@/components/PlaceBox';
import { mockBookmarkPlaces } from '@/mock/mockDataComplete';

// Interface definition
interface PlaceBoxData {
  id: number;
  title: string;
  rating?: number;
  review_count?: number;
  location: string;
  place_image?: string;
  place_id?: number;
}

const PlaceScreen = () => {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [places, setPlaces] = useState<PlaceBoxData[]>(mockBookmarkPlaces);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setPlaces(mockBookmarkPlaces);
    setRefreshing(false);
  }, []);

  const handleSearch = () => {
    router.push('/tabs/place/search_place');
  };

  const handleRemovePlace = useCallback((placeId: number) => {
    setPlaces(prevPlaces => 
      prevPlaces.filter(place => place.id !== placeId)
    );
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="light-content" backgroundColor="green_2" />
      
      <View className="bg-green_2 pb-6 px-4 pt-20">
        <Text className="text-white text-[35px] font-sf-bold text-center pt-2">
          Place Bookmark
        </Text>
      </View>

      <View className="px-4 py-4 bg-white">
        <TouchableOpacity
          onPress={handleSearch}
          className="flex-row items-center bg-gray-50 rounded-full px-4 py-3 border border-gray_border"
        >
          <Feather name="search" size={20} color="#666" />
          <Text className="text-gray-400 ml-3 flex-1">Search...</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={places}
        renderItem={({ item }) => (
          <PlaceBox
            id={item.id}
            title={item.title}
            rating={item.rating}
            review_count={item.review_count}
            location={item.location}
            place_image={item.place_image}
            place_id={item.place_id}
            onRemove={handleRemovePlace}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        className="flex-1 bg-white mb-20"
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={() => (
          <View className="items-center py-16">
            <Feather name="bookmark" size={48} color="#D1D5DB" />
            <Text className="text-gray-500 mt-4 text-lg">No bookmarks yet</Text>
            <Text className="text-gray-400 mt-2 text-center px-8">
              Start exploring and bookmark your favorite places!
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default PlaceScreen;