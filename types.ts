import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined;
  Details: { characterId: number };
};

export type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;
export type DetailsProps = NativeStackScreenProps<
  RootStackParamList,
  "Details"
>;
