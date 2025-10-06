import { Feather, Ionicons } from "@expo/vector-icons";
import DateTimePicker, {
    DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    Alert,
    Image,
    Modal,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import Header from "@/components/common/Header";

import { get_more_detail } from "@/service/APIserver/userService";
import { get_trip_member } from "@/service/APIserver/groupPage";
import {
    get_trip_detail,
    leaveTrips,
    deleteTrip,
    updateTripDetail,
} from "@/service/APIserver/tripApi";

const PlanSetting = () => {
    const router = useRouter();
    const { plan_id } = useLocalSearchParams<{ plan_id: string }>();
    const [userRole, setUserRole] = useState<string>("");
    const [canEdit, setCanEdit] = useState<boolean>(false);

    const [planningStatus, setPlanningStatus] = useState<string>("");
    const [tripBudget, setTripBudget] = useState<number | undefined>(undefined);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [posterUri, setPosterUri] = useState<string | null>(null);

    const [tripCode, setTripCode] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [newOwner, setNewOwner] = useState<number>(0);
    const [otherMembers, setOtherMembers] = useState<TripMember[]>([]);
    const [showLeaveModal, setShowLeaveModal] = useState(false);

    // Date
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);

    const fetch_data = async () => {
        try {
            const UserDetail = await get_more_detail(parseInt(plan_id)); // Viewer
            const TripsDetail = await get_trip_detail(parseInt(plan_id));
            const Member = await get_trip_member(parseInt(plan_id));
            setPlanningStatus(
                TripsDetail.trip_status === "completed"
                    ? "planning"
                    : "complete"
            );
            setTripBudget(TripsDetail.budget);
            setStartDate(new Date(TripsDetail.start_date));
            setEndDate(new Date(TripsDetail.end_date));
            setPosterUri(TripsDetail.trip_image);
            setTripCode(UserDetail.trip_code);

            setUserRole(UserDetail.role);
            setCanEdit(UserDetail.role === "Owner");
            setOtherMembers(
                Member.filter(member => member.id !== UserDetail.collab_id)
            );
        } catch (err) {
            console.error("Failed to fetch detail:", err);
        }
    };

    const handleChangeTripDetails = async (
        type: string,
        value: any,
        value2?: any
    ): Promise<void> => {
        // ใช้ Partial เพื่ออัปเดตบาง field ได้
        const NewData: Partial<PatchTrip> = { trip_id: parseInt(plan_id) };

        switch (type) {
            case "planning_status":
                NewData.planning_status = value === "complete";
                break;

            case "date":
                if (value && value2) {
                    NewData.start_date = value;
                    NewData.end_date = value2;
                } else {
                    console.warn("Invalid date range");
                    return;
                }
                break;

            case "budget":
                NewData.budget = Number(value);
                break;

            case "trip_pass":
                NewData.trip_pass = String(value);
                break;

            case "trip_picture_path":
                NewData.trip_picture_path = String(value);
                break;

            default:
                console.warn("Invalid update type:", type);
                return;
        }

        try {
            const res = await updateTripDetail(NewData);
        } catch (err) {
            console.error("Update failed:", err);
            Alert.alert("Failed to change", type);
        }
    };

    useEffect(() => {
        if (plan_id) {
            fetch_data();
        }
    }, [plan_id]);

    // Handle Date
    const handleDateChange = (
        event: DateTimePickerEvent,
        selectedDate: Date | undefined,
        type: "start" | "end"
    ) => {
        if (selectedDate) {
            if (type === "start") setStartDate(selectedDate);
            else setEndDate(selectedDate);
        }
    };

    // Handle Poster
    const pickPosterImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 0.8,
        });

        if (!result.canceled) {
            setPosterUri(result.assets[0].uri);
        }
    };

    const handleStatusChange = (status: string) => {
        setPlanningStatus(status);
        handleChangeTripDetails("planning_status", status);
        console.log(`Updating plan ${plan_id} status to: ${status}`);
    };

    const handleConfirmBudget = () => {
        console.log(`Update budget for plan: ${plan_id} : ${tripBudget} Baht`);
        handleChangeTripDetails("budget", tripBudget);
        Alert.alert("Success", "Budget updated successfully!");
    };

    const handleConfirmDate = () => {
        if (!startDate || !endDate) {
            Alert.alert("Error", "Please select both start and end dates");
            return;
        }
        if (startDate && endDate && startDate.getTime() >= endDate.getTime()) {
            Alert.alert("Error", "End date must be after start date");
            return;
        }
        handleChangeTripDetails("date", startDate, endDate);
        console.log(
            `Update dates for plan: ${plan_id} - Start: ${startDate}, End: ${endDate}`
        );
        Alert.alert("Success", "Date duration updated successfully!");
    };

    const handleConfirmPoster = () => {
        if (!posterUri) {
            Alert.alert("Error", "Please select a poster image first");
            return;
        }
        console.log(`Update poster for plan: ${plan_id} : ${posterUri}`);
        handleChangeTripDetails("trip_picture_path",posterUri)
        Alert.alert("Success", "Trip poster updated successfully!");
    };

    const handleConfirmPassword = () => {
        console.log(`Update password for plan: ${plan_id} : ${password}`);
        handleChangeTripDetails("trip_pass",password)
        Alert.alert("Success", "Password updated successfully!");
    };

    const handleLeaveTrip = () => {
        // ของ user ธรรมดา
        if (canEdit) {
            setShowLeaveModal(true);
        } else {
            Alert.alert(
                "Leave Trip",
                "Are you sure you want to leave this trip?",
                [
                    { text: "Cancel", style: "cancel" },
                    {
                        text: "Leave",
                        style: "destructive",
                        onPress: () => {
                            console.log(`Leaving trip: ${plan_id}`);
                            try {
                                leaveTrips(parseInt(plan_id), 0);
                                router.replace("/tabs/(home)");
                            } catch (err) {
                                Alert.alert(
                                    "fetch to leave trip. please try again later"
                                );
                            }
                        },
                    },
                ]
            );
        }
    };

    const handleConfirmLeave = () => {
        // ของ owner
        console.log(
            `Transferring ownership to user ${newOwner} and leaving trip: ${plan_id}`
        );
        try {
            leaveTrips(parseInt(plan_id), newOwner);
        } catch (err) {
            Alert.alert("fetch to leave trip. please try again later");
        }
        router.replace("/tabs/(home)");
        setShowLeaveModal(false);
        router.replace("/tabs/(home)");
    };

    const handleDeleteTrip = () => {
        Alert.alert(
            "Delete Trip",
            "Are you sure you want to delete this trip? This action cannot be undone.",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        console.log(`Deleting trip: ${plan_id}`);
                        try {
                            const success = await deleteTrip(parseInt(plan_id));
                            if (success) {
                                console.log("Trip deleted successfully");
                                router.replace("/tabs/(home)");
                            }
                        } catch (err) {
                            console.error("Failed to delete trip:", err);
                        }
                    },
                },
            ]
        );
    };

    return (
        <View className="flex-1 bg-white">
            <Header title="Setting" onBackPress={router.back} />

            <ScrollView
                className="flex-1 p-4"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 50,
                }}
            >
                {/* Set Planning Status */}
                <View className="bg-white rounded-lg p-4 mb-4 border border-gray_border">
                    <Text className="text-lg font-medium mb-3 ml-2">
                        Set Planning Status
                    </Text>
                    <View className="flex-row">
                        <TouchableOpacity
                            onPress={() => handleStatusChange("planning")}
                            disabled={!canEdit}
                            className={`flex-1 py-2 px-4 rounded-l-md ${
                                planningStatus === "planning"
                                    ? "bg-green_2"
                                    : "bg-gray-200"
                            }`}
                        >
                            <Text
                                className={`text-center font-medium ${
                                    planningStatus === "planning"
                                        ? "text-white"
                                        : "text-gray-600"
                                }`}
                            >
                                Planning
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handleStatusChange("complete")}
                            disabled={!canEdit}
                            className={`flex-1 py-2 px-4 rounded-r-md ${
                                planningStatus === "complete"
                                    ? "bg-green_2"
                                    : "bg-gray-200"
                            }`}
                        >
                            <Text
                                className={`text-center font-medium ${
                                    planningStatus === "complete"
                                        ? "text-white"
                                        : "text-gray-600"
                                }`}
                            >
                                Complete
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Set Trip Budget */}
                <View className="bg-white rounded-lg p-4 mb-4 border border-gray_border flex-col">
                    <View className="flex-row justify-between items-center mb-2">
                        <Text className="text-black text-lg font-medium ml-2">
                            Set Trip Budget :
                        </Text>
                        <TextInput
                            value={
                                tripBudget != null ? tripBudget.toString() : ""
                            }
                            onChangeText={text => {
                                const numericText = text.replace(/[^0-9]/g, "");
                                setTripBudget(
                                    numericText
                                        ? Number(numericText)
                                        : undefined
                                );
                            }}
                            className="border border-gray_border rounded-lg text-center self-center flex-1 ml-2 mr-2 mb-2"
                            keyboardType="numeric"
                            placeholder="Enter budget"
                            textAlign="center"
                            textAlignVertical="center"
                            editable={canEdit}
                        />
                        <Text className="text-black text-lg">Baht</Text>
                    </View>

                    {canEdit && (
                        <TouchableOpacity
                            onPress={handleConfirmBudget}
                            disabled={!canEdit}
                            className="bg-green_2 py-3 rounded-md"
                        >
                            <Text className="text-white text-center font-medium">
                                Confirm Change Budget
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>

                {/* Change Date Duration */}
                <View className="bg-white rounded-lg p-4 mb-4 border border-gray_border flex-col">
                    <Text className="text-lg font-medium mb-3 ml-2">
                        Change Date Duration
                    </Text>
                    <View className="flex-row mb-3 gap-3">
                        <TouchableOpacity
                            onPress={() => setShowStartPicker(true)}
                            disabled={!canEdit}
                            className="flex-1 flex-row items-center border border-gray_border p-3 rounded-lg"
                        >
                            <Feather
                                name="calendar"
                                size={20}
                                color="#6B7280"
                            />
                            <Text className="ml-2 text-gray-700">
                                {startDate
                                    ? startDate.toDateString()
                                    : "Not set"}
                            </Text>
                        </TouchableOpacity>
                        {showStartPicker && (
                            <DateTimePicker
                                value={startDate || new Date()}
                                mode="date"
                                display="default"
                                onChange={(e, date) => {
                                    setShowStartPicker(false);
                                    handleDateChange(e, date, "start");
                                }}
                            />
                        )}

                        <TouchableOpacity
                            onPress={() => setShowEndPicker(true)}
                            disabled={!canEdit}
                            className="flex-1 flex-row items-center border border-gray_border p-3 rounded-lg"
                        >
                            <Feather
                                name="calendar"
                                size={20}
                                color="#6B7280"
                            />
                            <Text className="ml-2 text-gray-700">
                                {endDate ? endDate.toDateString() : "Not Set"}
                            </Text>
                        </TouchableOpacity>
                        {showEndPicker && (
                            <DateTimePicker
                                value={endDate || new Date()}
                                mode="date"
                                display="default"
                                onChange={(e, date) => {
                                    setShowEndPicker(false);
                                    handleDateChange(e, date, "end");
                                }}
                            />
                        )}
                    </View>

                    {canEdit && (
                        <TouchableOpacity
                            onPress={handleConfirmDate}
                            disabled={!canEdit}
                            className="bg-green_2 py-3 rounded-md mb-3"
                        >
                            <Text className="text-white text-center font-medium">
                                Confirm Change Date
                            </Text>
                        </TouchableOpacity>
                    )}

                    {canEdit && (
                        <View className="flex-col items-center justify-center">
                            <Text className="text-gray-500 text-xs">
                                The new schedule will follow the original date
                                order
                            </Text>
                            <Text className="text-gray-500 text-xs">
                                Dates falling before the original range will be
                                removed
                            </Text>
                        </View>
                    )}
                </View>

                {/* Change Poster Trip */}
                <View className="bg-white rounded-lg p-4 mb-4 border border-gray_border">
                    <Text className="text-lg font-medium mb-3 ml-2">
                        Change Poster Trip
                    </Text>
                    <TouchableOpacity
                        onPress={pickPosterImage}
                        disabled={!canEdit}
                        className="border-2 border-dashed border-gray-300 rounded-lg p-4 items-center mb-3"
                    >
                        {posterUri ? (
                            <Image
                                source={{ uri: posterUri }}
                                className="w-full h-40 rounded-lg"
                                resizeMode="cover"
                            />
                        ) : (
                            <>
                                <Ionicons
                                    name="image-outline"
                                    size={40}
                                    color="#9CA3AF"
                                />
                                <Text className="text-gray-400 text-sm mt-2">
                                    Upload Pictures to Change Trip Poster
                                </Text>
                            </>
                        )}
                    </TouchableOpacity>
                    {canEdit && (
                        <TouchableOpacity
                            onPress={handleConfirmPoster}
                            disabled={!canEdit}
                            className="bg-green_2 py-3 rounded-md"
                        >
                            <Text className="text-white text-center font-medium">
                                Confirm Change Poster
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>

                {/* Trip Code & Password */}
                {canEdit && (
                    <View className="bg-white rounded-lg p-4 mb-4 border border-gray_border">
                        <Text className="text-lg font-medium mb-3 ml-2">
                            Trip Code & Password
                        </Text>
                        <View className="mb-3 flex-row items-center">
                            <Text className="text-sm text-gray-600 mb-1 font-medium">
                                Code :
                            </Text>
                            <Text className="text-base font-normal ml-2">
                                {tripCode}
                            </Text>
                        </View>
                        <View className="mb-3">
                            <Text className="text-sm text-gray-600 mb-1 font-medium">
                                Password :
                            </Text>
                            <TextInput
                                value={password}
                                onChangeText={setPassword}
                                className="border border-gray-300 rounded-lg text-left p-2 font-normal"
                                placeholder={password}
                                maxLength={20}
                            />
                        </View>
                        <Text className="text-right text-dark_gray text-sm font-sf mb-2">
                            {password.length}/20 characters
                        </Text>
                        <TouchableOpacity
                            onPress={handleConfirmPassword}
                            className="bg-green_2 py-3 rounded-md"
                        >
                            <Text className="text-white text-center font-medium">
                                Confirm Password
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}

                {/* Leave Trip */}
                <TouchableOpacity
                    onPress={handleLeaveTrip}
                    className="mb-4 border border-gray_border rounded-lg p-4"
                >
                    <Text className="text-red-500 text-center font-medium">
                        Leave Trip
                    </Text>
                </TouchableOpacity>

                {/* Delete Trip */}
                {canEdit && (
                    <TouchableOpacity
                        onPress={handleDeleteTrip}
                        className="bg-red-500 border border-gray_border rounded-lg p-4"
                    >
                        <Text className="text-white text-center font-medium">
                            Delete Trip
                        </Text>
                    </TouchableOpacity>
                )}
            </ScrollView>

            {/* Leave Trip Modal */}
            <Modal
                visible={showLeaveModal}
                animationType="slide"
                onRequestClose={() => setShowLeaveModal(false)}
            >
                <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray_border">
                    {/* ✅ ปุ่ม Back: ปิด modal ได้จริง */}
                    <TouchableOpacity
                        onPress={() => setShowLeaveModal(false)}
                        className="p-2"
                    >
                        <Ionicons name="chevron-back" size={24} color="#333" />
                    </TouchableOpacity>

                    <Text className="text-lg font-semibold text-black">
                        Leave Trip
                    </Text>

                    <View className="w-10" />
                </View>

                <View className="flex-col bg-white p-4">
                    <View className="flex-col items-start mb-2 mt-2">
                        <Text className="text-gray-600">
                            Leaving this trip will remove your access.
                        </Text>
                        <Text className="text-gray-600">
                            You&apos;re the trip Owner, Please assign your role
                            before leaving.
                        </Text>
                    </View>

                    {/* Select New Owner */}
                    {otherMembers.length >= 1 ? (
                        <Text className="text-lg font-medium mb-3 ml-2">
                            Select New Owner
                        </Text>
                    ) : (
                        <Text className="text-lg text-red-500 font-medium mb-3 ml-2">
                            No one is managing this trip anymore. If you wish to
                            remove it, please tap Delete Trip instead.
                        </Text>
                    )}

                    <ScrollView className="max-h-60 mb-4">
                        {otherMembers.map(member => (
                            <TouchableOpacity
                                key={member.id}
                                onPress={() => setNewOwner(member.id)}
                                className={`flex-row items-center p-3 rounded-lg mb-2 border ${
                                    newOwner === member.id
                                        ? "border-green_2 bg-green-50"
                                        : "border-gray-200"
                                }`}
                            >
                                <Image
                                    source={{ uri: member.user_image }}
                                    className="w-10 h-10 rounded-full"
                                />
                                <Text className="text-base font-medium ml-3">
                                    {member.name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {/* Confirm Button */}
                    {otherMembers.length >= 1 && (
                        <TouchableOpacity
                            onPress={handleConfirmLeave}
                            className="bg-red-500 py-4 rounded-lg"
                        >
                            <Text className="text-white text-center font-medium text-lg">
                                Confirm
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </Modal>
        </View>
    );
};

export default PlanSetting;
