import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Platform,
  TouchableOpacity,
  Image,
} from "react-native";
import { useEffect, useState } from "react";

import { useLocalSearchParams, useRouter } from "expo-router";
import { GoogleMaps } from "expo-maps";
import { GoogleMapsMapType } from "expo-maps/build/google/GoogleMaps.types";
import Feather from "@expo/vector-icons/Feather";

import Header from "@/components/common/Header";
import DateSelector from "@/components/plan/DateSelector";

import { extractDates } from "@/util/extractDates";
import { formatDateRange } from "@/util/formatFucntion/formatDate&TimeRange";
import { truncateText } from "@/util/truncateText";

import { mockActivityPlaceBoxes } from "@/mock/mockDataComplete";
import { mockPlaceDetails } from "@/mock/mockDataComplete";
import { mockTripDetails } from "@/mock/mockDataComplete";

interface MarkerPlacePros {
  title: string;
  coordinates: { latitude: number; longitude: number };
  draggable: boolean;
}

const SF_ZOOM = 13;

const MAP = () => {
  const { plan_id } = useLocalSearchParams<{ plan_id: string }>();
  const [markerPlaces, setMarkerPlaces] = useState<MarkerPlacePros[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [placeInDate, setPLaceInDate] = useState<number>(0);
  const [currentPlaceIndex, setCurrentPlaceIndex] = useState<number>(0);
  const [isTrafficEnabled, setIsTrafficEnabled] = useState<boolean>(false);
  const [mapType, setMapType] = useState<GoogleMapsMapType>(
    GoogleMapsMapType.NORMAL
  );

  const [tripName, setTripName] = useState<string>("");
  const [tripImage, setTripImage] = useState<string>(
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop"
  );

  const router = useRouter();

  // สร้าง markers พร้อมสีที่แตกต่างกัน
  const createMarkersWithColors = (places: any[]) => {
    return places.map((place, index) => ({
      title: place.title,
      coordinates: { latitude: place.latitude, longitude: place.longitude },
      draggable: false,
    }));
  };

  // กำหนดจุดเริ่มต้นของสถานที่แสดงบนแผนที่
  const cameraPosition = {
    coordinates: {
      latitude:
        markerPlaces[currentPlaceIndex]?.coordinates.latitude ??
        markerPlaces[0]?.coordinates.latitude ??
        13.848,
      longitude:
        markerPlaces[currentPlaceIndex]?.coordinates.longitude ??
        markerPlaces[0]?.coordinates.longitude ??
        100.5723,
    },
    zoom: SF_ZOOM,
  };

  // Function สำหรับจัดการเมื่อกดที่ marker
  const handleMarkerClick = (markerIndex: number) => {
    setCurrentPlaceIndex(markerIndex);
  };

  // Function สำหรับเลื่อนไปสถานที่ก่อนหน้า
  const goToPreviousPlace = () => {
    if (markerPlaces.length > 0) {
      const newIndex =
        currentPlaceIndex > 0 ? currentPlaceIndex - 1 : markerPlaces.length - 1;
      setCurrentPlaceIndex(newIndex);
    }
  };

  // Function สำหรับเลื่อนไปสถานที่ถัดไป
  const goToNextPlace = () => {
    if (markerPlaces.length > 0) {
      const newIndex =
        currentPlaceIndex < markerPlaces.length - 1 ? currentPlaceIndex + 1 : 0;
      setCurrentPlaceIndex(newIndex);
    }
  };

  // ดึงสถานที่ปัจจุบัน
  const getCurrentPlace = () => {
    return markerPlaces[currentPlaceIndex] || null;
  };

  const toggleTraffic = () => {
    setIsTrafficEnabled(!isTrafficEnabled);
  };

  const toggleMapType = () => {
    setMapType((currentType) =>
      currentType === GoogleMapsMapType.SATELLITE
        ? GoogleMapsMapType.NORMAL
        : GoogleMapsMapType.SATELLITE
    );
  };

  const fetchDataByDate = (date: string) => {
    // เลือก activity ของ trip ปัจจุบัน
    const activity = mockActivityPlaceBoxes.filter(
      (act) => act.trip_id === parseInt(plan_id) && act.date === date
    );

    // หา place ที่ตรงกับ activity
    const places = activity
      .map((act) => mockPlaceDetails.find((place) => place.id === act.place_id))
      .filter((p): p is PlaceDetails => !!p);

    console.log(
      `Places on ${date} (${places.length}): ${places.map((p) => p?.title).join(", ")}`
    );

    // สร้าง markers พร้อมสี
    const newMarkerPlaces = createMarkersWithColors(places);

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
      setTripImage(trip.trip_image);
      setTripName(trip.trip_name);
    }
  }, [plan_id]);

  const handleBack = () => {
    router.back();
  };

  const currentPlace = getCurrentPlace();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="light-content" backgroundColor="#ffffff" />
      <Header title="Map" onBackPress={handleBack} />
      <View className="flex-1 relative">
        {Platform.OS === "android" ? (
          <GoogleMaps.View
            style={{ flex: 1 }}
            properties={{
              isBuildingEnabled: true,
              mapType: mapType,
              selectionEnabled: true,
              isMyLocationEnabled: false,
              isTrafficEnabled: isTrafficEnabled,
              minZoomPreference: 1,
            }}
            cameraPosition={cameraPosition}
            markers={markerPlaces}
            onMarkerClick={(e) => {
              const clickedMarkerIndex = markerPlaces.findIndex(
                (marker) =>
                  e.coordinates &&
                  marker.coordinates.latitude === e.coordinates.latitude &&
                  marker.coordinates.longitude === e.coordinates.longitude
              );

              if (clickedMarkerIndex !== -1) {
                handleMarkerClick(clickedMarkerIndex);
              }
            }}
          />
        ) : (
          <View className="flex-1 items-center justify-center px-4">
            <Text>Maps are only available on Android and iOS</Text>
          </View>
        )}
        <View className="absolute top-4 right-4 flex-col space-y-2">
          {/* Traffic Toggle */}
          <TouchableOpacity
            onPress={toggleTraffic}
            className={`w-12 h-12 rounded-full items-center justify-center shadow-lg mb-4 
              ${isTrafficEnabled ? "bg-green_2" : "bg-white"}`}
          >
            <Feather
              name="navigation"
              size={20}
              color={isTrafficEnabled ? "white" : "#666"}
            />
          </TouchableOpacity>

          {/* Map Type Toggle */}
          <TouchableOpacity
            onPress={toggleMapType}
            className={`w-12 h-12 rounded-full items-center justify-center shadow-lg
            ${mapType === GoogleMapsMapType.NORMAL ? "bg-white" : "bg-green_2"}`}
          >
            <Feather
              name="layers"
              size={20}
              color={mapType === GoogleMapsMapType.NORMAL ? "#666" : "white"}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View className="bg-white">
        {/* Trip Header with Background Image */}
        <View className="relative h-24 mb-4">
          <Image
            source={{
              uri:
                tripImage ??
                "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop",
            }}
            className="w-full h-full"
            resizeMode="cover"
          />
          {/* Gradient Overlay */}
          <View className="absolute inset-0 bg-black/70 w-[50%] p-2 rounded-lg ml-2 mb-2 mt-2">
            {/* Trip Info Overlay */}
            <View className="absolute inset-0 p-4 justify-center">
              <Text
                className="text-white text-lg font-bold mb-1"
                numberOfLines={1}
              >
                {truncateText(tripName, 25)}
              </Text>

              <View className="flex-row items-center mb-1">
                <Feather name="calendar" size={16} color="#ffffff" />
                <Text className="text-white text-xs ml-1">
                  {dates.length > 0 &&
                    formatDateRange(dates[0], dates[dates.length - 1])}
                </Text>
              </View>

              <View className="flex-row items-center">
                <Feather name="map-pin" size={16} color="#ffffff" />
                <Text className="text-white text-xs ml-1">
                  {placeInDate} Place{placeInDate !== 1 ? "s" : ""} today
                </Text>
              </View>
            </View>
          </View>
        </View>

        <DateSelector
          dates={dates}
          selectedDate={dates[0]}
          onDateSelect={(date) => fetchDataByDate(date)}
        />

        {/* Place Navigation */}
        <View className="flex-row justify-between items-center py-3 mb-10">
          {/* ปุ่ม Previous */}
          <TouchableOpacity
            onPress={goToPreviousPlace}
            className="p-2 ml-6"
            disabled={markerPlaces.length <= 1}
          >
            <Feather
              name="chevron-left"
              size={24}
              color={markerPlaces.length > 1 ? "black" : "#ccc"}
            />
          </TouchableOpacity>

          {/* ชื่อสถานที่ */}
          <View className="flex-1 items-center">
            {markerPlaces.length > 0 ? (
              <>
                <Text
                  className="text-lg font-semibold text-center"
                  numberOfLines={1}
                >
                  {truncateText(currentPlace?.title, 40)}
                </Text>
                {markerPlaces.length > 0 && (
                  <Text className="text-sm text-gray-500">
                    {currentPlaceIndex + 1} of {markerPlaces.length}
                  </Text>
                )}
              </>
            ) : (
              <>
                <Text className="text-base text-gray-500 font-medium">
                  No places today
                </Text>
                <Text className="text-sm text-gray-500">0 of 0</Text>
              </>
            )}
          </View>

          {/* ปุ่ม Next */}
          <TouchableOpacity
            onPress={goToNextPlace}
            className="p-2 mr-6"
            disabled={markerPlaces.length <= 1}
          >
            <Feather
              name="chevron-right"
              size={24}
              color={markerPlaces.length > 1 ? "black" : "#ccc"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MAP;
