import React from "react";
import { Text, View } from "react-native";

type Props = {
  text: string;
  className?: string;
};

export default function StatusTag({ text, className }: Props) {
  return (
    <View
      className={`flex-1 w-full items-center justify-center py-1 rounded-lg ${className ?? ""}`}
    >
      <Text className="text-white text-sm font-semibold">Status Planning : {text}</Text>
    </View>
  );
}
