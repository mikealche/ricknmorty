import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

import GradientButton from "../components/GradientButton";
import { useFavoriteCharacters } from "../contexts/FavoriteCharacters";
import { SINGLE_CHARACTER } from "../queries/GQLQueries";
import { DetailsProps } from "../types";

const DetailScreen = ({ navigation, route }: DetailsProps) => {
  const { characterId } = route.params;

  const { loading, error, data } = useQuery(SINGLE_CHARACTER, {
    variables: {
      id: characterId,
    },
  });

  // Update the title when the character has loaded
  useEffect(() => {
    if (data) {
      navigation.setOptions({
        title: data.character.name,
      });
    }
  }, [data?.character?.name]);

  const { toggleCharacter, isFavorite } = useFavoriteCharacters();

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size={50} color="purple" />
      </View>
    );
  if (error) return <View>Error :(</View>;

  const { character } = data;

  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.bigImage} source={{ uri: character.image }} />
        <Text style={styles.imageStar}>
          {isFavorite(character.id) ? "✨" : ""}
        </Text>
      </View>
      <View style={styles.characterAttributes}>
        <ValueWithLabel label={"Status"} value={character.status} />
        <ValueWithLabel label={"Gender"} value={character.gender} />
      </View>
      <GradientButton onPress={() => toggleCharacter(characterId)}>
        <Text>
          ✨ {isFavorite(character.id) ? "UNMARK" : "MARK"} AS FAVORITE ✨
        </Text>
      </GradientButton>
    </View>
  );
};

const ValueWithLabel = ({ label, value }: { label: string; value: any }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <Text style={{ fontSize: 20, color: "gray" }}>{value}</Text>
      <Text style={{ fontSize: 14, color: "black", fontWeight: "bold" }}>
        {label}
      </Text>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 10,
  },
  characterAttributes: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  imageStar: {
    fontSize: 100,
    position: "absolute",
    bottom: -50,
    right: 10,
  },
  bigImage: {
    width: 200,
    height: 200,
    marginRight: 10,
    borderRadius: 100,
    borderColor: "purple",
    borderWidth: 2,
  },
});
