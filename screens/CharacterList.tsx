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
import { useFavoriteCharacters } from "../contexts/FavoriteCharacters";
import { HomeProps } from "../types";

type Character = {
  id: number;
  name: string;
  image: string;
};

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

const CharacterList = ({ filter }: { filter: string }) => {
  const { loading, error, data } = useQuery(CHARACTERS, {
    variables: {
      page: 1,
      name: filter,
    },
  });
  const navigation = useNavigation<HomeProps["navigation"]>();

  const { isFavorite, favoriteCharacters } = useFavoriteCharacters();
  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size={40} color="purple" />
      </View>
    );
  if (error) return <View>Error :(</View>;
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        justifyContent: "center",
        paddingTop: 10,
      }}
    >
      {data.characters.results.map((character: Character) => (
        <TouchableOpacity
          style={styles.listItem}
          key={character.id}
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
      ))}
    </ScrollView>
  );
};

export default CharacterSearch;

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

const CHARACTERS = gql`
  query Characters($name: String, $page: Int) {
    characters(page: $page, filter: { name: $name }) {
      info {
        count
      }
      results {
        id
        name
        image
      }
    }
    location(id: 1) {
      id
    }
    episodesByIds(ids: [1, 2]) {
      id
    }
  }
`;
