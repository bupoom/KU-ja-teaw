import PlanHeader from "@/components/PlanHeader";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView, Text } from "react-native";

const GroupIndex = () => {
    const { plan_id } = useLocalSearchParams<{ plan_id: string }>();

    return (
        <SafeAreaView>
            <PlanHeader planId={plan_id} />
            <Text>Group</Text>
        </SafeAreaView>
    );
};
export default GroupIndex;
