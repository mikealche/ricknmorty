import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
  isLoading,
}: {
  info: InfoType;
  page: number;
  setPage: (page: number) => void;
  isLoading: boolean;
}) => {
  const totalResults = info.count ?? 0;

  return (
    <LinearGradient
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={[theme.primaryAccentColor, theme.primaryBackgroundColor]}
    >
      {/* Prev page button */}
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

      {/* Pagination indicator */}
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Image
          source={require("../assets/rickandmorty.png")}
          style={styles.image}
        />
        {isLoading ? (
          <ActivityIndicator size={20} />
        ) : (
          <Text
            style={{
              textAlign: "center",
              color: "white",
            }}
          >
            Displaying {(page - 1) * 20} —{" "}
            {Math.min((page - 1) * 20 + 20, totalResults)} of {totalResults}{" "}
            results
          </Text>
        )}
      </View>

      {/* Next page button */}
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

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: "purple",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 50,
    resizeMode: "contain",
    marginRight: 10,
    borderColor: "purple",
  },
});

export default Pagination;
