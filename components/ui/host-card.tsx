import { faker } from "@faker-js/faker";
import { Text, View } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";

type HostCardProps = {
  listing: {
    rating: number;
    reviews: number;
  };
  numberOfYearsAsHost: number;
};

export default function HostCard({
  listing,
  numberOfYearsAsHost,
}: HostCardProps) {
  if (!listing || !listing.rating || !listing.reviews) return null;

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "white",
        paddingVertical: 20,
        borderRadius: 40,
        shadowColor: "#000000",
        shadowOffset: {
          width: 0,
          height: 7,
        },
        shadowOpacity: 0.21,
        shadowRadius: 7.68,
        elevation: 10,
      }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "space-around",
          gap: 10,
        }}
      >
        <Image
          source={faker.image.avatarGitHub()}
          style={{ width: 100, height: 100, borderRadius: 10 }}
        />
        <Text style={{ fontSize: 24, fontWeight: 500 }}>
          {faker.internet.username({ firstName: "john", lastName: "doe" })}
        </Text>
        <Text>Super hote</Text>
      </View>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "flex-start",
          gap: 10,
        }}
      >
        <View
          style={{
            gap: 6,
            paddingBottom: 10,
            borderBottomWidth: 1,
            borderColor: "#E6E6E6",
            width: "100%",
          }}
        >
          <Text style={{ fontSize: 26, fontWeight: 600 }}>
            {listing.reviews}
          </Text>
          <Text>Avis</Text>
        </View>

        <View
          style={{
            gap: 6,
            paddingBottom: 10,
            borderBottomWidth: 1,
            borderColor: "#E6E6E6",
            width: "100%",
          }}
        >
          <Text style={{ fontSize: 26, fontWeight: 600 }}>
            {listing.rating} <Ionicons name="star" size={16} />
          </Text>
          <Text>Note</Text>
        </View>

        <View
          style={{
            gap: 6,
            paddingBottom: 10,
            borderBottomWidth: 1,
            borderColor: "#E6E6E6",
            width: "100%",
          }}
        >
          <Text style={{ fontSize: 26, fontWeight: 600 }}>
            {numberOfYearsAsHost}
          </Text>
          <Text>Années en hote</Text>
        </View>
      </View>
    </View>
  );
}
