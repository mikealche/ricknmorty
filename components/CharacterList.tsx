import { useQuery } from "@apollo/client";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  View,
  Text,
} from "react-native";

import { CHARACTERS } from "../queries/GQLQueries";
import CharacterListItem from "./CharacterListItem";

type Character = {
  id: number;
  name: string;
  image: string;
};

const CharacterList = ({ filter }: { filter: string }) => {
  const { loading, error, data } = useQuery(CHARACTERS, {
    variables: {
      page: 1,
      name: filter,
    },
  });

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size={40} color="purple" />
      </View>
    );
  if (error)
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={{ textAlign: "center" }}>No results</Text>
      </View>
    );
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        justifyContent: "center",
        paddingTop: 10,
      }}
    >
      {data.characters.results.map((character: Character) => (
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
