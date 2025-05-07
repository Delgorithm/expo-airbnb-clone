import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

type FooterBtnProps = {
  listing: {
    price: number;
  };
};

export default function FooterBtn({ listing }: FooterBtnProps) {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderTopWidth: 0.5,
        width: "100%",
        backgroundColor: "white",
      }}
    >
      <View style={{ marginVertical: 14 }}>
        <Text
          style={{
            fontWeight: 500,
            fontSize: 18,
            textDecorationLine: "underline",
          }}
        >
          {listing.price} € / nuit
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            paddingHorizontal: 10,
            paddingVertical: 4,
            backgroundColor: "#E5E5E5",
            borderRadius: 999,
            marginTop: 4,
          }}
        >
          <Ionicons name="checkmark-outline" size={16} color={"black"} />
          <Text>Annulation gratuite</Text>
        </View>
      </View>
      <Pressable
        style={({ pressed }) => ({
          backgroundColor: Colors.primary,
          paddingVertical: 14,
          paddingHorizontal: 44,
          borderRadius: 8,
          opacity: pressed ? 0.6 : 1,
        })}
      >
        <Text style={{ color: "white", fontWeight: 600, fontSize: 16 }}>
          Réserver
        </Text>
      </Pressable>
    </View>
  );
}
