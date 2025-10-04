// components/modals/PoliciesModal.tsx
import { Feather } from "@expo/vector-icons";
import React from "react";
import {
    Modal,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface PoliciesModalProps {
    visible: boolean;
    onClose: () => void;
    onAccept: () => void;
}

function TermsSection({
    number,
    title,
    content,
}: {
    number: string;
    title: string;
    content: string;
}) {
    return (
        <>
            <Text className="text-lg font-semibold text-gray-800 mb-4">
                {number}. {title}
            </Text>
            <Text className="text-gray-600 mb-6 leading-6">{content}</Text>
        </>
    );
}

export default function PoliciesModal({
    visible,
    onClose,
    onAccept,
}: PoliciesModalProps) {
    const handleAccept = () => {
        onAccept();
        onClose();
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={onClose}
        >
            <SafeAreaView className="flex-1 bg-white">
                <View className="flex-1">
                    {/* Header */}
                    <View className="flex-row items-center justify-between px-6 py-4 border-b border-gray-200">
                        <Text className="text-xl font-bold text-gray-800">
                            ข้อตกลงและเงื่อนไข
                        </Text>
                        <TouchableOpacity
                            onPress={onClose}
                            className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center"
                        >
                            <Feather name="x" size={20} color="#374151" />
                        </TouchableOpacity>
                    </View>

                    {/* Content */}
                    <ScrollView className="flex-1 px-6 py-4">
                        <TermsSection
                            number="1"
                            title="การยอมรับข้อตกลง"
                            content="การใช้แอปพลิเคชันนี้แสดงว่าคุณยอมรับข้อตกลงและเงื่อนไขทั้งหมด หากคุณไม่ยอมรับข้อตกลงเหล่านี้ กรุณาหยุดการใช้งานทันที"
                        />

                        <TermsSection
                            number="2"
                            title="การใช้งานแอปพลิเคชัน"
                            content="คุณสามารถใช้แอปพลิเคชันนี้เพื่อวัตถุประสงค์ที่ถูกต้องตามกฎหมายเท่านั้น ห้ามใช้เพื่อการกระทำที่ผิดกฎหมายหรือเป็นอันตราย"
                        />

                        <TermsSection
                            number="3"
                            title="ความเป็นส่วนตัวของข้อมูล"
                            content="เราจะเก็บรักษาข้อมูลส่วนบุคคลของคุณอย่างปลอดภัย และจะไม่เปิดเผยให้กับบุคคลที่สามโดยไม่ได้รับความยินยอมจากคุณ ยกเว้นกรณีที่กฎหมายกำหนด"
                        />

                        <TermsSection
                            number="4"
                            title="ความรับผิดชอบ"
                            content="คุณมีความรับผิดชอบในการรักษาความปลอดภัยของบัญชีและรหัสผ่านของคุณ หากมีการใช้งานโดยไม่ได้รับอนุญาต กรุณาแจ้งให้เราทราบทันที"
                        />

                        <TermsSection
                            number="5"
                            title="การเปลี่ยนแปลงข้อตกลง"
                            content="เราสงวนสิทธิ์ในการเปลี่ยนแปลงข้อตกลงและเงื่อนไขนี้ได้ตลอดเวลา การเปลี่ยนแปลงจะมีผลทันทีเมื่อได้รับการประกาศ"
                        />

                        <TermsSection
                            number="6"
                            title="การติดต่อ"
                            content="หากคุณมีคำถามเกี่ยวกับข้อตกลงและเงื่อนไขนี้ กรุณาติดต่อเราที่ support@example.com"
                        />

                        <Text className="text-sm text-gray-500 text-center mb-6">
                            อัปเดตล่าสุด: 4 กันยายน 2568
                        </Text>
                    </ScrollView>

                    {/* Footer Button */}
                    <View className="px-6 pb-8 pt-4 border-t border-gray-200">
                        <TouchableOpacity
                            className="w-full py-4 bg-blue-500 rounded-xl"
                            onPress={handleAccept}
                        >
                            <Text className="text-center text-white text-lg font-semibold">
                                ยอมรับ
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </Modal>
    );
}
