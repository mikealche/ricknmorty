import { useQuery } from "@apollo/client";
import { useEffect, useRef } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

import GradientButton from "../components/GradientButton";
import { useFavoriteCharacters } from "../contexts/FavoriteCharacters";
import { SINGLE_CHARACTER } from "../queries/GQLQueries";
import theme from "../theme";
import { DetailsProps } from "../types";
import Svg, { Path } from "react-native-svg";

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
      <Svg
        height="92"
        width={Dimensions.get("screen").width}
        viewBox="0 0 1440 320"
        style={{ zIndex: -1 }}
      >
        <Path
          fill={theme.primarySublteBackgroundColor}
          fill-opacity="1"
          d="M0,128L48,149.3C96,171,192,213,288,208C384,203,480,149,576,160C672,171,768,245,864,240C960,235,1056,149,1152,106.7C1248,64,1344,64,1392,64L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </Svg>

      <View style={styles.characterDescription}>
        <View style={styles.characterAttributes}>
          <ValueWithLabel label={"Status"} value={character.status} />
          <ValueWithLabel label={"Gender"} value={character.gender} />
        </View>

        <GradientButton
          onPress={() => {
            toggleCharacter(characterId);
          }}
        >
          <Text>
            ✨ {isFavorite(character.id) ? "UNMARK" : "MARK"} AS FAVORITE ✨
          </Text>
        </GradientButton>
      </View>
    </View>
  );
};

const ValueWithLabel = ({ label, value }: { label: string; value: any }) => {
  return (
    <View
      style={{
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 30, color: "#616161" }}>{value}</Text>
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
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
    backgroundColor: "white",
  },
  characterDescription: {
    backgroundColor: theme.primarySublteBackgroundColor,
    alignItems: "center",
    justifyContent: "space-around",
    flex: 1,
    width: "100%",
    zIndex: -1,
  },
  characterAttributes: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  imageStar: {
    fontSize: 100,
    position: "absolute",
    bottom: -150,
    right: 10,
    zIndex: 10,
  },
  bigImage: {
    width: 200,
    height: 200,
    marginRight: 10,
    borderRadius: 100,
    borderColor: theme.primaryAccentColor,
    borderWidth: 10,
    top: 120,
    zIndex: 2,
  },
});
