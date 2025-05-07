import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";
import PagerView from "react-native-pager-view";

type GuestFavoriteProps = {
  listing: {
    rating: number;
  };
};

export default function GuestFavorite({ listing }: GuestFavoriteProps) {
  if (!listing || !listing.rating) return null;

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
      </LinearGradient>

      <PagerView initialPage={0}>
        <View
          style={{ height: 200, width: 200, backgroundColor: "black" }}
          key="1"
        >
          <Text>First page</Text>
          <Text>Swipe ➡️</Text>
        </View>
        <View
          style={{ height: 200, width: 200, backgroundColor: "red" }}
          key="2"
        >
          <Text>Second page</Text>
        </View>
        <View
          style={{ height: 200, width: 200, backgroundColor: "green" }}
          key="3"
        >
          <Text>Third page</Text>
        </View>
      </PagerView>
    </View>
  );
}
