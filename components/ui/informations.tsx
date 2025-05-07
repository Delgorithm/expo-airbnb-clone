import { Colors } from "@/constants/Colors";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

export default function Informations() {
  return (
    <React.Fragment>
      <View>
        <View
          style={{
            marginHorizontal: 32,
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
            marginVertical: 20,
          }}
        >
          <Ionicons name="desktop-outline" size={34} color={Colors.dark} />
          <View style={{ flexDirection: "column", gap: 6 }}>
            <Text style={{ fontSize: 20, fontWeight: 400 }}>
              Bureau individuel
            </Text>
            <Text style={{ fontWeight: 200 }}>
              Un espace de travail rien que pour vous.
            </Text>
          </View>
        </View>

        <View
          style={{
            marginHorizontal: 32,
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
            marginVertical: 20,
          }}
        >
          <FontAwesome5 name="door-open" size={34} color={Colors.dark} />
          <View style={{ flexDirection: "column", gap: 6 }}>
            <Text style={{ fontSize: 20, fontWeight: 400 }}>
              Proposé par Delgorithm
            </Text>
            <Text style={{ fontWeight: 200 }}>Vérification à l'entrée.</Text>
          </View>
        </View>

        <View
          style={{
            marginHorizontal: 32,
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
            marginVertical: 20,
          }}
        >
          <FontAwesome5 name="medal" size={34} color={Colors.dark} />
          <View style={{ flexDirection: "column", gap: 6 }}>
            <Text style={{ fontSize: 20, fontWeight: 400 }}>
              Delgorithm est un Suport Hote
            </Text>
            <Text style={{ fontWeight: 200 }}>
              Les Super Hote sont expérimentés et grandement recommandés.
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          height: 0.5,
          marginHorizontal: 24,
          backgroundColor: "gray",
        }}
      />
    </React.Fragment>
  );
}
