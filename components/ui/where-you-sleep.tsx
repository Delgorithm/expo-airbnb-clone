import { faker } from "@faker-js/faker";
import { Image, Text, View } from "react-native";

export default function WhereYouSleep() {
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
            source={{ uri: faker.image.url() }}
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
            source={{ uri: faker.image.url() }}
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
