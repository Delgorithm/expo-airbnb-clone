import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { Image } from "expo-image";
import { faker } from "@faker-js/faker";

interface LegendListCardProps {
  title: string;
  city: string;
  price: number;
  rating: number;
  reviews: number;
}

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function LegendListCard({
  title,
  city,
  price,
  rating,
  reviews,
}: LegendListCardProps) {
  return (
    <View
      style={{
        width: "90%",
        height: 430,
        alignSelf: "center",
        marginTop: 10,
      }}
    >
      <Image
        source={faker.image.url()}
        placeholder={{ blurhash }}
        contentFit="cover"
        transition={1000}
        style={{
          height: 320,
          borderRadius: 16,
        }}
      />
      <View style={{ marginTop: 12 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignContent: "flex-start",
          }}
        >
          <View style={{ gap: 6 }}>
            <Text style={{ fontWeight: 500 }}>
              {title}, {city}
            </Text>

            <View style={{ flexDirection: "row", gap: 4, marginTop: 6 }}>
              <Text style={{ fontWeight: 500 }}>{price}€</Text>
              <Text style={{ fontWeight: 300 }}>total avant les taxes</Text>
            </View>
          </View>

          <View
            style={{ flexDirection: "row", gap: 4, alignItems: "baseline" }}
          >
            <Ionicons name="star" />
            <Text>{rating}</Text>
            <Text>({reviews})</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
