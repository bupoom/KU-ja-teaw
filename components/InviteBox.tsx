import { formatDateRange } from "@/util/formatFucntion/formatDate&TimeRange";
import { truncateText } from "@/util/truncateText";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import StatusTag from "./common/StatusTag";


type InviteDetails = TripBox & {
    onPressCard?: (trip: TripBox) => void;
    onJoin?: (trip: TripBox) => void;
    onReject?: (trip: TripBox) => void;
};

export default function TripInvitationBox(Invite: InviteDetails) {
    return (
        <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray_border">
            <View className="flex-row mb-2">
                <Image
                    source={{ uri: Invite.trip_image }}
                    className="w-20 h-20 rounded-xl"
                />

                <View className="flex-1 ml-4 justify-between py-0">
                    {/* Header with trip name and status */}
                    <View className="flex-row justify-between">
                        <Text
                            className="text-lg font-semibold text-black flex-1 mr-5 leading-6"
                            numberOfLines={1}
                        >
                            {truncateText(Invite.trip_name, 20)}
                        </Text>
                        <StatusTag
                            text={
                                Invite.status_planning === "completed"
                                    ? "Complete"
                                    : "Planning"
                            }
                            bg={
                                Invite.status_planning === "completed"
                                    ? "#10B981"
                                    : "#F59E0B"
                            }
                        />
                    </View>

                    {/* Date and participants info */}
                    <View className="flex-row items-center mt-1">
                        <Feather name="calendar" size={16} color="#6B7280" />
                        <Text className="text-sm text-dark_gray ml-2 font-sf-semibold">
                            {formatDateRange(Invite.start_date, Invite.end_date)}
                        </Text>
                    </View>
                    {/* Agent/Owner info */}
                    <View className="flex-row items-center mt-2">
                        <Image
                            source={{ uri: Invite.owner_image }}
                            className="w-6 h-6 rounded-full"
                        />
                        <Text className="text-sm text-dark_gray font-sf-semibold ml-1">
                            {" "}
                            Owner: {Invite.owner_name}
                        </Text>
                    </View>
                </View>
            </View>

            {/* Action buttons */}
            <View className="flex-row mt-3 gap-2">
                <TouchableOpacity
                    onPress={() => Invite.onJoin?.(Invite)}
                    className="flex-1 bg-green_2 py-2 rounded-lg"
                    activeOpacity={0.7}
                >
                    <Text className="text-white text-center font-medium">
                        JOIN
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => Invite.onReject?.(Invite)}
                    className="flex-1 border border-gray-300 py-2 rounded-lg"
                    activeOpacity={0.7}
                >
                    <Text className="text-gray-700 text-center font-medium">
                        Reject
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
