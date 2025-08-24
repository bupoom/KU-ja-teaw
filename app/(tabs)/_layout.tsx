import { Tabs , router , useSegments   } from 'expo-router'; // plan 
import React from 'react';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function TabsLayout() {
  const segment = useSegments(); // plan 
  const hideTabBar = [...segment].includes("plan"); // plan 
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
      tabBar={hideTabBar ? () => null : undefined} // plan 
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "HOME",
          headerShown: true,
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
            <Feather name="plus-circle" size={size + 15} color={color}/>
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