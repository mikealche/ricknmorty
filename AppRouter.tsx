import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DetailScreen from "./screens/DetailScreen";
import { FavoriteScreen } from "./screens/FavoritesScreen";
import ListScreen from "./screens/ListScreen";
import { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppRouter = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Favorites">
        <Stack.Screen
          name="List"
          component={ListScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Details"
          component={DetailScreen}
          options={{ title: "" }}
        />
        <Stack.Screen
          name="Favorites"
          component={FavoriteScreen}
          options={{ title: "" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRouter;
