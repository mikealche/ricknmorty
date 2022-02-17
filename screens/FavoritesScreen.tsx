import { useQuery } from "@apollo/client";
import { Text, View } from "react-native";
import CharacterList from "../components/CharacterList";
import { useFavoriteCharacters } from "../contexts/FavoriteCharacters";
import { CHARACTERS_BY_IDS } from "../queries/GQLQueries";

export const FavoriteScreen = () => {
  const { favoriteCharacters } = useFavoriteCharacters();

  const { loading, error, data } = useQuery(CHARACTERS_BY_IDS, {
    variables: {
      ids: favoriteCharacters.map((id) => Number(id)),
    },
  });

  const characters = data?.charactersByIds || [];

  return (
    <View style={{ flex: 1 }}>
      {characters && !error && <CharacterList characters={characters} />}
    </View>
  );
};
