import { AntDesign, Entypo } from "@expo/vector-icons";
import { Text, View } from "react-native";

type ParametersListProps = {
  name: string;
  text: string;
};

export default function ParametersList({ name, text }: ParametersListProps) {
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          borderBottomWidth: 0.5,
          borderColor: "#E1E1E1",
          paddingVertical: 12,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <AntDesign name={name} size={30} />
          <Text style={{ fontSize: 18, fontWeight: 300 }}>{text}</Text>
        </View>
        <Entypo name="chevron-small-right" size={40} />
      </View>
    </>
  );
}
