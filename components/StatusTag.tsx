// components/StatusTag.tsx
import React from "react";
import { Pressable, Text, ViewStyle } from "react-native";

type Props = {
  text: string;
  bg?: string;
  onPress?: () => void;
  style?: ViewStyle;
  className?: string;
};

const isHex = (v?: string) => !!v && /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(v);

export default function StatusTag({ text, bg = "neutral-800", onPress, style, className }: Props) {
  // ถ้า bg เป็นชื่อสี tailwind → ใช้ className "bg-xxx"
  const bgClass = !isHex(bg) ? `bg-${bg}` : undefined;

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      className={`items-center justify-center px-2 ${bgClass ?? ""} ${className ?? ""}`}
      style={[
        { width: 60, height: 20, borderRadius: 5 },  // w-60px h-20px rounded-5
        isHex(bg) ? { backgroundColor: bg } : null,
        style,
      ]}
    >
      <Text className="text-white text-[10px] font-semibold">{text}</Text>
    </Pressable>
  );
}
