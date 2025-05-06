import { useLocalSearchParams } from "expo-router";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import listings from "@/assets/data/listings.json";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";

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
    <View style={styles.container}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <Animated.Image
          source={{ uri: listing.image }}
          style={[styles.image, imageAnimatedStyle]}
        />
        <View>
          <Text>{listing.title}</Text>
          <Text>
            {listing.city}, {listing.country}
          </Text>
          <Text>{listing.price} € / nuit</Text>
          <Text>Note : {listing.rating}</Text>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: width,
    height: IMG_HEIGHT,
  },
});
