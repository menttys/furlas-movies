import { View } from "react-native";

export const FlexGrow = ({ basis }: { basis: number }) => (
  <View style={{ flexBasis: basis, flex: 1 }} />
);
export const FlexShrink = ({ basis }: { basis: number }) => (
  <View style={{ flexBasis: basis, flexShrink: 1 }} />
);
