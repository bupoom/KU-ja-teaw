import { View, Text, SafeAreaView } from "react-native";
import { usePathname, useRouter, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";

import { mockTripDetails } from "@/mock/mockDataComplete";
import { mockNotes } from "@/mock/mockDataComplete";
import { mockFileGroups } from "@/mock/mockDataComplete";
import { mockFlights } from "@/mock/mockDataComplete";

import PlanHeader from "@/components/PlanHeader";

const index = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { plan_id } = useLocalSearchParams<{ plan_id: string }>();

  useEffect(() => {
    console.log(pathname)
  }, []);

  return (
    <SafeAreaView>
      <PlanHeader planId={plan_id} />
      <View className="flex items-center justify-center">
        <Text>Overview</Text>
      </View>
    </SafeAreaView>
  );
};
export default index;
