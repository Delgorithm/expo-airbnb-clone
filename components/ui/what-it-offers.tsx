import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

export default function WhatItOffers() {
  return (
    <View style={{ margin: 32, gap: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 500 }}>
        Ce que la place offre
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
        <MaterialCommunityIcons
          name="silverware-fork-knife"
          size={24}
          color="black"
        />
        <Text style={{ fontSize: 16, fontWeight: 300 }}>Cuisine</Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
        <FontAwesome5 name="wifi" size={24} color="black" />
        <Text style={{ fontSize: 16, fontWeight: 300 }}>Wifi</Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
        <MaterialCommunityIcons name="desk" size={24} color="black" />
        <Text style={{ fontSize: 16, fontWeight: 300 }}>Bureau</Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
        <FontAwesome5 name="car" size={24} color="black" />
        <Text style={{ fontSize: 16, fontWeight: 300 }}>Parking gratuit</Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
        <FontAwesome5 name="camera" size={24} color="black" />
        <Text style={{ fontSize: 16, fontWeight: 300 }}>
          Sécurité renforcée
        </Text>
      </View>

      <Pressable
        style={({ pressed }) => ({
          borderWidth: 0.5,
          paddingVertical: 16,
          borderRadius: 6,
          marginTop: 20,
          opacity: pressed ? 0.6 : 1,
        })}
      >
        <Text style={{ alignSelf: "center" }}>Montrer les 55 commodités</Text>
      </Pressable>
    </View>
  );
}
