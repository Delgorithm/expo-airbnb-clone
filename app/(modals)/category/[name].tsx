import { locationList } from "@/assets/data/location-list";
import { markers } from "@/assets/data/markers";
import { useBottomTabOverflow } from "@/hooks/useBottomTabOverflow";
import { Ionicons } from "@expo/vector-icons";
import { AppleMaps, GoogleMaps } from "expo-maps";
import { AppleMapsMapType } from "expo-maps/build/apple/AppleMaps.types";
import { GoogleMapsMapType } from "expo-maps/build/google/GoogleMaps.types";
import { router, useLocalSearchParams } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Alert,
  Button,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CategoryName() {
  const { name } = useLocalSearchParams();
  const filtered = markers.filter((m) => m.category === name);
  const bottom = useBottomTabOverflow();
  const [locationIndex, setLocationIndex] = useState(0);
  const ref = useRef<AppleMaps.MapView>(null);

  const SF_ZOOM = 8;

  const cameraPosition = {
    coordinates: {
      latitude: locationList[locationIndex].stores[0].point[0],
      longitude: locationList[locationIndex].stores[0].point[1],
    },
    zoom: SF_ZOOM,
  };

  function handleChangeWithRef(direction: "next" | "prev") {
    const newIndex = locationIndex + (direction === "next" ? 1 : -1);
    let finalIndex = newIndex;

    if (newIndex < 0) {
      finalIndex = locationList.length - 1;
    } else if (newIndex >= locationList.length) {
      finalIndex = 0;
    }

    const nextLocation = locationList[finalIndex];

    ref.current?.setCameraPosition({
      coordinates: {
        latitude: nextLocation.stores[0].point[0],
        longitude: nextLocation.stores[0].point[1],
      },
      zoom: SF_ZOOM,
    });

    setLocationIndex(finalIndex);
  }

  const renderMapControls = () => (
    <>
      <View style={{ flex: 8 }} pointerEvents="auto" />
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
      <View
        style={{
          flex: 1.4,
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          gap: 10,
          backgroundColor: "",
        }}
        pointerEvents="auto"
      >
        <Pressable
          onPress={() => handleChangeWithRef("prev")}
          style={{
            paddingVertical: 12,
            paddingHorizontal: 40,
            backgroundColor: "white",
            borderRadius: 4,
          }}
        >
          <Text>Précédent</Text>
        </Pressable>

        <Pressable
          onPress={() => handleChangeWithRef("next")}
          style={{
            paddingVertical: 12,
            paddingHorizontal: 40,
            backgroundColor: "white",
            borderRadius: 4,
          }}
        >
          <Text>Suivant</Text>
        </Pressable>
      </View>
    </>
  );

  if (Platform.OS === "ios") {
    return (
      <React.Fragment>
        <AppleMaps.View
          ref={ref}
          style={StyleSheet.absoluteFill}
          cameraPosition={cameraPosition}
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
          markers={markers}
          onPolylineClick={(event) => {
            console.log(event);
            Alert.alert("Polyline clicked", JSON.stringify(event));
          }}
          onMapLoaded={() => {
            console.log(JSON.stringify({ type: "onMapLoaded" }, null, 2));
          }}
          onMapClick={(e) => {
            console.log(
              JSON.stringify({ type: "onMapClick", data: e }, null, 2),
            );
          }}
          onMapLongClick={(e) => {
            console.log(
              JSON.stringify({ type: "onMapLongClick", data: e }, null, 2),
            );
          }}
          onPOIClick={(e) => {
            console.log(
              JSON.stringify({ type: "onPOIClick", data: e }, null, 2),
            );
          }}
          onMarkerClick={(e) => {
            console.log(
              JSON.stringify({ type: "onMarkerClick", data: e }, null, 2),
            );
          }}
        />
        {renderMapControls()}
      </>
    );
  } else {
    return <Text>La Map m'est disponible que sur Android et iOS</Text>;
  }
}
