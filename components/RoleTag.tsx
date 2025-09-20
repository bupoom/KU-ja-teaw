import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface RoleTagProps {
  role: 'owner' | 'editor' | 'viewer';
  onPress?: () => void;
  className?: string;
}

const getRoleColor = (role: string): string => {
  switch (role) {
    case 'owner':
      return '#284D44'; // dark green
    case 'editer':
      return '#F9F2F2'; // light pink/gray
    case 'viewer':
      return '#E5E7EB'; // light gray
    default:
      return '#E5E7EB';
  }
};

const getRoleTextColor = (role: string): string => {
  switch (role) {
    case 'owner':
      return '#ffffff'; // white text for dark background
    case 'editer':
      return '#000000'; // black text for light background
    case 'viewer':
      return '#000000'; // black text for light background
    default:
      return '#000000';
  }
};

const getRoleText = (role: string): string => {
  switch (role) {
    case 'owner':
      return 'Owner';
    case 'editer':
      return 'Editor';
    case 'viewer':
      return 'Viewer';
    default:
      return 'Member';
  }
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