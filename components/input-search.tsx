import { Ionicons } from "@expo/vector-icons";
import { Pressable, TextInput, View } from "react-native";

export default function InputSearch() {
  return (
    <View
      style={{
        flexDirection: "row",
        alignSelf: "center",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 10,
        width: "90%",
        marginBottom: 8,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          gap: 6,
          alignItems: "center",
          width: "80%",
          alignSelf: "center",
          paddingHorizontal: 14,
          borderRadius: 99999,
          borderWidth: 0.5,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.23,
          shadowRadius: 12.81,
          elevation: 16,
        }}
      >
        <Ionicons name="search-outline" size={24} color={"black"} />
        <TextInput
          style={{
            paddingVertical: 18,
            width: "94%",
            borderRadius: 9999,
            paddingLeft: 10,
          }}
          placeholder="Commencer votre recherche"
        />
      </View>
      <Pressable>
        <Ionicons
          name="options-outline"
          size={24}
          color={"black"}
          style={{
            padding: 12,
            borderRadius: 9999,
            borderWidth: 0.5,
            borderColor: "black",
          }}
        />
      </Pressable>
    </View>
  );
}
