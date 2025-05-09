import { AppleMaps } from "expo-maps";
import { AppleMapsMapType } from "expo-maps/build/apple/AppleMaps.types";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function CategoryName() {
  const { name } = useLocalSearchParams();
  return (
    <React.Fragment>
      <AppleMaps.View
        style={StyleSheet.absoluteFill}
        properties={{
          isTrafficEnabled: false,
          mapType: AppleMapsMapType.STANDARD,
          selectionEnabled: true,
        }}
      />
    </React.Fragment>
  );
}
