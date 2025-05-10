import { router, useLocalSearchParams } from "expo-router";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import listings from "@/assets/data/listings.json";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import GuestFavorite from "@/components/ui/guest-favorite";
import DisplayMap from "@/components/ui/display-map";
import WhatItOffers from "@/components/ui/what-it-offers";
import FirstBadge from "@/components/ui/first-badge";
import WhereYouSleep from "@/components/ui/where-you-sleep";
import Informations from "@/components/ui/informations";
import SecondBadge from "@/components/ui/second-badge";
import LocationHouse from "@/components/ui/location-house";
import FooterBtn from "@/components/ui/footer-btn";

const { width } = Dimensions.get("window");
const IMG_HEIGHT = 300;

export default function DetailsPage() {
  const { id } = useLocalSearchParams();
  const listing = listings.find((item) => item.id.toString() === id);

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75],
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [2, 1, 1],
          ),
        },
      ],
    };
  });

  if (!listing) {
    return <Text>Logement introuvable.</Text>;
  }

  return (
    <View style={{ flex: 1, position: "relative", backgroundColor: "white" }}>
      {/* Header btn */}
      <View>
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
        <View>
          <Pressable
            onPress={() => console.log("Share")}
            style={{ position: "absolute", top: 56, right: 80, zIndex: 999 }}
          >
            <Ionicons
              name="share-outline"
              size={20}
              color="black"
              style={{
                padding: 8,
                borderRadius: 999,
                backgroundColor: "white",
              }}
            />
          </Pressable>

          <Pressable
            onPress={() => console.log("Favoris")}
            style={{ position: "absolute", top: 56, right: 20, zIndex: 999 }}
          >
            <Ionicons
              name="heart-outline"
              size={20}
              color="black"
              style={{
                padding: 8,
                borderRadius: 999,
                backgroundColor: "white",
              }}
            />
          </Pressable>
        </View>
      </View>

      {/* Section main content */}
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 600 }}
      >
        <Animated.Image
          source={{ uri: listing.image }}
          style={[styles.image, imageAnimatedStyle]}
        />

        <LocationHouse listing={listing} />

        <FirstBadge listing={listing} />

        {/* Informations & badges */}

        <SecondBadge />

        <View
          style={{
            height: 0.5,
            marginHorizontal: 24,
            backgroundColor: "gray",
          }}
        />

        <Informations />

        <Text style={{ margin: 32, letterSpacing: 0.98 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Text>

        <View
          style={{
            height: 0.5,
            backgroundColor: "gray",
          }}
        />

        <WhereYouSleep listing={listing} />

        <View
          style={{
            height: 0.5,
            backgroundColor: "gray",
          }}
        />

        <WhatItOffers />

        <View
          style={{
            height: 0.5,
            backgroundColor: "gray",
          }}
        />

        <DisplayMap listing={listing} />

        <View
          style={{
            height: 0.5,
            backgroundColor: "gray",
          }}
        />

        <GuestFavorite listing={listing} />
      </Animated.ScrollView>

      <FooterBtn listing={listing} />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: width,
    height: IMG_HEIGHT,
    zIndex: 998,
  },
});
