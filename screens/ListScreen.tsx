import { useQuery } from "@apollo/client";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import CharacterList from "../components/CharacterList";
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

const Pagination = ({ info, page, setPage }) => {
  return (
    <LinearGradient
      style={{
        paddingVertical: 10,
        paddingHorizontal: 5,
        backgroundColor: "purple",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
      }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={["#6d0083", "#370042"]}
    >
      <TouchableOpacity onPress={() => info.prev && setPage(info.prev)}>
        <Text style={{ textAlign: "center", fontSize: 20 }}>👈</Text>
        <Text
          style={{
            color: "white",
          }}
        >
          Next page
        </Text>
      </TouchableOpacity>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Image
          source={require("../assets/rickandmorty.png")}
          style={{
            width: 150,
            height: 50,
            resizeMode: "contain",
            marginRight: 10,
            borderColor: "purple",
          }}
        />
        <Text
          style={{
            textAlign: "center",
            color: "white",
          }}
        >
          Displaying {(page - 1) * 20} - {(page - 1) * 20 + 20} of {info.count}{" "}
          results
        </Text>
      </View>
      <TouchableOpacity onPress={() => info.next && setPage(info.next)}>
        <Text style={{ textAlign: "center", fontSize: 20 }}>👉</Text>
        <Text
          style={{
            color: "white",
          }}
        >
          Next page
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default ListScreen;
