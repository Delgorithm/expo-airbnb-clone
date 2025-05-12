import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function CalendarModal() {
  const { calendarModal } = useLocalSearchParams();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Calendar Modal : {calendarModal}</Text>
    </View>
  );
}
