import { locationList } from "@/assets/data/location-list";
import { markers } from "@/assets/data/markers";
import { useBottomTabOverflow } from "@/hooks/useBottomTabOverflow";
import { AppleMaps, GoogleMaps } from "expo-maps";
import { AppleMapsMapType } from "expo-maps/build/apple/AppleMaps.types";
import { GoogleMapsMapType } from "expo-maps/build/google/GoogleMaps.types";
import { useLocalSearchParams } from "expo-router";
import React, { useRef, useState } from "react";
import { Button, Platform, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SF_ZOOM = 20;

export default function CategoryName() {
  const { name } = useLocalSearchParams();
  const filtered = markers.filter((m) => m.category === name);
  const bottom = useBottomTabOverflow();
  const [locationIndex, setLocationIndex] = useState(0);
  const ref = useRef<AppleMaps.MapView>(null);

  const cameraPosition = {
    coordinates: {
      latitude: locationList[locationIndex].stores[0].point[0],
      longitude: locationList[locationIndex].stores[0].point[1],
    },
    zoom: SF_ZOOM,
  };

  function handleChangeWithRef(direction: "next" | "prev") {
    const newIndex = locationIndex + (direction === "next" ? 1 : -1);
    const nextLocation = locationList[newIndex];

    ref.current?.setCameraPosition({
      coordinates: {
        latitude: nextLocation.stores[0].point[0],
        longitude: nextLocation.stores[0].point[1],
      },
      zoom: SF_ZOOM,
    });

    setLocationIndex(newIndex);
  }

  const renderMapControls = () => (
    <>
      <View style={{ flex: 8 }} pointerEvents="auto" />
      <View style={{}} pointerEvents="auto">
        <Button title="Suivant" onPress={() => handleChangeWithRef("next")} />
        <Button title="Précedent" onPress={() => handleChangeWithRef("prev")} />
      </View>
    </>
  );

  if (Platform.OS === "ios") {
    return (
      <React.Fragment>
        <AppleMaps.View
          style={StyleSheet.absoluteFill}
          properties={{
            isTrafficEnabled: false,
            mapType: AppleMapsMapType.STANDARD,
            selectionEnabled: true,
          }}
          markers={filtered}
          onMapClick={(e) => {
            console.log(
              JSON.stringify({ type: "onMapClick", data: e }, null, 2),
            );
          }}
          onMarkerClick={(e) => {
            console.log(
              JSON.stringify({ type: "onCameraMove", data: e }, null, 2),
            );
          }}
          onCameraMove={(e) => {
            console.log(
              JSON.stringify({ type: "onCameraMove", data: e }, null, 2),
            );
          }}
        />
        <SafeAreaView
          style={{ flex: 1, paddingBottom: bottom }}
          pointerEvents="box-none"
        >
          {renderMapControls()}
        </SafeAreaView>
      </React.Fragment>
    );
  } else if (Platform.OS === "android") {
    return (
      <>
        <GoogleMaps.View
          ref={ref}
          style={StyleSheet.absoluteFill}
          cameraPosition={cameraPosition}
          properties={{
            isBuildingEnabled: true,
            isIndoorEnabled: true,
            mapType: GoogleMapsMapType.TERRAIN,
            selectionEnabled: true,
            isMyLocationEnabled: false,
            isTrafficEnabled: true,
            minZoomPreference: 1,
            maxZoomPreference: 20,
          }}
        />
      </>
    );
  } else {
    return <Text>La Map m'est disponible que sur Android et iOS</Text>;
  }
}
