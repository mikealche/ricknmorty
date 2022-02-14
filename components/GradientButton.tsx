import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import theme from "../theme";

const GradientButton = ({
  children,
  onPress,
}: {
  children: JSX.Element;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ width: "75%", borderRadius: 1000, overflow: "hidden" }}
    >
      <LinearGradient
        style={{
          paddingVertical: 15,
          paddingHorizontal: 20,
        }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={[theme.primaryAccentColor, theme.primaryBackgroundColor]}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {children}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default GradientButton;
