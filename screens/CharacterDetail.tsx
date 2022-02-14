import { gql, useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

const DetailScreen = ({ route }) => {
  const { characterId } = route.params;
  const navigation = useNavigation();

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
  return (
    <View
      style={{ justifyContent: "center", alignItems: "center", paddingTop: 10 }}
    >
      <Image style={styles.bigImage} source={{ uri: character.image }} />
      <Text style={{ fontSize: 30, marginBottom: 20 }}>{character.name}</Text>
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
    </View>
  );
};

const ValueWithLabel = ({ label, value }) => {
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
      name
      status
      species
      type
      gender
      image
    }
  }
`;
