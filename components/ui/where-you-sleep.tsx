import { Image, Text, View } from "react-native";

type WhereYouSleepProps = {
  listing: {
    image: string;
  };
};

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function WhereYouSleep({ listing }: WhereYouSleepProps) {
  if (!listing || !listing.image) return null;

  return (
    <View style={{ margin: 32 }}>
      <Text style={{ fontSize: 20, fontWeight: 500 }}>Où vous dormirez</Text>
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
              width: 160,
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
              width: 160,
              borderRadius: 16,
            }}
          />
          <Text style={{ marginTop: 6 }}>Chambre 2</Text>
        </View>
      </View>
    </View>
  );
}
