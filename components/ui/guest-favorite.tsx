import { LinearGradient } from "expo-linear-gradient";
import { Pressable, ScrollView, Text, View } from "react-native";
import ReviewCard from "./review-card";
import { Image } from "expo-image";
import houseImage from "@/assets/images/house.png";
import { FontAwesome5 } from "@expo/vector-icons";

type GuestFavoriteProps = {
  listing: {
    rating: number;
    reviews: number;
  };
};

export default function GuestFavorite({ listing }: GuestFavoriteProps) {
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

          <Image source={houseImage} style={{ height: 150, width: 150 }} />

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
          contentContainerStyle={{}}
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
      </LinearGradient>
    </View>
  );
}
