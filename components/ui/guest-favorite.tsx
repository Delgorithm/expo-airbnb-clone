import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, ScrollView, Text, View } from "react-native";
import ReviewCard from "./review-card";
import HostCard from "./host-card";

type GuestFavoriteProps = {
  listing: {
    rating: number;
    reviews: number;
  };
  numberOfYearsAsHost: number;
};

export default function GuestFavorite({
  listing,
  numberOfYearsAsHost,
}: GuestFavoriteProps) {
  if (!listing || !listing.rating) return null;

  const reviews = Array.from({ length: 5 }).map(() => ({
    rating: Math.random() * 5,
    reviews: Math.floor(Math.random() * 100),
  }));

  return (
    <View
      style={{
        position: "relative",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20,
      }}
    >
      <LinearGradient
        colors={["#F7F7F7", "#FEFEFE"]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: "auto",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 26,
            marginTop: 26,
          }}
        >
          <FontAwesome5
            name="leaf"
            size={50}
            color="black"
            style={{ transform: [{ scaleX: -1 }] }}
          />

          <Text style={{ fontSize: 60, fontWeight: 500 }}>
            {listing.rating}
          </Text>

          <FontAwesome5 name="leaf" size={50} color="black" />
        </View>
        <View
          style={{
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Text>Dans les favoris</Text>
          <View style={{ alignItems: "center", gap: 2 }}>
            <Text style={{ fontWeight: 200 }}>
              L&apos;un des endroits les plus appréciés sur AirBnb
            </Text>
            <Text style={{ fontWeight: 200 }}>
              se basant sur les notes, les avis et les compatibilités
            </Text>
          </View>
        </View>

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24 }}
        >
          {reviews.map((review, index) => (
            <ReviewCard key={index} listing={review} />
          ))}
        </ScrollView>

        <Pressable
          style={({ pressed }) => [
            {
              marginHorizontal: 24,
              marginBottom: 26,
              borderWidth: 0.5,
              paddingVertical: 12,
              borderRadius: 8,
              opacity: pressed ? 0.6 : 1,
              backgroundColor: pressed ? "gray" : "white",
            },
          ]}
        >
          {({ pressed }) => (
            <Text
              style={{
                alignSelf: "center",
                fontSize: 16,
                fontWeight: 500,
                color: pressed ? "white" : "black",
              }}
            >
              Afficher les {listing.reviews} avis
            </Text>
          )}
        </Pressable>
        <View
          style={{
            height: 0.5,
            backgroundColor: "#E2E2E2",
            marginHorizontal: 24,
          }}
        />

        <View style={{ margin: 24, gap: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 500 }}>
            Rencontrez votre hote
          </Text>
          <HostCard
            listing={listing}
            numberOfYearsAsHost={numberOfYearsAsHost}
          />
        </View>
      </LinearGradient>
    </View>
  );
}
