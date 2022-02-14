import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { StatusBar } from "react-native";

import AppRouter from "./AppRouter";
import { FavoriteCharactersProvider } from "./contexts/FavoriteCharacters";
import theme from "./theme";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <FavoriteCharactersProvider>
        <StatusBar backgroundColor={theme.primaryAccentColor} />
        <AppRouter />
      </FavoriteCharactersProvider>
    </ApolloProvider>
  );
}
