import { Image, Text, View } from "react-native";

export default function Inbox() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        source={require("@/assets/images/cellphones.png")}
        style={{ height: 300, width: 300 }}
      />
    </View>
  );
}
