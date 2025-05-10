import { Text, View } from "react-native";
import AppleGoogleMap from "../apple-google-map";

type DisplayMapProps = {
  listing: {
    city: string;
    country: string;
  };
};

export default function DisplayMap({ listing }: DisplayMapProps) {
  if (!listing || !listing.city || !listing.country) return null;

  return (
    <View style={{ margin: 32, gap: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 500 }}>Où vous serez</Text>
      <Text>
        {listing.city}, {listing.country}
      </Text>

      <View style={{ borderRadius: 20 }}>
        <AppleGoogleMap styling={{ height: 300, width: "100%" }} />
      </View>
    </View>
  );
}
