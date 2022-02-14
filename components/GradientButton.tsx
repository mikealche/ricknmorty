import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

const GradientButton = ({
  children,
  onPress,
}: {
  children: JSX.Element;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ width: "75%" }}>
      <LinearGradient
        style={{
          paddingVertical: 15,
          paddingHorizontal: 20,
          borderRadius: 50,
        }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={["#6d0083", "#370042"]}
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
