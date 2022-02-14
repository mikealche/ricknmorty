import { ScrollView, StyleSheet } from "react-native";

import { Character } from "../types";
import CharacterListItem from "./CharacterListItem";

const CharacterList = ({ characters }: { characters: Character[] }) => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        justifyContent: "center",
        paddingTop: 10,
      }}
    >
      {characters.map((character: Character) => (
        <CharacterListItem key={character.id} character={character} />
      ))}
    </ScrollView>
  );
};

export default CharacterList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
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
    borderColor: "purple",
    borderWidth: 2,
  },
});
