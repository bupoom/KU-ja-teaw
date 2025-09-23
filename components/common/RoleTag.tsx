import React from "react";
import { TouchableOpacity, Text } from "react-native";

interface RoleTagProps {
    role: "owner" | "editor" | "viewer";
    onPress?: () => void;
    className?: string;
}

const getRoleText = (role: string): string => {
    if (role === "owner" || role === "editor" || role === "viewer") {
        return String(role).charAt(0).toUpperCase() + String(role).slice(1);
    }
    return "Member";
};

const getRoleColor = (role: string): string => {
    const colors: Record<string, string> = {
        owner: "#284D44",
        editor: "#F9F2F2",
        viewer: "#E5E7EB",
    };
    return colors[role] ?? "#E5E7EB";
};

const getRoleTextColor = (role: string): string => {
    const colors: Record<string, string> = {
        owner: "#ffffff",
        editor: "#000000",
        viewer: "#000000",
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
