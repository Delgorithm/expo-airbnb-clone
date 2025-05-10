import { Text, View } from "react-native";

type LocationHouseProps = {
  listing: {
    title: string;
    city: string;
    country: string;
  };
};

export default function LocationHouse({ listing }: LocationHouseProps) {
  if (!listing || !listing.title || !listing.city || !listing.country)
    return null;
  return (
    <View style={{ padding: 24 }}>
      <Text style={{ fontSize: 36, fontWeight: 500 }}>{listing.title}</Text>
      <Text>
        {listing.city}, {listing.country}
      </Text>
    </View>
  );
}
