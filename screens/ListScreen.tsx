import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import CharacterList from "../components/CharacterList";
import Pagination from "../components/Pagination";
import SearchInput from "../components/SearchInput";
import { CHARACTERS } from "../queries/GQLQueries";

const ListScreen = () => {
  const [text, onChange] = useState("");
  const [page, setPage] = useState(1);

  const { loading, error, data } = useQuery(CHARACTERS, {
    variables: {
      page,
      name: text,
    },
  });

  // When the text is changed, go back to page 1
  useEffect(() => {
    setPage(1);
  }, [text]);

  const characters = data?.characters?.results || [];
  return (
    <View style={{ flex: 1 }}>
      {loading && (
        <View style={styles.background}>
          <ActivityIndicator size={40} color="purple" />
        </View>
      )}
      {error && (
        <View style={styles.background}>
          <Text style={{ textAlign: "center" }}>No results</Text>
        </View>
      )}
      <SearchInput value={text} onChange={onChange} />

      {characters && !error && <CharacterList characters={characters} />}
      <Pagination
        info={data?.characters?.info || {}}
        setPage={setPage}
        page={page}
        isLoading={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
});

export default ListScreen;
