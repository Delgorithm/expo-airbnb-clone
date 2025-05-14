import { View } from "react-native";

type SeparatorProps = {
  marginHorizontal?: number;
  marginVertical?: number;
  width?: number | string;
};

export default function Separator({
  marginHorizontal,
  marginVertical,
  width,
}: SeparatorProps) {
  return (
    <View
      style={{
        height: 0.5,
        marginHorizontal: marginHorizontal ?? 24,
        marginVertical: marginVertical,
        backgroundColor: "gray",
        width: width ?? "auto",
      }}
    />
  );
}
