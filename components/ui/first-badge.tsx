import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

type FirstBadgeProps = {
  listing: {
    rating: number;
    reviews: number;
  };
};

export default function FirstBadge({ listing }: FirstBadgeProps) {
  if (!listing || !listing.rating || !listing.reviews) return null;

  const fullStars = Math.floor(listing.rating);
  const hasHalfStar = listing.rating % 1 >= 0.5;

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        height: 80,
        marginHorizontal: 24,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: "gray",
      }}
    >
      {/* First element */}
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 20 }}>{listing.rating}</Text>
        <View style={{ flexDirection: "row", gap: 4 }}>
          {Array.from({ length: fullStars }).map((_, index) => (
            <Ionicons key={index} name="star" size={8} color="black" />
          ))}
          {hasHalfStar && (
            <Ionicons name="star-half-outline" size={8} color="black" />
          )}
        </View>
      </View>

      <View style={{ height: "50%", width: 0.5, backgroundColor: "gray" }} />

      {/* Second Element */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <FontAwesome5
          name="leaf"
          size={20}
          color="black"
          style={{ transform: [{ scaleX: -1 }] }}
        />

        <Text style={{ fontSize: 20, fontWeight: 500 }}>Top</Text>

        <FontAwesome5 name="leaf" size={20} color="black" />
      </View>

      <View
        style={{
          height: "50%",
          width: 0.5,
          backgroundColor: "gray",
        }}
      />

      {/* Third Elements */}
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: 500 }}>{listing.reviews}</Text>
        <Text style={{ textDecorationLine: "underline" }}>Avis</Text>
      </View>
    </View>
  );
}
