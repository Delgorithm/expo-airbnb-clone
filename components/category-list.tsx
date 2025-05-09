import {
  FontAwesome6,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

const categoryIcon = [
  {
    id: 1,
    title: "Maisonettes",
    icon: <MaterialIcons name="house-siding" size={32} color="black" />,
    slug: "maisonettes",
  },
  {
    id: 2,
    title: "Populaire",
    icon: <FontAwesome6 name="ranking-star" size={32} color="black" />,
    slug: "populaire",
  },
  {
    id: 3,
    title: "Lac",
    icon: <FontAwesome6 name="house-flood-water" size={32} color="black" />,
    slug: "lac",
  },
  {
    id: 4,
    title: "Arbre",
    icon: <FontAwesome6 name="tree" size={32} color="black" />,
    slug: "arbre",
  },
  {
    id: 5,
    title: "Ville",
    icon: (
      <MaterialCommunityIcons
        name="home-city-outline"
        size={32}
        color="black"
      />
    ),
    slug: "ville",
  },
  {
    id: 6,
    title: "Cabines",
    icon: <MaterialIcons name="cabin" size={32} color="black" />,
    slug: "cabines",
  },
];

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
          }}
        >
          {categoryIcon.map((item, index) => (
            <Link
              href={{
                pathname: "/(modals)/category/[name]",
                params: { name: item.slug },
              }}
              key={index}
              style={{ alignItems: "center", gap: 8 }}
              asChild
              push
            >
              <Pressable>
                <Text>{item.icon}</Text>
                <Text style={{ fontWeight: 300 }}>{item.title}</Text>
              </Pressable>
            </Link>
          ))}
        </View>
        <View
          style={{
            backgroundColor: "red",
            height: 10,
            width: "100%",
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
      </ScrollView>
    </React.Fragment>
  );
}
