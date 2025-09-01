import React, { useState , useCallback} from 'react';
import { 
  View, 
  Text,
  ScrollView, 
  TouchableOpacity, 
  StatusBar,
  RefreshControl,
  Alert,
  FlatList
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import GuideBox , { MockDataGuides } from '@/components/GuideBox'
    //  MockDataGuides คือข้อมูลจำลองอยู่ใน file /components/GuideBox
    //  สิ่งที่ต้องแก้ไขเพิ่มเติมคือ
    //  - ใส่ API Function 
    //  - ใส่ routing ไปยัง dynamic page นั้นๆ

const GuideBookmarkScreen = () => {
  const route = useRouter()
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    // awiat fetch ข้อมูลใหม่
    Alert.alert('รีเฟรซแล้ว');
    setRefreshing(false);
  }, []);

  const handleSearch = () => {
    route.push('/tabs/guide/search_guide')
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
        < View className="bg-white rounded-full p-7 shadow-sm border border-gray-200" >
          <TouchableOpacity 
            onPress={handleSearch}
            className="bg-white flex-row items-center"
          >
            <Feather name="search" size={20} color="#666" className="mr-3" />
            <Text className='text-gray-400'> Search...</Text>
          </TouchableOpacity>
        </View>
        <View className='mt-4 w-10/16 border-hairline border-s border-gray-300' />
      </View>
      
      {/* Bookmarked Guides List */}
      <ScrollView 
        className="flex-1 px-3"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      > 
        <FlatList
          data={MockDataGuides}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <GuideBox {...item} />
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

export default GuideBookmarkScreen;