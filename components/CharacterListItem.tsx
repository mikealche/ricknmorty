import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useFavoriteCharacters } from "../contexts/FavoriteCharacters";
import { Character, HomeProps } from "../types";

const CharacterListItem = ({ character }: { character: Character }) => {
  const { isFavorite, favoriteCharacters } = useFavoriteCharacters();

  const navigation = useNavigation<HomeProps["navigation"]>();

  return (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() =>
        navigation.navigate("Details", {
          characterId: character.id,
        })
      }
    >
      <View>
        <Image style={styles.avatar} source={{ uri: character.image }} />
        <Text
          style={{
            fontSize: 30,
            position: "absolute",
            bottom: -10,
            right: 10,
          }}
        >
          {isFavorite(character.id) ? "✨" : ""}
        </Text>
      </View>
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          flex: 1,
          alignItems: "center",
        }}
      >
        <Text
          key={character.name}
          style={{
            fontWeight: isFavorite(character.id) ? "bold" : "500",
          }}
        >
          {character.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CharacterListItem;
const styles = StyleSheet.create({
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 72,
    height: 72,
    marginRight: 20,
    borderRadius: 44,
    borderColor: "purple",
    borderWidth: 2,
  },
});
