import { View, Text, Button } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function ParametersModal() {
  const { parametersModal } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Parameters Modal : {parametersModal}</Text>
      <Button onPress={() => router.back()} title="Go back" />
    </View>
  );
}
