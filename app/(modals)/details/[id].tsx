import { useLocalSearchParams } from "expo-router";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import listings from "@/assets/data/listings.json";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import GuestFavorite from "@/components/ui/guest-favorite";
import DisplayMap from "@/components/ui/display-map";
import WhatItOffers from "@/components/ui/what-it-offers";
import FirstBadge from "@/components/ui/first-badge";
import WhereYouSleep from "@/components/ui/where-you-sleep";
import Informations from "@/components/ui/informations";
import SecondBadge from "@/components/ui/second-badge";
import LocationHouse from "@/components/ui/location-house";
import FooterBtn from "@/components/ui/footer-btn";
import { faker } from "@faker-js/faker";
import HeaderButtons from "@/components/ui/header-buttons";
import Separator from "@/components/ui/separator";
import MeetYourHost from "@/components/ui/meet-your-host";

const { width } = Dimensions.get("window");
const IMG_HEIGHT = 300;

export default function DetailsPage() {
  const { id } = useLocalSearchParams();
  const listing = listings.find((item) => item.id.toString() === id);

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const numberOfYearsAsHost = Math.floor(Math.random() * 8 + 1);

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
    <View
      style={{
        flex: 1,
        position: "relative",
        backgroundColor: "white",
      }}
    >
      <HeaderButtons />

      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Animated.Image
          source={{ uri: faker.image.urlLoremFlickr() }}
          style={[styles.image, imageAnimatedStyle]}
        />

        <LocationHouse listing={listing} />

        <FirstBadge listing={listing} />

        <SecondBadge numberOfYearsAsHost={numberOfYearsAsHost} />

        <Separator />

        <Informations />

        <Text style={{ margin: 32, letterSpacing: 0.98 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Text>

        <Separator />

        <WhereYouSleep />

        <Separator />

        <WhatItOffers />

        <Separator />

        <DisplayMap listing={listing} />

        <Separator />

        <GuestFavorite listing={listing} />

        <MeetYourHost
          listing={listing}
          numberOfYearsAsHost={numberOfYearsAsHost}
        />
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
