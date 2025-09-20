import React from "react";
import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

interface ActivityEventBox {
    id: number;
    title: string;
    date: string;
    time_begin: string;
    time_end: string;
    transportation?: string;
    Notes?: any[];
    trip_id: number;
}

interface ActivityEventEndProps {
    activity: ActivityEventBox;
}

const getTransportationIcon = (transportation?: string): React.ReactElement => {
    switch (transportation?.toLowerCase()) {
        case "car":
            return <Feather name="truck" size={24} color="#666" />;
        case "train":
            return <MaterialIcons name="train" size={24} color="#666" />;
        case "bus":
            return (
                <MaterialIcons name="directions-bus" size={24} color="#666" />
            );
        case "plane":
            return <Ionicons name="airplane" size={24} color="#666" />;
        case "boat":
            return <Feather name="anchor" size={24} color="#666" />;
        case "walk":
            return <FontAwesome5 name="walking" size={24} color="#666" />;
        default:
            return <Feather name="navigation" size={24} color="#666" />;
    }
};

const ActivityEventEnd: React.FC<ActivityEventEndProps> = ({ activity }) => {
    return (
        <View className="flex-row items-center p-3 bg-white border border-gray_border rounded-lg">
            <View className="w-12 h-12 bg-white items-center justify-center ml-4 ">
                {getTransportationIcon(activity.transportation)}
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

export default ActivityEventEnd;
