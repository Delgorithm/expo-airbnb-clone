import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, View } from "react-native";

export default function HeaderButtons() {
  return (
    <View>
      <Pressable
        onPress={() => router.back()}
        style={{
          position: "absolute",
          top: 56,
          left: 20,
          zIndex: 999,
          borderRadius: 999,
        }}
      >
        <Ionicons
          name="chevron-back-outline"
          size={20}
          color="black"
          style={{ padding: 8, borderRadius: 999, backgroundColor: "white" }}
        />
      </Pressable>
      <View>
        <Pressable
          onPress={() => console.log("Share")}
          style={{ position: "absolute", top: 56, right: 80, zIndex: 999 }}
        >
          <Ionicons
            name="share-outline"
            size={20}
            color="black"
            style={{
              padding: 8,
              borderRadius: 999,
              backgroundColor: "white",
            }}
          />
        </Pressable>

        <Pressable
          onPress={() => console.log("Favoris")}
          style={{ position: "absolute", top: 56, right: 20, zIndex: 999 }}
        >
          <Ionicons
            name="heart-outline"
            size={20}
            color="black"
            style={{
              padding: 8,
              borderRadius: 999,
              backgroundColor: "white",
            }}
          />
        </Pressable>
      </View>
    </View>
  );
}
