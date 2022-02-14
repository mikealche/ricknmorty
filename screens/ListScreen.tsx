import { useQuery } from "@apollo/client";
import { useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

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

  const characters = data?.characters?.results || [];
  return (
    <View style={{ flex: 1 }}>
      <SearchInput value={text} onChange={onChange} />
      {loading && (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size={40} color="purple" />
        </View>
      )}
      {error && (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={{ textAlign: "center" }}>No results</Text>
        </View>
      )}
      {characters && !error && <CharacterList characters={characters} />}
      <Pagination
        info={data?.characters?.info || {}}
        setPage={setPage}
        page={page}
      />
    </View>
  );
};

export default ListScreen;
