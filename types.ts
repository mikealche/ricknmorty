import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  List: undefined;
  Details: { characterId: number };
};

export type ListProps = NativeStackScreenProps<RootStackParamList, "List">;
export type DetailsProps = NativeStackScreenProps<
  RootStackParamList,
  "Details"
>;

export type Character = {
  id: number;
  name: string;
  image: string;
};
