import { Stack } from 'expo-router';
import { Platform, Text } from 'react-native';
import React from 'react';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
            backgroundColor: '#ffffff', // สีพื้นหลัง header
        },
        headerTintColor: 'black', // สีข้อความและไอคอน
        headerTitleStyle: {
            
            fontWeight: 'bold',
            fontSize: 18,
        },
        headerTitleAlign: 'center', // จัดชื่อหน้าตรงกลาง
        // Custom back button - ลูกศรไม่มีหาง
      }}>
      
      <Stack.Screen 
        name="index" 
        options={{
            title: "Plan",
            headerShown: false,
        }}
      />
      
      <Stack.Screen 
        name="create" 
        options={{
            title: 'Create Trip',
            headerStyle: {    
            
            },
        }}
      />
      
      <Stack.Screen 
        name="join" 
        options={{
          title: 'Join Trip',
          headerStyle: {
            
          },
        }}
      />
      
      <Stack.Screen 
        name="setpassword" 
        options={{
          title: 'ตั้งรหัสผ่าน',
          headerStyle: {
            
          },
        }}
      />
    </Stack>
  );
}