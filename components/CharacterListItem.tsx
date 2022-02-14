import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useFavoriteCharacters } from "../contexts/FavoriteCharacters";
import theme from "../theme";
import { Character, ListProps } from "../types";

const CharacterListItem = ({ character }: { character: Character }) => {
  const { isFavorite } = useFavoriteCharacters();

  const navigation = useNavigation<ListProps["navigation"]>();

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
        <Text style={styles.favoriteStar}>
          {isFavorite(character.id) ? "✨" : ""}
        </Text>
      </View>
      <View style={styles.listText}>
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
  favoriteStar: {
    fontSize: 30,
    position: "absolute",
    bottom: -10,
    right: 10,
  },
  listText: {
    justifyContent: "space-between",
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
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
    borderColor: theme.primaryAccentColor,
    borderWidth: 2,
  },
});
