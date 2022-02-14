import { gql, useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CharacterList from "../components/CharacterList";
import { useFavoriteCharacters } from "../contexts/FavoriteCharacters";
import { CHARACTERS } from "../queries/GQLQueries";
import { HomeProps } from "../types";

const CharacterSearch = () => {
  const [text, onChangeText] = useState("");

  return (
    <View style={{ flex: 1 }}>
      <CharacterList filter={text} />
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
          onChangeText={onChangeText}
          placeholder="Search..."
          value={text}
        />
      </LinearGradient>
    </View>
  );
};

export default CharacterSearch;
