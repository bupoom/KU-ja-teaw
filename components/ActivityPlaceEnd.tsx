import React from 'react';
import { View, Text, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { truncateText } from '@/util/truncateText';

interface ActivityPlaceBox {
  id: number;
  title: string;
  date: string;
  time_begin: string;
  time_end: string;
  location: string;
  place_id?: number;
  place_image?: string;
  trip_id: number;
}

interface ActivityPlaceEndProps {
  activity: ActivityPlaceBox;
}

const ActivityPlaceEnd: React.FC<ActivityPlaceEndProps> = ({ activity }) => {
  return (
    <View className="flex-row p-3 bg-white border border-gray_border rounded-lg">
      <Image
        source={{
          uri: activity.place_image || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop'
        }}
        className="w-16 h-16 rounded-lg"
        resizeMode="cover"
      />
      <View className="flex-1 ml-3">
        <Text className="text-base font-semibold text-black mb-1">
          {truncateText(activity.title, 25)}
        </Text>
        <View className="flex-row items-center mb-1">
          <Feather name="clock" size={14} color="#666" />
          <Text className="text-xs text-dark_gray ml-2 font-semibold">
            {activity.time_begin} - {activity.time_end}
          </Text>
        </View>
        <View className="flex-row items-center">
          <Feather name="map-pin" size={14} color="#666" />
          <Text className="text-xs text-dark_gray ml-2 font-semibold" numberOfLines={1}>
            {activity.location}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ActivityPlaceEnd;