import FlightCard from "@/components/plan/FlightCard";
import NoteItem from "@/components/plan/NoteItem";
import Feather from "@expo/vector-icons/Feather";
import DateTimePicker, {
    DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useLocalSearchParams, usePathname } from "expo-router";
import { useEffect, useState } from "react";
import {
    Alert,
    Modal,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import {
    mockFlights,
    mockNotes,
    mockTripMembers,
} from "@/mock/mockDataComplete";

import PlanHeader from "@/components/PlanHeader";

const PlanIndex = () => {
    const { plan_id } = useLocalSearchParams<{ plan_id: string }>();
    const user_id = 1;
    const pathName = usePathname();

    // State management
    const [userRole, setUserRole] = useState<string>("");

    // Note State
    const [overviewNotes, setOverviewNotes] = useState<Note[]>([]); // Note ทั้งหมด ในหน้า Overview
    const [isModalVisible, setIsModalVisible] = useState(false); // เอาไว้ โชว์ Note ของคนอื่นที่ไม่ใช่ของเรา
    const [editingNoteId, setEditingNoteId] = useState<number | null>(null); // บอกว่า ตอนนี้กำลังเเก้ Note Id ไหนอยู่
    const [editText, setEditText] = useState(""); // text ใน Note ของเราที่เเก้ไข

    // Flight State
    const [flights, setFlights] = useState<Flight[]>([]); // เก็บ Flights ของเราเอาไว้
    const [isFlightModalVisible, setIsFlightModalVisible] = useState(false); // เอาไว้เเสดง Form ที่จะเเก้ไข หรือ เพิ่ม flight
    const [isShowFlights, setIsShowFlights] = useState(true); // บอกว่าตอนนี้ชะโชว์ flights หรือจะซ่อนไว้
    const [editingFlightId, setEditingFlightId] = useState<number | null>(null); // บอกว่า ตอนนี้กำลังเเก้ Flight Id ไหนอยู่
    const [flightForm, setFlightForm] = useState({
        departure_date: "",
        departure_time: "",
        departure_country: "",
        departure_airport: "",
        arrival_date: "",
        arrival_time: "",
        arrival_country: "",
        arrival_airport: "",
        airline: "",
    }); // เอาไว้กรอก Form ตอนเพิ่ม หรือ เเก้ไข Flight

    // State สำหรับ toggle picker ของ date, time Flights
    const [showDepartureDate, setShowDepartureDate] = useState(false); // เอาไว้โชว์ ตัวที่ให้เลือก Date ขึ้นมา
    const [showDepartureTime, setShowDepartureTime] = useState(false); // เอาไว้โชว์ ตัวที่ให้เลือก Time ขึ้นมา
    const [showArrivalDate, setShowArrivalDate] = useState(false);
    const [showArrivalTime, setShowArrivalTime] = useState(false);

    const canEdit = userRole === "owner" || userRole === "editor"; // เอาไว้เช็คเงื่อนไข ว่าเเก้ไขได้ไหม

    useEffect(() => {
        if (plan_id) {
            // Fetch user role
            const memberData = mockTripMembers.find(
                member =>
                    member.trip_id === parseInt(plan_id) &&
                    member.id === user_id
            );
            if (memberData) {
                setUserRole(memberData.role);
            }

            // Fetch overview notes
            const notes = mockNotes.filter(
                note =>
                    note.trip_id === parseInt(plan_id) &&
                    note.reference_type === "overview"
            );
            setOverviewNotes(notes);

            // Fetch flights
            const flightData = mockFlights.filter(
                flight => flight.trip_id == parseInt(plan_id)
            );
            setFlights(flightData);
            console.log(`Current Path : ${pathName}`);
            console.log(`Plan Id : ${plan_id}`);
            console.log(`User Id : ${user_id} => Role : ${memberData?.role}`);
            console.log(notes);
        }
    }, [plan_id]);

    // Note management functions

    const userNotes = overviewNotes.filter(
        note => note.refer_user_id === user_id
    ); // กรองจาก Note Overview ทั้งหมด ให้เอาเเค่ ตรง กับ user_id เรา

    const commentNotes = overviewNotes.filter(
        note => note.refer_user_id !== user_id
    ); // กรองจาก Note Overview ทั้งหมด ให้เอาเเค่ ไม่ตรง กับ user_id เรา

    //  ---------- handle user action --------------
    const handleEditNote = (note: Note) => {
        if (note.refer_user_id === user_id) {
            setEditingNoteId(note.id);
            setEditText(note.note_text);
        }
    };

    const handleSaveEdit = (noteId: number) => {
        setOverviewNotes(prev =>
            prev.map(note =>
                note.id === noteId ? { ...note, note_text: editText } : note
            )
        );
        setEditingNoteId(null);
        setEditText("");
    };

    const handleCancelEdit = () => {
        setEditingNoteId(null);
        setEditText("");
    };
    // ---  Flight management functions   ---
    const resetFlightForm = () => {
        setFlightForm({
            departure_date: "",
            departure_time: "",
            departure_country: "",
            departure_airport: "",
            arrival_date: "",
            arrival_time: "",
            arrival_country: "",
            arrival_airport: "",
            airline: "",
        });
    };
    const handleAddFlight = () => {
        resetFlightForm();
        setEditingFlightId(null);
        setIsFlightModalVisible(true);
    };
    const handleEditFlight = (flight: Flight) => {
        if (canEdit) {
            // Parse the date and time from the flight data
            const departureDateTime = new Date(flight.departure_date);
            const arrivalDateTime = new Date(flight.arrival_date);

            setFlightForm({
                departure_date: departureDateTime.toISOString().split("T")[0],
                departure_time: departureDateTime.toTimeString().slice(0, 5),
                departure_country: flight.departure_country,
                departure_airport: flight.departure_airport,
                arrival_date: arrivalDateTime.toISOString().split("T")[0],
                arrival_time: arrivalDateTime.toTimeString().slice(0, 5),
                arrival_country: flight.arrival_country,
                arrival_airport: flight.arrival_airport,
                airline: flight.airline,
            });
            setEditingFlightId(flight.id);
            setIsFlightModalVisible(true);
        }
    }; // เอาไว้กรองค่าใหม่ลง Flights Form
    const handleSaveFlight = () => {
        if (!validateFlightForm()) return; // เช็คว่าต้องมี Date เเละ Time ถ้าไม่เช็คมันจะ Error

        if (editingFlightId) {
            // Update existing flight
            setFlights(prev =>
                prev.map(flight =>
                    flight.id === editingFlightId
                        ? {
                              ...flight,
                              departure_date: `${flightForm.departure_date}T${flightForm.departure_time}:00`,
                              arrival_date: `${flightForm.arrival_date}T${flightForm.arrival_time}:00`,
                              departure_country: flightForm.departure_country,
                              departure_airport: flightForm.departure_airport,
                              arrival_country: flightForm.arrival_country,
                              arrival_airport: flightForm.arrival_airport,
                              airline: flightForm.airline,
                          }
                        : flight
                )
            );
        } else {
            // Add new flight
            const newFlight: Flight = {
                id: Math.max(...flights.map(f => f.id), 0) + 1,
                departure_date: `${flightForm.departure_date}T${flightForm.departure_time}:00`,
                arrival_date: `${flightForm.arrival_date}T${flightForm.arrival_time}:00`,
                departure_country: flightForm.departure_country,
                departure_airport: flightForm.departure_airport,
                arrival_country: flightForm.arrival_country,
                arrival_airport: flightForm.arrival_airport,
                airline: flightForm.airline,
                trip_id: parseInt(plan_id!),
            };
            setFlights(prev => [...prev, newFlight]);
        }
        setIsFlightModalVisible(false);
        resetFlightForm();
    };
    const handleCancelFlight = () => {
        setIsFlightModalVisible(false);
        setEditingFlightId(null);
        resetFlightForm();
    };
    const handleDeleteFlight = (id: number) => {
        Alert.alert(
            "Delete Flight",
            "Are you sure you want to delete this flight?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => {
                        setFlights(prev =>
                            prev.filter(flight => flight.id !== id)
                        );
                        setIsFlightModalVisible(false);
                    },
                },
            ]
        );
    };
    const onChangeDate = (
        event: DateTimePickerEvent,
        selectedDate: Date | undefined,
        field: "departure_date" | "arrival_date" // เอาไว้บอกว่าจะเเก้อันไหน
    ) => {
        if (selectedDate) {
            const iso = selectedDate.toISOString().split("T")[0];
            setFlightForm(prev => ({ ...prev, [field]: iso }));
        }
    }; // เวลาเลือกวัน DateTimePicker ส่ง Date object มา  แปลงเป็น YYYY-MM-DD แล้วเก็บใน state
    const onChangeTime = (
        event: DateTimePickerEvent,
        selectedDate: Date | undefined,
        field: "departure_time" | "arrival_time" // เอาไว้บอกว่าจะเเก้อันไหน
    ) => {
        if (selectedDate) {
            const time = selectedDate.toTimeString().slice(0, 5); // HH:mm
            setFlightForm(prev => ({ ...prev, [field]: time }));
        }
    }; // เวลาเลือกเวลา: DateTimePicker ส่ง Date object มา  แปลงเป็น HH:mm แล้วเก็บใน state

    //  ---------- Catch error Function --------------
    const validateFlightForm = () => {
        if (!flightForm.departure_date) {
            Alert.alert("Missing Field", "Please select a departure date.");
            return false;
        }
        if (!flightForm.departure_time) {
            Alert.alert("Missing Field", "Please select a departure time.");
            return false;
        }
        if (!flightForm.arrival_date) {
            Alert.alert("Missing Field", "Please select an arrival date.");
            return false;
        }
        if (!flightForm.arrival_time) {
            Alert.alert("Missing Field", "Please select an arrival time.");
            return false;
        }
        return true;
    };

    return (
        <View className="flex-1 bg-white">
            <PlanHeader planId={plan_id!} />

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {/* Notes Section */}
                <View className="mx-4 mt-4 bg-white">
                    {/* Notes Header */}
                    <TouchableOpacity
                        className="flex-row items-center justify-between py-4"
                        onPress={() => setIsModalVisible(true)}
                    >
                        <Text className="text-xl font-bold text-black ml-4">
                            Notes
                        </Text>
                        <Feather
                            name={
                                isModalVisible ? "chevron-up" : "chevron-down"
                            }
                            size={24}
                            color="#000"
                            className="ml-4"
                        />
                    </TouchableOpacity>

                    {/* Notes Content */}
                    <View className="pb-4">
                        {userNotes.map(note => (
                            <NoteItem
                                key={note.id}
                                note={note}
                                userId={user_id}
                                onSave={handleSaveEdit}
                            />
                        ))}
                    </View>
                </View>

                {/* International Flight Section */}
                <View className="mx-4 mt-6 bg-white">
                    <TouchableOpacity
                        className="flex-row items-center justify-between py-4"
                        onPress={() => setIsShowFlights(!isShowFlights)}
                    >
                        <Text className="text-xl font-bold text-black ml-4">
                            International Flight
                        </Text>
                        <Feather
                            name={isShowFlights ? "chevron-down" : "chevron-up"}
                            size={24}
                            color="#000"
                        />
                    </TouchableOpacity>
                    {isShowFlights ? (
                        <View className="pb-4">
                            {flights.map(flight => (
                                <FlightCard
                                    key={flight.id}
                                    flight={flight}
                                    onPress={handleEditFlight}
                                />
                            ))}

                            {/* Add Flight Button - only show for owner/editor */}
                            {canEdit && (
                                <TouchableOpacity
                                    onPress={handleAddFlight}
                                    className="bg-green_2 rounded-lg py-3 mt-3 mx-2"
                                >
                                    <Text className="text-white text-center font-medium">
                                        Add Flight
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    ) : (
                        <View></View>
                    )}
                </View>

                {/* Group File Section */}
                <View className="mx-4 mt-6 bg-white">
                    <TouchableOpacity className="flex-row items-center justify-between py-4">
                        <Text className="text-xl font-bold text-black ml-6">
                            Group File
                        </Text>
                        <Feather name="chevron-down" size={24} color="#000" />
                    </TouchableOpacity>
                    <View className="pb-4">
                        <View className="bg-gray-50 rounded-lg p-4">
                            <Text className="text-gray-500 text-center">
                                Coming soon...
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Notes Modal */}
            <Modal
                visible={isModalVisible}
                animationType="slide"
                presentationStyle="pageSheet"
            >
                <SafeAreaView className="flex-1 bg-white">
                    {/* Modal Header */}
                    <View className="flex-row items-center justify-center p-4 border-b border-gray-200 relative">
                        <Text className="text-lg font-semibold text-gray-900 ml-2">
                            All Notes
                        </Text>
                        <TouchableOpacity
                            onPress={() => setIsModalVisible(false)}
                            className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center absolute top-4 right-4"
                        >
                            <Feather name="x" size={20} color="#6B7280" />
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Text className="text-xs font-semibold text-gray-400 flex-1 justify-end mr-2">
                            ( {commentNotes.length} notes )
                        </Text>
                    </View>

                    {/* Modal Content */}
                    <ScrollView className="flex-1 p-4">
                        {userNotes.map(note => (
                            <NoteItem
                                key={note.id}
                                note={note}
                                userId={user_id}
                                onSave={handleSaveEdit}
                            />
                        ))}
                    </ScrollView>
                </SafeAreaView>
            </Modal>

            {/* Flight Modal */}
            <Modal
                visible={isFlightModalVisible}
                animationType="slide"
                presentationStyle="pageSheet"
            >
                <SafeAreaView className="flex-1 bg-white">
                    {/* Modal Header */}
                    <View className="flex-row items-center justify-center p-4 border-b border-gray-200 relative">
                        <Text className="text-lg font-semibold text-gray-900">
                            {editingFlightId ? "Edit Flight" : "Add Flight"}
                        </Text>
                        <TouchableOpacity
                            onPress={handleCancelFlight}
                            className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center absolute top-4 right-4"
                        >
                            <Feather name="x" size={20} color="#6B7280" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView className="flex-1 p-4">
                        {/* DEPART Section */}
                        <View className="mb-6">
                            <Text className="text-lg font-bold text-gray-900 mb-4">
                                DEPART
                            </Text>

                            {/* Date + Time row */}
                            <View className="flex-row gap-4 mb-4">
                                <View className="flex-1">
                                    <Text className="text-sm text-gray-700 mb-2">
                                        Date
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() =>
                                            setShowDepartureDate(true)
                                        }
                                        className="bg-gray-100 rounded-lg p-3"
                                    >
                                        <Text className="text-gray-700">
                                            {flightForm.departure_date ||
                                                "Select Date"}
                                        </Text>
                                    </TouchableOpacity>
                                    {showDepartureDate && (
                                        <DateTimePicker
                                            value={
                                                flightForm.departure_date
                                                    ? new Date(
                                                          flightForm.departure_date
                                                      )
                                                    : new Date()
                                            }
                                            mode="date"
                                            display="default"
                                            onChange={(e, date) => {
                                                setShowDepartureDate(false);
                                                onChangeDate(
                                                    e,
                                                    date,
                                                    "departure_date"
                                                );
                                            }}
                                        />
                                    )}
                                </View>

                                <View className="flex-1">
                                    <Text className="text-sm text-gray-700 mb-2">
                                        Time
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() =>
                                            setShowDepartureTime(true)
                                        }
                                        className="bg-gray-100 rounded-lg p-3"
                                    >
                                        <Text className="text-gray-700">
                                            {flightForm.departure_time ||
                                                "Select Time"}
                                        </Text>
                                    </TouchableOpacity>
                                    {showDepartureTime && (
                                        <DateTimePicker
                                            value={new Date()}
                                            mode="time"
                                            display="default"
                                            is24Hour={true}
                                            onChange={(e, date) => {
                                                setShowDepartureTime(false);
                                                onChangeTime(
                                                    e,
                                                    date,
                                                    "departure_time"
                                                );
                                            }}
                                        />
                                    )}
                                </View>
                            </View>
                            <View className="flex-row gap-4 mb-4">
                                <View className="flex-1">
                                    <Text className="text-sm text-gray-700 mb-2">
                                        Country
                                    </Text>
                                    <TextInput
                                        value={flightForm.departure_country}
                                        onChangeText={text =>
                                            setFlightForm(prev => ({
                                                ...prev,
                                                departure_country: text,
                                            }))
                                        }
                                        placeholder="Country"
                                        className="bg-gray-100 rounded-lg p-3 text-gray-700"
                                    />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-sm text-gray-700 mb-2">
                                        Departure Airport
                                    </Text>
                                    <TextInput
                                        value={flightForm.departure_airport}
                                        onChangeText={text =>
                                            setFlightForm(prev => ({
                                                ...prev,
                                                departure_airport: text,
                                            }))
                                        }
                                        placeholder="Airport Code"
                                        className="bg-gray-100 rounded-lg p-3 text-gray-700"
                                    />
                                </View>
                            </View>
                        </View>

                        {/* ARRIVE Section */}
                        <View className="mb-6">
                            <Text className="text-lg font-bold text-gray-900 mb-4">
                                ARRIVE
                            </Text>

                            <View className="flex-row gap-4 mb-4">
                                <View className="flex-1">
                                    <Text className="text-sm text-gray-700 mb-2">
                                        Date
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => setShowArrivalDate(true)}
                                        className="bg-gray-100 rounded-lg p-3"
                                    >
                                        <Text className="text-gray-700">
                                            {flightForm.arrival_date ||
                                                "Select Date"}
                                        </Text>
                                    </TouchableOpacity>
                                    {showArrivalDate && (
                                        <DateTimePicker
                                            value={
                                                flightForm.arrival_date
                                                    ? new Date(
                                                          flightForm.arrival_date
                                                      )
                                                    : new Date()
                                            }
                                            mode="date"
                                            display="default"
                                            onChange={(e, date) => {
                                                setShowArrivalDate(false);
                                                onChangeDate(
                                                    e,
                                                    date,
                                                    "arrival_date"
                                                );
                                            }}
                                        />
                                    )}
                                </View>

                                <View className="flex-1">
                                    <Text className="text-sm text-gray-700 mb-2">
                                        Time
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => setShowArrivalTime(true)}
                                        className="bg-gray-100 rounded-lg p-3"
                                    >
                                        <Text className="text-gray-700">
                                            {flightForm.arrival_time ||
                                                "Select Time"}
                                        </Text>
                                    </TouchableOpacity>
                                    {showArrivalTime && (
                                        <DateTimePicker
                                            value={new Date()}
                                            mode="time"
                                            display="default"
                                            is24Hour={true}
                                            onChange={(e, date) => {
                                                setShowArrivalTime(false);
                                                onChangeTime(
                                                    e,
                                                    date,
                                                    "arrival_time"
                                                );
                                            }}
                                        />
                                    )}
                                </View>
                            </View>
                            <View className="flex-row gap-4 mb-4">
                                <View className="flex-1">
                                    <Text className="text-sm text-gray-700 mb-2">
                                        Country
                                    </Text>
                                    <TextInput
                                        value={flightForm.arrival_country}
                                        onChangeText={text =>
                                            setFlightForm(prev => ({
                                                ...prev,
                                                arrival_country: text,
                                            }))
                                        }
                                        placeholder="Country"
                                        className="bg-gray-100 rounded-lg p-3 text-gray-700"
                                    />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-sm text-gray-700 mb-2">
                                        Destination Airport
                                    </Text>
                                    <TextInput
                                        value={flightForm.arrival_airport}
                                        onChangeText={text =>
                                            setFlightForm(prev => ({
                                                ...prev,
                                                arrival_airport: text,
                                            }))
                                        }
                                        placeholder="Airport Code"
                                        className="bg-gray-100 rounded-lg p-3 text-gray-700"
                                    />
                                </View>
                            </View>
                        </View>

                        {/* AIRLINE Section */}
                        <View className="mb-6">
                            <Text className="text-lg font-bold text-gray-900 mb-4">
                                AIRLINE
                            </Text>
                            <TextInput
                                value={flightForm.airline}
                                onChangeText={text =>
                                    setFlightForm(prev => ({
                                        ...prev,
                                        airline: text,
                                    }))
                                }
                                placeholder="Airline Name"
                                className="bg-gray-100 rounded-lg p-3 text-gray-700"
                            />
                        </View>

                        {/* Confirm Button */}
                        <TouchableOpacity
                            onPress={handleSaveFlight}
                            className="bg-green_2 rounded-lg py-4 mt-4"
                        >
                            <Text className="text-white text-center font-medium text-lg">
                                Confirm
                            </Text>
                        </TouchableOpacity>
                        {canEdit && editingFlightId && (
                            <TouchableOpacity
                                onPress={() =>
                                    handleDeleteFlight(editingFlightId)
                                }
                                className="bg-white rounded-lg py-4 mt-2 border border-gray_border"
                            >
                                <Text className="text-black text-center font-medium text-lg">
                                    Delete
                                </Text>
                            </TouchableOpacity>
                        )}
                    </ScrollView>
                </SafeAreaView>
            </Modal>
        </View>
    );
};

export default PlanIndex;
