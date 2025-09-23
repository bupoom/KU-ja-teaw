import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import Header from "@/components/common/Header";

const PlanSetting = () => {
    const router = useRouter();
    const handleBack = () => {
        router.back();
    };
    return (
        <View>
            <Header title="Setting" onBackPress={handleBack} />
            <Text>setting_plan</Text>
        </View>
    );
};
export default PlanSetting;
