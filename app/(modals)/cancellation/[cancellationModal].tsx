import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function CancellationModal() {
  const { cancellationModal } = useLocalSearchParams();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Cancellation : {cancellationModal}</Text>
    </View>
  );
}
