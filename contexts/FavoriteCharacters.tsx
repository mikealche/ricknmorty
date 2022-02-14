import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type FavoriteCharactersContext = {
  favoriteCharacters: number[];
  toggleCharacter: (characterId: number) => void;
  isFavorite: (characterId: number) => boolean;
};
const FavoriteCharactersContext = createContext(
  {} as FavoriteCharactersContext
);

const ASYNC_STORAGE_KEY = "favoriteCharacters";
export const FavoriteCharactersProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [favoriteCharacters, setFavoriteCharacters] = useState<number[]>([]);
  const [hasInitialized, setHasInitialized] = useState(false);

  // Initialize the state from AsyncStorage
  useEffect(() => {
    if (!hasInitialized) {
      console.log("initializing");
      AsyncStorage.getItem(ASYNC_STORAGE_KEY).then((data) => {
        if (data) {
          const arrayOfFavoriteCharacters = JSON.parse(data);
          setFavoriteCharacters(arrayOfFavoriteCharacters);
        }
        setHasInitialized(true);
      });
    }
  }, []);

  // Keep it in sync after initialized
  useEffect(() => {
    if (!hasInitialized) return;
    console.log("Saving to storage");
    AsyncStorage.setItem(ASYNC_STORAGE_KEY, JSON.stringify(favoriteCharacters));
  }, [JSON.stringify(favoriteCharacters), hasInitialized]);

  const toggleCharacter = (selectedCharacterId: number) => {
    if (isFavorite(selectedCharacterId)) {
      console.log("Removing", { selectedCharacterId });
      // Remove it
      setFavoriteCharacters(
        favoriteCharacters.filter(
          (characterId) => characterId != selectedCharacterId
        )
      );
    } else {
      console.log("Adding", { selectedCharacterId });
      // Add it
      setFavoriteCharacters([...favoriteCharacters, selectedCharacterId]);
    }
  };

  const isFavorite = (selectedCharacterId: number) => {
    return favoriteCharacters.includes(selectedCharacterId);
  };

  return (
    <FavoriteCharactersContext.Provider
      value={{ favoriteCharacters, toggleCharacter, isFavorite }}
    >
      {children}
    </FavoriteCharactersContext.Provider>
  );
};

export const useFavoriteCharacters = () => {
  const favoriteCharactersContext = useContext(FavoriteCharactersContext);
  if (!favoriteCharactersContext) {
    throw new Error(
      "Remember to wrap your useFavoriteCharacters inside a FavoriteCharactersProvider"
    );
  }
  return favoriteCharactersContext;
};
