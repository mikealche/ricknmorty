import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import theme from "../theme";

type InfoType = {
  prev: number;
  next: number;
  pages: number;
  count: number;
};

const Pagination = ({
  info,
  page,
  setPage,
}: {
  info: InfoType;
  page: number;
  setPage: (page: number) => void;
}) => {
  return (
    <LinearGradient
      style={{
        paddingVertical: 10,
        paddingHorizontal: 5,
        backgroundColor: "purple",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
      }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={[theme.primaryAccentColor, theme.primaryBackgroundColor]}
    >
      <TouchableOpacity onPress={() => info.prev && setPage(info.prev)}>
        <Text style={{ textAlign: "center", fontSize: 20 }}>👈</Text>
        <Text
          style={{
            color: "white",
          }}
        >
          Next page
        </Text>
      </TouchableOpacity>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Image
          source={require("../assets/rickandmorty.png")}
          style={{
            width: 150,
            height: 50,
            resizeMode: "contain",
            marginRight: 10,
            borderColor: "purple",
          }}
        />
        <Text
          style={{
            textAlign: "center",
            color: "white",
          }}
        >
          Displaying {(page - 1) * 20} - {(page - 1) * 20 + 20} of {info.count}{" "}
          results
        </Text>
      </View>
      <TouchableOpacity onPress={() => info.next && setPage(info.next)}>
        <Text style={{ textAlign: "center", fontSize: 20 }}>👉</Text>
        <Text
          style={{
            color: "white",
          }}
        >
          Next page
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default Pagination;
