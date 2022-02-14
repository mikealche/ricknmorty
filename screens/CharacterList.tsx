import { useState } from "react";
import { View } from "react-native";

import CharacterList from "../components/CharacterList";
import SearchInput from "../components/SearchInput";

const CharacterSearch = () => {
  const [text, onChange] = useState("");

  return (
    <View style={{ flex: 1 }}>
      <CharacterList filter={text} />
      <SearchInput value={text} onChange={onChange} />
    </View>
  );
};

export default CharacterSearch;
