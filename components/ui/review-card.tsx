import { Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import { faker } from "@faker-js/faker";
import { useExpandableText } from "@/hooks/useExpandableText";
import { Ionicons } from "@expo/vector-icons";

type ReviewCardProps = {
  listing: {
    rating: number;
    reviews: number;
  };
};

export default function ReviewCard({ listing }: ReviewCardProps) {
  const fullStars = Math.floor(listing.rating);
  const hasHalfStar = listing.rating % 1 >= 0.5;

  const { displayedText, isExpanded, toggleExpanded } = useExpandableText(
    faker.lorem.lines({ min: 2, max: 8 }),
    160,
  );

  let randomNumber = Math.ceil(Math.random() * (10, 1) + 1);
  let randomWeeks = Math.ceil(Math.random() * 10);

  return (
    <View
      style={{
        marginHorizontal: 24,
        marginVertical: 28,
        backgroundColor: "white",
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: "#DDDDDD",
      }}
    >
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 12,
          marginHorizontal: 8,
          maxWidth: 350,
          gap: 10,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <View style={{ flexDirection: "row", gap: 4 }}>
            {Array.from({ length: fullStars }).map((_, index) => (
              <Ionicons key={index} name="star" size={8} color="black" />
            ))}
            {hasHalfStar && (
              <Ionicons name="star-half-outline" size={8} color="black" />
            )}
          </View>
          <Text style={{ fontSize: 12 }}>- il y a {randomWeeks} semaines</Text>
        </View>
        <Text style={{ fontSize: 16, fontWeight: 300 }}>{displayedText}</Text>
        <Pressable onPress={toggleExpanded}>
          <Text
            style={{
              textDecorationLine: "underline",
              fontSize: 18,
              fontWeight: 500,
              marginTop: 4,
            }}
          >
            {isExpanded ? "Réduire" : "En savoir plus"}
          </Text>
        </Pressable>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginTop: 10,
          }}
        >
          <Image
            source={faker.image.avatarGitHub()}
            style={{ height: 50, width: 50, borderRadius: 9999 }}
          />
          <View>
            <Text>{faker.internet.username()}</Text>
            <Text>{randomNumber} années sur Airbnb</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
