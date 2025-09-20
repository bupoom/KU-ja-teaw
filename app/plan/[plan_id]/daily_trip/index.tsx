import { useLocalSearchParams } from "expo-router";
import { SafeAreaView, Text } from "react-native";

import PlanHeader from "@/components/PlanHeader";

const DailyTripsIndex = () => {
    const { plan_id } = useLocalSearchParams<{ plan_id: string }>();
    return (
        <SafeAreaView>
            <PlanHeader planId={plan_id} />
            <Text>Daily Trip</Text>
        </SafeAreaView>
    );
};
export default DailyTripsIndex;