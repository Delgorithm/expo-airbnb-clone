import { Platform, Text, ViewStyle } from "react-native";
import { AppleMaps, GoogleMaps } from "expo-maps";

type AppleGoogleMapProps = {
  styling?: ViewStyle;
};

export default function AppleGoogleMap({ styling }: AppleGoogleMapProps) {
  const staticCoords = {
    latitude: 42.98333,
    longitude: -0.41667,
  };

  const cameraPosition = {
    coordinates: staticCoords,
    zoom: 14,
  };

  if (Platform.OS === "ios") {
    return <AppleMaps.View cameraPosition={cameraPosition} style={styling} />;
  } else if (Platform.OS === "android") {
    return <GoogleMaps.View cameraPosition={cameraPosition} style={styling} />;
  } else {
    return <Text>Maps est valable seulement sur Android et iOS</Text>;
  }
}
