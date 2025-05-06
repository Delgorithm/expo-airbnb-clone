import { router, useLocalSearchParams } from "expo-router";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import listings from "@/assets/data/listings.json";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

const { width } = Dimensions.get("window");
const IMG_HEIGHT = 300;
const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function DetailsPage() {
  const { id } = useLocalSearchParams();
  const listing = listings.find((item) => item.id.toString() === id);

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const fullStars = Math.floor(listing.rating);
  const hasHalfStar = listing.rating % 1 >= 0.5;

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
      {/* Header btn */}
      <View>
        <Pressable onPress={() => router.back()} style={styles.button}>
          <Ionicons
            name="chevron-back-outline"
            size={20}
            color="black"
            style={styles.arrowBack}
          />
        </Pressable>
        <View style={styles.viewMoreButtons}>
          <Pressable
            onPress={() => console.log("Share")}
            style={styles.buttonShare}
          >
            <Ionicons
              name="share-outline"
              size={20}
              color="black"
              style={styles.arrowBack}
            />
          </Pressable>

          <Pressable
            onPress={() => console.log("Favoris")}
            style={styles.buttonLike}
          >
            <Ionicons
              name="heart-outline"
              size={20}
              color="black"
              style={styles.arrowBack}
            />
          </Pressable>
        </View>
      </View>

      {/* Section main content */}
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <Animated.Image
          source={{ uri: listing.image }}
          style={[styles.image, imageAnimatedStyle]}
        />
        <View style={styles.containerSecond}>
          <Text style={styles.title}>{listing.title}</Text>
          <Text style={styles.location}>
            {listing.city}, {listing.country}
          </Text>
        </View>
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

          <View
            style={{ height: "50%", width: 0.5, backgroundColor: "gray" }}
          />

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
            <Text style={{ fontSize: 20, fontWeight: 500 }}>
              {listing.reviews}
            </Text>
            <Text style={{ textDecorationLine: "underline" }}>Avis</Text>
          </View>
        </View>
        {/* Informations & badges */}
        <View
          style={{
            marginHorizontal: 24,
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
            marginVertical: 20,
          }}
        >
          <Ionicons name="diamond-outline" size={34} color={Colors.primary} />
          <View style={{ flexDirection: "column", gap: 6 }}>
            <Text style={{ fontSize: 20, fontWeight: 400 }}>Gemme rare</Text>
            <Text style={{ fontWeight: 200 }}>
              Habituellement plein à craquer
            </Text>
          </View>
        </View>
        <View
          style={{
            height: 0.5,
            marginHorizontal: 24,
            backgroundColor: "gray",
          }}
        />
        <View
          style={{
            marginHorizontal: 24,
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
            marginVertical: 20,
          }}
        >
          <FontAwesome5 name="user-alt" size={34} color={Colors.primary} />
          <View style={{ flexDirection: "column", gap: 6 }}>
            <Text style={{ fontSize: 20, fontWeight: 400 }}>
              Proposé par Delgorithm
            </Text>
            <Text style={{ fontWeight: 200 }}>Superhost - 3 ans</Text>
          </View>
        </View>
        <View
          style={{
            height: 0.5,
            marginHorizontal: 24,
            backgroundColor: "gray",
          }}
        />
        <View>
          <View
            style={{
              marginHorizontal: 24,
              flexDirection: "row",
              alignItems: "center",
              gap: 20,
              marginVertical: 20,
            }}
          >
            <Ionicons name="desktop-outline" size={34} color={Colors.dark} />
            <View style={{ flexDirection: "column", gap: 6 }}>
              <Text style={{ fontSize: 20, fontWeight: 400 }}>
                Bureau individuel
              </Text>
              <Text style={{ fontWeight: 200 }}>
                Un espace de travail rien que pour vous.
              </Text>
            </View>
          </View>

          <View
            style={{
              marginHorizontal: 24,
              flexDirection: "row",
              alignItems: "center",
              gap: 20,
              marginVertical: 20,
            }}
          >
            <FontAwesome5 name="door-open" size={34} color={Colors.dark} />
            <View style={{ flexDirection: "column", gap: 6 }}>
              <Text style={{ fontSize: 20, fontWeight: 400 }}>
                Proposé par Delgorithm
              </Text>
              <Text style={{ fontWeight: 200 }}>Vérification à l'entrée.</Text>
            </View>
          </View>

          <View
            style={{
              marginHorizontal: 24,
              flexDirection: "row",
              alignItems: "center",
              gap: 20,
              marginVertical: 20,
            }}
          >
            <FontAwesome5 name="medal" size={34} color={Colors.dark} />
            <View style={{ flexDirection: "column", gap: 6 }}>
              <Text style={{ fontSize: 20, fontWeight: 400 }}>
                Delgorithm est un Suport Hote
              </Text>
              <Text style={{ fontWeight: 200 }}>
                Les Super Hote sont expérimentés et grandement recommandés.
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            height: 0.5,
            marginHorizontal: 24,
            backgroundColor: "gray",
          }}
        />
        <Text style={{ margin: 24, letterSpacing: 0.98 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Text>
        <View
          style={{
            height: 0.5,
            marginHorizontal: 24,
            backgroundColor: "gray",
          }}
        />
        <View
          style={{ marginHorizontal: 24, marginVertical: 24, marginBottom: 80 }}
        >
          <Text>Où vous dormirez</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              marginTop: 24,
            }}
          >
            <View>
              <Image
                source={{ uri: listing.image }}
                placeholder={{ blurhash }}
                contentFit="cover"
                transition={1000}
                style={{
                  height: 100,
                  width: 170,
                  borderRadius: 16,
                }}
              />
              <Text style={{ marginTop: 6 }}>Chambre 1</Text>
            </View>
            <View>
              <Image
                source={{ uri: listing.image }}
                placeholder={{ blurhash }}
                contentFit="cover"
                transition={1000}
                style={{
                  height: 100,
                  width: 170,
                  borderRadius: 16,
                }}
              />
              <Text style={{ marginTop: 6 }}>Chambre 2</Text>
            </View>
          </View>
        </View>
      </Animated.ScrollView>

      {/* Footer Btn */}
      <View style={styles.footerInfo}>
        <View style={styles.footerInfoPrice}>
          <Text style={styles.footerInfoPriceText}>
            {listing.price} € / nuit
          </Text>
          <View style={styles.footerInfoPriceCancellation}>
            <Ionicons name="checkmark-outline" size={10} color={"black"} />
            <Text>Annulation gratuite</Text>
          </View>
        </View>
        <Pressable style={styles.footerInfoBtn}>
          <Text style={styles.footerInfoBtnText}>Réserver</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },

  button: {
    position: "absolute",
    top: 56,
    left: 20,
    zIndex: 999,
    borderRadius: 999,
  },

  buttonLike: {
    position: "absolute",
    top: 56,
    right: 20,
    zIndex: 999,
  },

  buttonShare: {
    position: "absolute",
    top: 56,
    right: 80,
    zIndex: 999,
  },

  arrowBack: {
    padding: 8,
    borderRadius: 999,
    backgroundColor: "white",
  },

  image: {
    width: width,
    height: IMG_HEIGHT,
    zIndex: 998,
  },

  containerSecond: {
    padding: 24,
  },

  title: {
    fontSize: 36,
    fontWeight: 500,
  },

  footerInfo: {
    position: "absolute",
    bottom: 0,
    left: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderTopWidth: 0.5,
    width: "100%",
    backgroundColor: "white",
  },

  footerInfoPriceText: {
    fontWeight: 500,
    fontSize: 18,
    textDecorationLine: "underline",
  },

  footerInfoPriceCancellation: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#E5E5E5",
    borderRadius: 999,
  },

  footerInfoPrice: {
    marginTop: 14,
  },

  footerInfoBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 44,
    borderRadius: 8,
  },

  footerInfoBtnText: {
    color: "white",
    fontWeight: 600,
    fontSize: 16,
  },
});
