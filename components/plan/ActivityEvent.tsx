import React from "react";
import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import TransportationIcon from "../common/TransportIcon";

interface ActivityEventEndProps {
    activity: ActivityEventBox;
}

const ActivityEvent: React.FC<ActivityEventEndProps> = ({ activity }) => {
    return (
        <View className="flex-row items-center p-3 bg-white border border-gray_border rounded-lg">
            <View className="w-12 h-12 bg-white items-center justify-center ml-4 ">
                <TransportationIcon transportation={activity.transportation} />
            </View>
            <View className="flex-1 ml-7">
                <Text className="text-base font-semibold text-black mb-1">
                    {activity.title}
                </Text>
                <View className="flex-row items-center font-semibold">
                    <Feather name="clock" size={14} color="#666" />
                    <Text className="text-xs text-dark_gray ml-1 font-semibold">
                        {activity.time_begin} - {activity.time_end}
                    </Text>
                    {activity.transportation && (
                        <>
                            <Text className="text-sm text-gray-400 mx-2 font-semibold">
                                •
                            </Text>
                            <Text className="text-xs text-dark_gray font-semibold">
                                {activity.transportation}
                            </Text>
                        </>
                    )}
                </View>
            </View>
        </View>
    );
};

export default ActivityEvent;
