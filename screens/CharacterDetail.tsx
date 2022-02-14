import { gql, useQuery } from "@apollo/client";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useFavoriteCharacters } from "../contexts/FavoriteCharacters";
import { DetailsProps } from "../types";

const DetailScreen = ({ navigation, route }: DetailsProps) => {
  const { characterId } = route.params;

  const { toggleCharacter, isFavorite } = useFavoriteCharacters();

  const { loading, error, data } = useQuery(SINGLE_CHARACTER, {
    variables: {
      id: characterId,
    },
  });

  useEffect(() => {
    if (data) {
      navigation.setOptions({
        title: data.character.name,
      });
    }
  }, [data?.character?.name]);

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size={50} color="purple" />
      </View>
    );
  if (error) return <View>Error :(</View>;

  const { character } = data;

  const handleMarkAsFavorite = async () => {
    toggleCharacter(characterId);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
        paddingTop: 10,
      }}
    >
      <View>
        <Image style={styles.bigImage} source={{ uri: character.image }} />
        <Text
          style={{
            fontSize: 100,
            position: "absolute",
            bottom: -50,
            right: 10,
          }}
        >
          {isFavorite(character.id) ? "✨" : ""}
        </Text>
      </View>
      <Text style={{ fontSize: 30, marginVertical: 20 }}>{character.name}</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        <ValueWithLabel label={"Status"} value={character.status} />
        <ValueWithLabel label={"Gender"} value={character.gender} />
      </View>
      <TouchableOpacity style={{ width: "75%" }} onPress={handleMarkAsFavorite}>
        <LinearGradient
          style={{
            paddingVertical: 15,
            paddingHorizontal: 20,
            borderRadius: 50,
          }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={["#6d0083", "#370042"]}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            ✨ {isFavorite(character.id) ? "UNMARK" : "MARK"} AS FAVORITE ✨
          </Text>
        </LinearGradient>
      </TouchableOpacity>
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
  bigImage: {
    width: 200,
    height: 200,
    marginRight: 10,
    borderRadius: 100,
    borderColor: "purple",
    borderWidth: 2,
  },
});

const SINGLE_CHARACTER = gql`
  query SingleCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      image
    }
  }
`;
