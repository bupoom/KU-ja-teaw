import React from "react";
import { Feather } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

interface Props {
  transportation?: string;
  color?: string;
  size?: number;
}

const TransportationIcon = ({
  transportation,
  color = "#000000",
  size = 24,
}: Props): React.ReactElement => {
  switch (transportation?.toLowerCase()) {
    case "car":
      return <FontAwesome5 name="car" size={size} color={color} />;
    case "train":
      return <MaterialIcons name="train" size={size} color={color} />;
    case "bus":
      return <MaterialIcons name="directions-bus" size={size} color={color} />;
    case "plane":
    case "flight":
      return <Ionicons name="airplane" size={size} color={color} />;
    case "boat":
      return <Feather name="anchor" size={size} color={color} />;
    case "walk":
      return <FontAwesome5 name="walking" size={size} color={color} />;
    default:
      return <Feather name="navigation" size={size} color={color} />;
  }
};

export default TransportationIcon;
