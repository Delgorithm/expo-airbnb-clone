import {
  FontAwesome6,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link } from "expo-router";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function CategoryList() {
  return (
    <React.Fragment>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ marginVertical: 4 }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 32,
            marginLeft: 32,
            marginVertical: 10,
            paddingRight: 16,
          }}
        >
          {categoryIcon.map((item, index) => (
            <Link
              href={{
                pathname: "/(modals)/category/[name]",
                params: { name: item.slug },
              }}
              key={index}
              style={{ alignItems: "center" }}
              asChild
              push
            >
              <Pressable>
                <Image
                  source={item.img}
                  style={{ height: 60, width: 60 }}
                  contentFit="cover"
                />
                <Text style={{ fontWeight: 300 }}>{item.title}</Text>
              </Pressable>
            </Link>
          ))}
        </View>
      </ScrollView>
      <View
        style={{
          backgroundColor: "#F2F2F2",
          height: 0.5,
          width: "100%",
          marginTop: 4,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 0.5,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,
          elevation: 2,
        }}
      />
    </React.Fragment>
  );
}

const categoryIcon = [
  {
    id: 1,
    title: "Populaire",
    img: require("@/assets/images/top-medal.png"),
    slug: "populaire",
  },
  {
    id: 2,
    title: "Maisonettes",
    img: require("@/assets/images/house.png"),
    slug: "maisonettes",
  },

  {
    id: 3,
    title: "Lac",
    img: require("@/assets/images/lakefront-house.png"),
    slug: "lac",
  },
  {
    id: 4,
    title: "Arbre",
    img: require("@/assets/images/tepee.png"),
    slug: "arbre",
  },
  {
    id: 5,
    title: "Ville",
    img: require("@/assets/images/city.png"),
    slug: "ville",
  },
  {
    id: 6,
    title: "Cabines",
    img: require("@/assets/images/wood-house.png"),
    slug: "cabines",
  },
];
