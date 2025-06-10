import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Trips() {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Image
        source={require("@/assets/images/arriving.png")}
        style={{ height: 300, width: 300 }}
      />
    </SafeAreaView>
  );
}
