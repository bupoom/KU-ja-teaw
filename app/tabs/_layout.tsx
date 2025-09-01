import { Tabs  , useSegments   } from 'expo-router';
import React from 'react';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import {  Image , View } from 'react-native'

export default function TabsLayout() {
  const segment = useSegments(); 
  const hideTabBar = [...segment].includes("plan");
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#075952ff',
        tabBarInactiveTintColor: '#A9A9A9A9',
        tabBarStyle: {
          position: 'absolute',
          bottom: 25,
          marginHorizontal: 10,
          backgroundColor: '#ffffff',
          borderRadius: 20,
          height: 55,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.5,
          borderWidth: 1,
          borderColor: '#fff9f9ff',
        },
        tabBarItemStyle: {
          paddingTop: 8,
        },
      }}
      tabBar={hideTabBar ? () => null : undefined}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "KU JA TEAW",
          headerShown: true,
          headerLeft: () => (
            <View className="ml-5 bottom-2">
              <Image 
                source={require('@/assets/images/home_icon.png')} 
                className="w-50 h-50"
                style={{}}
              />
            </View>
          ),
          tabBarIcon: ({ size, color, focused }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="place"
        options={{
          tabBarIcon: ({ size, color, focused }) => (
            <Feather name="bookmark" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="plan"
        options={{
          tabBarIcon: ({ size, color, focused }) => (
            <Image
              source={require('../../assets/images/add_circle_icon.png')}
              //KU-ja-teaw\assets\images\add_circle_icon.png
              className="w-13 h-13 rounded-full m-3"
              resizeMode="cover"
            />
          ),
          tabBarIconStyle: {
            width: 45,
            height: 45,
            bottom: 10,
            
          }
        }}
      />
      <Tabs.Screen
        name="guide"
        options={{
          tabBarIcon: ({ size, color, focused }) => (
            <Feather name="book-open" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ size, color, focused }) => (
            <FontAwesome6 name="user-circle" size={size - 2} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}