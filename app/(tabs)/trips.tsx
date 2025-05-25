import { Image, Text, View } from "react-native";

export default function Trips() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        source={require("@/assets/images/arriving.png")}
        style={{ height: 300, width: 300 }}
      />
    </View>
  );
}
