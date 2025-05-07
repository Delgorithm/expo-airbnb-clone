import { Colors } from "@/constants/Colors";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

export default function SecondBadge() {
  return (
    <React.Fragment>
      <View
        style={{
          marginHorizontal: 32,
          flexDirection: "row",
          alignItems: "center",
          gap: 20,
          marginVertical: 20,
        }}
      >
        <Ionicons name="diamond-outline" size={34} color={Colors.primary} />
        <View style={{ flexDirection: "column", gap: 6 }}>
          <Text style={{ fontSize: 20, fontWeight: 400 }}>Gemme rare</Text>
          <Text style={{ fontWeight: 200 }}>
            Habituellement plein à craquer
          </Text>
        </View>
      </View>
      <View
        style={{
          height: 0.5,
          marginHorizontal: 24,
          backgroundColor: "gray",
        }}
      />
      <View
        style={{
          marginHorizontal: 32,
          flexDirection: "row",
          alignItems: "center",
          gap: 20,
          marginVertical: 20,
        }}
      >
        <FontAwesome5 name="user-alt" size={34} color={Colors.primary} />
        <View style={{ flexDirection: "column", gap: 6 }}>
          <Text style={{ fontSize: 20, fontWeight: 400 }}>
            Proposé par Delgorithm
          </Text>
          <Text style={{ fontWeight: 200 }}>Superhost - 3 ans</Text>
        </View>
      </View>
    </React.Fragment>
  );
}
