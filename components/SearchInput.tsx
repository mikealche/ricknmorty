import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { TextInput } from "react-native";

const SearchInput = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (newText: string) => void;
}) => {
  return (
    <LinearGradient
      style={{
        paddingVertical: 10,
        paddingHorizontal: 20,
      }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={["#6d0083", "#370042"]}
    >
      <TextInput
        style={{
          borderWidth: 4,
          backgroundColor: "white",
          borderColor: "purple",
          borderRadius: 30,
          paddingHorizontal: 30,
          paddingVertical: 10,
        }}
        onChangeText={onChange}
        placeholder="Search..."
        value={value}
      />
    </LinearGradient>
  );
};

export default SearchInput;
