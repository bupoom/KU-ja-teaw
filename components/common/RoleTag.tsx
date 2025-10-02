import React from "react";
import { TouchableOpacity, Text } from "react-native";

interface RoleTagProps {
    role: "Owner" | "Editor" | "Viewer";
    onPress?: () => void;
    className?: string;
}

const getRoleText = (role: string): string => {
    if (role === "Owner" || role === "Editor" || role === "Viewer") {
        return String(role).charAt(0).toUpperCase() + String(role).slice(1);
    }
    return "Viewer";
};

const getRoleColor = (role: string): string => {
    const colors: Record<string, string> = {
        Owner: "#284D44",
        Editor: "#F9F2F2",
        Viewer: "#E5E7EB",
    };
    return colors[role] ?? "#E5E7EB";
};

const getRoleTextColor = (role: string): string => {
    const colors: Record<string, string> = {
        Owner: "#ffffff",
        Editor: "#000000",
        Viewer: "#000000",
    };
    return colors[role] ?? "#000000";
};

const RoleTag: React.FC<RoleTagProps> = ({ role, onPress, className }) => {
    const defaultClassName = "px-3 py-1 rounded-full text-xs font-medium";
    const finalClassName = className || defaultClassName;

    if (onPress) {
        return (
            <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
                <Text
                    className={finalClassName}
                    style={{
                        backgroundColor: getRoleColor(role),
                        color: getRoleTextColor(role),
                    }}
                >
                    {getRoleText(role)}
                </Text>
            </TouchableOpacity>
        );
    }

    return (
        <Text
            className={finalClassName}
            style={{
                backgroundColor: getRoleColor(role),
                color: getRoleTextColor(role),
            }}
        >
            {getRoleText(role)}
        </Text>
    );
};

export default RoleTag;
