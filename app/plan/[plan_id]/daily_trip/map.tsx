import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import {useEffect, useState } from "react";

import { useLocalSearchParams, useRouter } from "expo-router";
import { GoogleMaps } from "expo-maps";
import { GoogleMapsMapType } from "expo-maps/build/google/GoogleMaps.types";
import Feather from '@expo/vector-icons/Feather';

import Header from "@/components/common/Header";
import DateSelector from "@/components/plan/DateSelector";

import { extractDates } from "@/util/extractDates";
import { formatDateRange } from "@/util/formatFucntion/formatDate&TimeRange";

import { mockActivityPlaceBoxes } from "@/mock/mockDataComplete";
import { mockPlaceDetails } from "@/mock/mockDataComplete";
import { mockTripDetails } from "@/mock/mockDataComplete";

interface MarkerPlacePros {
  title: string;
  coordinates: { latitude: number; longitude: number };
  draggable: boolean;
}

const SF_ZOOM = 12;

const map = () => {
  const { plan_id } = useLocalSearchParams<{ plan_id: string }>();
  const [markerPlaces, setMarkerPlaces] = useState<MarkerPlacePros[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [placeInDate, setPLaceInDate] = useState<number>(0);
  const [currentPlaceIndex, setCurrentPlaceIndex] = useState<number>(0); // เพิ่ม state สำหรับ index ปัจจุบัน

  const router = useRouter();

  // กำหนดจุดเริ่มต้นของสถานที่แสดงบนแผนที่ (ใช้ currentPlaceIndex)
  const cameraPosition = {
    coordinates: {
      latitude: markerPlaces[currentPlaceIndex]?.coordinates.latitude ?? markerPlaces[0]?.coordinates.latitude ?? 13.848,
      longitude: markerPlaces[currentPlaceIndex]?.coordinates.longitude ?? markerPlaces[0]?.coordinates.longitude ?? 100.5723,
    },
    zoom: SF_ZOOM,
  };

  // Function สำหรับเลื่อนไปสถานที่ก่อนหน้า
  const goToPreviousPlace = () => {
    if (markerPlaces.length > 0) {
      const newIndex = currentPlaceIndex > 0 
        ? currentPlaceIndex - 1 
        : markerPlaces.length - 1; // วนกลับไปที่สุดท้าย
      setCurrentPlaceIndex(newIndex);
    }
  };

  // Function สำหรับเลื่อนไปสถานที่ถัดไป
  const goToNextPlace = () => {
    if (markerPlaces.length > 0) {
      const newIndex = currentPlaceIndex < markerPlaces.length - 1 
        ? currentPlaceIndex + 1 
        : 0; // วนกลับไปที่แรก
      setCurrentPlaceIndex(newIndex);
    }
  };

  // Function สำหรับไปยังสถานที่ที่เจาะจง
  const goToPlace = (index: number) => {
    if (index >= 0 && index < markerPlaces.length) {
      setCurrentPlaceIndex(index);
    }
  };

  // ดึงสถานที่ปัจจุบัน
  const getCurrentPlace = () => {
    return markerPlaces[currentPlaceIndex] || null;
  };

  const fetchDataByDate = (date: string) => {
    // เลือก activity ของ trip ปัจจุบัน
    const activity = mockActivityPlaceBoxes.filter(
      (act) => act.trip_id === parseInt(plan_id) && act.date === date
    );

    // หา place ที่ตรงกับ activity
    const places = activity
      .map((act) => mockPlaceDetails.find((place) => place.id === act.place_id))
      .filter((p): p is PlaceDetails => !!p); // type guard กัน undefined

    console.log(
      `Places on ${date} (${places.length}): ${places.map((p) => p?.title).join(", ")}`
    );

    // map ให้กลายเป็น MarkerPlacePros
    const newMarkerPlaces = places.map((p) => ({
      title: p.title,
      coordinates: { latitude: p.latitude, longitude: p.longitude },
      draggable: false,
    }));

    setMarkerPlaces(newMarkerPlaces);
    setPLaceInDate(places.length);
    setCurrentPlaceIndex(0); // รีเซ็ต index เมื่อเปลี่ยนวันที่
  };

  useEffect(() => {
    // find all dates for this trip
    const trip = mockTripDetails.find((t) => t.trip_id === parseInt(plan_id));
    if (trip) {
      const allDates = extractDates(trip.start_date, trip.end_date);
      setDates(allDates);

      if (allDates.length > 0) {
        fetchDataByDate(allDates[0]);
      }
    }
  }, [plan_id]);

  useEffect(() => {
    console.log(`Marker Places :`, markerPlaces);
    console.log(`Current Place Index :`, currentPlaceIndex);
    console.log(`Current Place :`, getCurrentPlace());
  }, [markerPlaces, currentPlaceIndex]);

  const handleBack = () => {
    router.back();
  };

  const currentPlace = getCurrentPlace();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="light-content" backgroundColor="#ffffff" />
      <Header title="Map" onBackPress={handleBack} />
      <DateSelector
        dates={dates}
        selectedDate={dates[0]}
        onDateSelect={(date) => fetchDataByDate(date)}
      />
      {Platform.OS === "android" ? (
        <GoogleMaps.View
          style={{ flex: 1 }}
          properties={{
            isBuildingEnabled: true,
            mapType: GoogleMapsMapType.SATELLITE,
            selectionEnabled: true,
            isMyLocationEnabled: false, // requires location permission
            isTrafficEnabled: true,
            minZoomPreference: 1,
          }}
          cameraPosition={cameraPosition}
          markers={markerPlaces}
        />
      ) : (
        <View className="flex-1 items-center justify-center px-4">
          <Text>Maps are only available on Android and iOS</Text>
        </View>
      )}
      
      <View className="bg-white p-4">
        {/* Date Range และจำนวนสถานที่ */}
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-gray-600">
            {dates.length > 0 && formatDateRange(dates[0], dates[dates.length - 1])}
          </Text>
          <Text className="text-gray-600">
            {placeInDate} Place{placeInDate > 1 ? 's' : ''}
          </Text>
        </View>
        
        {/* Place Navigation */}
        {markerPlaces.length > 0 && (
          <View className="flex-row justify-between items-center">
            <TouchableOpacity 
              onPress={goToPreviousPlace}
              className="p-2"
              disabled={markerPlaces.length <= 1}
            >
              <Feather 
                name="chevron-left" 
                size={24} 
                color={markerPlaces.length > 1 ? "black" : "#ccc"} 
              />
            </TouchableOpacity>
            
            <View className="flex-1 items-center">
              <Text className="text-lg font-semibold text-center" numberOfLines={1}>
                {currentPlace?.title || 'No places available'}
              </Text>
              {markerPlaces.length > 1 && (
                <Text className="text-sm text-gray-500">
                  {currentPlaceIndex + 1} of {markerPlaces.length}
                </Text>
              )}
            </View>
            
            <TouchableOpacity 
              onPress={goToNextPlace}
              className="p-2"
              disabled={markerPlaces.length <= 1}
            >
              <Feather 
                name="chevron-right" 
                size={24} 
                color={markerPlaces.length > 1 ? "black" : "#ccc"} 
              />
            </TouchableOpacity>
          </View>
        )}

        {/* Place Indicators (optional - แสดงจุดเล็กๆ เพื่อบอกตำแหน่งปัจจุบัน) */}
        {markerPlaces.length > 1 && (
          <View className="flex-row justify-center mt-3 space-x-2">
            {markerPlaces.map((_, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => goToPlace(index)}
                className={`w-2 h-2 rounded-full ${
                  index === currentPlaceIndex ? 'bg-green_2' : 'bg-gray-300'
                }`}
              />
            ))}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default map;